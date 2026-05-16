import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repository/auth.repository.ts';
import type { RegisterRequest } from '../types/register.types.ts';
import { RedisSingleton } from '../../../core/redis/redis.singleton.ts';
import { MailService } from '../../../core/mail/mail.singleton.ts';

export class AuthService {
    private authRepository = new AuthRepository();

    async register(data: RegisterRequest) {
        const { email, name, password, role } = data;
        const existingUser = await this.authRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authRepository.createUser(
            name,
            email,
            hashedPassword,
            role
        );
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const redis = await RedisSingleton.getInstance();
        await redis.set(`otp:${data.email}`, otp, {
            EX: 300,
        });
        const transporter = MailService.getInstance();
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: data.email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        });
        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return {
            user, token
        };
    }
    async resendOtp(email: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.is_verified) {
            throw new Error('User already verified');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const redis = await RedisSingleton.getInstance();
        await redis.set(`otp:${email}`, otp, {
            EX: 300,
        });
        const transporter = MailService.getInstance();
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        });
    }
    async verifyOtp(email: string, otp: string) {
        const redis = await RedisSingleton.getInstance();
        const storedOtp = await redis.get(`otp:${email}`);
        console.log("otp", storedOtp)
        console.log("email", email)
        if (!storedOtp) {
            throw new Error('OTP expired');
        }
        if (storedOtp !== otp) {
            throw new Error('Invalid OTP');
        }
        await this.authRepository.verifyUser(email);
        await redis.del(`otp:${email}`);
        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return token;
    }
    async login(email: string, password: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        if (!user.is_verified) {
            throw new Error('User not verified');
        }
        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return {
            token,
            user
        }
    }
}
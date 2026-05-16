import { UserRepository } from "../repository/user.repository.ts";
export class UserService {
    private userRepository = new UserRepository();

    async getUser(id: number) {
        try {
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error("Error occurred while fetching user");
        }
    }
}
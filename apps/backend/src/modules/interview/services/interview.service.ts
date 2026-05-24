import { InterviewRepository } from "../repository/interview.respository.ts"
import { MailService } from "../../../core/mail/mail.singleton.ts";

export class InterviewService {
  private interviewRepo = new InterviewRepository();
  async scheduleInterview(data: any) {
    const interview = await this.interviewRepo.createInterview(
      data
    );
    const interviewLink = `
      http://localhost:5173/interview/${interview.room_id}
    `;
    const transporter = MailService.getInstance();
    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: data.candidateEmail,

      subject: "Interview Scheduled",

      html: `
        <h2>Interview Invitation</h2>

        <p>Hello ${data.candidateName},</p>

        <p>
          Your interview has been scheduled.
        </p>

        <p>
          <strong>Company:</strong>
          ${data.companyName}
        </p>

        <p>
          <strong>Agenda:</strong>
          ${data.agenda}
        </p>

        <p>
          <strong>Round:</strong>
          ${data.roundNo}
        </p>

        <p>
          <strong>Date:</strong>
          ${data.interviewDate}
        </p>

        <p>
          <strong>Time:</strong>
          ${data.interviewTime}
        </p>

        <p>
          <strong>Interview Link:</strong>
        </p>

        <a href=\"${interviewLink}\">
          Join Interview
        </a>
      `,
    });
    return interview;
  }

  async getUpcomingInterviews(
    interviewerId: string
  ) {
    return await this.interviewRepo.getUpcomingInterviews(interviewerId);
  }

  async getAllInterviews(
    interviewerId: string
  ) {
    return await this.interviewRepo.getAllInterviews(interviewerId)
  }

}
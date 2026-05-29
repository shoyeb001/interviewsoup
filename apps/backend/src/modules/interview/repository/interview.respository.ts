import { DatabasePool } from "../../../core/database/pool.ts";

export class InterviewRepository {
  private pool = DatabasePool.getPool();
  async createInterview(data: any) {
    const query = `
      INSERT INTO interviews (
        interviewer_id,
        candidate_name,
        candidate_email,
        company_name,
        agenda,
        round_no,
        interview_date,
        interview_time
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8
      )
      RETURNING *
    `;

    const values = [
      data.interviewerId,
      data.candidateName,
      data.candidateEmail,
      data.companyName,
      data.agenda,
      data.roundNo,
      data.interviewDate,
      data.interviewTime,
    ];

    const result = await this.pool.query(
      query,
      values
    );
    return result.rows[0];
  }

  async getAllInterviews(interviewerId: string) {
    const query = `
        SELECT * FROM interviews WHERE interviewer_id = $1 
        ORDER BY created_at DESC
      `
    const result = await this.pool.query(
      query,
      [interviewerId]
    );
    return result.rows;
  }

  async getUpcomingInterviews(interviewerId: string) {
    const query = `
    SELECT *
    FROM interviews
    WHERE interviewer_id = $1
    AND interview_date >= CURRENT_DATE
    AND status = 'SCHEDULED'
    ORDER BY interview_date ASC,
             interview_time ASC
  `;

    const result = await this.pool.query(
      query,
      [interviewerId]
    );

    return result.rows;
  }

  async getInterviewByRoomId(
    roomId: string
  ) {

    const query = `
    SELECT

      interviews.id,
      interviews.room_id,

      interviews.candidate_name,
      interviews.candidate_email,

      interviews.company_name,

      interviews.agenda,

      interviews.round_no,

      interviews.interview_date,
      interviews.interview_time,

      interviews.status,

      interviews.created_at,

      users.id AS interviewer_id,
      users.name AS interviewer_name,
      users.email AS interviewer_email

    FROM interviews

    INNER JOIN users
      ON interviews.interviewer_id = users.id

    WHERE interviews.room_id = $1

    LIMIT 1
  `;

    const result = await this.pool.query(
      query,
      [roomId]
    );

    return result.rows[0];
  }

}
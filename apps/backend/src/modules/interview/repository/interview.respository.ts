import { DatabasePool } from "../../../core/database/pool.ts";

export class InterviewRepository{
    private pool = DatabasePool.getPool();
    async createInterview(data:any){
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
}
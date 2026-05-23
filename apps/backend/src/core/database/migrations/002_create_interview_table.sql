CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- status should be SCHEDULED, LIVE, COMPLETED, CANCELED
CREATE TABLE interviews (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    interviewer_id UUID REFERENCES users(id),
    candidate_name VARCHAR(255) NOT NULL,
    candidate_email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    agenda TEXT,
    round_no INTEGER NOT NULL,
    room_id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    interview_date DATE NOT NULL,
    interview_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
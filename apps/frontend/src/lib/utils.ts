import type { TUpcomingInterviews } from "@/features/dashboard/types/dashboard.types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInterviewTimeLeft = (
  interviewDate: string,
  interviewTime: string
) => {
  if (!interviewDate || !interviewTime) {
    return ""
  }
  // Combine date + time
  const interviewDateTime = new Date(
    `${interviewDate.split("T")[0]}T${interviewTime}`
  );

  const now = new Date();

  const diff = interviewDateTime.getTime() - now.getTime();

  // Interview already started/passed
  if (diff <= 0) {
    return "Interview started";
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  let result = "Starting in ";

  if (days > 0) {
    result += `${days}d `;
  }

  if (hours > 0) {
    result += `${hours}h `;
  }

  result += `${minutes}m`;

  return result.trim();
};

export const extractCalendarEvents = (
  interviews: TUpcomingInterviews
) => {
  return interviews.map((interview) => {
    // Combine date + time
    const now = new Date();

    const start = new Date(
      `${interview.interview_date.split("T")[0]}T${interview.interview_time}`
    );

    // 1 hour interview duration
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const isExpired = end.getTime() < now.getTime();


    return {
      id: interview.id,
      title: `${interview.candidate_name} (${interview.company_name})`,
      start,
      end,
      resource: interview,
      bgColor: isExpired ? "#e2e8f0" : "#2563eb",
      textColor: '#1e40af',
    };
  });
};
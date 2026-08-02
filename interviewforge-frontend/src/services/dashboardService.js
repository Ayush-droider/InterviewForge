import { getResumeHistory } from "./resumeService";
import { getInterviewHistory } from "./interviewService";

export async function getDashboardStats() {
    const [resumes, interviews] = await Promise.all([
        getResumeHistory(),
        getInterviewHistory(),
    ]);

    const completedInterviews = interviews.filter(
        (item) => item.status === "COMPLETED"
    );

    const pendingResumes = resumes.filter(
        (item) => item.analysisStatus !== "COMPLETED"
    );

    const averageScore =
        completedInterviews.length === 0
            ? 0
            : Math.round(
                completedInterviews.reduce(
                    (sum, interview) => sum + (interview.overallScore || 0),
                    0
                ) / completedInterviews.length
            );

    return {
        totalResumes: resumes.length,
        totalInterviews: interviews.length,
        pendingResumes: pendingResumes.length,
        completedInterviews: completedInterviews.length,
        averageScore,
        resumes,
        interviews,
    };
}
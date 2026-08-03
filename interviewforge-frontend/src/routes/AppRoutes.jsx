import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "@/pages/landing/Landing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Dashboard from "@/pages/dashboard/Dashboard";

import Resume from "@/pages/resume/resume";
import ResumeDetails from "@/pages/resume/ResumeDetails";

import InterviewSetup from "@/pages/interview/InterviewSetup";
import InterviewSession from "@/pages/interview/InterviewSession";
import InterviewScorecard from "@/pages/interview/InterviewScorecard";

import InterviewHistory from "@/pages/history/InterviewHistory";
import StudyResources from "@/pages/resources/StudyResources";

import Profile from "@/pages/profile/Profile";
import Settings from "@/pages/settings/Settings";

import NotFound from "@/pages/error/NotFound";

import ProtectedRoute from "@/routes/ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ---------- Public Routes ---------- */}

                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ---------- Dashboard ---------- */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Resume ---------- */}

                <Route
                    path="/resume"
                    element={
                        <ProtectedRoute>
                            <Resume />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeDetails />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Study Resources ---------- */}

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <StudyResources />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Interview ---------- */}

                <Route
                    path="/interview"
                    element={
                        <ProtectedRoute>
                            <InterviewSetup />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/:id"
                    element={
                        <ProtectedRoute>
                            <InterviewSession />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interview/:id/scorecard"
                    element={
                        <ProtectedRoute>
                            <InterviewScorecard />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Interview History ---------- */}

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <InterviewHistory />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Profile ---------- */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- Settings ---------- */}

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                {/* ---------- 404 ---------- */}

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}
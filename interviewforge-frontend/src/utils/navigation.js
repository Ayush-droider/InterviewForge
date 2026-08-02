import {
    LayoutDashboard,
    FileText,
    Mic,
    History,
    BookOpen,
    Settings,
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        title: "Resume",
        icon: FileText,
        path: "/resume",
    },
    {
        title: "AI Interview",
        icon: Mic,
        path: "/interview",
    },
    {
        title: "History",
        icon: History,
        path: "/history",
    },
    {
        title: "Study",
        icon: BookOpen,
        path: "/study",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
];
import AuthIllustration from "../../components/auth/AuthIllustration";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
    return (
        <AuthLayout
            left={<AuthIllustration />}
            right={<LoginForm />}
        />
    );
}
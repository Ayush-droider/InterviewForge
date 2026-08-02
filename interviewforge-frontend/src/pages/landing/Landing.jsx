import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Landing() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">

            <Navbar />

            <Hero />

            <Stats />

            <Features />

            <HowItWorks />

            <Testimonials />

            <CTA />

            <Footer />

        </main>
    );
}
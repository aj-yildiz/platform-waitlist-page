import Link from "next/link";
import { ArrowRight, CheckCircle, Mail, Menu, Users, Zap, Shield, Globe, Smartphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/client/signup-form";
import SpaceSuggestionForm from "@/components/client/space-suggestion-form";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src="/images/vastis-preview.png" alt="Vastis Logo" className="h-12 w-auto" />
            <span className="sr-only">Vastis</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-base font-medium text-gray-600 transition-colors hover:text-[#245FCB]">
              Features
            </Link>
            <Link href="#about" className="text-base font-medium text-gray-600 transition-colors hover:text-[#245FCB]">
              About
            </Link>
            <Link href="#faq" className="text-base font-medium text-gray-600 transition-colors hover:text-[#245FCB]">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-[#245FCB] text-white hover:bg-[#1e4fa3] transition-colors duration-300">
              <Link href="#signup">Join Waitlist</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Top Blue Section */}
        <section className="w-full py-16 md:py-20 bg-[#245FCB]" />

        {/* Hero Section */}
        <section className="w-full min-h-screen flex items-center justify-center py-32 md:py-40 bg-gradient-to-b from-blue-50/30 via-blue-50/10 to-transparent relative">
          <div className="absolute inset-0 bg-[#245FCB]/[0.02] pointer-events-none" />
          <div className="container px-4 mx-auto relative">
            <div className="max-w-3xl mx-auto text-center">
              <Button
                variant="outline"
                className="mb-12 bg-blue-50 text-[#245FCB] hover:bg-blue-100 border-0 text-lg px-8 py-4"
              >
                <Mail className="mr-2 h-5 w-5" />
                Join Our Waitlist
              </Button>
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-10">
                Shape the Future of Allied Health
              </h1>
              <p className="text-2xl text-gray-600 mb-16">
                Sign up as a practitioner, patient, or fitness space and get exclusive benefits when we launch.
              </p>
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-10 md:p-12">
                <SignupForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section removed for a cleaner design */}

        <section id="faq" className="w-full py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <Button
                variant="outline"
                className="mb-8 bg-blue-50 text-[#245FCB] hover:bg-blue-100 border-0"
              >
                FAQ
              </Button>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Find answers to common questions about Vastis.
              </p>
              <div className="space-y-6">
                {/* Removed the FAQ card that repeats the 'What is Vastis?' description */}
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How do I get started with Vastis?</h3>
                  <p className="text-gray-600">
                    Simply sign up for our waitlist, and you'll be among the first to know when we launch. Once you're in, our onboarding process will guide you through setting up your account and getting started.
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Is Vastis suitable for small businesses?</h3>
                  <p className="text-gray-600">
                    Vastis is designed to scale with your business, from individual users to large enterprises. Our flexible pricing and feature sets accommodate businesses of all sizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="space-suggestions" className="w-full min-h-screen flex items-center justify-center py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-12">
                <span className="text-[#245FCB]">Your Voice, Your Space:</span>
                <br className="md:hidden" /> 
                <span className="block mt-2 md:mt-4">Nominate your gym, studio, or community space</span>
              </h2>
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 md:p-10">
                <SpaceSuggestionForm />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-[#245FCB]">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
                Ready to Get Started?
              </h2>
              <Button
                variant="outline"
                className="bg-white text-[#245FCB] hover:bg-gray-100 border-0 text-lg px-8 py-6"
                asChild
              >
                <a href="#signup">Join Our Waitlist</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Seamless Integration",
    description: "Connect with your favorite tools and services without any hassle.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into your performance with detailed analytics and reporting.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security measures.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help you with any issues or questions.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Customizable Workflows",
    description: "Create workflows that match your specific needs and requirements.",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Mobile Friendly",
    description: "Access your account and manage your projects from any device.",
    icon: <Smartphone className="h-6 w-6 text-primary" />,
  },
];

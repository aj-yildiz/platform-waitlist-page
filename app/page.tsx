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

        {/* Features Section */}
        <section className="w-full py-32 md:py-40 bg-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-8">
                What is Vastis?
              </h2>
              <p className="text-xl text-gray-600">
                Vastis is a space-sharing marketplace that empowers allied health providers to find and book spaces they need.
                <br className="hidden md:block" />
                It's a win-win-win for practitioners, patients, and fitness spaces.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-[#245FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Practitioner Independence</h3>
                <p className="text-gray-600">Launch your solo practice without the overhead. Access fully equipped spaces when you need them.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-[#245FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Convenience</h3>
                <p className="text-gray-600">Find and book qualified health providers in your area. Get the care you need, where you need it.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-[#245FCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Space Optimization</h3>
                <p className="text-gray-600">Maximize your space usage and revenue by connecting with qualified practitioners in your community.</p>
              </div>
            </div>
          </div>
        </section>

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
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Vastis?</h3>
                  <p className="text-gray-600">
                    Vastis is a comprehensive digital platform designed to help individuals and teams streamline their workflows, improve collaboration, and achieve better results through advanced tools and analytics.
                  </p>
                </div>
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
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What kind of support do you offer?</h3>
                  <p className="text-gray-600">
                    We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our dedicated support team is always ready to help you succeed.
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

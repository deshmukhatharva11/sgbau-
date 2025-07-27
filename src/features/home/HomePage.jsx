import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiBarChart2,
  FiShield
} from 'react-icons/fi';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    successfulStartups: 0,
    activeStudents: 0,
    partnerColleges: 0
  });

  useEffect(() => {
    // Animate stats counter
    const animateStats = () => {
      const finalStats = {
        totalIdeas: 3456,
        successfulStartups: 89,
        activeStudents: 1247,
        partnerColleges: 45
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          totalIdeas: Math.floor(finalStats.totalIdeas * progress),
          successfulStartups: Math.floor(finalStats.successfulStartups * progress),
          activeStudents: Math.floor(finalStats.activeStudents * progress),
          partnerColleges: Math.floor(finalStats.partnerColleges * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, stepDuration);
    };

    animateStats();
  }, []);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Student, Shivaji College",
      content: "Innovation Hub helped me transform my idea into a successful startup. The mentorship and support were incredible!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      company: "TechSolutions Pvt Ltd"
    },
    {
      name: "Dr. Priya Patil",
      role: "Innovation Director, Jotiba Fule College",
      content: "This platform has revolutionized how we nurture student innovation. Our success rate has increased by 300%!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      company: "Jotiba Fule College"
    },
    {
      name: "Arjun Deshmukh",
      role: "Investment Manager, TechInnovate Hub",
      content: "We've discovered amazing talent through this platform. It's our go-to source for promising startups.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      company: "TechInnovate Hub"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const features = [
    {
      icon: FiZap,
      title: "Idea Incubation",
      description: "Transform your innovative ideas into successful startups with our comprehensive incubation program."
    },
    {
      icon: FiUsers,
      title: "Expert Mentorship",
      description: "Connect with industry experts, successful entrepreneurs, and experienced mentors."
    },
    {
      icon: FiTrendingUp,
      title: "Funding Support",
      description: "Access to investors, grants, and funding opportunities to fuel your startup journey."
    },
    {
      icon: FiTarget,
      title: "Market Access",
      description: "Get connected to potential customers, partners, and market opportunities."
    },
    {
      icon: FiBarChart2,
      title: "Analytics & Insights",
      description: "Data-driven insights to help you make informed decisions and track progress."
    },
    {
      icon: FiShield,
      title: "IP Protection",
      description: "Guidance on intellectual property protection and legal compliance."
    }
  ];

  const successStories = [
    {
      company: "AgriTech Solutions",
      founder: "Sneha Joshi",
      description: "Smart irrigation system helping farmers increase crop yield by 40%",
      valuation: "₹50 Cr",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"
    },
    {
      company: "HealthCare AI",
      founder: "Vikram Kulkarni",
      description: "AI-powered diagnostic tool for early disease detection",
      valuation: "₹75 Cr",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
    },
    {
      company: "EduTech Pro",
      founder: "Anita Desai",
      description: "Personalized learning platform for rural students",
      valuation: "₹30 Cr",
      category: "Education",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your
                <span className="text-yellow-300"> Ideas</span> Into
                <span className="text-green-300"> Unicorns</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-100">
                Maharashtra's premier innovation platform connecting students, colleges, and investors to build the next generation of successful startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                      <FiZap className="mr-2" size={20} />
                      Start Your Journey
                    </Link>
                    <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
                      <FiPlay className="mr-2" size={20} />
                      Watch Demo
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                    <FiArrowRight className="mr-2" size={20} />
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
                  alt="Innovation Team"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-yellow-400 to-pink-400 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary-50 dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                {stats.totalIdeas.toLocaleString()}+
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 font-medium">Ideas Submitted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                {stats.successfulStartups}+
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 font-medium">Successful Startups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                {stats.activeStudents.toLocaleString()}+
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 font-medium">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">
                {stats.partnerColleges}+
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 font-medium">Partner Colleges</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              Why Choose Innovation Hub?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              We provide everything you need to transform your innovative ideas into successful businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-8 rounded-2xl bg-secondary-50 dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-300">
                    <Icon className="text-primary-600 dark:text-primary-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Meet the unicorns that started their journey with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="group bg-white dark:bg-secondary-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.company}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                    {story.company}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    Founded by {story.founder}
                  </p>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {story.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {story.valuation}
                    </span>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">
                      Current Valuation
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Simple steps to transform your idea into a successful startup
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Your Idea",
                description: "Share your innovative idea with detailed documentation and business plan",
                icon: FiZap
              },
              {
                step: "02", 
                title: "College Review",
                description: "Your college reviews and endorses promising ideas for further evaluation",
                icon: FiCheckCircle
              },
              {
                step: "03",
                title: "Incubator Evaluation",
                description: "Industry experts evaluate your idea for market potential and investment",
                icon: FiTarget
              },
              {
                step: "04",
                title: "Launch & Scale",
                description: "Get funding, mentorship, and resources to build your unicorn startup",
                icon: FiAward
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Icon className="text-primary-600 dark:text-primary-400" size={32} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary-200 dark:bg-primary-800 -z-10"></div>
                  )}
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">
            What Our Community Says
          </h2>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
              <div className="flex items-center justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                />
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div>
                <div className="font-bold text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-primary-200">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-primary-300 text-sm">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your Unicorn?
          </h2>
          <p className="text-xl lg:text-2xl mb-8 text-primary-100">
            Join thousands of students who are already transforming their ideas into successful startups
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                  <FiZap className="mr-2" size={20} />
                  Get Started Today
                </Link>
                <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
                  Learn More
                </Link>
              </>
            ) : (
              <Link to="/submit-idea" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                <FiZap className="mr-2" size={20} />
                Submit Your Idea
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

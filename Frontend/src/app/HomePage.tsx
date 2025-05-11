import { useRef, useState } from "react";
import { Upload, UserCheck, Search, MapPin, CheckCircle, Users, Globe, Smartphone, ChevronRight, Shield, Camera, Clock, AlertTriangle, Building, User, Ticket } from 'lucide-react';
import CountUp from "../components/count-up";
import FeatureCard from "../components/feature-card";
import { TypeAnimation } from 'react-type-animation';
import Spline from '@splinetool/react-spline';
import AOS from 'aos';
import "../../node_modules/aos/dist/aos.css"
import { useEffect } from 'react';
import image1 from "../../public/image1.jpg"
import image2 from "../../public/image2.jpg"
import image3 from "../../public/image3.webp"
import howitswork from "../../public/howitswork.jpeg"




export default function HomePage() {
  // Dynamic: User role toggle
  const [role, setRole] = useState<'individual' | 'authority'>('individual');
  // Refs for smooth scroll
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation handler for routing
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  // Dynamic content for user roles
  const roleContent = {
    individual: (
      <>
        <h3 className="text-2xl font-semibold mb-6 text-blue-800">For Individuals & Families</h3>
        <ul className="space-y-5 text-lg">
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Report missing loved ones with photos and details</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Receive real-time notifications when matches are found</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Search the database of found individuals</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Create meeting points and safe zones at events</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Access via mobile app or web interface</li>
        </ul>
        <button   data-aos="fade-in" data-aos-delay="400"  className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => alert('Registration for Individuals coming soon!')}>
          Register as Individual <ChevronRight className="ml-3 h-5 w-5" />
        </button>
      </>
    ),
    authority: (
      <>
        <h3 className="text-2xl font-semibold mb-6 text-blue-800">For Authorities & Security</h3>
        <ul className="space-y-5 text-lg">
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Advanced search and monitoring capabilities</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />CCTV integration and real-time analysis</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Case management and coordination tools</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Priority alerts for vulnerable individuals</li>
          <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />Analytics and reporting dashboard</li>
        </ul>
        <button className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => alert('Registration for Authorities coming soon!')}>
          Register as Authority <ChevronRight className="ml-3 h-5 w-5" />
        </button>
      </>
    )
  };


  useEffect(() => {
    AOS.init({
      duration: 2000, 
      once: false,    
    });
  }, []);
  

  return (
    <main className="flex w-full min-h-screen flex-col bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] md:h-[100vh] flex items-center justify-center overflow-hidden shadow-lg group animate-fade-in">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Crowd with AI facial tracking overlay"
            className="object-cover w-full h-full scale-105 blur-sm brightness-75 transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
          />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/70 z-0">
  <Spline scene="https://prod.spline.design/N8Ig1Iw9PlzjhLzt/scene.splinecode" />
</div>  

        </div>
        <div className="container relative z-10 text-center px-4 flex flex-col items-center justify-center animate-fade-in-up py-12 md:py-0">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 md:mb-6 drop-shadow-2xl tracking-tight animate-slide-in-up" data-aos="fade-up" data-aos-delay="300">Dhruv AI</h1>
          <p className="text-base xs:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-6 md:mb-10 font-light animate-fade-in-up delay-100">
  <TypeAnimation
    sequence={[
      "Reuniting Lives, One Face at a Time.",
      1000,
      "AI-Powered Hope for the Lost and Found.",
      1000,
      "Where Technology Meets Humanity to Find the Missing.",
      1000,
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '1.125em', display: 'inline-block' }} // approx medium
    repeat={Infinity}
  />
</p>

          <p className="text-lg xs:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-6 md:mb-10 font-light animate-fade-in-up delay-100" data-aos="zoom-out" data-aos-delay="300">
            Using advanced facial recognition to find and reunite missing people in crowded events, public spaces, and emergency situations
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-none sm:flex-row sm:gap-4 justify-center animate-fade-in-up delay-200">
            <button className="px-6 py-4 sm:px-8 sm:py-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105 active:scale-95 transition-all rounded-xl text-base sm:text-xl font-semibold flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 group" onClick={() => handleNavigate('/find')} data-aos="slide-up" data-aos-delay="300">
              <Upload className="mr-3 h-6 w-6 group-hover:animate-bounce" /> Report Missing Person
            </button>
            <button className="px-6 py-4 sm:px-8 sm:py-4 text-white bg-transparent border-2 border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all rounded-xl text-base sm:text-xl font-semibold flex items-center justify-center shadow-xl focus:outline-none focus:ring-2 focus:ring-white group" onClick={() => handleNavigate('/find')} data-aos="slide-up" data-aos-delay="600">
              <Search className="mr-3 h-6 w-6 group-hover:animate-pulse"  /> Search Database
            </button>
            <button className="px-6 py-4 sm:px-8 sm:py-4 text-white bg-blue-700 hover:bg-blue-800 hover:scale-105 active:scale-95 transition-all rounded-xl text-base sm:text-xl font-semibold items-center shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 group hidden sm:inline-flex" onClick={() => handleNavigate('/how-it-works')} data-aos="slide-up" data-aos-delay="1200">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-10 sm:py-24 mx-auto bg-gradient-to-b from-white to-blue-50 border-b border-blue-100 animate-fade-in-up">
        <div className="container px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-blue-900 tracking-tight animate-slide-in-up" >Who Can Use Our Platform?</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto text-base sm:text-lg animate-fade-in-up">
            Our platform serves different user needs with tailored features and access levels
          </p>

          <div className="max-w-4xl mx-auto border rounded-3xl shadow-xl bg-white/90 backdrop-blur-lg" >
            <div className="grid grid-cols-2 border-b">
              <button className={`flex items-center justify-center text-lg py-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-tl-3xl ${role === 'individual' ? 'bg-blue-50 text-blue-700 shadow-inner' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setRole('individual')} >
                <User className="mr-2 h-6 w-6 transition-transform duration-300 group-hover:scale-110" /> Individuals & Families
              </button>
              <button className={`flex items-center justify-center text-lg py-5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-tr-3xl ${role === 'authority' ? 'bg-blue-50 text-blue-700 shadow-inner' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setRole('authority')} >
                <Shield className="mr-2 h-6 w-6 transition-transform duration-300 group-hover:scale-110" /> Authorities & Security
              </button>
            </div>
            <div className="p-6 sm:p-10 transition-all duration-300 min-h-[340px]" >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="animate-fade-in-up">{roleContent[role]}</div>
                <div className="relative flex justify-center"  data-aos="zoom-in" data-aos-delay='400'>
                  <img
                    src={`public/cctv.webp?text=${role === 'individual' ? 'public/facial_recognition.jpg' : 'Authority+Dashboard'}`}
                    alt={role === 'individual' ? 'Family app interface' : 'Authority dashboard'}
                    className="w-80 h-80 rounded-2xl shadow-2xl border-4 border-blue-100 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white p-4 rounded-full shadow-lg animate-bounce">
                    <Smartphone className="h-7 w-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where It Works */}
      <section className="py-10 sm:py-24 mx-auto bg-gradient-to-b from-blue-50 to-white animate-fade-in-up">
        <div className="container px-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-4 text-blue-900 tracking-tight animate-slide-in-up" >Where It Works</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto text-base sm:text-lg animate-fade-in-up">
            Our AI-powered platform is designed to work in various environments and situations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
  {[
    {
      title: "Large Events",
      description: "Concerts, festivals, sports events, and religious gatherings where people can easily get separated.",
      icon: <Ticket className="h-10 w-10 text-purple-500" />,
      color: "from-purple-100 to-purple-50",
    },
    {
      title: "Public Spaces",
      description: "Shopping malls, airports, train stations, and tourist attractions with high foot traffic.",
      icon: <Building className="h-10 w-10 text-blue-500" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Emergency Situations",
      description: "Natural disasters, evacuations, and other emergency scenarios where families may be separated.",
      icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      color: "from-red-100 to-red-50",
    },
  ].map((useCase, index) => (
    <div
      key={index}
      className={`relative rounded-3xl shadow-xl bg-gradient-to-br ${useCase.color} p-8 flex flex-col items-center text-center border border-blue-100 hover:shadow-2xl transition-all group`}
      data-aos="fade-up"
      data-aos-delay={`${index * 200}`} // Delay: 0ms, 200ms, 400ms
      data-aos-duration="800"
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6 border-2 border-blue-100 group-hover:scale-110 transition-transform">
        {useCase.icon}
      </div>
      <h3 className="text-2xl font-bold text-blue-900 mb-3">{useCase.title}</h3>
      <p className="text-gray-600 text-base mb-2">{useCase.description}</p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-blue-200 to-blue-100 rounded-b-3xl opacity-60 group-hover:opacity-90 transition-all"></div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howItWorksRef}
        className="py-10 sm:py-24 px-4 md:px-8 bg-white border-y border-blue-100 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <h2  className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-4 sm:mb-6 tracking-tight animate-slide-in-up">
            How It Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-8 sm:mb-16 animate-fade-in-up">
            Our platform uses advanced AI to quickly find and reunite missing people.
            Here’s how the process works step by step:
          </p>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
  {/* Step Timeline */}
  <ol className="flex-1 space-y-12 lg:space-y-8">
    {[ 
      {
        number: 1,
        title: "Report Missing Person",
        description:
          "Upload a clear photo and provide details about the missing person.",
        icon: <Upload className="w-8 h-8 text-blue-600" />,
        color: "bg-blue-50 border-blue-400",
      },
      {
        number: 2,
        title: "AI Processing",
        description:
          "Our AI analyzes the photo, extracts facial features, and creates a digital signature.",
        icon: <Search className="w-8 h-8 text-green-600" />,
        color: "bg-green-50 border-green-400",
      },
      {
        number: 3,
        title: "Real-time Scanning",
        description:
          "The system scans CCTV feeds and compares with the database to find matches.",
        icon: <Camera className="w-8 h-8 text-orange-500" />,
        color: "bg-orange-50 border-orange-400",
      },
      {
        number: 4,
        title: "Instant Notifications",
        description:
          "When a match is found, both the family and authorities receive alerts with location details.",
        icon: <Bell className="w-8 h-8 text-red-500" />,
        color: "bg-red-50 border-red-400",
      },
    ].map((step, idx) => (
      <li
        key={idx}
        className="flex items-start sm:items-center gap-6 group transition-transform duration-300"
        data-aos="fade-up"
        data-aos-delay={`${idx * 300}`} // Add a delay for each step (300ms delay for each step)
        data-aos-duration="800"
      >
        <div
          className={`w-16 h-16 min-w-[4rem] flex items-center justify-center rounded-full border-4 ${step.color} shadow-md group-hover:scale-105 transition-transform`}
          data-aos="zoom-in" // Zoom-in animation for the icon
          data-aos-duration="500"
        >
          {step.icon}
        </div>
        <div>
          <span className="text-sm font-semibold text-blue-700">
            Step {step.number}
          </span>
          <h4 className="text-xl font-semibold text-blue-900 mt-1 mb-1">
            {step.title}
          </h4>
          <p className="text-base text-gray-600 leading-relaxed">
            {step.description}
          </p>
        </div>
      </li>
    ))}
  </ol>

  {/* Visual Illustration */}
  <div
    className="w-full max-w-md mx-auto relative animate-fade-in-up"
    data-aos="zoom-out"
    data-aos-duration="800"
    data-aos-delay="400"
  >
    <img
      src="https://cdn.prod.website-files.com/624ac40503a527cf47af4192/6355c223cef916ae9a094a96_Implementing%20Computer%20Vision%20in%20Face%20Detection%20(1).png"
      alt="AI process visualization"
      className="rounded-2xl border-4 border-blue-100 shadow-xl w-full h-auto object-cover"
    />
    {/* Overlays */}
  </div>
</div>

        </div>
      </section>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
  {/* First 3 (already present) */}
  <div data-aos="zoom-in" className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up">
    <FeatureCard
      icon={<Clock className="h-10 w-10 group-hover:animate-spin-slow" />}
      title="Real-time Processing"
      description="Our system processes images and video feeds in real-time, providing immediate results"
    />
  </div>
  <div className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up" data-aos="zoom-out" data-aos-delay="400">
    <FeatureCard
      icon={<Globe className="h-10 w-10 group-hover:animate-bounce" />}
      title="Multi-location Support"
      description="Works across multiple locations simultaneously, ideal for large-scale events"
    />
  </div>
  <div className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up" data-aos="zoom-in" data-aos-delay="800">
    <FeatureCard
      icon={<Shield className="h-10 w-10 group-hover:animate-pulse" />}
      title="Privacy Protection"
      description="Advanced encryption and data protection to ensure personal information remains secure"
    />
  </div>

  {/* Remaining 3 (updated) */}
  <div className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up" data-aos="zoom-out" data-aos-delay="1200">
    <FeatureCard
      icon={<Smartphone className="h-10 w-10 group-hover:animate-bounce" />}
      title="Mobile Accessibility"
      description="Access the platform via mobile app or web interface from any device"
    />
  </div>
  <div className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up" data-aos="zoom-in" data-aos-delay="1600">
    <FeatureCard
      icon={<MapPin className="h-10 w-10 group-hover:animate-pulse" />}
      title="Location Tracking"
      description="Precise location information when matches are found to facilitate quick reunions"
    />
  </div>
  <div className="group hover:scale-105 transition-transform duration-300 animate-fade-in-up" data-aos="zoom-out" data-aos-delay="2000">
    <FeatureCard
      icon={<Users className="h-10 w-10 group-hover:animate-bounce" />}
      title="Role-based Access"
      description="Different access levels for individuals, event organizers, and authorities"
    />
  </div>
</div>


      {/* Success Stories */}
      <section ref={successStoriesRef} className="py-10 sm:py-24 mx-auto bg-gradient-to-b from-blue-50 to-white scroll-mt-24 animate-fade-in-up"  data-offset='1000'>
        <div className="container px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4 text-blue-900 tracking-tight animate-slide-in-up">Success Stories</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto text-base sm:text-lg animate-fade-in-up">
            Real stories of people who were reunited through our platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8 sm:mb-12" >
            {/* Redesigned Testimonial Cards with consistent placeholder image */}
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border hover:shadow-2xl transition-all animate-fade-in-up" data-aos="zoom-in" >
              <img src={image1} alt="The Johnson Family" className="w-24 h-24 object-contain rounded-full mb-4 border-4 border-blue-100 " />
              <h3 className="font-semibold text-lg text-blue-800 mb-2">The Johnson Family</h3>
              <p className="text-gray-600 text-base mb-2">"Our 7-year-old son wandered off at a music festival. Within 30 minutes of reporting, we received a notification that he was found at the first aid tent."</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border hover:shadow-2xl transition-all animate-fade-in-up" data-aos="zoom-out" data-aos-delay="400">
              <img src={image2} alt="Maria & Her Mother" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-100 object-contain" />
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Maria & Her Mother</h3>
              <p className="text-gray-600 text-base mb-2">"I lost track of my elderly mother at the shopping mall. The security team used the platform and found her within minutes."</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border hover:shadow-2xl transition-all animate-fade-in-up" data-aos="zoom-in">
              <img src={image3} alt="The Smith Brothers" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-100 object-contain" />
              <h3 className="font-semibold text-lg text-blue-800 mb-2">The Smith Brothers</h3>
              <p className="text-gray-600 text-base mb-2">"After getting separated during an emergency evacuation, we were reunited thanks to the quick response of the authorities using this system."</p>
            </div>
          </div>

          <div className="text-center animate-fade-in-up" data-aos='fade'>
            <div className="max-w-2xl mx-auto bg-gray-50 p-6 sm:p-10 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-6 md:mb-8">
                {[
                  { value: 1250, label: "People Found", icon: <UserCheck className="h-6 w-6 text-green-500" /> },
                  { value: 95, label: "Success Rate %", icon: <CheckCircle className="h-6 w-6 text-blue-500" /> },
                  { value: 42, label: "Partner Venues", icon: <Building className="h-6 w-6 text-purple-500" /> },
                  { value: 8, label: "Avg. Minutes", icon: <Clock className="h-6 w-6 text-orange-500" /> },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                    <CountUp end={stat.value} className="text-2xl font-bold" />
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => scrollToSection(howItWorksRef)}>
                View More Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex items-center justify-center py-10 sm:py-16 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white animate-fade-in-up">
        <div className="container px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-8 drop-shadow-2xl tracking-tight animate-slide-in-up">
        Ready to Implement Our Solution?
          </h2>
          <p className="mb-6 sm:mb-12 max-w-2xl mx-auto text-base sm:text-lg font-light animate-fade-in-up">
        Whether you're an individual, event organizer, or security professional, our platform can help you find and reunite missing people quickly and efficiently.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8 justify-center animate-fade-in-up w-full max-w-md mx-auto">
        <button 
          className="w-full sm:w-auto px-8 py-5 bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 active:scale-95 rounded-2xl text-lg sm:text-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all flex items-center justify-center gap-2"
          onClick={() => alert('Registration coming soon!')}
          type="button"
        >
          <Smartphone className="h-6 w-6 sm:h-7 sm:w-7"  /> Register Now
        </button>
        <button  
          className="w-full sm:w-auto px-8 py-5 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:scale-105 active:scale-95 rounded-2xl text-lg sm:text-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-white transition-all flex items-center justify-center gap-2"
          onClick={() => alert('Demo request coming soon!')}
          type="button"
        >
          <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" /> Request Demo
        </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

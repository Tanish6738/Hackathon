import { Upload, UserCheck, Camera, Search, MapPin, AlertTriangle, Rss, Brain, Heart, Users, Shield, Clock, Building, Globe, CheckCircle, Code } from 'lucide-react';
import { useEffect } from 'react';
import AOS from "aos"
import face from "../../public/facial_recognition.jpg"
export default function AboutPage() {


   useEffect(() => {
      AOS.init({
        duration: 2000, 
        once: false,    
      });
    }, []);
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[50vh] md:min-h-[60vh] overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="absolute inset-0 w-full h-full min-h-[300px] min-w-[300px]">
          <img
            src="https://media.istockphoto.com/id/1253430957/photo/professional-developer-programmer-cooperation-meeting-and-brainstorming-and-programming-in.jpg?s=612x612&w=0&k=20&c=r9rh8lDaU8AFr2MNvo8FfOXOXS8P6_6uxKcz2F-UceY="
            alt="People in crowd"
            className="w-full h-full object-cover z-0 opacity-60"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 md:py-24 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">About Our Platform</h1>
          <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto font-medium drop-shadow">Using AI technology to find and reunite missing people anywhere</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 md:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="flex-1 order-2 md:order-1" data-aos="fade"  data-aos-offset="200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4"  >Our Mission</h2>
            <p className="text-base md:text-lg mb-4 text-gray-700">
              At Lost Found AI, our mission is to leverage cutting-edge facial recognition technology to help reunite missing people with their families and friends in any situation where separation occurs.
            </p>
            <p className="text-base md:text-lg mb-4 text-gray-700">
              Whether it's a child lost at a crowded event, an elderly person who has wandered off, or family members separated during an emergency, our platform provides a fast, accessible solution that works across language barriers and technological literacy levels.
            </p>
            <div className="flex items-center mt-6" >
              <span className="mr-3 bg-blue-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-blue-600" />
              </span>
              <span className="font-medium text-blue-700">Reuniting people, reducing anxiety, restoring peace of mind</span>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 flex justify-center" data-aos="zoom-in"   data-aos-offset="200"
          >
            <div className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <img
                src={face}
                alt="AI facial recognition illustration"
                className="w-full h-full object-cover rounded-xl shadow-xl border border-blue-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" >
      What We Do
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Upload Photos",
          description:
            "Users can upload photos of missing persons through our app, website, or at designated kiosks",
          icon: <Upload className="h-10 w-10 text-blue-500" />,
        },
        {
          title: "Find Matches",
          description:
            "Our AI system scans uploaded photos against our database of found individuals",
          icon: <UserCheck className="h-10 w-10 text-green-500" />,
        },
        {
          title: "Monitor CCTV",
          description:
            "We analyze security camera footage to identify missing persons in real-time",
          icon: <Camera className="h-10 w-10 text-orange-500" />,
        },
        {
          title: "Reunite People",
          description:
            "We coordinate with authorities and users to safely reunite missing individuals",
          icon: <Search className="h-10 w-10 text-purple-500" />,
        },
      ].map((item, index) => (
        <div
          key={index}
          data-aos={index % 2 === 0 ? "zoom-in" : "zoom-out"}
          data-aos-delay={index * 400}
          className="border rounded-lg bg-white p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="mb-4 flex justify-center">{item.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Technology Integration */}
      <section className="py-12 md:py-20 bg-blue-800 text-white border-b border-blue-900">
  <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
    
    {/* Image with bounding boxes */}
    <div
      className="flex-1 relative mb-8 md:mb-0"
      data-aos="zoom-in"
      data-aos-offset="500"
    >
      <div className="w-full h-64 md:h-96 relative">
        <img
          src="https://cdn.prod.website-files.com/624ac40503a527cf47af4192/6355c223cef916ae9a094a96_Implementing%20Computer%20Vision%20in%20Face%20Detection%20(1).png"
          alt="CCTV footage with facial recognition"
          className="w-full h-full object-cover rounded-xl shadow-lg border border-blue-900"
        />
      
      </div>
    </div>

    {/* Text content */}
    <div
      className="flex-1"
      data-aos="fade"
      data-aos-offset="500"
    >
      <h3 className="text-2xl font-semibold mb-6">Seamless Integration with Existing Systems</h3>
      <ul className="space-y-4">
        {[
          {
            icon: <Camera className="h-5 w-5" />,
            text: "Connects to security cameras and CCTV systems in public spaces, venues, and events",
          },
          {
            icon: <AlertTriangle className="h-5 w-5" />,
            text: "Real-time alerts to authorities when vulnerable individuals (elderly, children) are identified",
          },
          {
            icon: <MapPin className="h-5 w-5" />,
            text: "Geolocation tagging for precise coordination with security teams",
          },
          {
            icon: <Bell className="h-5 w-5" />,
            text: "Instant notifications to registered users when matches are found",
          },
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-4 bg-white/20 p-2 rounded-full flex-shrink-0">{item.icon}</div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <button className="mt-8 bg-white text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-md font-semibold shadow transition">
        Learn About Our Technology
      </button>
    </div>
  </div>
</section>


      {/* How It Works */}
      <section className="py-12 md:py-20 bg-white border-b border-gray-100">
  <div className="container mx-auto px-4">
    <h2
      className="text-2xl md:text-3xl font-bold text-center mb-10"
    
    >
      How It Works
    </h2>
    <div className="max-w-3xl mx-auto flex flex-col gap-12">
      {[
        {
          step: 1,
          title: "Upload Photo",
          description:
            "Users upload a clear photo of the missing person through our app, website, or at designated kiosks.",
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          color: "bg-blue-100 border-blue-400",
        },
        {
          step: 2,
          title: "Face Detection",
          description:
            "Our AI system analyzes the photo, extracts facial features, and creates a unique digital signature.",
          icon: <Search className="h-6 w-6 text-green-500" />,
          color: "bg-green-100 border-green-400",
        },
        {
          step: 3,
          title: "Continuous Scanning",
          description:
            "The system continuously scans CCTV feeds and compares with uploaded photos in real-time to find potential matches.",
          icon: <Rss className="h-6 w-6 text-orange-500" />,
          color: "bg-orange-100 border-orange-400",
        },
        {
          step: 4,
          title: "Notification",
          description:
            "When a match is found, both the user and relevant authorities receive instant notifications with location details.",
          icon: <Bell className="h-6 w-6 text-red-500" />,
          color: "bg-red-100 border-red-400",
        },
      ].map((step, index) => (
        <div
          key={index}
          className="flex gap-6"
          data-aos="fade-up"
          data-aos-delay={`${index * 300}`}
          data-aos-duration="800"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${step.color} shadow-md`}
              data-aos="zoom-in"
              data-aos-duration="600"
            >
              <span className="text-lg font-semibold text-blue-800">
                {step.step}
              </span>
            </div>
            {index < 3 && <div className="w-0.5 h-12 bg-blue-200 mt-2"></div>}
          </div>
          <div className="pt-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              {step.title}
              <span className="ml-2">{step.icon}</span>
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* User Roles */}
      <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" >User Roles & Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg bg-white hover:shadow-lg transition-all" data-aos="fade" data-aos-offset="400">
              <div className="p-6">
                <div className="flex items-center mb-4" >
                  <div className="bg-blue-100 p-3 rounded-full mr-4" >
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Individual Users</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Report missing persons with photos and details",
                    "Receive notifications when matches are found",
                    "Access to basic search functionality",
                    "Create meeting points for family members",
                    "View public safety announcements",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium">Register as Individual</button>
              </div>
            </div>

            <div className="border rounded-lg bg-white hover:shadow-lg transition-all" data-aos="fade" data-aos-offset="400" data-aos-delay="300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Security & Authorities</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Advanced search and monitoring capabilities",
                    "CCTV integration and real-time analysis",
                    "Case management and coordination tools",
                    "Priority alerts for vulnerable individuals",
                    "Analytics and reporting dashboard",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium">Register as Authority</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-12 md:py-20 bg-white border-b border-gray-100">
  <div className="container mx-auto px-4">
    <h2
      className="text-2xl md:text-3xl font-bold text-center mb-10"
      
    >
      Technologies Used
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          name: "Advanced AI",
          description:
            "State-of-the-art facial recognition algorithms with high accuracy in diverse conditions",
          icon: <Brain className="h-10 w-10 text-blue-500" />,
        },
        {
          name: "Real-time API",
          description:
            "High-performance backend for processing requests and managing data instantly",
          icon: <LightningBolt className="h-10 w-10 text-green-500" />,
        },
        {
          name: "Computer Vision",
          description:
            "Advanced image processing and facial recognition capabilities",
          icon: <Camera className="h-10 w-10 text-orange-500" />,
        },
        {
          name: "Secure Cloud",
          description:
            "Scalable cloud infrastructure to handle millions of comparisons per minute",
          icon: <Code className="h-10 w-10 text-purple-500" />,
        },
      ].map((tech, index) => (
        <div
          key={index}
          className="border rounded-lg bg-white p-6 text-center hover:shadow-lg transition-all group"
          data-aos="fade-up"
          data-aos-delay={`${index * 200}`}
          data-aos-duration="800"
        >
          <div
            className="mb-4 flex justify-center"
            data-aos="zoom-in"
            data-aos-duration="600"
          >
            {tech.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
          <p className="text-gray-600">{tech.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Why This Matters */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white border-b border-blue-900" data-aos="fade">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why This Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Time is Critical",
                description:
                  "In missing person situations, every minute counts. Our technology reduces search time from hours to minutes.",
                icon: <Clock className="h-10 w-10" />,
              },
              {
                title: "Scale & Efficiency",
                description:
                  "In crowded environments, manual searching is ineffective. AI can process thousands of faces simultaneously.",
                icon: <Brain className="h-10 w-10" />,
              },
              {
                title: "Universal Access",
                description:
                  "Our platform is designed to be accessible to all, regardless of technological literacy or language barriers.",
                icon: <Globe className="h-10 w-10" />,
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border-0 rounded-lg p-6 text-center">
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-12 md:py-20 bg-orange-500 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl md:text-4xl font-bold mb-4">Join Our Network</h2>
    <p className="mb-8 max-w-2xl mx-auto text-base md:text-lg">
      Whether you're an individual, venue operator, event organizer, or security professional, our platform can help you find and reunite missing people
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        className="bg-white text-orange-600 hover:bg-orange-100 hover:scale-105 transition px-6 py-2 rounded-md text-lg font-semibold flex items-center shadow"
       
      >
        <Users className="mr-2 h-5 w-5" /> Register Now
      </button>
      <button
        className="bg-transparent border border-white text-white hover:bg-white/10 hover:scale-105 transition px-6 py-2 rounded-md text-lg font-semibold flex items-center"
       
      >
        <Building className="mr-2 h-5 w-5" /> Partner With Us
      </button>
    </div>
  </div>
</section>

    </main>
  );
}

function User(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
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

function LightningBolt(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

import { Upload, Search, Camera, Bell, Clock, Shield, Globe, Users } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Upload Photo',
    description: 'Upload a clear photo and provide details about the missing person via app, web, or kiosk.',
    icon: <Upload className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-50 border-blue-400',
  },
  {
    number: 2,
    title: 'AI Analysis',
    description: 'Our AI analyzes the photo, extracts facial features, and creates a digital signature.',
    icon: <Search className="w-8 h-8 text-green-600" />,
    color: 'bg-green-50 border-green-400',
  },
  {
    number: 3,
    title: 'Real-time Scanning',
    description: 'The system scans CCTV feeds and compares with the database to find matches.',
    icon: <Camera className="w-8 h-8 text-orange-500" />,
    color: 'bg-orange-50 border-orange-400',
  },
  {
    number: 4,
    title: 'Instant Notification',
    description: 'When a match is found, both the family and authorities receive alerts with location details.',
    icon: <Bell className="w-8 h-8 text-red-500" />,
    color: 'bg-red-50 border-red-400',
  },
];

const benefits = [
  {
    title: 'Fast & Accurate',
    description: 'AI reduces search time from hours to minutes, increasing the chance of a safe reunion.',
    icon: <Clock className="h-8 w-8 text-white" />,
  },
  {
    title: 'Privacy & Security',
    description: 'Advanced encryption and strict access controls keep your data safe.',
    icon: <Shield className="h-8 w-8 text-white" />,
  },
  {
    title: 'Global Access',
    description: 'Accessible via web, app, or kiosk—no language or tech barriers.',
    icon: <Globe className="h-8 w-8 text-white" />,
  },
  {
    title: 'Community Network',
    description: 'Works with individuals, families, venues, and authorities for maximum reach.',
    icon: <Users className="h-8 w-8 text-white" />,
  },
];


const HowItWorkPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100">
    {/* Hero Section */}
    <section className="relative min-h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden">
      <img
        src="https://st2.depositphotos.com/3889193/8014/i/450/depositphotos_80147336-stock-photo-business-teamwork.jpg"
        alt="How it works hero"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 z-0"
      />
      <div className="absolute inset-0 bg-blue-900/70 z-0" />
      <div
        className="relative z-10 text-center px-4 py-10 md:py-0 max-w-2xl mx-auto"
      
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          How It Works
        </h1>
        <p
          className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover how our AI-powered platform reunites missing people quickly and securely
        </p>
      </div>
    </section>
  
    {/* Step Timeline */}
    <section className="py-10 sm:py-20 px-2 sm:px-4 bg-white border-b border-blue-100 w-full">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-blue-900" data-aos="fade-up">
          Step-by-Step Process
        </h2>
        <ol className="space-y-8 sm:space-y-12">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 min-w-[3.5rem] sm:min-w-[4rem] flex items-center justify-center rounded-full border-4 ${step.color} shadow-md group-hover:scale-105 transition-transform mb-2 sm:mb-0`}
              >
                {step.icon}
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-700">Step {step.number}</span>
                <h4 className="text-lg sm:text-xl font-semibold text-blue-900 mt-1 mb-1">{step.title}</h4>
                <p className="text-base text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  
    {/* Benefits Section */}
    <section className="flex items-center justify-center py-10 sm:py-20 w-full mx-auto bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <div className="container px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" >
          Why It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg hover:scale-105 transition-transform"
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-blue-100 text-sm sm:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  
    {/* CTA Section */}
    <section className="w-full flex items-center justify-center py-10 sm:py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container px-2 sm:px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" >Ready to Get Started?</h2>
        <p
          className="mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join our network and help reunite missing people. Whether you’re an individual, family, or authority, our platform is here for you.
        </p>
        <button
          className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all px-8 py-4 rounded-xl text-lg font-semibold flex items-center mx-auto"
         
        >
          <Upload className="mr-2 h-6 w-6" /> Report or Search Now
        </button>
      </div>
    </section>
  </main>
  
  );
};

export default HowItWorkPage;
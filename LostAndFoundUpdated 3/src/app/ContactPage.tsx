import { Mail, Phone, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import AOS from "aos"

const ContactPage = () => {
  
     useEffect(() => {
        AOS.init({
          duration: 2000, 
          once: false,    
        });
      }, []);
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative pt-10 min-h-[30vh] w-full flex items-center justify-center overflow-hidden">
        <img
          src="https://t4.ftcdn.net/jpg/04/03/23/45/360_F_403234519_pnvAvuAdxGwRppiYULdi2O12ZKCVxckc.jpg"
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 z-0"
        />
        <div className="absolute inset-0 bg-blue-900/70 z-0" />
        <div className="relative z-10 text-center px-4 py-10 md:py-0 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg" >Get in Touch</h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
            Have questions about Lost and Found Sahayak? We're here to help. Fill out the form and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-10 sm:py-20 px-2 sm:px-4 bg-white border-b border-blue-100 w-full">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <div className="flex flex-col justify-center p-6 sm:p-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-sm mb-6 md:mb-0" data-aos="zoom-in">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h2>
            <ul className="space-y-6 text-base">
              <li className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-blue-800">Email</span>
                  <div className="text-gray-700 break-all">kodrishsolutions.com</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-blue-800">Phone</span>
                  <div className="text-gray-700">+91 7067954499</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-blue-800">Address</span>
                  <div className="text-gray-700">
                    Indore Madhya Pradesh<br />
                    India
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center bg-blue-50 rounded-2xl p-8 shadow-md border border-blue-100 text-center" data-aos="zoom-in" data-aos-delay="300"> 
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Connect With Us</h3>
            <img src="https://www.kodrish.me/kodrish-logo.png" alt="Kodrish Logo" className="w-20 h-20 mb-4 rounded-full border border-blue-200 bg-white object-contain" />
            <div className="text-blue-800 font-semibold mb-1">Powered by Kodrish Innovation & Solution LLP</div>
            <div className="text-gray-700 text-center text-sm">For Web Development, AI/ML & Project Solutions</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
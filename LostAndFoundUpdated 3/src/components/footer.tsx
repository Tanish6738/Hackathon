import { Button } from "./ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Lost Found AI</h3>
            <p className="mb-4">Using AI technology to reunite families and friends at Kumbh Mela 2025.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "How It Works", href: "#how-it-works" },
                { name: "Volunteer", href: "#volunteer" },
                { name: "FAQ", href: "#faq" },
                { name: "Privacy Policy", href: "#privacy" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Kumbh Mela Office, Prayagraj, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@kumbhconnect.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Subscribe</h3>
            <p className="mb-4">Stay updated with our latest news and announcements.</p>
            <div className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email address" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Lost Found AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

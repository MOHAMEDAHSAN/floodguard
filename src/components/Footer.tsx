import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-12 mt-auto relative dark:bg-black dark:text-primary transition-colors duration-500">
      {/* Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-light transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link to="/chatbot" className="hover:text-primary-light transition-colors">Chatbot</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Team GeoDevs</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Abishai K C</p>
                <p className="text-sm text-gray-300">Team Leader</p>
                <div className="flex space-x-2 mt-2">
                  <a href="https://github.com/Abishai95141" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/abishai-k-c-6a5288271/" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <p className="font-semibold">S Mohamed Ahsan</p>
                <p className="text-sm text-gray-300">Team Member</p>
                <div className="flex space-x-2 mt-2">
                  <a href="https://github.com/MOHAMEDAHSAN" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/mohamedahsan037/" target="_blank" rel="noopener noreferrer" 
                     className="hover:text-primary-light transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:abishaioff@gmail.com" className="hover:text-primary-light transition-colors">
                  abishaioff@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:ahsansaleem2006@gmail.com" className="hover:text-primary-light transition-colors">
                  ahsansaleem2006@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:8667331224" className="hover:text-primary-light transition-colors">
                  +91 8667331224
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:9884261429" className="hover:text-primary-light transition-colors">
                  +91 9884261429
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Institution</h3>
            <div className="space-y-2">
              <p>Saveetha Engineering College</p>
              <p className="text-sm text-gray-300">BTech AIML - Semester III</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © 2024 GeoDevs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

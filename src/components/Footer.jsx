import React from "react";
import { FiTwitter, FiLinkedin, FiGithub, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Pricing", "Demo", "FAQ"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Services: ["Printing", "Food Delivery", "Recruitment", "Real Estate"],
    Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
  };

  const socialLinks = [
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiMail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-[#0A192F] border-t border-white/10 pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#FFD60A] rounded-lg flex items-center justify-center">
                <span className="text-[#0A192F] font-bold text-xl">U</span>
              </div>
              <span className="text-2xl font-bold text-white">Unifyr</span>
            </div>
            <p className="text-white/60 mb-4 max-w-sm">
              Unifying all your business services under one powerful digital
              platform. Stop outsourcing, start controlling.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FFD60A] text-white hover:text-[#0A192F] flex items-center justify-center transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-[#FFD60A] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Unifyr. All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Built with ❤️ for modern businesses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

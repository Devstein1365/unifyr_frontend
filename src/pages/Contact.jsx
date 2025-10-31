import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiClock,
} from "react-icons/fi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "demo", label: "Request Demo" },
    { value: "other", label: "Other" },
  ];

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email Us",
      value: "hello@unifyr.com",
      link: "mailto:hello@unifyr.com",
    },
    {
      icon: FiPhone,
      label: "Call Us",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: FiMapPin,
      label: "Visit Us",
      value: "123 Business Street, Tech City, TC 12345",
      link: "#",
    },
    {
      icon: FiClock,
      label: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: FiLinkedin, label: "LinkedIn", href: "#" },
    { icon: FiTwitter, label: "Twitter", href: "#" },
    { icon: FiInstagram, label: "Instagram", href: "#" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send data to backend
    console.log("Contact form submitted:", formData);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-[#FFD60A]">Touch</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                variant="glass"
                className="hover:border-[#FFD60A]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FFD60A]/20 text-[#FFD60A] flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {info.label}
                    </h3>
                    {info.link !== "#" ? (
                      <a
                        href={info.link}
                        className="text-white/70 text-sm hover:text-[#FFD60A] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/70 text-sm">{info.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card variant="glass">
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-lg bg-white/10 hover:bg-[#FFD60A] text-white hover:text-[#0A192F] flex items-center justify-center transition-all hover:scale-110"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </Card>

            {/* Quick Response Card */}
            <Card
              variant="glass"
              className="bg-[#FFD60A]/10 border-[#FFD60A]/30"
            >
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <FiClock className="text-[#FFD60A]" />
                Quick Response
              </h3>
              <p className="text-white/70 text-sm">
                We typically respond within 24 hours during business days.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card variant="glass">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Send Us a Message
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />

                      <Select
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        options={subjectOptions}
                        placeholder="Select a subject"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/90">
                        Message <span className="text-[#FFD60A]">*</span>
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        required
                        className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] transition-all resize-none"
                      />
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Send Message
                      <FiSend />
                    </Button>

                    <p className="text-white/50 text-xs text-center">
                      By submitting this form, you agree to our privacy policy
                      and terms of service.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#FFD60A]/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <FiSend className="text-[#FFD60A]" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-white/70 mb-2">
                    Thank you for reaching out, {formData.name}!
                  </p>
                  <p className="text-white/60 text-sm">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              )}
            </Card>

            {/* Map Placeholder */}
            <Card
              variant="glass"
              className="mt-6 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <FiMapPin className="text-[#FFD60A] mx-auto mb-4" size={48} />
                <p className="text-white/70">Interactive Map Coming Soon</p>
                <p className="text-white/50 text-sm mt-2">
                  123 Business Street, Tech City
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

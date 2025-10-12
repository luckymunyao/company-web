import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Managed IT Services',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Here you would typically send the data to a server
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-indigo-600">Thank You!</h2>
            <p className="text-lg text-slate-600 mt-4">Your message has been sent. We will get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-lg text-slate-600 mt-4">
              Have a question or a project in mind? We'd love to hear from you.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"/>
              </div>
            </div>
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Service of Interest</label>
                <div className="relative">
                    <select name="service" id="service" value={formData.service} onChange={handleChange} className="w-full appearance-none bg-white px-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition">
                        <option>Managed IT Services</option>
                        <option>Cybersecurity Solutions</option>
                        <option>Networking Solutions</option>
                        <option>Software Development</option>
                        <option>Software Installation & Repair</option>
                        <option>Digital Marketing</option>
                        <option>Social Media Management</option>
                        <option>Data Analysis & Insights</option>
                        <option>FinTech Solutions</option>
                        <option>Expert Consulting</option>
                        <option>Personalized Tutoring</option>
                        <option>Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition resize-y"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
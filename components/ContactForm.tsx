import React, { useState, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import UploadIcon from './icons/UploadIcon';
import PhoneIcon from './icons/PhoneIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const serviceOptions = [
    'Managed IT Services',
    'Cloud Services',
    'Cybersecurity Solutions',
    'Networking Solutions',
    'Software Development',
    'UI/UX Design',
    'AI & Machine Learning',
    'Blockchain Solutions',
    'Digital Marketing',
    'Social Media Management',
    'Data Analysis & Insights',
    'Expert Consulting',
    'Personalized Tutoring',
    'Software Installation & Repair',
    'FinTech Solutions',
    'Other',
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Managed IT Services',
    message: '',
    attachment: null as File | null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    const checkHash = () => {
        const hash = window.location.hash;
        if (hash.includes('?service=')) {
            const serviceParam = hash.split('?service=')[1];
            if (serviceParam) {
                const decodedService = decodeURIComponent(serviceParam.replace(/\+/g, ' '));
                if (serviceOptions.includes(decodedService)) {
                    setFormData(prev => ({ ...prev, service: decodedService }));
                }
            }
        }
    };

    checkHash(); // Check on initial mount
    window.addEventListener('hashchange', checkHash, false);

    return () => {
        window.removeEventListener('hashchange', checkHash, false);
    };
  }, []); // Empty dependency array ensures this effect runs only once to set up the listener

  const validateField = (name: keyof typeof formData, value: any) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Full Name is required.';
        else if (value.length < 2) error = 'Full Name must be at least 2 characters.';
        break;
      case 'email':
        if (!value) error = 'Email Address is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email address is invalid.';
        break;
      case 'message':
        if (!value) error = 'Message is required.';
        else if (value.length < 10) error = 'Message must be at least 10 characters long.';
        break;
      case 'attachment':
        if (value) {
          const file = value as File;
          const MAX_SIZE = 10 * 1024 * 1024; // 10MB
          const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
          if (file.size > MAX_SIZE) error = "File is too large (max 10MB).";
          else if (!ALLOWED_TYPES.includes(file.type)) error = "Invalid file type (PDF, DOCX, PNG, JPG).";
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;

    if (type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        const file = files ? files[0] : null;
        setFormData(prevState => ({ ...prevState, [name]: file }));
        validateField(name as keyof typeof formData, file);
    } else {
        setFormData(prevState => ({ ...prevState, [name]: value }));
        // Clear error on change for better UX, validation happens on blur
        if (errors[name as keyof typeof formData]) {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof typeof formData, value);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        const file = files[0];
        setFormData(prevState => ({ ...prevState, attachment: file }));
        validateField('attachment', file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const nameIsValid = validateField('name', formData.name);
    const emailIsValid = validateField('email', formData.email);
    const messageIsValid = validateField('message', formData.message);
    const attachmentIsValid = validateField('attachment', formData.attachment);

    if (nameIsValid && emailIsValid && messageIsValid && attachmentIsValid) {
      const submissionData = {
          ...formData,
          attachment: formData.attachment ? formData.attachment.name : 'No file attached',
      };
      console.log('Form submitted:', submissionData);
      setSubmitted(true);
      // Here you would typically send the data to a server
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Thank You!</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">Your message has been sent. We will get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
              Have a question or a project in mind? We'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-slate-600 dark:text-slate-400">
                <a href="tel:+254798996332" className="flex items-center gap-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-lg">
                    <PhoneIcon />
                    <span className="font-semibold">+254 798 996332</span>
                </a>
                <a href="https://wa.me/254798996332" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 text-lg">
                    <WhatsAppIcon />
                    <span className="font-semibold">Message on WhatsApp</span>
                </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                 {errors.email && <p id="email-error" className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service of Interest</label>
                <div className="relative">
                    <select name="service" id="service" value={formData.service} onChange={handleChange} className="w-full appearance-none bg-white dark:bg-slate-700 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-white">
                        {serviceOptions.map(option => (
                          <option key={option}>{option}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea 
                    name="message" 
                    id="message" 
                    rows={5} 
                    required 
                    value={formData.message} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition resize-y dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && <p id="message-error" className="text-sm text-red-500 mt-1">{errors.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Attach Resume/Portfolio (Optional)
              </label>
              <div 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${
                    errors.attachment 
                        ? 'border-red-500' 
                        : isDraggingOver 
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                            : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                <div className="space-y-2 text-center">
                    {errors.attachment ? (
                        <XCircleIcon />
                    ) : formData.attachment ? (
                        <CheckCircleIcon />
                    ) : (
                        <UploadIcon />
                    )}

                    <div className="flex justify-center text-sm text-slate-600 dark:text-slate-400">
                        <label htmlFor="attachment" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800 focus-within:ring-indigo-500">
                        <span>{formData.attachment ? 'Change file' : 'Upload a file'}</span>
                        <input id="attachment" name="attachment" type="file" className="sr-only" onChange={handleChange} aria-describedby={errors.attachment ? 'attachment-error' : undefined}/>
                        </label>
                        {!formData.attachment && <p className="pl-1">or drag and drop</p>}
                    </div>
                    
                    {errors.attachment ? (
                        <p id="attachment-error" className="text-sm text-red-500">{errors.attachment}</p>
                    ) : formData.attachment ? (
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 break-all px-2">
                            {formData.attachment.name}
                        </p>
                    ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            PDF, DOCX, PNG, JPG up to 10MB
                        </p>
                    )}
                </div>
              </div>
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
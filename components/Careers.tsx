import React, { useState, useRef, useEffect } from 'react';
import type { JobOpening } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import UploadIcon from './icons/UploadIcon';
import SpinnerIcon from './icons/SpinnerIcon';

const jobOpenings: JobOpening[] = [
  {
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'We are looking for an experienced Frontend Engineer to build and maintain our client-facing applications using React, TypeScript, and Tailwind CSS.'
  },
  {
    title: 'Cybersecurity Analyst',
    location: 'New York, NY',
    type: 'Full-time',
    department: 'Support',
    description: 'Join our security team to monitor, detect, and respond to cybersecurity threats, helping protect our clients\' valuable assets.'
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'Remote',
    type: 'Contract',
    department: 'Marketing',
    description: 'Drive our clients\' growth by developing and executing data-driven digital marketing campaigns across various channels.'
  },
  {
    title: 'IT Support Technician',
    location: 'Austin, TX',
    type: 'Full-time',
    department: 'Support',
    description: 'Provide exceptional technical support to our managed services clients, troubleshooting hardware and software issues with a customer-first mindset.'
  }
];

const ApplicationForm: React.FC<{ selectedJob: string, formRef: React.RefObject<HTMLDivElement> }> = ({ selectedJob, formRef }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        resume: null as File | null,
        coverLetter: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    useEffect(() => {
        if (selectedJob) {
            setFormData(prev => ({ ...prev, jobTitle: selectedJob }));
        }
    }, [selectedJob]);

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
            case 'jobTitle':
                if (!value) error = 'Please select the job you are applying for.';
                break;
            case 'resume':
                if (!value) {
                    error = 'A resume is required.';
                } else {
                    const file = value as File;
                    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
                    const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (file.size > MAX_SIZE) error = "File is too large (max 5MB).";
                    else if (!ALLOWED_TYPES.includes(file.type)) error = "Invalid file type (PDF, DOCX only).";
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
            if (errors[name as keyof typeof formData]) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            setFormData(prevState => ({ ...prevState, resume: file }));
            validateField('resume', file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError('');
        const isValid = Object.keys(formData).every(key => {
            const field = key as keyof typeof formData;
            // Phone and cover letter are optional
            if (field === 'phone' || field === 'coverLetter') return true;
            return validateField(field, formData[field]);
        });

        if (isValid) {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (formData.email.includes('error@')) {
                            reject(new Error('There was a problem with our server. Please try again.'));
                        } else {
                            const submissionData = {
                                ...formData,
                                resume: formData.resume ? formData.resume.name : 'No file',
                            };
                            console.log('Application submitted:', submissionData);
                            console.log(`Simulating sending confirmation email to ${formData.email}...`);
                            resolve('Success');
                        }
                    }, 2000);
                });
                setSubmitted(true);
            } catch (error) {
                setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            console.log('Application submission failed due to validation errors.');
        }
    };

    if (submitted) {
        return (
            <div ref={formRef} id="application-form" className="mt-16 text-center bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg">
                <CheckCircleIcon />
                <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-4">Application Sent!</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Thank you for your interest in AbilityTech. We have received your application and sent a confirmation to your email address. We will be in touch if your qualifications match our needs.</p>
            </div>
        );
    }

    return (
        <div ref={formRef} id="application-form" className="mt-16 scroll-mt-24">
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">Apply Now</h3>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:bg-slate-700 dark:text-white ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:bg-slate-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number (Optional)</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:bg-slate-700 dark:text-white border-slate-300 dark:border-slate-600" />
                    </div>
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Applying for</label>
                        <div className="relative">
                            <select name="jobTitle" id="jobTitle" required value={formData.jobTitle} onChange={handleChange} onBlur={handleBlur} className={`w-full appearance-none bg-white dark:bg-slate-700 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition dark:text-white ${errors.jobTitle ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                <option value="" disabled>Select a position...</option>
                                {jobOpenings.map(job => (
                                    <option key={job.title} value={job.title}>{job.title}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                                <ChevronDownIcon />
                            </div>
                        </div>
                        {errors.jobTitle && <p className="text-sm text-red-500 mt-1">{errors.jobTitle}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resume/CV</label>
                    <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${errors.resume ? 'border-red-500' : isDraggingOver ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-600'}`}>
                        <div className="space-y-2 text-center">
                            {errors.resume ? <XCircleIcon /> : formData.resume ? <CheckCircleIcon /> : <UploadIcon />}
                            <div className="flex justify-center text-sm text-slate-600 dark:text-slate-400">
                                <label htmlFor="resume" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800 focus-within:ring-indigo-500">
                                    <span>{formData.resume ? 'Change file' : 'Upload a file'}</span>
                                    <input id="resume" name="resume" type="file" className="sr-only" onChange={handleChange} accept=".pdf,.docx" />
                                </label>
                                {!formData.resume && <p className="pl-1">or drag and drop</p>}
                            </div>
                            {errors.resume ? <p className="text-sm text-red-500">{errors.resume}</p> : formData.resume ? <p className="text-sm font-medium text-green-600 dark:text-green-400 break-all px-2">{formData.resume.name}</p> : <p className="text-xs text-slate-500 dark:text-slate-500">PDF, DOCX up to 5MB</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Letter (Optional)</label>
                    <textarea name="coverLetter" id="coverLetter" rows={4} value={formData.coverLetter} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition resize-y dark:bg-slate-700 dark:text-white border-slate-300 dark:border-slate-600"></textarea>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-wait flex items-center justify-center">
                        {isSubmitting ? <SpinnerIcon /> : 'Submit Application'}
                    </button>
                </div>
                 {submitError && (
                    <p role="alert" className="text-sm text-red-500 text-center mt-2">{submitError}</p>
                )}
            </form>
        </div>
    );
};

const Careers: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState('');
  
  const handleApplyClick = (jobTitle: string) => {
      setSelectedJob(jobTitle);
      // Use a timeout to ensure the state has updated before scrolling
      setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
  };
  
  return (
    <section id="careers" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Join Our Team</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We're always looking for passionate, talented individuals to help us drive innovation. Explore our open positions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {jobOpenings.map((job) => (
                    <div key={job.title} className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    <span>{job.department}</span>
                                    <span className="hidden sm:inline">|</span>
                                    <span>{job.location}</span>
                                    <span className="hidden sm:inline">|</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex-shrink-0">
                                <button
                                    onClick={() => handleApplyClick(job.title)}
                                    className="group flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold"
                                >
                                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">Apply Now</span>
                                    <ArrowRightIcon />
                                </button>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-3">{job.description}</p>
                    </div>
                ))}
                </div>
            </div>
            
            <ApplicationForm selectedJob={selectedJob} formRef={formRef} />
        </div>
      </div>
    </section>
  );
};

export default Careers;
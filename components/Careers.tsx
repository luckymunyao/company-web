import React from 'react';
import type { JobOpening } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

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


const Careers: React.FC = () => {
  return (
    <section id="careers" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Join Our Team</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We're always looking for passionate, talented individuals to help us drive innovation. Explore our open positions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {jobOpenings.map((job, index) => (
                <a href="#contact" key={index} className="group block p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{job.title}</h3>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span>{job.department}</span>
                                <span className="hidden sm:inline">|</span>
                                <span>{job.location}</span>
                                <span className="hidden sm:inline">|</span>
                                <span>{job.type}</span>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold transform transition-transform duration-300 group-hover:translate-x-1">
                                Apply Now <ArrowRightIcon />
                            </span>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-3">{job.description}</p>
                </a>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
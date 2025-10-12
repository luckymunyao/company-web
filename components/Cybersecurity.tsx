import React from 'react';
import CybersecurityIcon from './icons/CybersecurityIcon';
import CheckIcon from './icons/CheckIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const keyBenefits = [
  'Protect sensitive data',
  'Prevent financial loss',
  'Maintain customer trust',
  'Ensure regulatory compliance',
];

const includes = [
  'Vulnerability Assessment',
  'Firewall Configuration',
  'Incident Response Planning',
  'Employee Security Training',
];

const Cybersecurity: React.FC = () => {
  return (
    <section id="cybersecurity" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-slate-100 dark:bg-slate-900 p-8 md:p-12 rounded-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400 p-3 rounded-full">
                    <CybersecurityIcon /> 
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Cybersecurity Solutions</h2>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                In today's digital landscape, security is paramount. We provide a comprehensive, multi-layered cybersecurity strategy to protect your critical business assets. Our services range from proactive threat detection and vulnerability assessments to rapid incident response, ensuring your business remains resilient against cyber threats.
            </p>

            {/* Benefits & Includes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Benefits</h3>
                    <ul className="space-y-2">
                        {keyBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                            <span className="text-green-500 dark:text-green-400 mt-1 flex-shrink-0"><CheckIcon /></span>
                            <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                        </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">What This Includes</h3>
                    <ul className="space-y-2">
                        {includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="text-indigo-500 dark:text-indigo-400 mt-1 flex-shrink-0"><CheckIcon /></span>
                            <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CTA Button */}
            <div>
                <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105"
                >
                <span>Get a Quote for this Service</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                </span>
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Cybersecurity;

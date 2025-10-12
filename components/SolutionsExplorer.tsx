import React, { useState, useMemo } from 'react';
import type { Service } from '../types';
import ConsultingIcon from './icons/ConsultingIcon';
import CybersecurityIcon from './icons/CybersecurityIcon';
import SoftwareIcon from './icons/SoftwareIcon';
import MaintenanceIcon from './icons/MaintenanceIcon';
import NetworkingIcon from './icons/NetworkingIcon';
import DataAnalysisIcon from './icons/DataAnalysisIcon';
import DigitalMarketingIcon from './icons/DigitalMarketingIcon';
import FintechIcon from './icons/FintechIcon';
import SocialMediaIcon from './icons/SocialMediaIcon';
import TutorIcon from './icons/TutorIcon';
import CheckIcon from './icons/CheckIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const servicesData: Service[] = [
  {
    title: 'Cybersecurity Solutions',
    description: 'In today\'s digital landscape, security is paramount. We provide a comprehensive, multi-layered cybersecurity strategy to protect your critical business assets. Our services range from proactive threat detection and vulnerability assessments to rapid incident response, ensuring your business remains resilient against cyber threats.',
    icon: <CybersecurityIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Protect sensitive data', 'Prevent financial loss', 'Maintain customer trust', 'Ensure regulatory compliance'],
    includes: ['Vulnerability Assessment', 'Firewall Configuration', 'Incident Response Planning', 'Employee Security Training'],
  },
  {
    title: 'Managed IT Services',
    description: 'Focus on your core business while we handle your IT. Our managed services include proactive maintenance, 24/7 monitoring, helpdesk support, and strategic software management. We work to maximize your system uptime, enhance performance, and extend the life of your technology hardware, preventing problems before they start.',
    icon: <MaintenanceIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Reduce IT downtime', 'Predictable monthly costs', 'Access to expert support', 'Improved system performance'],
    includes: ['24/7 System Monitoring', 'Helpdesk & On-site Support', 'Patch Management & Updates', 'Hardware Lifecycle Management'],
  },
  {
    title: 'Networking Solutions',
    description: 'A robust and secure network is the backbone of any modern business. We design, implement, and manage high-performance network infrastructures tailored to your needs. From LAN/WAN to secure Wi-Fi and VPNs, we ensure seamless connectivity and optimal performance for your entire organization.',
    icon: <NetworkingIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Reliable connectivity', 'Enhanced data security', 'Scalable infrastructure', 'Support for remote work'],
    includes: ['Network Design & Architecture', 'Secure Wi-Fi Implementation', 'VPN & Remote Access Setup', 'Performance Monitoring'],
  },
  {
    title: 'Software Development',
    description: 'Gain a competitive edge with bespoke software solutions designed to meet your unique business challenges. Our development team specializes in creating everything from custom web and mobile applications to complex enterprise software. We follow an agile methodology to deliver robust, scalable, and user-friendly products.',
    icon: <span className="text-3xl" role="img" aria-label="Software Development">👨‍💻</span>,
    category: 'Development & Training',
    keyBenefits: ['Automate business processes', 'Solve unique challenges', 'Integrate disparate systems', 'Improve user experience'],
    includes: ['Requirement Analysis & Scoping', 'UI/UX Design & Prototyping', 'Agile Development Sprints', 'Quality Assurance & Testing'],
  },
  {
    title: 'Digital Marketing',
    description: 'Amplify your online presence and reach your target audience effectively. We employ data-driven digital marketing strategies, including Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, content marketing, and email campaigns to drive traffic, generate leads, and increase your ROI.',
    icon: <DigitalMarketingIcon />,
    category: 'Growth & Marketing',
    keyBenefits: ['Increase website traffic', 'Generate qualified leads', 'Improve brand visibility', 'Measureable campaign results'],
    includes: ['SEO & Keyword Research', 'PPC Campaign Management', 'Content Strategy & Creation', 'Monthly Performance Reporting'],
  },
  {
    title: 'Social Media Management',
    description: 'Build a vibrant online community and engage your customers where they are. Our team provides strategic social media management, from content creation and scheduling to campaign execution and performance analysis. We help you build brand loyalty and drive meaningful conversations.',
    icon: <SocialMediaIcon />,
    category: 'Growth & Marketing',
    keyBenefits: ['Grow your audience', 'Enhance brand engagement', 'Drive website traffic', 'Manage online reputation'],
    includes: ['Content Calendar Creation', 'Daily Post Scheduling & Engagement', 'Audience Growth Campaigns', 'Analytics & Reporting'],
  },
  {
    title: 'Data Analysis & Insights',
    description: 'Turn your raw data into your most valuable strategic asset. We provide advanced analytics and business intelligence services to help you uncover trends, understand customer behavior, and make informed decisions. From data warehousing to interactive dashboards, we make your data work for you.',
    icon: <DataAnalysisIcon />,
    category: 'Business Strategy',
    keyBenefits: ['Make data-driven decisions', 'Identify growth opportunities', 'Understand customer behavior', 'Optimize operations'],
    includes: ['Data Source Integration', 'Custom Dashboard Creation (Tableau/Power BI)', 'Predictive Modeling', 'Quarterly Business Reviews'],
  },
  {
    title: 'Expert Consulting',
    description: 'Navigate the complex technology landscape with confidence. Our expert consultants work with you to align your technology with your business objectives. We provide strategic IT planning, technology roadmaps, digital transformation guidance, and project management to ensure your IT investments deliver maximum value.',
    icon: <ConsultingIcon />,
    category: 'Business Strategy',
    keyBenefits: ['Strategic technology planning', 'Optimize IT spending', 'Mitigate risks', 'Leverage emerging tech'],
    includes: ['Technology Assessment & Audit', 'IT Strategy & Roadmap Development', 'Budget Planning & ROI Analysis', 'Vendor Selection & Management'],
  },
    {
    title: 'Personalized Tutoring',
    description: 'Empower your team with tailored one-on-one or group technology training. We offer personalized tutoring sessions covering a wide range of topics, from mastering basic software skills to understanding advanced development concepts. Investing in your team\'s skills is investing in your company\'s future.',
    icon: <TutorIcon />,
    category: 'Development & Training',
    keyBenefits: ['Increase team productivity', 'Boost employee confidence', 'Reduce support tickets', 'Improve software adoption'],
    includes: ['Customized Learning Plans', 'One-on-One Training Sessions', 'Group Workshops', 'Post-Training Support Materials'],
  },
  {
    title: 'Software Installation & Repair',
    description: 'Ensure your applications run smoothly and efficiently with our professional support. We handle software installation, configuration, updates, and troubleshooting. We resolve conflicts and errors to minimize disruption and keep your team productive.',
    icon: <SoftwareIcon />,
    category: 'Development & Training',
    keyBenefits: ['Ensure proper configuration', 'Minimize software downtime', 'Resolve application errors', 'Improve team efficiency'],
    includes: ['Application Installation & Setup', 'Configuration & Integration', 'Error Troubleshooting & Resolution', 'Software Update Management'],
  },
  {
    title: 'FinTech Solutions',
    description: 'We offer specialized IT support and solutions for the dynamic financial sector. Our services include support for trading platforms, management of financial data systems, and ensuring compliance with industry security standards. We understand the unique technology challenges of FinTech.',
    icon: <FintechIcon />,
    category: 'Business Strategy',
    keyBenefits: ['Ensure system reliability', 'Meet regulatory compliance', 'Secure financial data', 'Support for specialized platforms'],
    includes: ['Trading System Support', 'Secure Data Migration', 'Compliance & Security Audits', 'Platform Integration Services'],
  },
];

const serviceCategories = [
    'All', 
    'Security & Infrastructure', 
    'Growth & Marketing', 
    'Development & Training', 
    'Business Strategy'
];

const SolutionsExplorer: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedService, setSelectedService] = useState<Service>(servicesData[0]);

    const filteredServices = useMemo(() => {
        if (activeCategory === 'All') return servicesData;
        return servicesData.filter(service => service.category === activeCategory);
    }, [activeCategory]);
    
    // Update selected service if it's not in the new filtered list
    React.useEffect(() => {
        if (!filteredServices.find(s => s.title === selectedService.title)) {
            setSelectedService(filteredServices[0] || servicesData[0]);
        }
    }, [filteredServices, selectedService.title]);

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Solutions Explorer</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
            An interactive guide to our comprehensive suite of services. Select a category or service to learn how we can help you achieve your goals.
          </p>
        </div>
        
        <div className="relative mb-10">
            <div className="flex space-x-2 overflow-x-auto pb-4 hide-scrollbar">
                {serviceCategories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex-shrink-0 active:scale-95 ${
                            activeCategory === category 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-12 min-h-[500px]">
            <div className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0">
                <div className="space-y-2">
                    {filteredServices.map(service => (
                        <button
                            key={service.title}
                            onClick={() => setSelectedService(service)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 text-md font-medium flex items-center gap-3 active:scale-95 ${
                                selectedService.title === service.title
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                            }`}
                        >
                            <span className="flex-shrink-0">{service.icon}</span>
                            <span>{service.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
                <div key={selectedService.title} className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl shadow-inner animate-fade-in">
                    <div className="flex items-center gap-4 mb-4">
                         <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-full p-3">
                            {selectedService.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedService.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{selectedService.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Key Benefits</h4>
                            <ul className="space-y-1">
                                {selectedService.keyBenefits.map(benefit => (
                                     <li key={benefit} className="group">
                                        <a href="#" title={`Learn more about ${benefit}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-green-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {benefit}
                                            </span>
                                            <span className="ml-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><ExternalLinkIcon /></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">What This Includes</h4>
                            <ul className="space-y-1">
                                {selectedService.includes.map(item => (
                                     <li key={item} className="group">
                                        <a href="#" title={`Learn more about ${item}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-indigo-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {item}
                                            </span>
                                             <span className="ml-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><ExternalLinkIcon /></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <a href="#contact" className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md active:scale-95">
                        <span>Get a Quote for this Service</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRightIcon />
                        </span>
                    </a>
                </div>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default SolutionsExplorer;
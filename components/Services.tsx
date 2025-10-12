import React from 'react';
import type { Service } from '../types';
import ServiceCard from './ServiceCard';
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


const servicesData: Service[] = [
  {
    title: 'Cybersecurity Solutions',
    description: 'Safeguard your critical business assets with our multi-layered cybersecurity approach, from threat detection to incident response.',
    icon: <CybersecurityIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Security & Infrastructure',
    keyBenefits: ['Protect sensitive data', 'Prevent financial loss', 'Maintain customer trust', 'Ensure regulatory compliance'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Vulnerability Assessment', 'Firewall Configuration', 'Incident Response Planning', 'Employee Security Training'],
  },
  {
    title: 'Managed IT Services',
    description: 'Proactive maintenance, support, and software management to maximize uptime and extend the life of your hardware.',
    icon: <MaintenanceIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Security & Infrastructure',
    keyBenefits: ['Reduce IT downtime', 'Predictable monthly costs', 'Access to expert support', 'Improved system performance'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['24/7 System Monitoring', 'Helpdesk & On-site Support', 'Patch Management & Updates', 'Hardware Lifecycle Management'],
  },
  {
    title: 'Networking Solutions',
    description: 'We design, implement, and manage robust and secure network infrastructures for seamless connectivity and performance.',
    icon: <NetworkingIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Security & Infrastructure',
    keyBenefits: ['Reliable connectivity', 'Enhanced data security', 'Scalable infrastructure', 'Support for remote work'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Network Design & Architecture', 'Secure Wi-Fi Implementation', 'VPN & Remote Access Setup', 'Performance Monitoring'],
  },
  {
    title: 'Software Installation & Repair',
    description: 'Professional installation, configuration, and troubleshooting to ensure your applications run smoothly and efficiently.',
    icon: <SoftwareIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Development & Training',
    keyBenefits: ['Ensure proper configuration', 'Minimize software downtime', 'Resolve application errors', 'Improve team efficiency'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Application Installation & Setup', 'Configuration & Integration', 'Error Troubleshooting & Resolution', 'Software Update Management'],
  },
  {
    title: 'Software Development',
    description: 'Bespoke software solutions to meet your unique business challenges. From web applications to enterprise software, we build it.',
    icon: <span className="text-3xl" role="img" aria-label="Software Development">👨‍💻</span>,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Development & Training',
    keyBenefits: ['Automate business processes', 'Solve unique challenges', 'Integrate disparate systems', 'Improve user experience'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Requirement Analysis & Scoping', 'UI/UX Design & Prototyping', 'Agile Development Sprints', 'Quality Assurance & Testing'],
  },
  {
    title: 'Digital Marketing',
    description: 'Amplify your online presence with our data-driven digital marketing strategies, including SEO, SEM, and content marketing.',
    icon: <DigitalMarketingIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Growth & Marketing',
    keyBenefits: ['Increase website traffic', 'Generate qualified leads', 'Improve brand visibility', 'Measureable campaign results'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['SEO & Keyword Research', 'PPC Campaign Management', 'Content Strategy & Creation', 'Monthly Performance Reporting'],
  },
    {
    title: 'Social Media Management',
    description: 'Build and engage your community with our strategic social media management, content creation, and campaign execution.',
    icon: <SocialMediaIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Growth & Marketing',
    keyBenefits: ['Grow your audience', 'Enhance brand engagement', 'Drive website traffic', 'Manage online reputation'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Content Calendar Creation', 'Daily Post Scheduling & Engagement', 'Audience Growth Campaigns', 'Analytics & Reporting'],
  },
  {
    title: 'Data Analysis & Insights',
    description: 'Turn your raw data into a strategic asset. We provide advanced analytics to uncover trends and drive business decisions.',
    icon: <DataAnalysisIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Business Strategy',
    keyBenefits: ['Make data-driven decisions', 'Identify growth opportunities', 'Understand customer behavior', 'Optimize operations'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Data Source Integration', 'Custom Dashboard Creation (Tableau/Power BI)', 'Predictive Modeling', 'Quarterly Business Reviews'],
  },
  {
    title: 'FinTech Solutions',
    description: 'Specialized IT support for the financial sector, including trading platform support and financial data systems management.',
    icon: <FintechIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Business Strategy',
    keyBenefits: ['Ensure system reliability', 'Meet regulatory compliance', 'Secure financial data', 'Support for specialized platforms'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Trading System Support', 'Secure Data Migration', 'Compliance & Security Audits', 'Platform Integration Services'],
  },
  {
    title: 'Expert Consulting',
    description: 'Leverage our expertise to align your technology with your business objectives through strategic IT planning and roadmaps.',
    icon: <ConsultingIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Business Strategy',
    keyBenefits: ['Strategic technology planning', 'Optimize IT spending', 'Mitigate risks', 'Leverage emerging tech'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Technology Assessment & Audit', 'IT Strategy & Roadmap Development', 'Budget Planning & ROI Analysis', 'Vendor Selection & Management'],
  },
  {
    title: 'Personalized Tutoring',
    description: 'Empower your team with one-on-one technology tutoring, from basic software skills to advanced development concepts.',
    icon: <TutorIcon />,
    // Fix: Added missing 'category' and 'keyBenefits' properties.
    category: 'Development & Training',
    keyBenefits: ['Increase team productivity', 'Boost employee confidence', 'Reduce support tickets', 'Improve software adoption'],
    // Fix: Added missing 'includes' property to satisfy the Service type.
    includes: ['Customized Learning Plans', 'One-on-One Training Sessions', 'Group Workshops', 'Post-Training Support Materials'],
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Core Services</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            We offer a comprehensive range of IT services designed to meet the unique needs of your business.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
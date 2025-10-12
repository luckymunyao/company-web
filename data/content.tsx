import React from 'react';
import type { Service, BlogPost } from '../types';
import ConsultingIcon from '../components/icons/ConsultingIcon';
import CybersecurityIcon from '../components/icons/CybersecurityIcon';
import SoftwareIcon from '../components/icons/SoftwareIcon';
import MaintenanceIcon from '../components/icons/MaintenanceIcon';
import NetworkingIcon from '../components/icons/NetworkingIcon';
import DataAnalysisIcon from '../components/icons/DataAnalysisIcon';
import DigitalMarketingIcon from '../components/icons/DigitalMarketingIcon';
import FintechIcon from '../components/icons/FintechIcon';
import SocialMediaIcon from '../components/icons/SocialMediaIcon';
import TutorIcon from '../components/icons/TutorIcon';

export const servicesData: Service[] = [
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


export const blogPostsData: BlogPost[] = [
  {
    category: 'Cybersecurity',
    title: 'Top 5 Cybersecurity Threats to Watch in 2024',
    excerpt: 'Stay ahead of the curve by understanding the most prevalent threats facing businesses today.',
    imageUrl: 'https://picsum.photos/400/250?random=20',
    author: {
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d5',
    },
    date: 'August 5, 2024',
  },
  {
    category: 'Cloud Solutions',
    title: 'Is a Multi-Cloud Strategy Right for Your Business?',
    excerpt: 'Explore the benefits and challenges of adopting a multi-cloud approach to enhance flexibility and avoid vendor lock-in.',
    imageUrl: 'https://picsum.photos/400/250?random=21',
    author: {
      name: 'Samantha Lee',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d6',
    },
    date: 'August 1, 2024',
  },
  {
    category: 'IT Strategy',
    title: 'A Practical Guide to AI Integration for SMEs',
    excerpt: 'Learn how small and medium-sized enterprises can leverage AI to automate tasks, gain insights, and drive growth.',
    imageUrl: 'https://picsum.photos/400/250?random=22',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d7',
    },
    date: 'July 28, 2024',
  },
];

export const faqData = [
  {
    question: 'How quickly can I expect a response for a support request?',
    answer: 'Our standard response time for non-critical issues is within 4 business hours. For critical, system-down emergencies, we guarantee a response within 1 hour. We prioritize getting your operations back to normal as quickly as possible.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have extensive experience across a wide range of industries, including finance (FinTech), marketing, e-commerce, and professional services. Our adaptable solutions are tailored to meet the unique compliance and operational needs of each sector.',
  },
  {
    question: 'Do you offer custom software development services?',
    answer: 'Yes, absolutely. Our in-house development team specializes in creating bespoke software solutions, from custom web applications to enterprise-level systems, designed to solve your unique business challenges and streamline your processes.',
  },
  {
    question: 'How do you approach cybersecurity for a new client?',
    answer: 'Our process begins with a comprehensive security audit and vulnerability assessment to identify weaknesses. Based on our findings, we develop a multi-layered security strategy that includes network protection, data encryption, employee training, and proactive threat monitoring.',
  },
  {
    question: 'What are your pricing models?',
    answer: 'We offer flexible pricing models to suit different needs. For ongoing support, we have predictable monthly retainers for our Managed IT Services. For specific projects like software development or consulting, we provide a detailed, fixed-price quote after an initial discovery phase.',
  },
];

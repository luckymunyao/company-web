import React from 'react';
import type { Service, BlogPost, Event } from '../types';
import ConsultingIcon from '../components/icons/ConsultingIcon';
import SoftwareIcon from '../components/icons/SoftwareIcon';
import MaintenanceIcon from '../components/icons/MaintenanceIcon';
import NetworkingIcon from '../components/icons/NetworkingIcon';
import DataAnalysisIcon from '../components/icons/DataAnalysisIcon';
import DigitalMarketingIcon from '../components/icons/DigitalMarketingIcon';
import FintechIcon from '../components/icons/FintechIcon';
import SocialMediaIcon from '../components/icons/SocialMediaIcon';
import TutorIcon from '../components/icons/TutorIcon';
import CloudIcon from '../components/icons/CloudIcon';
import PaletteIcon from '../components/icons/PaletteIcon';
import CpuChipIcon from '../components/icons/CpuChipIcon';
import CubeTransparentIcon from '../components/icons/CubeTransparentIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';

export const servicesData: Service[] = [
  {
    title: 'Managed IT Services',
    description: 'Focus on your core business while we handle your IT. Our managed services include proactive maintenance, 24/7 monitoring, helpdesk support, and strategic software management. We work to maximize your system uptime, enhance performance, and extend the life of your technology hardware, preventing problems before they start.',
    icon: <MaintenanceIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Reduce IT downtime', 'Predictable monthly costs', 'Access to expert support', 'Improved system performance'],
    includes: ['24/7 System Monitoring', 'Helpdesk & On-site Support', 'Patch Management & Updates', 'Hardware Lifecycle Management'],
  },
  {
    title: 'Cloud Services',
    description: 'Leverage the power of the cloud with our expert services. We provide cloud strategy, migration, and management for AWS, Azure, and Google Cloud, ensuring your infrastructure is scalable, secure, and cost-effective.',
    icon: <CloudIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Enhanced scalability & flexibility', 'Reduced infrastructure costs', 'Improved disaster recovery', 'Increased operational efficiency'],
    includes: ['Cloud Strategy & Consulting', 'Cloud Migration Services', 'Infrastructure as Code (IaC)', 'Managed Cloud Services'],
  },
  {
    title: 'Cybersecurity Solutions',
    description: 'Protect your digital assets with our multi-layered security services. We offer threat detection, vulnerability assessments, and incident response to safeguard your business from evolving cyber threats.',
    icon: <ShieldCheckIcon />,
    category: 'Security & Infrastructure',
    keyBenefits: ['Proactive threat hunting', 'Reduced risk of data breaches', 'Regulatory compliance assurance', 'Enhanced customer trust'],
    includes: ['24/7 Security Monitoring', 'Penetration Testing', 'Employee Security Awareness Training', 'Incident Response & Recovery Plan'],
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
    icon: <span className="text-3xl" role="img" aria-hidden="true">👨‍💻</span>,
    category: 'Development & Training',
    keyBenefits: ['Automate business processes', 'Solve unique challenges', 'Integrate disparate systems', 'Improve user experience'],
    includes: ['Requirement Analysis & Scoping', 'UI/UX Design & Prototyping', 'Agile Development Sprints', 'Quality Assurance & Testing'],
  },
  {
    title: 'UI/UX Design',
    description: 'Create intuitive and engaging digital experiences that delight your users. Our UI/UX design process focuses on user research, wireframing, prototyping, and user testing to build products that are both beautiful and functional.',
    icon: <PaletteIcon />,
    category: 'Development & Training',
    keyBenefits: ['Increased user engagement', 'Higher conversion rates', 'Stronger brand loyalty', 'Reduced development rework'],
    includes: ['User Research & Personas', 'Wireframing & Prototyping', 'Usability Testing', 'Design System Creation'],
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
    title: 'AI & Machine Learning',
    description: 'Unlock the potential of your data with our AI & ML solutions. We build custom models for predictive analytics, natural language processing (NLP), and computer vision to automate processes and deliver intelligent insights.',
    icon: <CpuChipIcon />,
    category: 'Business Strategy',
    keyBenefits: ['Automate complex tasks', 'Gain predictive insights', 'Personalize customer experiences', 'Enhance decision-making'],
    includes: ['Custom Model Development', 'Data Processing & Analysis', 'Natural Language Processing (NLP)', 'Predictive Analytics Solutions'],
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
  {
    title: 'Blockchain Solutions',
    description: 'Explore the future of decentralized technology. We develop secure and transparent blockchain applications, including smart contracts, NFTs, and custom DApps, to help you innovate and build trust in your digital transactions.',
    icon: <CubeTransparentIcon />,
    category: 'Business Strategy',
    keyBenefits: ['Enhanced security & transparency', 'Decentralized process automation', 'Improved traceability', 'Creation of new digital assets'],
    includes: ['Smart Contract Development', 'Decentralized Application (DApp) Building', 'NFT Marketplace Creation', 'Blockchain Consulting'],
  },
];


export const blogPostsData: BlogPost[] = [
  {
    category: 'Cybersecurity',
    title: 'Top 5 Cybersecurity Threats to Watch in 2024',
    excerpt: 'Stay ahead of the curve by understanding the most prevalent threats facing businesses today.',
    imageUrl: 'https://picsum.photos/seed/blog20',
    author: {
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d5',
    },
    date: 'August 5, 2024',
    tags: ['phishing', 'ransomware', 'data breach', 'security'],
  },
  {
    category: 'Cloud Solutions',
    title: 'Is a Multi-Cloud Strategy Right for Your Business?',
    excerpt: 'Explore the benefits and challenges of adopting a multi-cloud approach to enhance flexibility and avoid vendor lock-in.',
    imageUrl: 'https://picsum.photos/seed/blog21',
    author: {
      name: 'Samantha Lee',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d6',
    },
    date: 'August 1, 2024',
    tags: ['AWS', 'Azure', 'Google Cloud', 'DevOps', 'cloud'],
  },
  {
    category: 'IT Strategy',
    title: 'A Practical Guide to AI Integration for SMEs',
    excerpt: 'Learn how small and medium-sized enterprises can leverage AI to automate tasks, gain insights, and drive growth.',
    imageUrl: 'https://picsum.photos/seed/blog22',
    author: {
      name: 'David Chen',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d7',
    },
    date: 'July 28, 2024',
    tags: ['AI', 'machine learning', 'automation', 'business intelligence'],
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

export const eventsData: Event[] = [
  {
    title: 'AI in Business: Unlocking Your Potential',
    date: '2024-09-15',
    time: '10:00 AM - 11:30 AM (EDT)',
    location: 'Virtual Webinar',
    description: 'Join our experts as we explore practical applications of AI and Machine Learning for small and medium-sized businesses.',
    link: '#',
    linkText: 'Register Now',
  },
  {
    title: 'Webinar: Mastering Cloud Security',
    date: '2024-10-02',
    time: '01:00 PM - 02:00 PM (EDT)',
    location: 'Virtual Webinar',
    description: 'A deep dive into best practices for securing your cloud infrastructure on AWS, Azure, and Google Cloud.',
    link: '#',
    linkText: 'Register Now',
  },
  {
    title: 'Future of Tech Conference 2024',
    date: '2024-11-20',
    time: 'All Day',
    location: 'New York, NY',
    description: 'Visit our booth at the Future of Tech conference to see live demos of our latest solutions and meet the team.',
    link: '#',
    linkText: 'Learn More',
  },
];
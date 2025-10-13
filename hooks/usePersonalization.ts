import { useState, useEffect, useCallback } from 'react';
import { servicesData } from '../data/content';
import type { Service } from '../types';

// Define a map from specific tags/titles to broader interest categories.
const interestMap: { [key: string]: string } = {
    // Security & Infrastructure
    'Cybersecurity': 'Security & Infrastructure',
    'SIEM': 'Security & Infrastructure',
    'Cloud': 'Security & Infrastructure',
    'AWS': 'Security & Infrastructure',
    'DevOps': 'Security & Infrastructure',
    'Security & Infrastructure': 'Security & Infrastructure',
    'Networking Solutions': 'Security & Infrastructure',
    'Cloud Services': 'Security & Infrastructure',

    // Growth & Marketing
    'Digital Marketing': 'Growth & Marketing',
    'Shopify': 'Growth & Marketing',
    'Growth & Marketing': 'Growth & Marketing',
    'Social Media Management': 'Growth & Marketing',

    // Development & Training
    'React': 'Development & Training',
    'Node.js': 'Development & Training',
    'UI/UX': 'Development & Training',
    'Figma': 'Development & Training',
    'Mobile Design': 'Development & Training',
    'Development & Training': 'Development & Training',
    'Software Development': 'Development & Training',
    'UI/UX Design': 'Development & Training',
    'Personalized Tutoring': 'Development & Training',
    'Software Installation & Repair': 'Development & Training',

    // Business Strategy
    'AI/ML': 'Business Strategy',
    'Python': 'Business Strategy',
    'Big Data': 'Business Strategy',
    'Healthcare IT': 'Business Strategy',
    'Tableau': 'Business Strategy',
    'Salesforce Integration': 'Business Strategy',
    'Business Strategy': 'Business Strategy',
    'Data Analysis & Insights': 'Business Strategy',
    'AI & Machine Learning': 'Business Strategy',
    'Expert Consulting': 'Business Strategy',
    'FinTech Solutions': 'Business Strategy',
    'Blockchain Solutions': 'Business Strategy',
};

const personalizedContent = {
    'Security & Infrastructure': {
        headline: 'Fortifying Your Digital Frontier',
        subheadline: 'We build robust, secure, and resilient solutions to protect your most valuable assets from modern threats.',
    },
    'Development & Training': {
        headline: 'Building Tomorrow\'s Software, Today',
        subheadline: 'From custom applications to empowering your team, we deliver bespoke development solutions that drive performance.',
    },
    'Growth & Marketing': {
        headline: 'Accelerating Your Digital Growth',
        subheadline: 'Leverage our data-driven marketing and e-commerce solutions to expand your reach and boost your conversions.',
    },
    'Business Strategy': {
        headline: 'Unlocking Data-Driven Success',
        subheadline: 'Transform your operations with our expertise in AI, data analytics, and strategic consulting to make smarter decisions.',
    },
};

export const usePersonalization = () => {
    const [heroContent, setHeroContent] = useState<{ headline: string; subheadline: string; }>({ headline: '', subheadline: '' });
    const [recommendedServices, setRecommendedServices] = useState<Service[]>([]);

    useEffect(() => {
        try {
            const profile: { [key: string]: number } = JSON.parse(localStorage.getItem('userInterestProfile') || '{}');
            const sortedInterests = Object.keys(profile).sort((a, b) => profile[b] - profile[a]);
            const topInterest = sortedInterests[0];

            if (topInterest && personalizedContent[topInterest as keyof typeof personalizedContent]) {
                setHeroContent(personalizedContent[topInterest as keyof typeof personalizedContent]);
            }

            if (sortedInterests.length > 0) {
                let finalRecommendations: Service[] = [];
                // Add services from top interest categories
                for (const interest of sortedInterests) {
                    const servicesForInterest = servicesData.filter(service => service.category === interest);
                    finalRecommendations.push(...servicesForInterest);
                }
                
                // Remove duplicates and take the first 3
                const uniqueRecommendations = Array.from(new Set(finalRecommendations.map(s => s.title)))
                  .map(title => finalRecommendations.find(s => s.title === title) as Service);

                setRecommendedServices(uniqueRecommendations.slice(0, 3));
            } else {
                // Default recommendations for new users
                setRecommendedServices(servicesData.filter(s => ['Cybersecurity Solutions', 'Software Development', 'Data Analysis & Insights'].includes(s.title)));
            }
        } catch (error) {
            console.error("Failed to parse user interest profile:", error);
            localStorage.removeItem('userInterestProfile');
            setRecommendedServices(servicesData.filter(s => ['Cybersecurity Solutions', 'Software Development', 'Data Analysis & Insights'].includes(s.title)));
        }
    }, []);

    const trackInterest = useCallback((interestKey: string) => {
        // Look up the broader category from the map
        const category = interestMap[interestKey] || null;

        if (!category) return; // Don't track if it's not a mapped interest

        try {
            const profile = JSON.parse(localStorage.getItem('userInterestProfile') || '{}');
            profile[category] = (profile[category] || 0) + 1;
            localStorage.setItem('userInterestProfile', JSON.stringify(profile));
        } catch (error) {
            console.error("Failed to update user interest profile:", error);
        }
    }, []);

    return { heroContent, trackInterest, recommendedServices };
};
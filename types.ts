import React from 'react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'Security & Infrastructure' | 'Growth & Marketing' | 'Development & Training' | 'Business Strategy';
  keyBenefits: string[];
  includes: string[];
}

export interface BlogPost {
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatarUrl: string;
}

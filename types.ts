import React from 'react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  keyBenefits: string[];
  includes: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatarUrl: string;
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

export interface Project {
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface JobOpening {
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    department: 'Engineering' | 'Marketing' | 'Sales' | 'Support';
}
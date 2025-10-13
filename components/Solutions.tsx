import React from 'react';
import CodeIcon from './icons/CodeIcon';
import CloudIcon from './icons/CloudIcon';
import CpuChipIcon from './icons/CpuChipIcon';
import GlobeAltIcon from './icons/GlobeAltIcon';
import CubeTransparentIcon from './icons/CubeTransparentIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const solutions = [
  {
    icon: <CodeIcon />,
    title: 'Software Development',
    description: 'Custom applications, enterprise software, and mobile solutions built for performance and scale.'
  },
  {
    icon: <CloudIcon />,
    title: 'Cloud Computing',
    description: 'Scalable infrastructure, DevOps, and cloud-native solutions to modernize your business operations.'
  },
  {
    icon: <CpuChipIcon />,
    title: 'Artificial Intelligence & ML',
    description: 'Leverage data with predictive analytics, NLP, and custom machine learning models.'
  },
  {
    icon: <GlobeAltIcon />,
    title: 'IoT & Automation',
    description: 'Connect and automate your physical operations with smart devices and real-time data processing.'
  },
  {
    icon: <CubeTransparentIcon />,
    title: 'Blockchain Solutions',
    description: 'Decentralized applications, smart contracts, and secure digital asset management.'
  }
];

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Our Core Capabilities</h2>
          <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
            We architect and deliver end-to-end technology solutions that drive innovation and create a competitive advantage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="group [perspective:1000px]">
                <div className="relative bg-slate-800/40 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(15deg)]">
                    <div className="absolute inset-4 bg-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="text-indigo-400 mb-4">
                            {solution.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">{solution.description}</p>
                        <a href="#contact" className="inline-flex items-center font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                            Configure Solution
                            <ArrowRightIcon />
                        </a>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
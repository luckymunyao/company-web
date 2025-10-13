import React, { useState, useMemo } from 'react';
import CogIcon from './icons/CogIcon';
import CalculatorIcon from './icons/CalculatorIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import CubeIcon from './icons/CubeIcon';
import RectangleStackIcon from './icons/RectangleStackIcon';
import ArrowsPointingOutIcon from './icons/ArrowsPointingOutIcon';
import LifebuoyIcon from './icons/LifebuoyIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

const technologyOptions = {
    'web-development': ['React', 'Vue', 'Angular', 'Node.js', 'Python/Django', 'PHP/Laravel'],
    'mobile-development': ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter'],
    'cloud-services': ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Terraform'],
    'cybersecurity': ['Penetration Testing', 'SIEM', 'Firewall Management', 'Endpoint Security'],
    'ui-ux-design': ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
    'ai-ml-solutions': ['Python (TensorFlow/PyTorch)', 'Scikit-learn', 'NLP', 'Computer Vision'],
    'blockchain-solutions': ['Solidity (Ethereum)', 'Web3.js', 'NFTs', 'Smart Contracts'],
};

const ServiceCustomizer: React.FC = () => {
    // State for Configurator
    const [config, setConfig] = useState({
        serviceType: 'web-development',
        technologies: [] as string[],
        scope: 'medium',
        supportLevel: 'standard'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [proposalReady, setProposalReady] = useState(false);

    // State for Estimator
    const [estimate, setEstimate] = useState({
        projectType: 'web-app',
        features: ''
    });
    const [isEstimating, setIsEstimating] = useState(false);
    const [estimateResult, setEstimateResult] = useState<{cost: string, timeline: string} | null>(null);

    const handleConfigChange = (field: keyof typeof config, value: string) => {
        setConfig(prev => ({...prev, [field]: value}));
    }
    
    const handleTechChange = (tech: string) => {
        setConfig(prev => {
            const newTechs = prev.technologies.includes(tech)
                ? prev.technologies.filter(t => t !== tech)
                : [...prev.technologies, tech];
            return {...prev, technologies: newTechs};
        });
    }

    const handleGenerateProposal = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setProposalReady(false);
        setTimeout(() => {
            setIsGenerating(false);
            setProposalReady(true);
        }, 2500); // Simulate AI generation
    };

    const handleGetEstimate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEstimating(true);
        setEstimateResult(null);
        setTimeout(() => {
            setIsEstimating(false);
            setEstimateResult({
                cost: '$15,000 - $25,000',
                timeline: '6-8 Weeks'
            });
        }, 2500); // Simulate AI estimation
    };
    
    const currentTechOptions = useMemo(() => technologyOptions[config.serviceType as keyof typeof technologyOptions] || [], [config.serviceType]);
    
    React.useEffect(() => {
        setConfig(prev => ({ ...prev, technologies: [] }));
    }, [config.serviceType]);

  return (
    <section id="customize" className="py-20 bg-slate-100 dark:bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Customize Your Solution</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
                Use our interactive tools to configure your ideal service package or get a quick AI-powered price estimate.
            </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
            {/* IT Solution Configurator */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <CogIcon />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">IT Solution Configurator</h3>
                </div>
                <form className="space-y-6" onSubmit={handleGenerateProposal}>
                    {/* Service Type */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><CubeIcon/>Service Type</label>
                        <select onChange={(e) => handleConfigChange('serviceType', e.target.value)} value={config.serviceType} className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:ring-indigo-500 rounded-md">
                            <option value="web-development">Web Development</option>
                            <option value="mobile-development">Mobile Development</option>
                            <option value="cloud-services">Cloud Services</option>
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="ui-ux-design">UI/UX Design</option>
                            <option value="ai-ml-solutions">AI &amp; ML Solutions</option>
                            <option value="blockchain-solutions">Blockchain Solutions</option>
                        </select>
                    </div>
                    {/* Technologies */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><RectangleStackIcon/>Platform / Technology</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {currentTechOptions.map(tech => (
                                <button type="button" key={tech} onClick={() => handleTechChange(tech)} aria-pressed={config.technologies.includes(tech)} className={`text-sm text-left p-2 rounded-md transition-colors ${config.technologies.includes(tech) ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}>
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Scope */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><ArrowsPointingOutIcon/>Project Scope</label>
                        <div className="flex flex-col sm:flex-row gap-2 rounded-md bg-slate-100 dark:bg-slate-800 p-1">
                            {['Small/MVP', 'Medium', 'Large/Enterprise'].map(scope => (
                                <button type="button" key={scope} onClick={() => handleConfigChange('scope', scope.toLowerCase().split('/')[0])} aria-pressed={config.scope === scope.toLowerCase().split('/')[0]} className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${config.scope === scope.toLowerCase().split('/')[0] ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>{scope}</button>
                            ))}
                        </div>
                    </div>
                    {/* Support Level */}
                     <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><LifebuoyIcon/>Support Level</label>
                        <div className="flex flex-col sm:flex-row gap-2 rounded-md bg-slate-100 dark:bg-slate-800 p-1">
                            {['Basic', 'Standard', 'Premium'].map(level => (
                                <button type="button" key={level} onClick={() => handleConfigChange('supportLevel', level.toLowerCase())} aria-pressed={config.supportLevel === level.toLowerCase()} className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${config.supportLevel === level.toLowerCase() ? 'bg-white dark:bg-slate-700 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>{level}</button>
                            ))}
                        </div>
                    </div>
                    <button type="submit" disabled={isGenerating} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center justify-center disabled:bg-indigo-400">
                        {isGenerating ? <SpinnerIcon/> : 'Generate My Proposal'}
                    </button>
                    {isGenerating && <div role="status" className="sr-only">Generating your proposal...</div>}
                    {proposalReady && (
                        <div role="status" className="text-center p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md animate-fade-in">
                            <p className="font-semibold text-green-800 dark:text-green-300">Your Proposal is Ready!</p>
                            <button className="mt-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center justify-center gap-2 mx-auto">
                                <DocumentTextIcon/> Download PDF
                            </button>
                        </div>
                    )}
                </form>
            </div>
            
            {/* AI Pricing Estimator */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <CalculatorIcon />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI Pricing Estimator</h3>
                </div>
                <form className="space-y-6" onSubmit={handleGetEstimate}>
                     <div>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Project Type</label>
                        <select onChange={(e) => setEstimate(prev => ({...prev, projectType: e.target.value}))} value={estimate.projectType} className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:ring-indigo-500 rounded-md">
                            <option value="web-app">Web Application</option>
                            <option value="mobile-app">Mobile Application</option>
                            <option value="ecommerce-store">E-commerce Store</option>
                            <option value="data-dashboard">Data Dashboard</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Describe Key Features</label>
                        <textarea 
                            value={estimate.features}
                            onChange={(e) => setEstimate(prev => ({...prev, features: e.target.value}))}
                            rows={4} 
                            placeholder="e.g., User authentication, payment processing, admin dashboard, real-time chat..."
                            className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:ring-indigo-500 rounded-md resize-y"
                        ></textarea>
                    </div>
                    <button type="submit" disabled={isEstimating} className="w-full bg-slate-700 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300 shadow-md flex items-center justify-center disabled:bg-slate-500">
                         {isEstimating ? <SpinnerIcon/> : 'Estimate Cost & Timeline'}
                    </button>
                    {isEstimating && <div role="status" className="sr-only">Estimating cost and timeline...</div>}
                    {estimateResult && (
                         <div role="status" className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-md animate-fade-in">
                            <p className="font-semibold text-indigo-800 dark:text-indigo-300">AI-Powered Estimate:</p>
                            <div className="mt-2 flex justify-around">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-500">Cost</p>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{estimateResult.cost}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-500">Timeline</p>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{estimateResult.timeline}</p>
                                </div>
                            </div>
                         </div>
                    )}
                </form>
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
      `}</style>
    </section>
  );
};

export default ServiceCustomizer;
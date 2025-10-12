import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
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

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Have questions? We've got answers. Here are some of the most common inquiries we receive.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">{item.question}</span>
                <span className="text-indigo-600 dark:text-indigo-400 transition-transform duration-300">
                  {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-4">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
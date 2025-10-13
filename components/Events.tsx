import React from 'react';
import { eventsData } from '../data/content';
import CalendarIcon from './icons/CalendarIcon';
import MapPinIcon from './icons/MapPinIcon';
import ClockIcon from './icons/ClockIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const EventCard: React.FC<{ event: typeof eventsData[0] }> = ({ event }) => {
    const date = new Date(event.date);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();

    return (
        <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex-shrink-0 w-full sm:w-28 h-28 sm:h-full flex sm:flex-col items-center justify-center bg-indigo-600 text-white p-4 text-center">
                <span className="text-4xl font-bold">{day}</span>
                <span className="text-lg font-semibold tracking-wider">{month}</span>
            </div>
            <div className="p-6 w-full">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                        <ClockIcon />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPinIcon />
                        <span>{event.location}</span>
                    </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{event.description}</p>
                <a 
                    href={event.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300"
                >
                    <span>{event.linkText}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRightIcon />
                    </span>
                </a>
            </div>
        </div>
    );
};


const Events: React.FC = () => {
  return (
    <section id="events" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Join us for our upcoming webinars, conferences, and community events.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
            {eventsData.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
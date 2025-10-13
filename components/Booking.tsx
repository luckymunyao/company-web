import React, { useState, useMemo, useEffect } from 'react';
import { servicesData } from '../data/content';
import CalendarIcon from './icons/CalendarIcon';
import ClockIcon from './icons/ClockIcon';
import UserCircleIcon from './icons/UserCircleIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

const availableTimes = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];

const Booking: React.FC = () => {
    const [step, setStep] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
        service: '',
        date: new Date(),
        time: '',
        name: '',
        email: '',
        company: '',
        details: ''
    });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof bookingDetails, string>>>({});
    const [formError, setFormError] = useState(''); // New state for step errors

    useEffect(() => {
        const checkHash = () => {
            const hash = window.location.hash;
            if (hash.includes('?service=')) {
                const serviceParam = hash.split('?service=')[1];
                if (serviceParam) {
                    const decodedService = decodeURIComponent(serviceParam.replace(/\+/g, ' '));
                    const serviceExists = servicesData.some(s => s.title === decodedService);
                    if (serviceExists) {
                        setBookingDetails(prev => ({ ...prev, service: decodedService }));
                    }
                }
            }
        };

        checkHash();
        window.addEventListener('hashchange', checkHash, false);

        return () => {
            window.removeEventListener('hashchange', checkHash, false);
        };
    }, []);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentYear, currentMonth]);
    const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentYear, currentMonth]);

    const handleNextStep = () => {
        let isValid = true;
        let errorMsg = '';
        if (step === 1 && !bookingDetails.service) {
            isValid = false;
            errorMsg = 'Please select a service to continue.';
        }
        if (step === 2 && !bookingDetails.time) {
             isValid = false;
             errorMsg = 'Please select an available time slot.';
        }
        if (step === 3) {
            const newErrors: Partial<Record<keyof typeof bookingDetails, string>> = {};
            if (!bookingDetails.name) newErrors.name = 'Name is required.';
            if (!bookingDetails.email || !/\S+@\S+\.\S+/.test(bookingDetails.email)) newErrors.email = 'A valid email is required.';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                isValid = false;
            } else {
                setErrors({});
            }
        }
        
        setFormError(errorMsg);
        
        if(isValid) {
            setFormError(''); // Clear general error on success
            setStep(s => Math.min(s + 1, 4));
        }
    };
    const handlePrevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const handleSelectDate = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        if (selectedDate >= new Date(new Date().toDateString())) {
            setBookingDetails(prev => ({ ...prev, date: selectedDate, time: '' })); // Reset time when date changes
        }
    };
    
    const renderCalendar = () => {
        const blanks = Array(firstDayOfMonth).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const today = new Date();

        return (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <button type="button" onClick={() => setCurrentMonth(m => m - 1)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Previous month">&lt;</button>
                    <span className="font-semibold">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button type="button" onClick={() => setCurrentMonth(m => m + 1)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Next month">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-medium text-slate-500" aria-hidden="true">{d}</div>)}
                    {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
                    {days.map(day => {
                        const date = new Date(currentYear, currentMonth, day);
                        const isToday = date.toDateString() === today.toDateString();
                        const isSelected = date.toDateString() === bookingDetails.date.toDateString();
                        const isPast = date < new Date(today.toDateString());

                        return (
                            <button
                                type="button"
                                key={day}
                                onClick={() => handleSelectDate(day)}
                                disabled={isPast}
                                aria-pressed={isSelected}
                                aria-label={date.toDateString()}
                                className={`w-8 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 ${
                                    isPast 
                                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' 
                                        : isSelected 
                                            ? 'bg-indigo-600 text-white font-bold' 
                                            : isToday 
                                                ? 'text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500'
                                                : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {day}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderStep = () => {
        switch (step) {
            case 1: // Select Service
                return (
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Select a Service</h3>
                        {formError && (
                            <div key={formError} role="alert" className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400 animate-shake">
                                <span className="flex-shrink-0 w-5 h-5 mr-2"><InformationCircleIcon /></span>
                                <span className="font-medium">{formError}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                            {servicesData.map(service => (
                                <button
                                    type="button"
                                    key={service.title}
                                    onClick={() => {
                                        setBookingDetails(prev => ({ ...prev, service: service.title }));
                                        if (formError) setFormError('');
                                    }}
                                    aria-pressed={bookingDetails.service === service.title}
                                    className={`p-4 rounded-lg text-center transition-all duration-200 border-2 h-full flex flex-col items-center justify-center ${
                                        bookingDetails.service === service.title 
                                        ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30' 
                                        : 'bg-slate-50 border-transparent hover:border-indigo-400 dark:bg-slate-800/50 dark:hover:border-indigo-500'
                                    }`}
                                >
                                    <div className="text-3xl mx-auto mb-2 flex-shrink-0">{service.icon}</div>
                                    <p className="text-sm font-semibold flex-grow flex items-center">{service.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2: // Choose Date & Time
                return (
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Choose a Date & Time</h3>
                        {formError && (
                             <div key={formError} role="alert" className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400 animate-shake">
                                <span className="flex-shrink-0 w-5 h-5 mr-2"><InformationCircleIcon /></span>
                                <span className="font-medium">{formError}</span>
                            </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-6">
                            {renderCalendar()}
                            <div>
                                <h4 className="font-semibold mb-2 text-center">{bookingDetails.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
                                <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-2">
                                    {availableTimes.map(time => (
                                        <button
                                            type="button"
                                            key={time}
                                            onClick={() => {
                                                setBookingDetails(prev => ({ ...prev, time }));
                                                if (formError) setFormError('');
                                            }}
                                            aria-pressed={bookingDetails.time === time}
                                            className={`p-2 rounded-md text-sm transition-colors ${
                                                bookingDetails.time === time
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'
                                            }`}
                                        >{time}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3: // Your Details
                return (
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Your Details</h3>
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                    <input type="text" id="name" value={bookingDetails.name} onChange={e => setBookingDetails(p => ({...p, name: e.target.value}))} className={`w-full px-3 py-2 border rounded-md dark:bg-slate-700 ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                    <input type="email" id="email" value={bookingDetails.email} onChange={e => setBookingDetails(p => ({...p, email: e.target.value}))} className={`w-full px-3 py-2 border rounded-md dark:bg-slate-700 ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                             <div>
                                <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company (Optional)</label>
                                <input type="text" id="company" value={bookingDetails.company} onChange={e => setBookingDetails(p => ({...p, company: e.target.value}))} className="w-full px-3 py-2 border rounded-md dark:bg-slate-700 border-slate-300 dark:border-slate-600" />
                            </div>
                             <div>
                                <label htmlFor="details" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Details (Optional)</label>
                                <textarea id="details" rows={3} value={bookingDetails.details} onChange={e => setBookingDetails(p => ({...p, details: e.target.value}))} className="w-full px-3 py-2 border rounded-md dark:bg-slate-700 border-slate-300 dark:border-slate-600"></textarea>
                            </div>
                        </div>
                    </div>
                );
            case 4: // Confirmation
                return (
                    <div className="text-center">
                        <CheckCircleIcon />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">Consultation Booked!</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Thank you, {bookingDetails.name}.</p>
                        <div className="mt-6 text-left bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                             <p className="font-semibold text-slate-800 dark:text-slate-200">A confirmation for your {bookingDetails.service} consultation has been sent to {bookingDetails.email}.</p>
                             <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><CalendarIcon /><span>{bookingDetails.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></li>
                                <li className="flex items-center gap-2"><ClockIcon /><span>{bookingDetails.time}</span></li>
                             </ul>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <section id="consultation" className="py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Book a Free Consultation</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                        Schedule a complimentary call with one of our experts to discuss your project.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                    <div className="mb-6">
                         {/* Progress Bar */}
                         <div 
                            role="progressbar"
                            aria-label="Booking progress"
                            aria-valuenow={step}
                            aria-valuemin={1}
                            aria-valuemax={4}
                            className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full"
                         >
                             <div className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                         </div>
                    </div>
                   
                    <div className="min-h-[300px]">
                        {renderStep()}
                    </div>
                    
                    {step < 4 && (
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                disabled={step === 1}
                                className="px-5 py-2 text-sm font-semibold rounded-md transition-all duration-300 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md"
                            >
                                {step === 3 ? 'Confirm Booking' : 'Next Step'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
             <style>{`
                @keyframes shake {
                  10%, 90% { transform: translate3d(-1px, 0, 0); }
                  20%, 80% { transform: translate3d(2px, 0, 0); }
                  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                  40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .animate-shake {
                  animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </section>
    );
};

export default Booking;
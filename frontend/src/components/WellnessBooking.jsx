import React, { useState, useEffect } from "react";

export default function WellnessBooking({ counselor, onSuccess }) {

    // --- State Management ---
    const [selectedDate, setSelectedDate] = useState('');
    const [availableDates, setAvailableDates] = useState([]);

    const [daySlots, setDaySlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {

        const dates = [];
        const today = new Date();

        for (let i = 1; i <= 7; i++) {
            const nextDate = new Date(today);

            nextDate.setDate(today.getDate() + i);
            dates.push(nextDate.toISOString().split('T')[0]);
        }

        setAvailableDates(dates);
        setSelectedDate(dates[0]);
    }, [])


    // Fetching the slots whenever the date is changed by the user
    useEffect(() => {
        if (!selectedDate || !counselor) return;

        const fetchSlots = async () => {
            setIsLoading(true);
            setSelectedSlot(null);

            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const token = localStorage.getItem('accessToken');

                const response = await fetch(`${API_URL}/api/wellbeing/slots?counselorId=${counselor.id}&date=${selectedDate}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch slots from server.");
                }

                const realBackendData = await response.json();


                // Saving the real data to state to draw the buttons
                setDaySlots(realBackendData);

            } catch (err) {
                console.error("Failed to fetch slots:", err);


                // Fallback safety: Showing empty slots if the backend crashes so that the app doesn't break.
                setDaySlots([
                    { time: "09:00 AM", isBooked: false },
                    { time: "10:00 AM", isBooked: false },
                    { time: "11:30 AM", isBooked: false },
                    { time: "02:00 PM", isBooked: false },
                    { time: "03:30 PM", isBooked: false },
                    { time: "05:00 PM", isBooked: false },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlots();
    }, [selectedDate, counselor]);


    // Handling Booking Submission
    const handleBookSlot = async (e) => {
        e.preventDefault();

        if (!selectedSlot || !category) {
            alert("Please select a time slot and a reason for your visit.");
            return;
        }

        setIsSubmitting(true);

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const token = localStorage.getItem('accessToken');

            const payload = {
                counselorId: counselor.id,
                preferredDate: selectedDate,
                preferredTime: selectedSlot.time,
                category: category,
                notes: notes
            };

            const response = await fetch(`${API_URL}/api/wellbeing/appointment/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                if (response.status === 409) throw new Error("Slot just got taken by someone else!");
                throw new Error(`Booking failed with status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("🎉 SUCCESS! Backend says:", responseData);

            // 5. Updating the UI
            setDaySlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.time === selectedSlot.time ? { ...slot, isBooked: true } : slot
                )
            );

            setBookingSuccess(true);
        } catch (err) {
            console.error("Booking Error Caught:", err);
            alert(err.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setBookingSuccess(false);
        setSelectedSlot(null);
        setCategory('');
        setNotes('');
    }


    return (
        <div className="w-full">
            <div className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-6">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold text-2xl">
                    {counselor?.initial || 'C'}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Book with {counselor?.name}</h1>
                    <p className="text-teal-600 font-medium">
                        {counselor?.specialty}
                    </p>
                </div>
            </div>

            {bookingSuccess ? (// SUCCESS STATE
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-teal-200 text-center animate-fade-in-up max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-teal-900 mb-2">Session Confirmed</h2>
                    <p className="text-slate-600 mb-6">
                        You are booked with <span className="font-bold">{counselor?.name}</span> on <span className="font-bold text-slate-800">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span> at <span className="font-bold text-slate-800">{selectedSlot?.time}</span>.
                    </p>
                    <button
                        // This triggers the parent's success function and passes the message!
                        onClick={() => onSuccess(`Session with ${counselor?.name} confirmed for ${selectedSlot?.time}!`)}
                        className="px-6 py-3 bg-teal-50 text-teal-700 font-bold rounded-xl hover:bg-teal-100 transition"
                    >
                        Return to Dashboard
                    </button>
                </div>) : (
                // BOOKING FORM
                <div>
                    <div>

                        <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span>📅</span> 1. Select Date & Time
                            </h3>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Available Dates</label>
                                <select
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 cursor-pointer"
                                >
                                    {availableDates.map(date => (
                                        <option key={date} value={date}>
                                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-600 mb-2">Available Slots</label>
                                {isLoading ? (
                                    <div className="animate-pulse flex space-x-4 p-4 border border-slate-100 rounded-xl bg-slate-100 h-32"></div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        {daySlots.map((slot, index) => {
                                            const isSelected = selectedSlot?.time === slot.time;
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    disabled={slot.isBooked}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border ${slot.isBooked
                                                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through decoration-slate-300'
                                                        : isSelected
                                                            ? 'bg-teal-600 text-white border-teal-600 shadow-md transform scale-[1.02]'
                                                            : 'bg-white text-teal-700 border-teal-200 hover:border-teal-400 hover:bg-teal-50'
                                                        }`}
                                                >
                                                    {slot.time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDE: Details Form */}
                        <div className="p-8">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span>📝</span> 2. Your Details
                            </h3>

                            <form onSubmit={handleBookSlot} className="space-y-5 flex flex-col h-full">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Primary Reason</label>
                                    <select
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                    >
                                        <option value="" disabled>Select a topic...</option>
                                        <option value="ACADEMIC_BURNOUT">Academic Stress / Burnout</option>
                                        <option value="HOMESICKNESS">Homesickness & Isolation</option>
                                        <option value="CAREER_ANXIETY">Career / Placement Anxiety</option>
                                        <option value="GENERAL_COUNSELING">General Wellness</option>
                                    </select>
                                </div>

                                <div className="flex-grow">
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                                        Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Anything specific you'd like them to know beforehand?"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-32"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedSlot}
                                    className={`w-full font-bold py-4 rounded-xl transition-all shadow-sm ${!selectedSlot
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-md transform hover:-translate-y-0.5'
                                        }`}
                                >
                                    {isSubmitting ? 'Confirming...' : selectedSlot ? `Confirm ${selectedSlot.time}` : 'Select a time slot'}
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );

}
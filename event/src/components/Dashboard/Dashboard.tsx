import React, { useState } from 'react';
import { useEventStore } from '../../store/eventStore';
import { Calendar, MapPin, Plus, Zap, Brain, FileText, QrCode, Share2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { events, setCurrentEvent } = useEventStore();
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // EventCard matches firstt.js style and logic
  const EventCard = ({ event }: any) => (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer"
      onClick={() => setCurrentEvent(event)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Icon logic can be added here if needed */}
          <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {event.status}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{event.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</span>
          <MapPin className="w-4 h-4 ml-2" />
          <span>{event.location}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{event.guests ? event.guests.length : 0}</div>
            <div className="text-gray-500">Guests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{event.budget ? (event.budget.spent/1000).toFixed(0) : 0}k</div>
            <div className="text-gray-500">Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{event.tasks && event.tasks.length > 0 ? Math.round((event.tasks.filter((t: any) => t.status === 'completed').length / event.tasks.length) * 100) : 0}%</div>
            <div className="text-gray-500">Complete</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${event.tasks && event.tasks.length > 0 ? Math.round((event.tasks.filter((t: any) => t.status === 'completed').length / event.tasks.length) * 100) : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Events</h1>
          <p className="text-gray-600 mt-1">Manage all your events from one place</p>
        </div>
        <button 
          onClick={() => setShowNewEventModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-medium">AI Assistant</div>
            <div className="text-xs text-gray-500">Get suggestions</div>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium">Templates</div>
            <div className="text-xs text-gray-500">Start quickly</div>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium">Check-in</div>
            <div className="text-xs text-gray-500">Event day</div>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
            <Share2 className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <div className="font-medium">Share</div>
            <div className="text-xs text-gray-500">Collaborate</div>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Users, 
  MapPin,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { Event } from '../../types';
import { format } from 'date-fns';

export const EventList: React.FC = () => {
  const { events, setCurrentEvent, addEvent } = useEventStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: 'New Event',
      type: 'personal',
      description: 'Event description',
      startDate: new Date(),
      endDate: new Date(),
      location: 'TBD',
      status: 'planning',
      budget: {
        total: 10000,
        spent: 0,
        remaining: 10000,
        categories: [
          { id: '1', name: 'Venue', allocated: 4000, spent: 0, color: '#8B5CF6' },
          { id: '2', name: 'Catering', allocated: 3000, spent: 0, color: '#06B6D4' },
          { id: '3', name: 'Entertainment', allocated: 2000, spent: 0, color: '#10B981' },
          { id: '4', name: 'Decorations', allocated: 1000, spent: 0, color: '#F59E0B' }
        ]
      },
      timeline: [],
      tasks: [],
      guests: [],
      vendors: [],
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addEvent(newEvent);
    setCurrentEvent(newEvent);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'professional': return '💼';
      case 'personal': return '🎉';
      case 'campus': return '🎓';
      case 'cultural': return '🕌';
      case 'community': return '🤝';
      default: return '📅';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600 mt-1">Manage all your events in one place</p>
        </div>
        <motion.button
          onClick={handleCreateEvent}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="professional">Professional</option>
          <option value="personal">Personal</option>
          <option value="campus">Campus</option>
          <option value="cultural">Cultural</option>
          <option value="community">Community</option>
        </select>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentEvent(event)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(event.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 capitalize">{event.type}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(event.startDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{event.guests.length} guests</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${event.budget.spent.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">
                    of ${event.budget.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' ? 'No events found' : 'No events yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first event to get started with planning'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <motion.button
              onClick={handleCreateEvent}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Event</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};
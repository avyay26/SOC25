import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User, 
  Calendar,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { useEventStore } from '../../store/eventStore';

export const Header: React.FC = () => {
  const { selectedView } = useEventStore();

  const getViewTitle = () => {
    switch (selectedView) {
      case 'overview': return 'Event Overview';
      case 'timeline': return 'Event Timeline';
      case 'tasks': return 'Task Management';
      case 'guests': return 'Guest Management';
      case 'vendors': return 'Vendor Management';
      case 'budget': return 'Budget Tracking';
      case 'assets': return 'Digital Assets';
      default: return 'EventFlow';
    }
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getViewTitle()}</h2>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events, tasks, guests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-600">Event Organizer</p>
            </div>
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
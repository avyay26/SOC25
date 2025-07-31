import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  CheckSquare,
  Users,
  Building2,
  DollarSign,
  FolderOpen,
  BarChart3,
  Plus,
  Settings
} from 'lucide-react';
import { useEventStore } from '../../store/eventStore';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'vendors', label: 'Vendors', icon: Building2 },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'assets', label: 'Assets', icon: FolderOpen },
];

export const Sidebar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { selectedView, setSelectedView, currentEvent } = useEventStore();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white border-r border-gray-200 h-full flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center focus:outline-none hover:scale-105 transition"
            aria-label="Toggle sidebar"
            type="button"
          >
            <Calendar className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">EventFlow</h1>
        </div>
      </div>

      {/* Current Event */}
      {currentEvent && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm">{currentEvent.title}</h3>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(currentEvent.startDate).toLocaleDateString()}
            </p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                currentEvent.status === 'planning' ? 'bg-yellow-400' :
                currentEvent.status === 'in-progress' ? 'bg-blue-400' :
                currentEvent.status === 'completed' ? 'bg-green-400' : 'bg-gray-400'
              }`} />
              <span className="text-xs text-gray-600 capitalize">{currentEvent.status}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setSelectedView(item.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          className="w-full flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Event</span>
        </motion.button>
        <motion.button
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mt-2 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
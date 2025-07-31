import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  CheckSquare,
  TrendingUp,
  AlertTriangle,
  Clock,
  MapPin
} from 'lucide-react';
import { useEventStore } from '../../store/eventStore';
import { format } from 'date-fns';

export const EventOverview: React.FC = () => {
  const { currentEvent } = useEventStore();

  if (!currentEvent) {
    return (
      <div className="p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Event Selected</h3>
        <p className="text-gray-600">Select an event from the sidebar to view its overview.</p>
      </div>
    );
  }

  const completedTasks = currentEvent.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = currentEvent.tasks.length;
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const confirmedGuests = currentEvent.guests.filter(guest => guest.rsvpStatus === 'accepted').length;
  const totalGuests = currentEvent.guests.length;

  const budgetUsed = (currentEvent.budget.spent / currentEvent.budget.total) * 100;

  const stats = [
    {
      label: 'Task Progress',
      value: `${completedTasks}/${totalTasks}`,
      percentage: taskProgress,
      icon: CheckSquare,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Guest Confirmations',
      value: `${confirmedGuests}/${totalGuests}`,
      percentage: totalGuests > 0 ? (confirmedGuests / totalGuests) * 100 : 0,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'Budget Used',
      value: `$${currentEvent.budget.spent.toLocaleString()}`,
      percentage: budgetUsed,
      icon: DollarSign,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      label: 'Vendors Booked',
      value: `${currentEvent.vendors.length}`,
      percentage: 85, // Mock percentage
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  const upcomingTasks = currentEvent.tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Event Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{currentEvent.title}</h1>
            <p className="text-purple-100 mb-4">{currentEvent.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(currentEvent.startDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{currentEvent.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="capitalize">{currentEvent.status}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm text-purple-100">Days Until Event</p>
              <p className="text-2xl font-bold">
                {Math.ceil((new Date(currentEvent.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-xl p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={stat.textColor}>{stat.label}</span>
                  <span className={stat.textColor}>{stat.percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <motion.div
                    className={stat.color}
                    style={{ width: `${stat.percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="h-2 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
            <CheckSquare className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'urgent' ? 'bg-red-500' :
                    task.priority === 'high' ? 'bg-orange-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">Due: {format(new Date(task.dueDate), 'MMM dd')}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming tasks</p>
            )}
          </div>
        </motion.div>

        {/* Budget Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Budget Breakdown</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {currentEvent.budget.categories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-600">
                    ${category.spent.toLocaleString()} / ${category.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: category.color, width: `${(category.spent / category.allocated) * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.spent / category.allocated) * 100}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Budget</span>
              <span className="font-semibold text-gray-900">
                ${currentEvent.budget.spent.toLocaleString()} / ${currentEvent.budget.total.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts & Notifications */}
      {(budgetUsed > 80 || taskProgress < 50) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Attention Required</h4>
              <div className="text-sm text-yellow-700 mt-1 space-y-1">
                {budgetUsed > 80 && <p>• Budget usage is at {budgetUsed.toFixed(0)}% - consider reviewing expenses</p>}
                {taskProgress < 50 && <p>• Task completion is behind schedule - {taskProgress.toFixed(0)}% complete</p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
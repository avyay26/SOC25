import React, { useState } from 'react';
import { useEventStore } from '../../store/eventStore';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const TaskView: React.FC = () => {
  const { currentEvent, addTask, updateTask, deleteTask, setSelectedView } = useEventStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });

  if (!currentEvent) {
    return <div className="p-6 text-gray-600">No event selected.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) return;
    addTask(currentEvent.id, {
      id: Date.now().toString(),
      ...form,
      dueDate: new Date(form.dueDate),
      status: 'pending',
      eventId: currentEvent.id,
      priority: form.priority as 'low' | 'medium' | 'high' | 'urgent',
    });
    setForm({ title: '', description: '', assignee: '', dueDate: '', priority: 'medium', category: '' });
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tasks for {currentEvent.title}</h2>
      <form onSubmit={handleAddTask} className="mb-6 flex flex-wrap gap-4 items-end bg-gray-50 p-4 rounded-lg shadow">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Task Title" className="border rounded-lg p-2 flex-1 min-w-[150px]" />
        <div className="relative">
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <select
            id="assignee"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base transition w-40"
          >
            <option value="">Select Assignee</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
            <option value="David">David</option>
            <option value="Eve">Eve</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-8 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="border rounded-lg p-2 flex-1 min-w-[120px]" />
        <div className="relative">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base transition w-40"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-8 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        <div className="relative">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base transition w-44"
          >
            <option value="">Select Category</option>
            <option value="Logistics">Vendor Booking</option>
            <option value="Catering">Vendor enquiry</option>
            <option value="Decor">Decor</option>
            <option value="Invitations">Invitations</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-8 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded-lg p-2 flex-1 min-w-[180px]" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Add Task</button>
      </form>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Task List</h3>
        {currentEvent.tasks.length === 0 ? (
          <div className="text-gray-500 italic">No tasks added yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {currentEvent.tasks.map(task => (
              <li key={task.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{task.title}</div>
                  <div className="text-sm text-gray-600">Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</div>
                  <div className="text-xs text-gray-500">Priority: {task.priority} | Status: {task.status}</div>
                  <div className="text-xs text-gray-500">Assignee: {task.assignee} | Category: {task.category}</div>
                  <div className="text-xs text-gray-500">{task.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateTask(currentEvent.id, task.id, { status: task.status === 'completed' ? 'pending' : 'completed' })} className={`px-3 py-1 rounded text-xs font-semibold ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} hover:bg-green-200 transition`}>
                    {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                  </button>
                  {/* Call Assignee button */}
                  {task.assignee && (
                    <button
                      onClick={() => window.open(`tel:${task.assignee}`, '_self')}
                      className="px-3 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
                    >
                      Call Assignee
                    </button>
                  )}
                  {(task.category === 'Logistics' || task.category === 'Catering') && (
                    <button
                      onClick={() => setSelectedView('vendors')}
                      className="px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      Go to Vendor
                    </button>
                  )}
                  {task.category === 'Invitations' && (
                    <button
                      onClick={() => setSelectedView('guests')}
                      className="px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      Go to Guests
                    </button>
                  )}
                  <button onClick={() => deleteTask(currentEvent.id, task.id)} className="px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskView;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { EventOverview } from './components/Dashboard/EventOverview';
import { EventList } from './components/Dashboard/EventList';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useEventStore } from './store/eventStore';
import { Event } from './types';
import EventOverviewCards from './components/Dashboard/EventOverviewCards';
import TimelineView from './components/Dashboard/TimelineView';
import AssetView from './components/Dashboard/AssetView';
import GuestView from './components/Dashboard/GuestView';
import TaskView from './components/Dashboard/TaskView';
import VendorView from './components/Dashboard/VendorView';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Sample data for demonstration
const sampleEvents: Event[] = [
  {
    id: '1',
    title: "Sarah's 25th Birthday Bash",
    type: 'personal',
    description: '',
    startDate: new Date('2025-07-15'),
    endDate: new Date('2025-07-15'),
    location: 'Backyard Garden',
    status: 'planning', // changed from 'active' to match allowed types
    budget: {
      total: 15000,
      spent: 9750,
      remaining: 5250,
      categories: []
    },
    timeline: [
      {
        id: '1',
        title: 'Guest Arrival',
        description: 'Welcome and registration',
        startTime: new Date('2025-07-15T10:00:00'),
        endTime: new Date('2025-07-15T10:30:00'),
        location: 'Main Gate',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Cake Cutting',
        description: 'Birthday cake ceremony',
        startTime: new Date('2025-07-15T11:00:00'),
        endTime: new Date('2025-07-15T11:30:00'),
        location: 'Garden Center',
        status: 'pending'
      },
      {
        id: '3',
        title: 'Games & Activities',
        description: 'Fun games for all guests',
        startTime: new Date('2025-07-15T12:00:00'),
        endTime: new Date('2025-07-15T13:00:00'),
        location: 'Play Area',
        status: 'pending'
      }
    ],
    tasks: [],
    guests: [],
    vendors: [],
    assets: [],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-15')
  },
  {
    id: '2',
    title: 'Q3 Team Offsite',
    type: 'professional',
    description: '',
    startDate: new Date('2025-08-20'),
    endDate: new Date('2025-08-20'),
    location: 'Resort Paradise',
    status: 'planning',
    budget: {
      total: 50000,
      spent: 12000,
      remaining: 38000,
      categories: []
    },
    timeline: [
      {
        id: '1',
        title: 'Check-in',
        description: 'Team check-in at resort',
        startTime: new Date('2025-08-20T09:00:00'),
        endTime: new Date('2025-08-20T09:30:00'),
        location: 'Lobby',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Opening Session',
        description: 'Welcome and agenda overview',
        startTime: new Date('2025-08-20T10:00:00'),
        endTime: new Date('2025-08-20T11:00:00'),
        location: 'Conference Hall',
        status: 'pending'
      }
    ],
    tasks: [],
    guests: [],
    vendors: [],
    assets: [],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-15')
  },
  {
    id: '3',
    title: 'Annual Tech Fest',
    type: 'campus',
    description: '',
    startDate: new Date('2025-09-10'),
    endDate: new Date('2025-09-10'),
    location: 'University Auditorium',
    status: 'planning',
    budget: {
      total: 200000,
      spent: 25000,
      remaining: 175000,
      categories: []
    },
    timeline: [
      {
        id: '1',
        title: 'Registration',
        description: 'Attendee registration',
        startTime: new Date('2025-09-10T08:00:00'),
        endTime: new Date('2025-09-10T09:00:00'),
        location: 'Entrance',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Keynote Speech',
        description: 'Opening keynote by guest speaker',
        startTime: new Date('2025-09-10T09:30:00'),
        endTime: new Date('2025-09-10T10:30:00'),
        location: 'Main Hall',
        status: 'pending'
      }
    ],
    tasks: [],
    guests: [],
    vendors: [],
    assets: [],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-15')
  }
];

function App() {
  const { events, addEvent, setCurrentEvent, currentEvent, selectedView } = useEventStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Deduplicate events by id before rendering
  const uniqueEvents = React.useMemo(() => {
    const map = new Map();
    events.forEach(e => {
      if (!map.has(e.id)) map.set(e.id, e);
    });
    return Array.from(map.values());
  }, [events]);

  useEffect(() => {
    // Only add sample events if there are no events in the store
    if (events.length === 0) {
      sampleEvents.forEach(event => addEvent(event));
      setCurrentEvent(sampleEvents[0]);
    }
  }, []); // Only run once on mount

  const renderMainContent = () => {
    if (!currentEvent) {
      // Show dashboard if no event is selected
      return <Dashboard />;
    }

    switch (selectedView) {
      case 'overview':
        return <EventOverviewCards />;
      case 'timeline':
        return <TimelineView />;
      case 'tasks':
        return <TaskView />;
      case 'guests':
        // Pass uniqueEvents to GuestView to avoid duplicates
        return <GuestView />;
      case 'vendors':
        return <VendorView />;
      case 'budget':
        return <div className="p-6">Budget tracking view coming soon...</div>;
      case 'assets':
        return <AssetView />;
      default:
        return <EventOverviewCards />;
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 relative">
        {sidebarOpen && (
          <>
            <Sidebar onToggleSidebar={() => setSidebarOpen((open) => !open)} />
            {/* Arrow button to hide sidebar, left edge */}
            <button
              aria-label="Hide sidebar"
              onClick={() => setSidebarOpen(false)}
              className="fixed top-1/2 left-64 z-50 transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg shadow-md p-2 flex items-center justify-center hover:bg-gray-100 transition"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
        {/* Arrow button to reveal sidebar when hidden, left edge */}
        {!sidebarOpen && (
          <button
            aria-label="Show sidebar"
            onClick={() => setSidebarOpen(true)}
            className="fixed top-1/2 left-0 z-50 transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg shadow-md p-2 flex items-center justify-center hover:bg-gray-100 transition"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={renderMainContent()} />
              <Route path="/events" element={<EventList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
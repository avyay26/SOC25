import { create } from 'zustand';
import { Event, Task, Guest, Vendor, TimelineItem } from '../types';

interface EventStore {
  events: Event[];
  currentEvent: Event | null;
  selectedView: 'overview' | 'timeline' | 'tasks' | 'guests' | 'vendors' | 'budget' | 'assets';
  
  // Actions
  setCurrentEvent: (event: Event | null) => void;
  setSelectedView: (view: EventStore['selectedView']) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  // Task actions
  addTask: (eventId: string, task: Task) => void;
  updateTask: (eventId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (eventId: string, taskId: string) => void;
  
  // Guest actions
  addGuest: (eventId: string, guest: Guest) => void;
  updateGuest: (eventId: string, guestId: string, updates: Partial<Guest>) => void;
  deleteGuest: (eventId: string, guestId: string) => void;
  
  // Vendor actions
  addVendor: (eventId: string, vendor: Vendor) => void;
  updateVendor: (eventId: string, vendorId: string, updates: Partial<Vendor>) => void;
  deleteVendor: (eventId: string, vendorId: string) => void;
  
  // Timeline actions
  addTimelineItem: (eventId: string, item: TimelineItem) => void;
  updateTimelineItem: (eventId: string, itemId: string, updates: Partial<TimelineItem>) => void;
  deleteTimelineItem: (eventId: string, itemId: string) => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  currentEvent: null,
  selectedView: 'overview',
  
  setCurrentEvent: (event) => set({ currentEvent: event }),
  setSelectedView: (view) => set({ selectedView: view }),
  
  addEvent: (event) => set((state) => ({ 
    events: [...state.events, event] 
  })),
  
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ),
    currentEvent: state.currentEvent?.id === id 
      ? { ...state.currentEvent, ...updates } 
      : state.currentEvent
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(event => event.id !== id),
    currentEvent: state.currentEvent?.id === id ? null : state.currentEvent
  })),
  
  addTask: (eventId, task) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, tasks: [...event.tasks, task] }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, tasks: [...state.currentEvent.tasks, task] }
      : state.currentEvent
  })),
  
  updateTask: (eventId, taskId, updates) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { 
            ...event, 
            tasks: event.tasks.map(task => 
              task.id === taskId ? { ...task, ...updates } : task
            )
          }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? {
          ...state.currentEvent,
          tasks: state.currentEvent.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        }
      : state.currentEvent
  })),
  
  deleteTask: (eventId, taskId) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, tasks: event.tasks.filter(task => task.id !== taskId) }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, tasks: state.currentEvent.tasks.filter(task => task.id !== taskId) }
      : state.currentEvent
  })),
  
  addGuest: (eventId, guest) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, guests: [...event.guests, guest] }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, guests: [...state.currentEvent.guests, guest] }
      : state.currentEvent
  })),
  
  updateGuest: (eventId, guestId, updates) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { 
            ...event, 
            guests: event.guests.map(guest => 
              guest.id === guestId ? { ...guest, ...updates } : guest
            )
          }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? {
          ...state.currentEvent,
          guests: state.currentEvent.guests.map(guest =>
            guest.id === guestId ? { ...guest, ...updates } : guest
          )
        }
      : state.currentEvent
  })),
  
  deleteGuest: (eventId, guestId) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, guests: event.guests.filter(guest => guest.id !== guestId) }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, guests: state.currentEvent.guests.filter(guest => guest.id !== guestId) }
      : state.currentEvent
  })),
  
  addVendor: (eventId, vendor) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, vendors: [...event.vendors, vendor] }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, vendors: [...state.currentEvent.vendors, vendor] }
      : state.currentEvent
  })),
  
  updateVendor: (eventId, vendorId, updates) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { 
            ...event, 
            vendors: event.vendors.map(vendor => 
              vendor.id === vendorId ? { ...vendor, ...updates } : vendor
            )
          }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? {
          ...state.currentEvent,
          vendors: state.currentEvent.vendors.map(vendor =>
            vendor.id === vendorId ? { ...vendor, ...updates } : vendor
          )
        }
      : state.currentEvent
  })),
  
  deleteVendor: (eventId, vendorId) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, vendors: event.vendors.filter(vendor => vendor.id !== vendorId) }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, vendors: state.currentEvent.vendors.filter(vendor => vendor.id !== vendorId) }
      : state.currentEvent
  })),
  
  addTimelineItem: (eventId, item) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, timeline: [...event.timeline, item] }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, timeline: [...state.currentEvent.timeline, item] }
      : state.currentEvent
  })),
  
  updateTimelineItem: (eventId, itemId, updates) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { 
            ...event, 
            timeline: event.timeline.map(item => 
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? {
          ...state.currentEvent,
          timeline: state.currentEvent.timeline.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        }
      : state.currentEvent
  })),
  
  deleteTimelineItem: (eventId, itemId) => set((state) => ({
    events: state.events.map(event =>
      event.id === eventId 
        ? { ...event, timeline: event.timeline.filter(item => item.id !== itemId) }
        : event
    ),
    currentEvent: state.currentEvent?.id === eventId
      ? { ...state.currentEvent, timeline: state.currentEvent.timeline.filter(item => item.id !== itemId) }
      : state.currentEvent
  }))
}));
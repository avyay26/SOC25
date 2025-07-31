export interface Event {
  id: string;
  title: string;
  type: 'professional' | 'personal' | 'campus' | 'cultural' | 'community';
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled';
  budget: Budget;
  timeline: TimelineItem[];
  tasks: Task[];
  guests: Guest[];
  vendors: Vendor[];
  assets: Asset[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  assignee?: string;
  status: 'pending' | 'in-progress' | 'completed';
  dependencies?: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  eventId: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  familycount:string;
  rsvpStatus: 'pending' | 'accepted' | 'declined' | 'maybe';
  checkedIn: boolean;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  rating: number;
  services: string[];
  contracts: Contract[];
  totalCost: number;
}

export interface Contract {
  id: string;
  vendorId: string;
  amount: number;
  status: 'draft' | 'sent' | 'signed' | 'paid';
  dueDate: Date;
  description: string;
}

export interface Budget {
  total: number;
  categories: BudgetCategory[];
  spent: number;
  remaining: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  url: string;
  size: number;
  uploadedAt: Date;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'organizer' | 'collaborator' | 'viewer';
}
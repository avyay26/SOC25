import React, { useState } from 'react';
import { useEventStore } from '../../store/eventStore';
import { Sparkles, Trophy, CheckCircle, Pencil } from 'lucide-react';

const TimelineView: React.FC = () => {
  const { events, updateTimelineItem } = useEventStore();
  const event = events[0];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  if (!event) {
    return <div className="p-6 text-gray-500">No event found.</div>;
  }

  const totalItems = event.timeline?.length || 0;
  const completedItems = event.timeline?.filter((item: any) => item.status === 'completed').length || 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const allDone = totalItems > 0 && completedItems === totalItems;

  const handleStatusChange = (itemId: string, status: 'pending' | 'completed') => {
    updateTimelineItem(event.id, itemId, { status });
  };

  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      description: item.description,
      location: item.location,
      startTime: item.startTime ? new Date(item.startTime).toISOString().slice(0,16) : '',
      endTime: item.endTime ? new Date(item.endTime).toISOString().slice(0,16) : '',
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (itemId: string) => {
    updateTimelineItem(event.id, itemId, {
      title: editForm.title,
      description: editForm.description,
      location: editForm.location,
      startTime: editForm.startTime ? new Date(editForm.startTime) : undefined,
      endTime: editForm.endTime ? new Date(editForm.endTime) : undefined,
    });
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
        <h3 className="text-2xl font-bold text-blue-700">{event.title} Timeline</h3>
        {allDone && (
          <span className="flex items-center gap-1 text-green-600 font-semibold ml-4">
            <Trophy className="w-6 h-6" /> All timeline items completed!
          </span>
        )}
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">Progress</span>
          <span className="text-sm font-medium text-blue-700">{completedItems}/{totalItems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 flex items-center"
            style={{ width: `${progress}%` }}
          >
            {progress > 0 && (
              <CheckCircle className="w-5 h-5 text-white ml-auto mr-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
        <p className="text-gray-600 mb-4">{event.location} | {event.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</p>
        {event.timeline && event.timeline.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-2 px-4 font-semibold text-gray-700">Time</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Title</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Description</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Location</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Status</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Action</th>
                  <th className="py-2 px-4 font-semibold text-gray-700">Edit</th>
                </tr>
              </thead>
              <tbody>
                {event.timeline.map((item: any) => (
                  <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${item.status === 'completed' ? 'bg-green-50' : ''}`}>
                    <td className="py-2 px-4">
                      {editingId === item.id ? (
                        <>
                          <input type="datetime-local" name="startTime" value={editForm.startTime || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-36 mb-1" />
                          <br />
                          <input type="datetime-local" name="endTime" value={editForm.endTime || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-36" />
                        </>
                      ) : (
                        <>
                          {item.startTime ? new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : item.time || ''}
                          {item.endTime ? ' - ' + new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </>
                      )}
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-800">
                      {editingId === item.id ? (
                        <input name="title" value={editForm.title || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" />
                      ) : (
                        item.title
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editingId === item.id ? (
                        <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" />
                      ) : (
                        item.description || ''
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editingId === item.id ? (
                        <input name="location" value={editForm.location || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" />
                      ) : (
                        item.location ? (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 transition"
                          >
                            {item.location}
                          </a>
                        ) : ''
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{item.status || ''}</span>
                    </td>
                    <td className="py-2 px-4">
                      <select
                        value={item.status}
                        onChange={e => handleStatusChange(item.id, e.target.value as 'pending' | 'completed')}
                        className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Done</option>
                      </select>
                    </td>
                    <td className="py-2 px-4">
                      {editingId === item.id ? (
                        <>
                          <button onClick={() => handleEditSave(item.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                          <button onClick={() => setEditingId(null)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded">Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-900"><Pencil className="inline w-4 h-4 mr-1" />Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500 italic">No timeline items for this event.</div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;

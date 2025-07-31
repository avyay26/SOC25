import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Guest } from '../../types';
import { useEventStore } from '../../store/eventStore';
import { AlignCenter } from 'lucide-react';
// import { ChevronLeft } from 'lucide-react'; // optional: for icons

const GuestView: React.FC = () => {
  const { currentEvent, addGuest, updateGuest } = useEventStore();
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '',familycount:'' });
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [importedGuests, setImportedGuests] = useState<Guest[]>([]);

  if (!currentEvent) {
    return <div className="p-6 text-gray-600">No event selected.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.email) return;
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.whatsapp,
      familycount:form.familycount,
      rsvpStatus: 'pending',
      checkedIn: false
    };
    addGuest(currentEvent.id, newGuest);
    setForm({ name: '', whatsapp: '', email: '',familycount:'' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

     const guests: Guest[] = (rows as any[]).map((row, idx) => ({
  id: Date.now().toString() + idx,
  name: row['Guest Name'] ?? '',
  email: row['Email'] ?? '',
  phone: row['WhatsApp No'] ?? '',
  familycount: row['No. of Members in Family'] ?? '0',
  rsvpStatus: 'pending',
  checkedIn: false
}));

      guests.forEach(g => addGuest(currentEvent.id, g));
      setImportedGuests(guests);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, guestId: string) => {
    const updatedGuests = currentEvent.guests.map(g =>
      g.id === guestId ? { ...g, [e.target.name]: e.target.value } : g
    );
    useEventStore.setState(prev => ({
      ...prev,
      currentEvent: {
        ...prev.currentEvent!,
        guests: updatedGuests
      }
    }));
  };

  const handleSaveEdit = (guest: Guest) => {
    updateGuest(currentEvent.id, guest.id, guest);
    setEditingGuestId(null);
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Guests for {currentEvent.title}</h2>

      {/* Add Guest Form */}
      <form onSubmit={handleAddGuest} className="mb-6 flex flex-wrap gap-4 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Guest Name" className="border border-blue-500 rounded-lg p-2 shadow-lg" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="border border-blue-500 rounded-lg p-2 shadow-lg" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border border-blue-500 rounded-lg p-2 shadow-lg" />
         <input name="familycount" value={form.familycount} onChange={handleChange} placeholder="GuestCount" className="border border-blue-500 rounded-lg p-2 shadow-lg" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Add Guest</button>
      </form>

      {/* Excel Import */}
    <div className='flex justify border-blue-500 shadow-md bg-gray-0'>
     <div className="mb-6 p-6 bg-white shadow-md rounded-2xl border border-blue-200 max-w-md">
  <label className="block mb-3 text-lg font-semibold text-green-600">
    📥 Import from Excel
  </label>
  <input
    type="file"
    accept=".xlsx, .xls"
    onChange={handleFileUpload}
    className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               transition duration-150 ease-in-out"
  />
  </div>
</div>
      {/* Guest Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentEvent.guests && currentEvent.guests.length > 0 ? (
          currentEvent.guests.map((guest: Guest) => (
           <div
  key={guest.id}
  className={`p-5 rounded-2xl shadow-md relative space-y-3 hover:shadow-lg transition duration-200 ${
    Number(guest.familycount) >= 3 ? 'bg-blue-50' : 'bg-green-50'
  } border border-gray-200`}
>

              {editingGuestId === guest.id ? (
                <>
                  <input
                    name="name"
                    value={guest.name}
                    onChange={(e) => handleEditChange(e, guest.id)}
                    className="w-full p-1 border rounded"
                  />
                  <input
                    name="phone"
                    value={guest.phone}
                    onChange={(e) => handleEditChange(e, guest.id)}
                    className="w-full p-1 border rounded"
                  />
                  <input
                    name="email"
                    value={guest.email}
                    onChange={(e) => handleEditChange(e, guest.id)}
                    className="w-full p-1 border rounded"
                  />
                   <input
                    name="Count"
                    value={guest.familycount}
                    onChange={(e) => handleEditChange(e, guest.id)}
                    className="w-full p-1 border rounded"
                  />
                  <button className="text-sm text-blue-600" onClick={() => handleSaveEdit(guest)}>Save</button>
                </>
              ) : (
                <>
                  <div className="font-bold text-lg text-blue-800 underline decoration-solid ">{guest.name}</div>
                  <div className="text-sm text-gray-600">WhatsApp: {guest.phone}</div>
                  <div className="text-sm text-gray-600">Email: {guest.email}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                      onClick={() => setEditingGuestId(guest.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                      onClick={() => setDropdownOpen(dropdownOpen === guest.id ? null : guest.id)}
                    >
                      Invite
                    </button>
                    <button
                      className={`text-sm px-2 py-1 rounded transition ${guest.rsvpStatus === 'accepted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-blue-200'}`}
                      onClick={() => {
                        if (guest.rsvpStatus !== 'accepted') {
                          useEventStore.getState().updateGuest(currentEvent.id, guest.id, { rsvpStatus: 'accepted' });
                        }
                      }}
                      disabled={guest.rsvpStatus === 'accepted'}
                    >
                      {guest.rsvpStatus === 'accepted' ? 'Accepted' : 'Mark as Accepted'}
                    </button>
                  </div>
                  {dropdownOpen === guest.id && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          const message = encodeURIComponent(`Hi ${guest.name}, you're invited to ${currentEvent.title}!`);
                          window.open(`https://wa.me/${guest.phone}?text=${message}`, '_blank');
                          setDropdownOpen(null);
                        }}
                      >
                        Digital Invite
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          alert('Physical invite selected. Please arrange for a physical invitation to be sent.');
                          setDropdownOpen(null);
                        }}
                      >
                        Physical Invite
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">No guests added yet.</div>
        )}
      </div>
    </div>
  );
};

export default GuestView;

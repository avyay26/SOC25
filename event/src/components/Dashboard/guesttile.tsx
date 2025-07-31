import React, { useState } from 'react';
import { Guest } from '../../types';

interface Props {
  guest: Guest;
  onUpdate: (updated: Guest) => void;
}

const GuestTile: React.FC<Props> = ({ guest, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...guest });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    onUpdate({ ...form });
    setEdit(false);
  };

  return (
    <div className="border p-4 rounded shadow space-y-2 bg-white">
      {edit ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="familyCount" value={form.familycount} onChange={handleChange} />
          <button onClick={saveChanges}>Save</button>
        </>
      ) : (
        <>
          <div><strong>Name:</strong> {guest.name}</div>
          <div><strong>WhatsApp:</strong> {guest.phone}</div>
          <div><strong>Email:</strong> {guest.email}</div>
          <div><strong>Family:</strong> {guest.familycount}</div>
          <button onClick={() => setEdit(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default GuestTile;

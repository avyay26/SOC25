'use client';
import React, { useState } from 'react';
import { useEventStore } from '../../store/eventStore';
import VendorCards from './VendorCards';
import { Vendor } from '../../types';

const VendorView: React.FC = () => {
  const { currentEvent, addVendor, deleteVendor, updateVendor } = useEventStore();

  const [form, setForm] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',
    rating: 5,
    services: '',
    totalCost: '',
  });

  if (!currentEvent) {
    return <div className="p-6 text-gray-600">No event selected.</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category) return;

    const newVendor: Vendor = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      contact: form.contact,
      email: form.email,
      rating: Number(form.rating),
      services: form.services
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      contracts: [],
      totalCost: Number(form.totalCost) || 0,
    };

    addVendor(currentEvent.id, newVendor);

    // Reset the form
    setForm({
      name: '',
      category: '',
      contact: '',
      email: '',
      rating: 5,
      services: '',
      totalCost: '',
    });
  };

  const handleDeleteVendor = (vendorId: string) => {
    deleteVendor(currentEvent.id, vendorId);
  };

  const handleUpdateVendor = (updatedVendor: Vendor) => {
    if (!currentEvent) return;

    updateVendor(currentEvent.id, updatedVendor.id, updatedVendor);
  };



  const handleExportVendors = () => {
    if (!currentEvent) {
      alert('No event selected for export.');
      return;
    }

    if (currentEvent.vendors.length === 0) {
      alert('No vendors to export.');
      return;
    }

    const dataStr = JSON.stringify(currentEvent.vendors, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentEvent.title.replace(/\s+/g, '_')}_vendors.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImportVendors = () => {
    if (!currentEvent) {
      alert('No event selected for import.');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const importedVendors: Partial<Vendor>[] = JSON.parse(text);

        importedVendors.forEach((vendor) => {
          const newVendor: Vendor = {
            id: vendor.id || `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            name: vendor.name || 'Unnamed Vendor',
            category: vendor.category || 'Uncategorized',
            contact: vendor.contact || '',
            email: vendor.email || '',
            rating: Number(vendor.rating) || 0,
            services: vendor.services || [],
            contracts: vendor.contracts || [],
            totalCost: Number(vendor.totalCost) || 0,
          };

          addVendor(currentEvent.id, newVendor);
        });
      } catch (err) {
        console.error('Error importing vendors:', err);
        alert('Invalid file format.');
      }
    };

    input.click();
  };


  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Vendors for {currentEvent.title}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={handleImportVendors} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm shadow">
            Import Vendors
          </button>

          <button
            onClick={handleExportVendors}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm shadow"
          >
            Export Vendors
          </button>
        </div>

      </div>


      <form
        onSubmit={handleAddVendor}
        className="mb-6 bg-gray-50 p-4 rounded-lg shadow flex flex-wrap gap-3 items-end"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Vendor Name"
          className="border rounded-md p-2 text-sm flex-1 min-w-[150px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded-md p-2 text-sm flex-1 min-w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border rounded-md p-2 text-sm flex-1 min-w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border rounded-md p-2 text-sm flex-1 min-w-[150px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          name="services"
          value={form.services}
          onChange={handleChange}
          placeholder="Services (comma separated)"
          className="border rounded-md p-2 text-sm flex-1 min-w-[150px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          name="totalCost"
          value={form.totalCost}
          onChange={handleChange}
          placeholder="Total Cost"
          type="number"
          className="border rounded-md p-2 text-sm flex-1 min-w-[100px] focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        <div className="flex flex-col min-w-[80px]">
          <label className="text-xs font-medium text-gray-600 mb-1">Rating</label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow hover:bg-blue-700 transition"
        >
          Add Vendor
        </button>
      </form>


      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Vendor List</h2>

        {currentEvent.vendors.length === 0 ? (
          <div className="text-gray-500 italic">No vendors added yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6">
            {currentEvent.vendors.map((vendor) => (
              <VendorCards
                key={vendor.id}
                vendor={vendor}
                onDelete={handleDeleteVendor}
                onUpdate={handleUpdateVendor}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default VendorView;

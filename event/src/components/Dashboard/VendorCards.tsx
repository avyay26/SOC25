'use client';
import React, { useState } from 'react';
import { Vendor } from '../../types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useEventStore } from '../../store/eventStore';
import { AiOutlinePhone, AiOutlineMail, AiOutlineDollarCircle, AiOutlineAppstore } from 'react-icons/ai';

interface VendorCardsProps {
    vendor: Vendor;
    onDelete: (vendorId: string) => void;
    onUpdate: (updatedVendor: Vendor) => void;
}

const VendorCards: React.FC<VendorCardsProps> = ({ vendor, onDelete, onUpdate }) => {
    const { currentEvent } = useEventStore();
    const [editMode, setEditMode] = useState(false);
    const [editedVendor, setEditedVendor] = useState<Vendor>(vendor);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedVendor({ ...editedVendor, [name]: name === 'totalCost' || name === 'rating' ? Number(value) : value });
    };

    const handleSubmit = () => {
        onUpdate(editedVendor);  // Calls the store's updateVendor
        setEditMode(false);
    };

    const handleContactVendor = (vendor: Vendor, eventTitle: string) => {
        if (!vendor.contact && !vendor.email) return;

        const message = `Hello ${vendor.name}, we are contacting you regarding the event "${eventTitle}".`;
        const encodedMessage = encodeURIComponent(message);

        if (vendor.contact && vendor.email) {
            const useWhatsapp = window.confirm('Contact via WhatsApp? Click Cancel to use Email.');
            if (useWhatsapp) {
                window.open(`https://wa.me/${vendor.contact}?text=${encodedMessage}`, '_blank');
            } else {
                window.location.href = `mailto:${vendor.email}?subject=Regarding ${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(message)}`;
            }
        } else if (vendor.contact) {
            window.open(`https://wa.me/${vendor.contact}?text=${encodedMessage}`, '_blank');
        } else if (vendor.email) {
            window.location.href = `mailto:${vendor.email}?subject=Regarding ${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(message)}`;
        }
    };



    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer p-6 space-y-2">
            {editMode ? (
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Vendor Name:</label>
                        <input
                            name="name"
                            value={editedVendor.name}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Category:</label>
                        <input
                            name="category"
                            value={editedVendor.category}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Contact:</label>
                        <input
                            name="contact"
                            value={editedVendor.contact}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Email:</label>
                        <input
                            name="email"
                            value={editedVendor.email}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Services:</label>
                        <input
                            name="services"
                            value={editedVendor.services.join(', ')}
                            onChange={(e) =>
                                setEditedVendor({ ...editedVendor, services: e.target.value.split(',').map((s) => s.trim()) })
                            }
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Total Cost:</label>
                        <input
                            name="totalCost"
                            type="number"
                            value={editedVendor.totalCost}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <label className="text-xs text-gray-500 w-24">Rating:</label>
                        <select
                            name="rating"
                            value={editedVendor.rating}
                            onChange={handleChange}
                            className="border rounded p-1 text-sm flex-1"
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>
                                    {r} Star{r > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between mt-3">
                        <button onClick={handleSubmit} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                            Save
                        </button>
                        <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">{vendor.name}</div>

                        <div className="flex">
                            {[...Array(vendor.rating)].map((_, i) => (
                                <AiFillStar key={i} className="text-yellow-500" />
                            ))}
                            {[...Array(5 - vendor.rating)].map((_, i) => (
                                <AiOutlineStar key={i} className="text-gray-400" />
                            ))}
                        </div>
                    </div>

                    <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded">
                        {vendor.category}
                    </span>
                    <div className="text-sm flex gap-2">
                        <AiOutlineAppstore className="text-gray-500 mt-0.5" />
                        <div className="flex-1 break-words">
                            <span className="font-medium text-gray-700">Services:</span> {vendor.services.join(', ')}
                        </div>
                    </div>

                    <div className="text-sm flex gap-2">
                        <AiOutlineDollarCircle className="text-green-500 mt-0.5" />
                        <div className="flex-1 break-words">
                            <span className="font-medium text-gray-700">Budget:</span> ${vendor.totalCost}
                        </div>
                    </div>

                    <div className="text-sm flex gap-2">
                        <AiOutlinePhone className="text-blue-500 mt-0.5" />
                        <div className="flex-1 break-words">
                            <span className="font-medium text-gray-700">Contact:</span> {vendor.contact || 'N/A'}
                        </div>
                    </div>

                    <div className="text-sm flex gap-2">
                        <AiOutlineMail className="text-red-500 mt-0.5" />
                        <div className="flex-1 break-words">
                            <span className="font-medium text-gray-700">Email:</span> {vendor.email || 'N/A'}
                        </div>
                    </div>



                    <div className="flex justify-between gap-2 mt-2">
                        <button
                            onClick={() => setEditMode(true)}
                            className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100"

                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleContactVendor(vendor, currentEvent?.title || 'our event')}
                            disabled={!vendor.contact && !vendor.email}
                            className={`border px-3 py-1 rounded text-sm transition ${vendor.contact || vendor.email
                                ? 'border-purple-600 text-purple-600 hover:bg-purple-100'
                                : 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100'
                                }`}

                        >
                            Contact Vendor
                        </button>


                        <button
                            onClick={() => onDelete(vendor.id)}
                            className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-100"

                        >
                            Delete
                        </button>
                    </div>


                </>
            )}
        </div>
    );
};

export default VendorCards;

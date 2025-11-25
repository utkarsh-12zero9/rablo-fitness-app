'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api, CreateProfileData } from '@/api/client';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '@/utils/storage';

export default function CreateProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<CreateProfileData>({
        name: '',
        email: '',
        contactNumber: '',
        gender: 'Male',
        dob: '',
        role: 'Manager',
        coordinates: [77.5946, 12.9716],
        city: '',
        state: '',
        country: '',
        pincode: '',
    });

    const formFields = [
        { label: "Contact Number", name: "contactNumber", type: "tel", placeholder: "9999999999", required: true },
        { label: "Date of Birth", name: "dob", type: "date", required: true },
        { label: "City", name: "city", placeholder: "Bengaluru", required: true },
        { label: "State", name: "state", placeholder: "Karnataka", required: true },
        { label: "Country", name: "country", placeholder: "India", required: true },
        { label: "Pincode", name: "pincode", placeholder: "560001", required: true },
    ];


    useEffect(() => {
        const init = async () => {
            const userID = getStorageItem(STORAGE_KEYS.USER_ID);
            if (!userID) {
                router.replace('/login');
                return;
            }

            try {
                // Fetch basic profile
                const profile = await api.getBasicProfile(userID);
                if (profile) {
                    setFormData(prev => ({
                        ...prev,
                        name: profile.name || '',
                        email: profile.email || '',
                    }));
                }
            } catch (err) {
                console.error('Failed to fetch profile.', err);
            }
        };

        init();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const userID = getStorageItem(STORAGE_KEYS.USER_ID);
        if (!userID) {
            setError('User ID not found. Please login again.');
            setIsLoading(false);
            return;
        }

        try {
            // Basic validation
            if (!formData.contactNumber || !formData.dob || !formData.city || !formData.state || !formData.country || !formData.pincode || !formData.gender) {
                throw new Error('Please fill in all required fields');
            }
            
            const { name, email, ...apiPayload } = formData;

            if (apiPayload.contactNumber && apiPayload.contactNumber.length > 10) {
                apiPayload.contactNumber = apiPayload.contactNumber.slice(-10);
            }

            await api.createManagerProfile(userID, apiPayload);

            // Update local state
            setStorageItem(STORAGE_KEYS.ACC_CREATED, '1');
            if (name) setStorageItem(STORAGE_KEYS.USER_NAME, name);
            if (email) setStorageItem(STORAGE_KEYS.USER_EMAIL, email);

            // Redirect
            router.replace('/dashboard');
        } catch (err: any) {
            console.error('Profile creation error:', err);
            setError(err.message || 'Failed to create profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
                    <p className="text-blue-100 text-sm mt-2">We need a few more details to set up your account.</p>
                </div>

                <div className="p-6 md:p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-medium">Failed to create profile:</p>
                                    <p className="text-xs text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {formFields.map((field) => (
                            <Input
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type={field.type || "text"}
                                required={field.required}
                                placeholder={field.placeholder}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                            />
                        ))}

                        <div className="pt-4 space-y-3">
                            <Button
                                type="submit"
                                fullWidth
                                isLoading={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                Create Profile
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

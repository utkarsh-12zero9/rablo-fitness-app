'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { getStorageItem, clearAppStorage, STORAGE_KEYS } from '@/utils/storage';
import { api } from '@/api/client';

export default function DashboardPage() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [userID, setUserID] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const details = {
        'User ID': userID,
        Name: profile?.name || userName,
        Role: profile?.role || "Manager",
        Email: profile?.email || userEmail,
    };


    useEffect(() => {
        const loadProfile = async () => {
            const id = getStorageItem(STORAGE_KEYS.USER_ID);
            const name = getStorageItem(STORAGE_KEYS.USER_NAME);
            const email = getStorageItem(STORAGE_KEYS.USER_EMAIL);
            const accCreated = getStorageItem(STORAGE_KEYS.ACC_CREATED);

            setUserID(id);
            setUserName(name);
            setUserEmail(email);

            if (!id) return router.replace('/login');
            if (accCreated !== '1') return router.replace('/create-profile');

            try {
                const data = await api.getBasicProfile(id);
                setProfile(data);
            } catch (err) {
                console.error('Failed to load profile', err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [router]);

    const handleLogout = () => {
        clearAppStorage();
        window.location.href = "/login";
    };


    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <div className='text-black'>Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation/Header Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Dashboard
                        </h1>

                        <Button
                            onClick={handleLogout}
                            className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-150"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    {/* Main Card Container - Slightly more rounded and elevated shadow */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-xl">
                        <div className="p-6 sm:p-8">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-5">
                                User Profile Details
                            </h3>

                            {/* Details List Layout - Responsive grid with clearer separation */}
                            <dl className="divide-y divide-gray-100">
                                {Object.entries(details).map(([key, value], idx) => (
                                    <div
                                        key={idx}
                                        className="py-4 grid grid-cols-1 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5"
                                    >
                                        <dt className="text-sm font-medium text-gray-500 sm:col-span-1">
                                            {key}
                                        </dt>
                                        <dd className="mt-1 text-base font-semibold text-gray-800 sm:mt-0 sm:col-span-3 lg:col-span-4 wrap-break-words">
                                            {value || 'N/A'}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
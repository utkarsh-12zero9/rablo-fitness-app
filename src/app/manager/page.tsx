'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setStorageItem, STORAGE_KEYS } from '@/utils/storage';
import { api } from '@/api/client';

function ManagerAuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Authenticating...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleAuth = async () => {
            const userID = searchParams.get('userID');

            if (!userID) {
                setError('No User ID found in URL');
                setStatus('Authentication Failed');
                return;
            }

            try {
                setStorageItem(STORAGE_KEYS.USER_ID, userID);
                setStatus('Fetching profile...');

                const response = await api.getBasicProfile(userID);

                if (!response || !response.success || !response.data) {
                    throw new Error('Invalid profile response');
                }

                const profileData = response.data;
                let isCreated = false;

                if (profileData.accCreated === 1 || profileData.accCreated === '1' || profileData.accCreated === true) {
                    isCreated = true;
                    console.log('Profile status: Created');
                } else {
                    console.log('Profile status: Not Created');
                }

                const accCreated = isCreated ? '1' : '0';
                setStorageItem(STORAGE_KEYS.ACC_CREATED, accCreated);

                const name = profileData.name || profileData.fullName;
                if (name) setStorageItem(STORAGE_KEYS.USER_NAME, name);
                if (profileData.email) setStorageItem(STORAGE_KEYS.USER_EMAIL, profileData.email);

                if (isCreated) {
                    router.replace('/dashboard');
                } else {
                    router.replace('/create-profile');
                }

            } catch (err) {
                console.error('Auth error:', err);
                setError('Failed to verify profile');
                setStatus('Error');
            }
        };

        handleAuth();
    }, [router, searchParams]);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <h2 className="text-red-600 text-xl font-bold mb-2">Authentication Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">{status}</p>
        </div>
    );
}

export default function ManagerAuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ManagerAuthContent />
        </Suspense>
    );
}

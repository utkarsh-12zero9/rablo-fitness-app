'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStorageItem, STORAGE_KEYS } from '@/utils/storage';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const userID = getStorageItem(STORAGE_KEYS.USER_ID);

            if (!userID) {
                router.replace('/login');
                return;
            }
        };

        const timer = setTimeout(checkAuth, 1000);

        return () => clearTimeout(timer);

    }, [router]);
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-emerald-500 rounded-full mb-4"></div>
                <h1 className="text-2xl font-bold text-gray-900">Fitness Manager</h1>
                <p className="text-gray-500 mt-2">Loading...</p>
            </div>
        </div>
    );
}

'use client';

export default function SplashScreen() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-600 rounded-full mb-4"></div>
                <h1 className="text-2xl font-bold text-gray-900">Fitness Manager</h1>
                <p className="text-gray-500 mt-2">Loading...</p>
            </div>
        </div>
    );
}
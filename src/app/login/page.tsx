'use client';

import { useState } from 'react';
import Image from 'next/image';
import fitnessBg from '@/assets/fitness.png';
import googleIcon from '@/assets/Google.png';
import linkedinIcon from '@/assets/LinkedIn.png';
import facebookIcon from '@/assets/FaceBook.png';

export default function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}`;
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={fitnessBg}
                    alt="Fitness Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.095)_25%,rgba(0,0,0,0.95)_75%)]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end min-h-screen p-6 pb-12 md:p-12 md:pb-24 max-w-md mx-auto md:max-w-full md:w-1/2 lg:w-1/3">

                {!showLogin ? (
                    // Welcome Screen
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold text-white italic leading-tight">
                                Manage Your <br />
                                <span className="text-[#D0FD3E]">Fitness Centre</span> <br />
                                with us!
                            </h1>
                            <p className="text-gray-200 text-sm md:text-base mt-4">
                                All your business operations in one place, ready for you to take charge.
                            </p>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => setShowLogin(true)}
                                className="w-full bg-[#D0FD3E] text-black font-bold py-4 rounded-xl hover:bg-[#bce635] transition-colors active:scale-95 transform duration-100 cursor-pointer"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                ) : (
                    // Login Modal
                    <div className="bg-[#55A6C44D] backdrop-blur-lg rounded-3xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-300 border border-white/10">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-white italic">Hi there!</h2>
                            <p className="text-gray-400 text-sm">
                                Sign in to keep things running smoothly.
                            </p>
                        </div>

                        <div className="space-y-3 pt-2 xs text-xs">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full bg-[#2F5B6C] hover:bg-[#264f5f] text-white font-medium py-3.5 px-4 rounded-xl flex items-center cursor-pointer justify-center gap-3 transition-colors border border-white/5"
                            >
                                <Image src={googleIcon} alt="Google" width={20} height={20} />
                                <span>Continue with Google</span>
                            </button>

                            <button
                                disabled
                                className="w-full bg-[#2F5B6C] text-gray-400 cursor-not-allowed font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 border border-white/5"
                            >
                                <Image src={linkedinIcon} alt="LinkedIn" width={20} height={20} />
                                <span>Continue with LinkedIn</span>
                            </button>

                            <button
                                disabled
                                className="w-full bg-[#2F5B6C] text-gray-400 cursor-not-allowed font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 border border-white/5"
                            >
                                <Image src={facebookIcon} alt="Facebook" width={20} height={20} />
                                <span>Continue with Facebook</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

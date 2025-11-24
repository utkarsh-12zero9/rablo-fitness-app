'   '

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'google' | 'outline';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center px-4 py-2 cursor-pointer border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ';

    const variants = {
        primary: 'border-transparent text-black bg-[#D0FD3E] hover:bg-[#bce635] focus:ring-[#D0FD3E] font-bold shadow-lg shadow-[#D0FD3E]/20',
        secondary: 'border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500',
        outline: 'border-red-300 text-red-700 bg-white hover:bg-red-100 focus:ring-red-500 w-18 h-10 mt-3',
        google: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 relative',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <div className="h-5 w-5 border-4 border-t-4 border-gray-200 border-t-current rounded-full animate-spin"></div>
            )}
            {children}
        </button>
    );
};

import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[#CBFB5E] text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(203,251,94,0.3)]",
        secondary: "bg-[#18181B] text-white border border-[#27272A] hover:bg-[#27272A] hover:scale-105",
        ghost: "text-[#A1A1AA] hover:text-[#CBFB5E] hover:bg-[#CBFB5E]/10",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
}

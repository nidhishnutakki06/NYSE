import React from 'react';

export default function Card({ children, className = '', hoverEffect = false }) {
    const hoverStyles = hoverEffect ? "hover:border-[#CBFB5E]/50 transition-colors duration-300" : "";

    return (
        <div className={`bg-[#18181B] rounded-2xl border border-[#27272A] p-6 ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}

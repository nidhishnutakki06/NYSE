import React from 'react';

export default function Input({ label, error, type = 'text', className = '', ...props }) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-zinc-400 font-medium text-sm">{label}</label>}
            <input
                type={type}
                className="bg-[#27272A] border border-[#3F3F46] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#CBFB5E] transition-colors"
                {...props}
            />
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}

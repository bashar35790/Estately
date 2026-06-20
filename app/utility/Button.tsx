"use client";

import React from "react";
import Link from "next/link";

interface LoginButtonProps {
    href?: string;
}

export default function LoginButton({ href = "/login" }: LoginButtonProps) {
    return (
        <Link
            href={href}
            aria-label="User Login Button"
            className="
                group
                relative
                flex
                h-[51px]
                w-[131px]
                items-center
                justify-center
                rounded-[15px]
                /* Uses your brand's green at 20% opacity */
                bg-[rgba(30,172,112,0.2)] 
                bg-gradient-to-br
                /* Gradient fades from your primary green to transparent */
                from-[var(--color-primary)]
                from-0%
                to-transparent
                to-30%
                transition-all
                duration-300
                ease-in-out
                /* Hover states updated to your brand color at 70% opacity & glow */
                hover:bg-[rgba(30,172,112,0.7)]
                hover:shadow-[0_0_10px_rgba(30,172,112,0.5)]
                focus:bg-[rgba(30,172,112,0.7)]
                focus:shadow-[0_0_10px_rgba(30,172,112,0.5)]
                focus:outline-none
            "
        >
            {/* Inner Container */}
            <div
                className="
                    flex
                    h-[47px]
                    w-[127px]
                    items-center
                    justify-center
                    gap-[15px]
                    rounded-[13px]
                    bg-[#1a1a1a]
                    font-semibold
                    text-white
                "
            >
                <p className="m-0 leading-none">SignUp</p>
            </div>
        </Link>
    );
}

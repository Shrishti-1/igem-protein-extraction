import Image from 'next/image'
import React from 'react'

const Module2 = () => {
    return (
        <div>
            <div className="max-w-4xl mx-auto flex flex-row items-start gap-4 sm:gap-6">
                <Image
                    src="/doctor1.png"
                    alt="Doctor illustration"
                    width={129}
                    height={129}
                    className="rounded-lg object-contain flex-shrink-0 w-[64px] h-[64px] sm:w-[100px] sm:h-[100px] md:w-[129px] md:h-[129px]"
                    priority
                />
                <div className="relative bg-neutral-800 text-white px-4 py-3 rounded-xl shadow-md w-full">
                    <p className="text-sm sm:text-md font-medium leading-relaxed">
                        We want to make a special protein from bacteria to help solve a problem (like making insulin or a specific enzyme).
                    </p>
                    {/* Speech bubble arrow */}
                    <div className="absolute left-[-10px] top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-neutral-800" />
                </div>
            </div>
        </div>
    )
}

export default Module2
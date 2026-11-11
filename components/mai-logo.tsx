import React from "react"

export function MaiInstituteLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* MAI Stylized Figures Icon (Two figures reaching together: Navy & Orange) */}
      <svg className="h-8 w-8 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Figure (Navy Blue) */}
        <circle cx="16" cy="14" r="5" fill="#12345B" />
        <path
          d="M8 36C8 28.268 14.268 22 22 22L17 31L13 40H8V36Z"
          fill="#12345B"
        />
        {/* Center Connecting Bridge / Star accent */}
        <circle cx="24" cy="24" r="3" fill="#F5C928" />
        {/* Right Figure (Warm Orange) */}
        <circle cx="32" cy="14" r="5" fill="#F28C28" />
        <path
          d="M40 36C40 28.268 33.732 22 26 22L31 31L35 40H40V36Z"
          fill="#F28C28"
        />
      </svg>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black tracking-tight text-[#12345B]">MAI</span>
          <span className="text-xs font-semibold text-[#1769AA] lowercase tracking-wide">institute</span>
        </div>
        <span className="text-[9px] font-medium text-[#64748B] tracking-wider uppercase">Beswan Management</span>
      </div>
    </div>
  )
}

export function BintangMandiriBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border border-[#27A9A5]/30 bg-[#27A9A5]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0f6c6a] ${className}`}>
      {/* Stylized Star Icon in Teal */}
      <svg className="h-3.5 w-3.5 shrink-0 fill-[#27A9A5]" viewBox="0 0 24 24">
        <path d="M12 2L14.7 8.3L21.5 8.9L16.3 13.4L17.9 20.1L12 16.5L6.1 20.1L7.7 13.4L2.5 8.9L9.3 8.3L12 2Z" />
      </svg>
      <span>BBM Angkatan 6</span>
    </div>
  )
}

export function MandiriAmalInsaniBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-6 w-6 items-center justify-center rounded bg-[#12345B] text-[9px] font-black tracking-tighter text-white">
        mAi
      </div>
      <div className="text-[10px] leading-tight text-[#64748B]">
        <p className="font-semibold text-[#12345B]">mandiri amal insani</p>
        <p className="text-[8px]">foundation</p>
      </div>
    </div>
  )
}


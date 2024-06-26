import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import "@/styles/global.css"
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    title: 'HEMA Broadcast',
    description: 'Broadcast tools for HEMA tournaments',
}

export default function GraphicLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/264ffc9fb7.js" crossOrigin="anonymous" />
            <body>
                <div className="graphic-layout-root">
                    {children}
                    <SpeedInsights />
                </div>
            </body>
        </html>
    )
}

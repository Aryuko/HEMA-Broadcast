"use client"
import React from 'react'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="page page-frontpage">
            Frontpage :D
            <br />
            <Link href="/config/fightercard">Config - Fighter Card</Link>
            {/* Todo: Add list/grid of templates */}
        </div>
    )
}
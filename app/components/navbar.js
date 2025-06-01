"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar()
{
    const [displayBurger, setDisplayBurger] = useState(false);
    
    const router = useRouter();
    
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5" onClick={() => setDisplayBurger(!displayBurger)}></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <button className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page" onClick={() => router.push("/")}>Mois actuel</button>
                                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_monthly")}>Déclarer dépenses mensuelles</button>
                                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_daily")}>Déclarer dépenses journalières</button>
                                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_income")}>Déclarer revenus</button>
                                <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/calendar")}>Calendrier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                displayBurger &&

                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <button className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page" onClick={() => router.push("/")}>Mois actuel</button>
                        <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_monthly")}>Déclarer dépenses mensuelles</button>
                        <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_daily")}>Déclarer dépenses journalières</button>
                        <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/add_income")}>Déclarer revenus</button>
                        <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.push("/calendar")}>Calendrier</button>
                    </div>
                </div>
            }
        </nav>
    )
}
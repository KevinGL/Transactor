"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Calendar()
{
    const [dates, setDates] = useState([]);
    const router = useRouter();

    const Init = () =>
    {
        const currentDate = new Date(Date.now());
        const nbDates = 9;
        let month = currentDate.getMonth() + 1 - 1;
        let year = currentDate.getFullYear();

        const localDates = [];

        for(let i = 0 ; i < nbDates ; i++)
        {
            localDates.push({
                month,
                year
            });

            month--;

            if(month === 0)
            {
                month = 12;
                year--;
            }
        }

        setDates(localDates);
    }

    useEffect(() =>
    {
        Init();
    }, []);

    const handle = (index) =>
    {
        router.push(`${dates[index].month}_${dates[index].year}`);
    }

    return (
        <>
            <div className="container mx-auto p-4 h-screen flex flex-col">
                <h1 className="text-3xl font-bold text-gray-600 mb-4">Sélectionner un mois</h1>
                <div className="container mx-auto p-4 flex flex-wrap gap-4">
                    {
                        dates.map((date, index) =>
                        {
                            const monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];
                            
                            return (
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:w-1/4 w-full flex">
                                    <CardContent className="p-4">
                                        <div className="flex items-center">
                                            <span className="flex-grow mb-5">{monthNames[date.month - 1]}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <span className="flex-grow mb-5">{date.year}</span>
                                        </div>
                                        <Button onClick={() => handle(index)} className="w-full bg-gray-400 hover:bg-gray-500 text-white">Sélectionner</Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
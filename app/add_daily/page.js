"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { addDailyToDB, addDailiesToDB } from "@/actions/transactions";
import AlertModal from "@/app/components/modalAlert";

export default function addDaily()
{
    const [dailies, setDailies] = useState([]);
    const [modal, setModal] = useState(null);

    const Init = () =>
    {
        const currentDate = new Date(Date.now());
        const nbDailies = 6;

        const localDailies = [];

        for(let i = 0 ; i < nbDailies ; i++)
        {
            localDailies.push({
                title: `Dépense numéro ${i + 1}`,
                cost: 0,
                day: currentDate.getDate(),
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear()
            });
        }

        setDailies(localDailies);
    }

    useEffect(() =>
    {
        Init();
    }, []);

    const handleChangeTitle = (value, index) =>
    {
        //setMonthly({ ...monthly, title: value });

        const localDailies = [...dailies];

        localDailies[index].title = value;
        setDailies(localDailies);
    }

    const handleChangeCost = (value, index) =>
    {
        //setMonthly({ ...monthly, cost: parseFloat(value) });

        const localDailies = [...dailies];
        
        localDailies[index].cost = parseFloat(value);
        setDailies(localDailies);
    }

    const handleChangeDay = (value, index) =>
    {
        const localDailies = [...dailies];
        
        localDailies[index].day = parseInt(value);
        setDailies(localDailies);
    }

    const handleChangeMonth = (value, index) =>
    {
        //setMonthly({ ...monthly, month: parseInt(value) });

        const localDailies = [...dailies];
        
        localDailies[index].month = parseInt(value);
        setDailies(localDailies);
    }

    const handleChangeYear = (value, index) =>
    {
        //setMonthly({ ...monthly, year: parseInt(value) });

        const localDailies = [...dailies];
        
        localDailies[index].year = parseInt(value);
        setDailies(localDailies);
    }

    const handle = async (index) =>
    {
        const res = await addDailyToDB(dailies[index]);

        if(res.success)
        {
            setModal({ message: "Dépense ajoutée"});
        }

        else
        {
            setModal({ message: "Une erreur s'est produite" });
        }
    }

    const handleAll = async () =>
    {
        const res = await addDailiesToDB(dailies);

        if(res.success)
        {
            setModal({ message: "Dépenses ajoutées"});
            Init();
        }

        else
        {
            setModal({ message: "Une erreur s'est produite" });
        }
    }

    return (
        <>
            <div className="container mx-auto p-4 h-screen flex flex-col">
                <h1 className="text-3xl font-bold text-gray-600 mb-4">Ajouter des dépenses journalières</h1>
                <div className="container mx-auto p-4 flex flex-wrap gap-4">
                    {
                        dailies.map((daily, index) =>
                        {
                            return (
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:w-1/4 w-full flex">
                                    <CardContent className="p-4">
                                        <Label htmlFor="text">Intitulé</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="title"
                                                type="text"
                                                value={daily.title}
                                                onChange={(e) => {handleChangeTitle(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Coût</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="cost"
                                                type="number"
                                                step="0.01"
                                                value={daily.cost}
                                                onChange={(e) => {handleChangeCost(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Jour</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="day"
                                                type="number"
                                                min="1"
                                                max="12"
                                                value={daily.day}
                                                onChange={(e) => {handleChangeDay(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Mois</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="month"
                                                type="number"
                                                min="1"
                                                max="12"
                                                value={daily.month}
                                                onChange={(e) => {handleChangeMonth(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Année</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="year"
                                                type="number"
                                                value={daily.year}
                                                onChange={(e) => {handleChangeYear(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>
                                        <Button onClick={() => handle(index)} className="w-full bg-gray-400 hover:bg-gray-500 text-white">Ajouter</Button>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                    <Button onClick={handleAll} className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white">Ajouter toutes les dépenses</Button>
                </div>
            </div>

            {
                modal &&

                <AlertModal message={modal.message} onClose={() => setModal(null)} />
            }
        </>
    )
}
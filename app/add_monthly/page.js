"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { addMonthlyToDB, addMonthliesToDB } from "@/actions/transactions";
import AlertModal from "@/app/components/modalAlert";

export default function addMonthly()
{
    const [monthlies, setMonthlies] = useState([]);
    const [modal, setModal] = useState(null);

    const Init = () =>
    {
        const currentDate = new Date(Date.now());
        const nbMonthlies = 6;

        const localMonthlies = [];

        for(let i = 0 ; i < nbMonthlies ; i++)
        {
            localMonthlies.push({
                title: `Dépense numéro ${i + 1}`,
                cost: 0,
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear()
            });
        }

        setMonthlies(localMonthlies);
    }

    useEffect(() =>
    {
        Init();
    }, []);

    const handleChangeTitle = (value, index) =>
    {
        //setMonthly({ ...monthly, title: value });

        const localMonthlies = [...monthlies];

        localMonthlies[index].title = value;
        setMonthlies(localMonthlies);
    }

    const handleChangeCost = (value, index) =>
    {
        //setMonthly({ ...monthly, cost: parseFloat(value) });

        const localMonthlies = [...monthlies];
        
        localMonthlies[index].cost = parseFloat(value);
        setMonthlies(localMonthlies);
    }

    const handleChangeMonth = (value, index) =>
    {
        //setMonthly({ ...monthly, month: parseInt(value) });

        const localMonthlies = [...monthlies];
        
        localMonthlies[index].month = parseInt(value);
        setMonthlies(localMonthlies);
    }

    const handleChangeYear = (value, index) =>
    {
        //setMonthly({ ...monthly, year: parseInt(value) });

        const localMonthlies = [...monthlies];
        
        localMonthlies[index].year = parseInt(value);
        setMonthlies(localMonthlies);
    }

    const handle = async (index) =>
    {
        const res = await addMonthlyToDB(monthlies[index]);

        if(res.success)
        {
            setModal({ message: "Dépense ajoutée"});
        }

        else
        {
            setModal({ message: "Une erreur s'est produite" });
        }

        //console.log(monthlies);
    }

    const handleAll = async () =>
    {
        const res = await addMonthliesToDB(monthlies);

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
                <h1 className="text-3xl font-bold text-gray-600 mb-4">Ajouter des dépenses mensuelles</h1>
                <div className="container mx-auto p-4 flex flex-wrap gap-4">
                    {
                        monthlies.map((monthly, index) =>
                        {
                            return (
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:w-1/4 w-full flex">
                                    <CardContent className="p-4">
                                        <Label htmlFor="text">Intitulé</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="title"
                                                type="text"
                                                value={monthly.title}
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
                                                value={monthly.cost}
                                                onChange={(e) => {handleChangeCost(e.target.value, index)}}
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
                                                value={monthly.month}
                                                onChange={(e) => {handleChangeMonth(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Année</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="year"
                                                type="number"
                                                value={monthly.year}
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
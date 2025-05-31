"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { addIncomeToDB, addIncomesToDB } from "@/actions/transactions";
import AlertModal from "@/app/components/modalAlert";

export default function addIncome()
{
    const [incomes, setIncomes] = useState([]);
    const [modal, setModal] = useState(null);

    const Init = () =>
    {
        const currentDate = new Date(Date.now());
        const nbMonthlies = 6;

        const localIncomes = [];

        for(let i = 0 ; i < nbMonthlies ; i++)
        {
            localIncomes.push({
                title: `Revenu numéro ${i + 1}`,
                cost: 0,
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear()
            });
        }

        setIncomes(localIncomes);
    }

    useEffect(() =>
    {
        Init();
    }, []);

    const handleChangeTitle = (value, index) =>
    {
        const localIncomes = [...incomes];

        localIncomes[index].title = value;
        setIncomes(localIncomes);
    }

    const handleChangeCost = (value, index) =>
    {
        const localIncomes = [...incomes];
        
        localIncomes[index].cost = parseFloat(value);
        setIncomes(localIncomes);
    }

    const handleChangeMonth = (value, index) =>
    {
        const localIncomes = [...incomes];
        
        localIncomes[index].month = parseInt(value);
        setIncomes(localIncomes);
    }

    const handleChangeYear = (value, index) =>
    {
        const localIncomes = [...incomes];
        
        localIncomes[index].year = parseInt(value);
        setIncomes(localIncomes);
    }

    const handle = async (index) =>
    {
        const res = await addIncomeToDB(incomes[index]);

        if(res.success)
        {
            setModal({ message: "Revenu ajouté"});
        }

        else
        {
            setModal({ message: "Une erreur s'est produite" });
        }
    }

    const handleAll = async () =>
    {
        const res = await addIncomesToDB(incomes);

        if(res.success)
        {
            setModal({ message: "Revenus ajoutés"});
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
                        incomes.map((income, index) =>
                        {
                            return (
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 lg:w-1/4 w-full flex">
                                    <CardContent className="p-4">
                                        <Label htmlFor="text">Intitulé</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="title"
                                                type="text"
                                                value={income.title}
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
                                                value={income.cost}
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
                                                value={income.month}
                                                onChange={(e) => {handleChangeMonth(e.target.value, index)}}
                                                className="flex-grow mb-5"
                                            />
                                        </div>

                                        <Label htmlFor="text">Année</Label>
                                        <div className="flex items-center">
                                            <Input
                                                id="year"
                                                type="number"
                                                value={income.year}
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
                    <Button onClick={handleAll} className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white">Ajouter tous les revenus</Button>
                </div>
            </div>

            {
                modal &&

                <AlertModal message={modal.message} onClose={() => setModal(null)} />
            }
        </>
    )
}
"use client"

import Image from "next/image";
import { getDailys, getMonthliesSpencies, getMonthliesIncomes } from "@/actions/transactions";
import { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';

export default function Home()
{
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() =>
  {
    const getDatas = async () =>
    {
      const spencies = await getMonthliesSpencies();
      const incomes = await getMonthliesIncomes();
      const dailys = await getDailys();

      const currentDate = new Date();
      const nbDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const dates = Array.from({ length: nbDays }, (_, i) => i + 1);
      const maxSpencies = Array.from({ length: nbDays }, (_, i) => incomes - spencies);

      // ✅ Détruire l'ancien graphique AVANT de recréer
      if (chartInstance.current)
      {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      const canvas = chartRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Dépenses quotidiennes',
              data: dailys.resByDay,
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 1
            },

            {
              label: 'Cumul dépenses quotidiennes',
              data: dailys.cumulByDay,
              backgroundColor: 'rgba(4, 63, 26, 0.2)',
              borderColor: 'rgb(0, 255, 21)',
              borderWidth: 1
            },

            {
              label: 'Plafond dépenses',
              data: maxSpencies,
              backgroundColor: 'rgba(4, 63, 26, 0.2)',
              borderColor: 'rgb(38, 0, 255)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: Math.max(100, incomes - spencies) // fallback si <= 0
            }
          }
        }
      });
    };

    getDatas();
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-gray-600 mb-4">Graphe mensuel</h1>
      <canvas ref={chartRef} />
    </div>
  )
}

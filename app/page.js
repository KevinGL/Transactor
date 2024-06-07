"use client"

import Image from "next/image";
import { getAutomaticsCost, getManualsCost, getIncome, getBenef, getManualsSpenciesPerDay, getBalance, getOutflows, getSpenciesEstimated } from "@/actions/transactions";
import { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';

export default function Home()
{
  let [autoCost, setAutoCost] = useState(0.0);
  let [manCost, setManCost] = useState(0.0);
  let [income, setIncome] = useState(0.0);
  let [benef, setBenef] = useState(0.0);
  let [balance, setBalance] = useState(0.0);
  let [spenciesEstimated, setSpenciesEstimated] = useState(0.0);
  let [spencies, setSpencies] = useState({});

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() =>
  {
    const fetch = async () =>
    {
      let value = await getAutomaticsCost();
      setAutoCost(value);

      value = await getManualsCost();
      setManCost(value);

      value = await getIncome();
      setIncome(value);

      value = await getBenef();
      setBenef(value);

      value = await getManualsSpenciesPerDay();
      setSpencies(value);

      value = await getBalance();
      setBalance(value);

      value = await getSpenciesEstimated();
      setSpenciesEstimated(value);

      await getOutflows();
    }

    fetch();
  }, []);

  useEffect(() =>
  {
    if (chartInstance.current)
    {
      chartInstance.current.destroy();
    }

    if (chartRef.current && income !== 0)
    {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx,
      {
        type: 'line',
        data:
        {
          labels: spencies.dates,
          datasets:
          [
            {
              label: 'Cumul dépenses',
              data: spencies.cumul,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },

            {
              label: 'Dépenses quotidiennes',
              data: spencies.values,
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 1
            },

            {
              label: 'Dépenses moyennes journalières',
              data: spencies.medDaily,
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1
            },
          ]
        },
        options:
        {
          scales:
          {
            y:
            {
              beginAtZero: true,
              max: income - autoCost
            }
          }
        }
      });
    }
  }, [autoCost, manCost, income, spencies]);
  
  return (
    <>
      <h1>Revenu mensuel de { parseFloat(income).toFixed(2) } €</h1>
      <h1>{ parseFloat(autoCost).toFixed(2) } € de dépenses fixes</h1>
      <h1>{ parseFloat(manCost).toFixed(2) } € de dépenses CB</h1>
      <h1>{ parseFloat(income - autoCost).toFixed(2) } € de dépenses max ce mois-ci</h1>
      <h1>{ parseFloat(Math.abs(benef)).toFixed(2) } € de { benef >= 0.0 && "bénéfice"} { benef < 0.0 && "perte" } estimé en fin de mois</h1>
      <h1>{ parseFloat(balance - autoCost - spenciesEstimated).toFixed(2) } € estimés en fin de mois</h1>

      <canvas ref={chartRef} />
    </>
  );
}

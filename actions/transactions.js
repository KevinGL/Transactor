"use server"

import { db } from "@/app/firebase/firebase-config";

export const getAutomatics = () =>
{
    let automatics = [];
    
    db.collection('Automatics').get()
    .then(snapshot =>
    {
        snapshot.forEach(doc =>
        {
            automatics.push(doc.data());
        });
    })
    .catch(err =>
    {
        console.error('Error get automatics transactions:', err);
    });

    return automatics;
}

export const getAutomaticsCost = async () =>
{
    let cost = 0.0;
    
    const snapshot = await db.collection('Automatics').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();

        if(currentMonth == docMonth && currentYear == docYear)
        {
            cost += doc.data().cost;
        }
    });

    return cost;
}

export const getManualsCost = async () =>
{
    let cost = 0.0;
    
    const snapshot = await db.collection('Manuals').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();
        
        if(currentMonth == docMonth && currentYear == docYear)
        {
            cost += doc.data().cost;
        }
    });

    return cost;
}

export const getOutflows = async () =>
{
    let value = 0.0;
    
    const snapshot = await db.collection('Outflows').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();
        
        if(currentMonth == docMonth && currentYear == docYear)
        {
            value += doc.data().cost;
        }
    });

    console.log(value);

    return value;
}

export const getIncome = async () =>
{
    let income = 0.0;
    
    const snapshot = await db.collection('Incomes').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();
        
        if(currentMonth == docMonth && currentYear == docYear)
        {
            income = doc.data().value;
        }
    });

    return income;
}

export const getBalance = async () =>
{
    let balance = 0.0;
    
    const snapshot = await db.collection('Balances').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();
        
        if(currentMonth == docMonth && currentYear == docYear)
        {
            balance = doc.data().value;
        }
    });

    return balance;
}

export const getBenef = async () =>
{
    let manuals = 0.0;
    
    const snapshot = await db.collection('Manuals').get()

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    snapshot.forEach(doc =>
    {
        const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

        const docMonth = docDate.getMonth() + 1;
        const docYear = docDate.getFullYear();
        
        if(currentMonth == docMonth && currentYear == docYear)
        {
            manuals += doc.data().cost;
        }
    });

    const nbDays = currentDate.getDate();

    const dailySpencieMed = manuals / nbDays;

    const fisrtNextMonth = new Date(currentYear, currentMonth, 0);
    
    const nbDaysInMonth = fisrtNextMonth.getDate();

    const finalSpenciesEstimated = dailySpencieMed * nbDaysInMonth;

    const income = await getIncome();
    const automatics = await getAutomaticsCost();

    return income - finalSpenciesEstimated - automatics;
}

export const getManualsSpenciesPerDay = async () =>
{
    let spencies = { dates: [], cumul: [], values: [], medDaily: [] };
    
    const snapshot = await db.collection('Manuals').orderBy("date", "asc").get()

    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let spenciesCumul = 0.0;
    let spenciesThisDay = 0.0;

    for(let day = 1 ; day <= currentDay ; day++)
    {
        snapshot.forEach(doc =>
        {
            const docDate = new Date(doc.data().date._seconds * 1000 + 10800000);

            const docDay = docDate.getDate();
            const docMonth = docDate.getMonth() + 1;
            const docYear = docDate.getFullYear();
            
            if(currentMonth == docMonth && currentYear == docYear && docDay == day)
            {
                spenciesCumul += doc.data().cost;
                spenciesThisDay += doc.data().cost;
            }
        });

        spencies.dates.push(day);
        spencies.cumul.push(spenciesCumul);
        spencies.values.push(spenciesThisDay);

        spenciesThisDay = 0.0;
    }

    const fisrtNextMonth = new Date(currentYear, currentMonth, 0);
    const nbDaysInMonth = fisrtNextMonth.getDate();
    const medDaily = spenciesCumul / currentDay;
    let cumulMed = medDaily;

    for(let day = 1 ; day <= currentDay ; day++)
    {
        spencies.medDaily.push(cumulMed);

        cumulMed += medDaily;
    }

    if(currentDay < nbDaysInMonth)
    {
        for(let day = currentDay + 1 ; day <= nbDaysInMonth ; day++)
        {
            spencies.dates.push(day);
            spencies.medDaily.push(cumulMed);

            cumulMed += medDaily;
        }
    }

    //console.log(spencies.medDaily);

    return spencies;
}
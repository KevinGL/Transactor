"use server"

import { db } from "@/app/firebase/firebase-config";

export const addMonthlyToDB = async (monthly) =>
{
    try
    {
        const res = await db.collection("monthly").add(monthly);
        console.log("Document ajouté avec ID :", res.id);
        return { success: true, id: res.id };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const addMonthliesToDB = async (monthlies) =>
{
    try
    {
        const res = await Promise.all(
            monthlies.map((monthly) => db.collection("monthly").add(monthly))
        );

        const ids = res.map(doc => doc.id);
        console.log("Documents ajoutés avec IDs :", ids);

        return { success: true, ids };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const addDailyToDB = async (monthly) =>
{
    try
    {
        const res = await db.collection("daily").add(monthly);
        console.log("Document ajouté avec ID :", res.id);
        return { success: true, id: res.id };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const addDailiesToDB = async (monthlies) =>
{
    try
    {
        const res = await Promise.all(
            monthlies.map((monthly) => db.collection("daily").add(monthly))
        );

        const ids = res.map(doc => doc.id);
        console.log("Documents ajoutés avec IDs :", ids);

        return { success: true, ids };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const addIncomeToDB = async (income) =>
{
    try
    {
        const res = await db.collection("incomes").add(income);
        console.log("Document ajouté avec ID :", res.id);
        return { success: true, id: res.id };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const addIncomesToDB = async (monthlies) =>
{
    try
    {
        const res = await Promise.all(
            monthlies.map((monthly) => db.collection("incomes").add(monthly))
        );

        const ids = res.map(doc => doc.id);
        console.log("Documents ajoutés avec IDs :", ids);

        return { success: true, ids };
    }
    catch (error)
    {
        console.error("Erreur lors de l'ajout du document :", error);
        return { success: false, error };
    }
}

export const getDailys = async () =>
{
    const currentDate = new Date(Date.now());

    const docs = (await db.collection("daily").get()).docs;
    const dailys = [];

    docs.map((doc) =>
    {
        if(doc.data().month === currentDate.getMonth() + 1 && doc.data().year === currentDate.getFullYear())
        {
            dailys.push(doc.data());
        }
    });
    
    //console.log(dailys);

    const resByDay = [];
    const cumulByDay = [];
    const nbDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() + 1;

    let cumul = 0;

    for(let day = 1 ; day <= nbDays ; day++)
    {
        let resThisDay = 0;

        for(let j = 0 ; j < dailys.length ; j++)
        {
            if(dailys[j].day === day)
            {
                resThisDay += dailys[j].cost;
                cumul += dailys[j].cost;
            }
        }

        //console.log(resThisDay);

        if(day <= currentDate.getDate())
        {
            resByDay.push(resThisDay);
            cumulByDay.push(cumul);
        }
    }

    return {resByDay, cumulByDay};
}

export const getMonthliesSpencies = async () =>
{
    const currentDate = new Date(Date.now());

    const docs = (await db.collection("monthly").get()).docs;
    let res = 0;

    docs.map((doc) =>
    {
        if(doc.data().month === currentDate.getMonth() + 1 && doc.data().year === currentDate.getFullYear())
        {
            res += doc.data().cost;
        }
    });

    return res;
}

export const getMonthliesIncomes = async () =>
{
    const currentDate = new Date(Date.now());

    const docs = (await db.collection("incomes").get()).docs;
    let res = 0;

    docs.map((doc) =>
    {
        if(doc.data().month === currentDate.getMonth() + 1 && doc.data().year === currentDate.getFullYear())
        {
            res += doc.data().cost;
        }
    });

    return res;
}

export const getDailysByMonth = async (month, year) =>
{
    const docs = (await db.collection("daily").get()).docs;
    const dailys = [];

    docs.map((doc) =>
    {
        if(doc.data().month === month &&  doc.data().year === year)
        {
            dailys.push(doc.data());
        }
    });
    
    //console.log(dailys);

    const resByDay = [];
    const cumulByDay = [];
    const nbDays = new Date(year, month - 1, 0).getDate() + 1;

    let cumul = 0;

    for(let day = 1 ; day <= nbDays ; day++)
    {
        let resThisDay = 0;

        for(let j = 0 ; j < dailys.length ; j++)
        {
            if(dailys[j].day === day)
            {
                resThisDay += dailys[j].cost;
                cumul += dailys[j].cost;
            }
        }

        //console.log(resThisDay);

        resByDay.push(resThisDay);
        cumulByDay.push(cumul);
    }

    return {resByDay, cumulByDay};
}

export const getMonthliesSpenciesByMonth = async (month, year) =>
{
    const docs = (await db.collection("monthly").get()).docs;
    let res = 0;

    docs.map((doc) =>
    {
        if(doc.data().month === month && doc.data().year === year)
        {
            res += doc.data().cost;
        }
    });

    return res;
}

export const getMonthliesIncomesByMonth = async (month, year) =>
{
    const docs = (await db.collection("incomes").get()).docs;
    let res = 0;

    docs.map((doc) =>
    {
        if(doc.data().month === month &&  doc.data().year === year)
        {
            res += doc.data().cost;
        }
    });

    return res;
}
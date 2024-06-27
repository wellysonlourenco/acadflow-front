import { Helmet } from "react-helmet-async";
import { DayEventsAmountCard } from "./day-events-amount-card";
import { MonthCanceledEventsAmountCard } from "./month-canceled-events-amount";
import { MonthEventsAmountCard } from "./events-amount-card";
import { TotalInscricoesCard } from "./total-inscricoes-card";
import { PopularProductsChart } from "./popular-events-chart";
import { RevenueChart } from "./revenue-chart";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";

export function Dashboard() {
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
    })



    console.log(profile?.userData.name)

    return (
        <>
            <Helmet title="Dashboard" />
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl tracking-tight font-bold">Dashboard</h1>


                <div className="grid grid-cols-4 gap-4">
                    <MonthEventsAmountCard />
                    <DayEventsAmountCard />
                    <TotalInscricoesCard />
                    <MonthCanceledEventsAmountCard />
                </div>

                <div className="grid grid-cols-9 gap-4">
                    <RevenueChart />
                    <PopularProductsChart />
                </div>
            </div>
        </>
    );
}
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const createEventSchema = z.object({
    name: z.string().min(3, { message: 'Minimo 3 caracteres.' }),
    dtStart: z.string(),
    dtEnd: z.string(),
    qtdHours: z.string().transform(Number).pipe(z.number().min(1)),
    qtdParticipants: z.string().transform(Number).pipe(z.number().min(1))
})


type CreateEventSchema = z.infer<typeof createEventSchema>

export function CreateFormEvents() {
    const { register, handleSubmit, formState } = useForm<CreateEventSchema>({})


    async function handleCreateUser(data: CreateEventSchema) {
        const { name, dtStart, dtEnd, qtdHours, qtdParticipants } = data;
        console.log(data);

        if (!name || !dtStart || !dtEnd || !qtdHours || !qtdParticipants) {
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Evento criado com sucesso!');


    }

    return (

        <form onSubmit={handleSubmit(handleCreateUser)} className="w-full space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium block" htmlFor="name">Nome:</label>
                <input
                    {...register('name')}
                    id="name"
                    type="text"
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm" placeholder='Digite o nome do evento'
                />
                {formState.errors?.name && (
                    <p className="text-sm text-red-400">{formState.errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium block" htmlFor="dtStart">Data Inicial:</label>
                <input
                    {...register('dtStart')}
                    id="dtStart"
                    type="date"
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
                />
                {formState.errors?.dtStart && (
                    <p className="text-sm text-red-400">{formState.errors.dtStart.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium block" htmlFor="dtEnd">Data Final:</label>
                <input
                    {...register('dtEnd')}
                    id="dtEnd"
                    type="date"
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
                />
                {formState.errors?.dtEnd && (
                    <p className="text-sm text-red-400">{formState.errors.dtEnd.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium block" htmlFor="qtdHours" >Carga Horária:</label>
                <input
                    {...register('qtdHours')}
                    id="qtdHours"
                    type="number"
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
                />
                {formState.errors?.qtdHours && (
                    <p className="text-sm text-red-400">{formState.errors.qtdHours.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium block" htmlFor="qtdParticipants" >qtdParticipants:</label>
                <input
                    {...register('qtdParticipants')}
                    id="qtdParticipants"
                    type="number"
                    className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
                />
                {formState.errors?.qtdParticipants && (
                    <p className="text-sm text-red-400">{formState.errors.qtdParticipants.message}</p>
                )}
            </div>

            <div className="flex items-center justify-end gap-2">
                <Button disabled={formState.isSubmitting} className="bg-teal-400 text-teal-950" type="submit">
                    {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                    Save
                </Button>
            </div>
        </form >
    )
}
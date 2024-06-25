import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';


const createEventSchema = z.object({
    name: z.string().min(3, { message: 'Minimo 3 caracteres.' }),
    dtStart: z.string(),
    dtEnd: z.string(),
    qtdHours: z.string().transform(Number).pipe(z.number().min(1)),
    qtdParticipants: z.string().transform(Number).pipe(z.number().min(1))
})

type CreateEventSchema = z.infer<typeof createEventSchema>

export default function CreateEventsForm() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    const queryClient = useQueryClient();
    
    const { register, handleSubmit,  reset , formState} = useForm<CreateEventSchema>({
        resolver: zodResolver(createEventSchema),
    })


    const { mutateAsync } = useMutation({
        mutationFn:
            async ({ name, dtStart, dtEnd, qtdHours, qtdParticipants }: CreateEventSchema) => {
                // delay 2s
                await new Promise(resolve => setTimeout(resolve, 2000))

                const response = await api.post('/events',
                    {
                        name,
                        dtStart,
                        dtEnd,
                        qtdHours,
                        qtdParticipants
                    })

                if (!response.data) {
                    toast.error("Erro ao criar evento!", { duration: 2000 });
                }

                return response.data
            },

            onSuccess: () => {
                toast.success("Evento cadastrado com sucesso!");
                queryClient.invalidateQueries({ queryKey: ['eventos'] });
                console.log("evento cadastrado!");
                navigate('/events')
                reset();
            },
    
            onError: () => {
                toast.error(`Erro ao criar evento`);
            },
        }
    )

    async function createEvents({ name, dtStart, dtEnd, qtdHours, qtdParticipants }: CreateEventSchema) {
        if (name === "") {
            toast.error("Nome é obrigatório!", { duration: 2000 });
            return;
        }

        await mutateAsync({ name, dtStart, dtEnd, qtdHours, qtdParticipants })
    }

    return (

<Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">Nova Categoria</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova Categoria de Produtos</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(createEvents)}>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right text-muted-foreground">
                                Nome
                            </Label>
                            <Input
                                {...register('name')}
                                id="name"
                                type="text"
                                //required
                                className="col-span-3 w-full"
                            />

                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dtStart" className="text-right text-muted-foreground">
                                Data Inicio
                            </Label>
                            <Input
                                {...register('dtStart')}
                                id="dtStart"
                                type="date"
                                //required
                                className="col-span-3 w-full"
                            />

                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dtEnd" className="text-right text-muted-foreground">
                                Data Final
                            </Label>
                            <Input
                                {...register('dtEnd')}
                                id="dtEnd"
                                type="date"
                                //required
                                className="col-span-3 w-full"
                            />

                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="qtdHours" className="text-right text-muted-foreground">
                                Carga Horaria
                            </Label>
                            <Input
                                {...register('qtdHours')}
                                id="qtdHours"
                                type="number"
                                //required
                                className="col-span-3 w-full"
                            />

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="qtdParticipants" className="text-right text-muted-foreground">
                                quantidade de participantes
                            </Label>
                            <Input
                                {...register('qtdParticipants')}
                                id="qtdParticipants"
                                type="number"
                                //required
                                className="col-span-3 w-full"
                            />

                        </div>
                        {/* <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="descricao" className="text-right text-muted-foreground">
                                Observação
                            </Label>
                            <Textarea
                                {...register('descricao')}
                                id="descricao"
                                className="col-span-3"
                            />
                        </div> */}
                    </div>
                    <DialogFooter>
                        <DialogClose className="mr-3 text-muted-foreground">Cancelar</DialogClose>
                        <Button disabled={formState.isSubmitting} className="bg-blue-400 text-teal-700" type="submit">
                            {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
                            <span className="text-black">Salvar</span>
                            {formState.errors?.name && (<p className="text-sm text-red-400">{formState.errors.name.message}</p>)}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >


)
}
{/* <form onSubmit={handleSubmit(createUser)} className="w-full space-y-6">
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
        <Dialog.Close asChild>
            <Button>
                <X className="size-3" />
                Cancel
            </Button>
        </Dialog.Close>
        <Button disabled={formState.isSubmitting} className="bg-teal-400 text-teal-950" type="submit">
            {formState.isSubmitting ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />}
            Save
        </Button>
    </div>
</form > */}
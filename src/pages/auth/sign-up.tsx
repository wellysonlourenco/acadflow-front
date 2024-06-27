import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";


const singUpForm = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
})

type SingUpForm = z.infer<typeof singUpForm>


export function SignUp() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState()

    


    // function handleSingUp() {
    //     if (!name || !email || !password) {
    //         toast.error('Preencha todos os campos!', { duration: 5000 });
    //         return;
    //     }

    //     if (password !== confirmPassword) {
    //         toast.error('As senhas não conferem!');
    //         return;
    //     }
    //     console.log({ name, email, password });
    // }


    const queryClient = useQueryClient()


    const { mutateAsync } = useMutation({
        mutationFn: async ({ name, email, password }: SingUpForm) => {
            await api.post('/accounts/signup', { name, email, password })
        },
        onSuccess: () => {
            toast.success('Cadastro realizado com sucesso!');
            navigate(`/sing-in?email=${email}`)
        },
        onError: () => {
            console.log('Erro ao cadastrar!')
        }
    
    }) 

    const {register, handleSubmit} = useForm<SingUpForm>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function handleSingUp ({ name, email, password, confirmPassword }: SingUpForm)  {
        if (name === "" || email === ""  || password === ""  ) {
            toast.error('Preencha todos os campos!', { duration: 3000 });
            return;
        }
    
        if (password !== confirmPassword) {
            toast.error('As senhas não conferem!');
            return;
        }
    
        mutateAsync({
            name, email, password,
            confirmPassword: ""
        })
        console.log({ name, email, password });
    }

    // async ({ name, email, password }: SingUpForm) => {
    //     try {
    //         await api.post('/accounts/signup', { name, email, password })
    //         toast.success('Cadastro realizado com sucesso!');
    //         navigate('/sing-in')
    //     } catch (error) {
    //         toast.error('Erro ao cadastrar!');
    //     }
    // }

    return (
        <>
            <Helmet title='Cadastro' />
            <div className="p-8 ">

                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sing-in">Fazer Login</Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar Conta</h1>
                        <p className="text-sm text-muted-foreground">Cadastre com email academico!</p>
                    </div>


                    <form onSubmit={handleSubmit(handleSingUp)} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                {...register('name')}
                                //onChange= {e => setName(e.target.value)}
                            />

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail:</Label>
                            <Input
                                id="email"
                                type="text"
                                {...register('email')}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                //onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 pb-10">
                            <Label htmlFor="confirmPassword">Confirmar a Senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword')}
                                //onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full" type="submit" >Finalizar Cadastro</Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concordas com nossos {' '} <a className="underline underline-offset-4" href="">Termos de serviço</a>{' '} e {' '} <a className="underline underline-offset-4" href="">Política de privacidade.</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";


const singInForm = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20)
})

type SingInForm = z.infer<typeof singInForm>


export function SignIn() {
    const { signIn, signed } = React.useContext(AuthContext);
    const { register, handleSubmit, formState: { isSubmitted } } = useForm<SingInForm>();
    const [showPassword, setShowPassword] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);


    async function handleSignIn(data: SingInForm) {
        signIn({ email: data.email, password: data.password }); 
        
        if(signed) {
            return <Link to="/dashboard" />
        } else {
            toast.error('Credenciais inválidas.')
        }

    }

    return (
        <>
            <Helmet title='Login' />
            <div className="p-8 ">

                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sing-up">Novo Cadastro</Link>
                </Button>


                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe os eventos pelo painel academico!</p>
                    </div>


                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu E-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <div className="space-y-2 pb-5">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" {...register('password')} />
                        </div>
                        <Button className="w-full" type="submit"> Acessar painel </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
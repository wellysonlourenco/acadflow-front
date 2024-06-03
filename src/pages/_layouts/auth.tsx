import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className='grid min-h-screen  grid-cols-2 antialiased'>
            <div className='flex h-full flex-col  justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground '>

            <div className='flex items-center gap-3 text-lg font-medium text-foreground'> 
                    <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
                    <span className='font-semibold'>AcadFlow - Sistema de Gerenciamento</span>
            </div>
            <footer className='text-sm'>
                    Wellyson Lourenço &copy; AcadFlow - {new Date().getFullYear()}

            </footer>
            </div>


            <div className='flex flex-col items-center justify-center relative'>
                <Outlet />
            </div>
        </div>
    )
}
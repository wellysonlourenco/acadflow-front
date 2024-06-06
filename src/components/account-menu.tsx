import { getProfile } from "@/api/get-profile";
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, LogOut, User } from "lucide-react";
import { AvatarUser } from "./avatar-user";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {

    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,
    })


    console.log(profile?.userData.name)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 select-none">
                    <div className="flex flex-col items-end gap-0.5">
                        {isLoadingProfile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ) : (
                            <>
                                <span>{profile?.userData.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.userData.email}
                                </span>
                            </>
                        )}
                    </div>
                    <AvatarUser />
                    <ChevronDown className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    <button >Sair</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
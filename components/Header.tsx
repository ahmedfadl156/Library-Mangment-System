'use client'
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth"
import { signAccountOut } from "@/lib/actions/auth"
import { toast } from "sonner"

export const Header = ({session}: {session: Session}) => {
    const currentPath = usePathname();
    const handleSignOut = () => {
        signAccountOut();
        toast.success("You have successfully signed out.")
        redirect("/")
    }
return (
    <header className="flex items-center justify-between gap-5 my-10">
        <Link href="/" className="flex gap-1 items-center">
            <Image src="/icons/logo.svg" alt="Logo" width={40} height={40}>
            </Image>
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
        </Link>
        <ul className="flex gap-5 text-white">
            <li>
                <Link href="/" className={cn("text-base cursor-pointer capitalize" , currentPath === '/' ? "text-[#EED1AC]" : "text-white")}>Home</Link>
            </li>
            <li>
                <Link href="/search" className={cn("text-base cursor-pointer capitalize" , currentPath === '/search' ? "text-[#EED1AC]" : "text-white")}>Search</Link>
            </li>
            <li>
                <Link href="/my-profile" className="flex gap-2">
                    <Avatar>
                        <AvatarFallback className="text-black font-bold bg-[#ACDDEE]">{session?.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{session.user?.name?.split(" ").at(0)}</p>
                </Link>
            </li>
            <li>
                <button onClick={handleSignOut} className="cursor-pointer">
                    <Image src="/icons/logout.png" alt="Logout" width={22} height={22}/>
                </button>
            </li>
        </ul>
    </header>
)
}

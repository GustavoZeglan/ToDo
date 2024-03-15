import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "../lib/auth";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({children}: PrivateLayoutProps) {
    const userSession = await getServerSession(nextAuthOptions)

    
    if (!userSession) {
        redirect('/');
    }
    
    return <>{children}</>;
}
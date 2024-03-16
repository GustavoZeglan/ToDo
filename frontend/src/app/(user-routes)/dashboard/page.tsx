import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../lib/auth";
import Main from "./main";

export default async function DashboardPage() {

    const session = await getServerSession(nextAuthOptions)

    if (session) {
        return <Main name={session!.user.name} id={session!.user.id} token={session!.token}/>
    }

}
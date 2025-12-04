'use server';

import { signIn, signOut } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { error } from "console";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { toast } from "sonner";
import { success } from "zod";
import { redirect } from "next/navigation";
import ratelimit from "../ratelimit";
import { Client } from "@upstash/workflow";
import config from "../config";

const client = new Client({
    url: config.env.qstashUrl,
    token: config.env.qstashToken,
})

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const {email , password} = params;
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const {success} = await ratelimit.limit(ip);
    if(!success){
        return redirect("/too-fast")
    }
    try {
        const result = await signIn('credentials' , {
            email,
            password,
            redirect: false
        })
        if(result?.error){
            return{success: false , error: result.error}
        }
        return{success: true}
    } catch (error) {
        console.log(error , "SignIn Failed");
        return{success:false , error: "SignIn Failed"}
    }
}

export const signUp = async (params: AuthCredentials) => {
    const {fullName , email , password , universityId , universityCard} = params;
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const {success} = await ratelimit.limit(ip);
    if(!success){
        return redirect("/too-fast")
    }
    const existingUser = await db.select().from(users).where(eq(users.email , email))
    if(existingUser.length > 0){
        return {success: false, error: "User Already Exist"};
    }
    const hashedPassword = await hash(password , 10)
    try {
        await db.insert(users).values({
            fullName,
            email,
            universityCard,
            universityId,
            password:hashedPassword,
        })
        await client.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
            body: {
                email,
                fullName,
            },
        })
        await signInWithCredentials({email , password})
        return {success: true}
    } catch (error) {
        console.log(error , "Signup Failed");
        return{success:false , error: "Signup Failed"}
    }
}

export const signAccountOut = async () => {
    try {
        await signOut()
        return {success: true}
    } catch (error) {
        console.log(error , "SignOut Failed");
        return{success:false , error: "SignOut Failed"}
    }
}
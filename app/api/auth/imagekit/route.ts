import config from "@/lib/config"
import ImageKit from "imagekit"
import { NextResponse } from "next/server"
const imagekit = new ImageKit({
    publicKey: config.env.imagekit.publicKey,
    privateKey: config.env.imagekit.privateKey,
    urlEndpoint: config.env.imagekit.urlEndpoint
})

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

export const GET = async () => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters()
        return NextResponse.json(authenticationParameters, { headers: corsHeaders })
    } catch (error) {
        console.error("Error generating authentication parameters:", error)
        return NextResponse.json({ error: "Failed to generate authentication parameters" }, { status: 500, headers: corsHeaders })
    }
}

export const OPTIONS = async () => {
    return NextResponse.json({}, { headers: corsHeaders })
}
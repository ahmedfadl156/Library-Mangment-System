import config from "@/lib/config"
import ImageKit from "imagekit"
import { NextResponse } from "next/server"
const imagekit = new ImageKit({
    publicKey: config.env.imagekit.publicKey,
    privateKey: config.env.imagekit.privateKey,
    urlEndpoint: config.env.imagekit.urlEndpoint
})

export const GET = async () => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters()
        return NextResponse.json(authenticationParameters)
    } catch (error) {
        console.error("Error generating authentication parameters:", error)
        return NextResponse.json({ error: "Failed to generate authentication parameters" }, { status: 500 })
    }
}
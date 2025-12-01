"use client"

import config from "@/lib/config"
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";


const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status} ${errorText}`)
        }
        const data = await response.json();
        const {signature , expire , token} = data;
        return {signature , expire , token}
    } catch (error: any) {
        throw new Error(`Authentacation Failed ${error.message}`)
    }
}
export const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
    const [file , setFile] = useState(null)
    const ikUploadRef = useRef(null)
    const onError = (error: any) => {
        toast.error(`Failed to upload image ${error.message}`)
    }
    const onSuccess = (res: any) => {
        setFile(res)
        onFileChange(res.filePath)
        toast.success("Image Uploaded Successfully")
    }

return (
    <IKContext
            publicKey={config.env.imagekit.publicKey}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            authenticator={authenticator}>
        <IKUpload 
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        />
        <button onClick={(e) => {
            e.preventDefault();
            if(ikUploadRef.current){
                // @ts-ignore
                ikUploadRef.current?.click();
            }
        }} className="flex justify-center cursor-pointer items-center gap-2 h-13 mt-2 bg-[#232839] p-2 rounded-md">
            <Image 
            src="/icons/upload.svg"
            alt="Upload Icon"
            width={20}
            height={20}
            className="object-contain"
            />
                <p className="text-base text-[#D6E0FF]">Upload a File</p>
                {file && <p className="">{file.filePath}</p>}
        </button>
        {file && (
            <IKImage 
            src={file.filePath}
            />
        )}
    </IKContext>
)
}

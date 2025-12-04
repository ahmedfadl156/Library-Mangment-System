'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { DefaultValues, FieldValues, Path, SubmitHandler, UseFormReturn, useForm } from "react-hook-form"
import type { ZodSchema } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { FIELD_NAMES, FIELD_TYPES } from "@/constants"
import { cn } from "@/lib/utils"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ImageUpload } from "./ImageUpload"

interface Props<TFieldValues extends FieldValues> {
  schema: ZodSchema
  defaultValues: DefaultValues<TFieldValues>
  onSubmit: (data: TFieldValues) => Promise<{ success: boolean; error?: string }>
  type: "SIGN_IN" | "SIGN_UP"
}

const AuthForm = <TFieldValues extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<TFieldValues>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN"
  const form: UseFormReturn<TFieldValues> = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<TFieldValues> = async (data) => {
    const result = await onSubmit(data);
    if(result.success){
      toast.success(`${isSignIn ? "You have successfully signed in." : "You have successfully signed up."}`)
      router.push("/")
    }else{
      toast.error(`${isSignIn ? "Sign In" : "Sign Up"} Failed`)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p>
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-8">
          {Object.keys(defaultValues as Record<string, unknown>).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as Path<TFieldValues>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? <ImageUpload onFileChange={field.onChange}/> :
                     <Input {...field} className="bg-[#232839] h-13 border-none outline-none"
                     type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                     required
                     />}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="grid">
        <Button type="submit" className="bg-[#E7C9A5] text-black h-13 text-xl font-bold cursor-pointer hover:text-[#E7C9A5]">{isSignIn ? "Sign in" : "Sign up"}</Button>
          </div>
        </form>
      </Form>
      <p className="text-center text-base font-medium mt-4">
        {isSignIn ? "New to BookWise?" : "Already have an account?"}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-[#E7C9A5] ml-1 font-bold">
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
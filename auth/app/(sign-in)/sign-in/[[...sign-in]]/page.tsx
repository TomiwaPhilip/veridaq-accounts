"use client"

import { GoogleButton, MicrosoftButton } from "@/components/buttons/social";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const onSubmit = (data: z.infer<typeof formSchema>) => {
  console.log(data)
}

const passwordSchema = z
  .string()
  .min(7, { message: "Password must be at least 7 characters." })
  .refine((password) => {
    // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    return hasUppercase && hasLowercase && hasDigit;
  }, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit."
  });

const formSchema = z.object({
  email: z.string().min(7, {
    message: "Email must be at least 7 characters.",
  }),
  password: passwordSchema,
});

export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <main className="text-white">
      <div className="pt-5 pb-5">
        <p className="text-center text-[24px] font-bold"> Sign in to continue to Veridaq.com </p>
        <div className="flex flex-col justify-center items-center pt-[4rem]">
          <div className="flex flex-col justify-center items-center">
            <GoogleButton />
            <br />
            <MicrosoftButton />
            <br />
            <hr className="w-[50%]" />
        </div>
        <div className="pt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-[20px]">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-[20px]">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="EXample123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
        </Form>
      </div>
      </div>
      </div>
    </main>
  );
}

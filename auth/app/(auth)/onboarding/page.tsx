"use client"

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form/form";
import { Input } from "@/components/form/input";

import Button from "@/components/buttons/button";
import { OnboardingValidation } from "@/lib/validations/onboarding"
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from "@/lib/useUploadthing";

export default function Home() {

  const router = useRouter();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof OnboardingValidation>>({
    resolver: zodResolver(OnboardingValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      otherName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
      profile_photo: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof OnboardingValidation>) => {
    const blob = data.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        otherName: data.otherName,
        streetAddress: data.streetAddress,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        profile_photo: data.profile_photo,
    });
      console.log(data);
      router.push('/dashboard');
  };



  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

//   if (!isClient) {
//     return null; // Return null while waiting for client-side rendering
//   }

  return (
    <main className="text-white">
      <div className="pt-5 pb-5">
        <p className="text-center text-2xl font-bold">Complete your profile to continue</p>
        <div className="pt-[5rem] px-[10rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-[6.5rem] space-10 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">First Name</FormLabel>
                                <FormControl>
                                <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">Password</FormLabel>
                                <FormControl>
                                <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-[6.5rem] space-10 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="otherName"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">Other Names</FormLabel>
                                <FormControl>
                                <Input placeholder="Floyd" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="streetAddress"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">Street Address</FormLabel>
                                <FormControl>
                                <Input placeholder="No. 123, ABC Street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-[6.5rem] space-10 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">City</FormLabel>
                                <FormControl>
                                <Input placeholder="London" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">Postal Code</FormLabel>
                                <FormControl>
                                <Input placeholder="11223A" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-[6.5rem] space-10 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className="font-medium text-[20px]">Country</FormLabel>
                                <FormControl>
                                <Input placeholder="United Kingdom" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='profile_photo'
                            render={({ field }) => (
                                <FormItem className='flex items-center gap-4'>
                                <FormLabel className='account-form_image-label'>
                                    {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile_icon'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                    ) : (
                                    <Image
                                        src='/assets/icons/avatar.svg'
                                        alt='profile_icon'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                    )}
                                </FormLabel>
                                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                    <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>  
                <div className="text-center">
                    <Button type="submit" name="Save and Continue" />
                </div>
                </form>
            </Form>
        </div>
          
        </div>
    </main>
  );
}

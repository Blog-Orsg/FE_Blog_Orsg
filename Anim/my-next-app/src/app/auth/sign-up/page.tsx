/* eslint-disable */

"use client";
import React, { useState, useTransition } from "react";
import { TSFixMe, User } from "@/app/types/user";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SignUp } from "@/app/action/sign-up/schema";
import { useCreateUser } from "@/app/api/users/use-create-user";

const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof SignUp>>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      avatar: "",
    },
  });

  const [data, setData] = useState<User>({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    name: "",
  });

  const handleSubmit = async (e: any) => {
    const newUser: User = {
      username: form.getValues("username"),
      email: form.getValues("email"),
      password: form.getValues("password"),
      phone: form.getValues("phone"),
      address: form.getValues("address"),
      avatar: form.getValues("avatar"),
      name: form.getValues("name"),
    };

    try {
      await mutate(newUser);
      setData({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        name: "",
      });
      form.reset();
      setErrorMessage("");
      startTransition(() => {
        router.push("/auth/sign-in");
      });
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.");
    }
  };

  const onSubmit = (data: TSFixMe) => {
    handleSubmit(data);
  };

  const { mutate } = useCreateUser();

  return (
    <div className="w-full lg:w-[500px] mx-auto flex flex-col justify-center h-max py-4 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 p-4 lg:p-10 items-center bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 ">
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Name"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border-gray-100 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Username"
                        {...field}
                        type="text"
                        className=" px-4 py-2 transition duration-300 border-gray-100 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Password"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    {errorMessage && (
                      <p className="text-red-500 text-sm text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Email"
                        {...field}
                        type="email"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Phone"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Address"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>

                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Avatar URL"
                        {...field}
                        type="text"
                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-4">
              <Button
                disabled={isPending}
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500
                 rounded hover:bg-background-700"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;

/* eslint-disable */

"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignIn } from "@/app/action/sign-in/schema";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof SignIn>>({
    resolver: zodResolver(SignIn),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: form.getValues("username"),
      password: form.getValues("password"),
    });
    if (result?.ok) {
      setErrorMessage("");
      startTransition(() => {
        router.push("/blog");
      });
    } else {
      setErrorMessage("Username or password is incorrect");
    }
  };

  return (
    <div className="w-fit lg:w-[500px] mx-auto flex flex-col justify-center h-screen rounded-lg">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 p-10 items-center bg-gradient-to-r from-blue-800 via-purple-900 to-pink-500 ">
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
                    <FormMessage />
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
                      <p className="text-red-500 text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                    <FormMessage />
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
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;

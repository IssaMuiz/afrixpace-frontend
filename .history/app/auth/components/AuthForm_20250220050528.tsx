/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { login, signup } from "@/services/auth";

const authSchema = (type: "login" | "signup") => {
  return type === "signup"
    ? z.object({
        username: z.string().min(2, "Name is required").optional(),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    : z.object({
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      });
};

type AuthFormData = {
  username?: string;
  email: string;
  password: string;
};

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema(type)) });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);
      if (type === "login") {
        const res = await login(data.email, data.password);

        console.log("User log in:", res);

        router.push("/");
      } else {
        const res = await signup(data.username!, data.email, data.password);
        console.log("User signed up:", res);
      }
    } catch (error) {
      console.error("Invalid credentials", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex items-center justify-center mt-20">
      <Card className="w-full max-w-md lg:max-w-lg p-6 shadow-lg">
        <div className=" text-center">
          <h1 className="text-red-500 text-7xl font-semibold">Mitty</h1>
          <p className="text-lg mt-2 text-gray-700 font-semibold">
            A stronger community
          </p>
        </div>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold capitalize">
            {type === "login" ? "Login" : "Signup"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {type === "signup" && (
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />{" "}
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username.message}/
                  </p>
                )}
              </div>
            )}

            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="w-full">
              {loading
                ? "Processing..."
                : type === "login"
                ? "Login"
                : "Sign up"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              href={type === "login" ? "/auth/register" : "/auth/login"}
              className="text-blue-500 hover:underline ml-2"
            >
              {type === "login" ? "Sign up" : "Login"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

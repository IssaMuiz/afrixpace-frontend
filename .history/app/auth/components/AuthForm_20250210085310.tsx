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

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters"),
  ...(process.env.NEXT_PUBLIC_SIGNUP
    ? { name: z.string().min(2, "Name is required") }
    : {}),
});

type AuthFormData = z.infer<typeof authSchema>;

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Submitted:", data);

      router.push("/");
    }, 1500);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold capitalize">
            {type === "login" ? "Login" : "Signup"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {type === "signup" && (
              <div>
                <Input placeholder="Full Name" {...register("name")} />{" "}
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}/</p>
                )}
              </div>
            )}

            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
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
              href={type === "login" ? "/auth/signup" : "/auth/login"}
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

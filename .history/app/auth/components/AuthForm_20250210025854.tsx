'use client'

import { useState } from "react"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const authSchema = z.object({email: z.string().email("Invalid email address"), password: z.string().min(7, "Password must be at least 7 characters"), ...(process.env.NEXT_PUBLIC_SIGNUP ? {name: z.string().min(2, "Name is required")})})
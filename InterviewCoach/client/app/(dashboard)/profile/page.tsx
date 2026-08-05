"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User, Mail, Lock, Moon, Sun, Save, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Alex",
      lastName: "Developer",
      email: "alex@example.com",
    }
  })

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema)
  })

  const onProfileSubmit = async (data: any) => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  const onPasswordSubmit = async (data: any) => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    setIsDarkMode(isDark)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account details and preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="glass text-center overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-8 pt-8">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-[3px] shadow-lg mb-4">
                <div className="h-full w-full rounded-full bg-card overflow-hidden border-4 border-background">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold">Alex Developer</CardTitle>
              <CardDescription>Free Plan</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border text-sm font-medium">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Sun className="h-4 w-4" /> Theme
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleTheme} className="h-8 rounded-full">
                    {isDarkMode ? <Sun className="h-3 w-3 mr-2" /> : <Moon className="h-3 w-3 mr-2" />}
                    {isDarkMode ? "Light" : "Dark"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5 text-primary" /> Personal Information
              </CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...registerProfile("firstName")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...registerProfile("lastName")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" className="pl-9" {...registerProfile("email")} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6 mt-4">
                <Button type="submit" disabled={isSaving} className="gap-2">
                  {isSaving ? "Saving..." : "Save Changes"} <Save className="h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5 text-primary" /> Security
              </CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="currentPassword" type="password" className="pl-9" {...registerPassword("currentPassword")} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" {...registerPassword("newPassword")} />
                    {passwordErrors.newPassword && <p className="text-destructive text-xs">{passwordErrors.newPassword.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" {...registerPassword("confirmPassword")} />
                    {passwordErrors.confirmPassword && <p className="text-destructive text-xs">{passwordErrors.confirmPassword.message as string}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-6 mt-4">
                <Button type="submit" disabled={isSaving} variant="secondary" className="gap-2">
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

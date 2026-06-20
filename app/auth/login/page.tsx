"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, TextField, Button, Input, FieldError, Checkbox } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

export default function GlassLoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  // Re-creating the visibility toggle action from your reference image concept
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Form Submission handler (adapted from your provided concept)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    // FULL-PAGE CONTAINER with Landscape Background
    <main 
      className="relative flex min-h-screen w-full items-center justify-center p-4"
      style={{
        // Replace with your actual background image path
        backgroundImage: `url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay - Adds depth and ensures readability */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* GLASSMORPHISM LOGIN FORM / CARD */}
      <Form 
        onSubmit={onSubmit}
        className="
          relative
          z-10
          flex
          w-full
          max-w-[480px]
          flex-col
          gap-7
          rounded-[32px]
          border
          border-white/20
          bg-white/10
          p-10
          shadow-2xl
          backdrop-blur-[15px]
          sm:w-[90%]
        "
      >
        
        {/* Header Text Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Login
          </h1>
          <p className="text-base font-normal text-white/90">
            Welcome back please login to your account
          </p>
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="flex flex-col gap-5">
          
          {/* Email Input Field (styled to look like "User Name" in image) */}
          <TextField
            isRequired
            name="email"
            type="email"
            // Reusing your concept validation
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <div className="relative">
              <Input 
                placeholder="Email Address" 
                className="
                  glass-input
                  w-full
                  rounded-[15px]
                  border
                  border-white/30
                  bg-transparent
                  px-5
                  py-4
                  text-lg
                  font-medium
                  text-white
                  placeholder:text-white/60
                  focus:border-white/60
                  focus:outline-none
                  focus:ring-1
                  focus:ring-white/30
                "
              />
              <Mail className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/60" />
            </div>
            <FieldError className="mt-1.5 px-2 text-sm text-rose-300" />
          </TextField>

          {/* Password Input Field with Toggle */}
          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            minLength={8}
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Need one uppercase letter";
              if (!/[0-9]/.test(value)) return "Need one number";
              return null;
            }}
          >
            <div className="relative">
              <Input 
                placeholder="Password" 
                className="
                  glass-input
                  w-full
                  rounded-[15px]
                  border
                  border-white/30
                  bg-transparent
                  px-5
                  py-4
                  text-lg
                  font-medium
                  text-white
                  placeholder:text-white/60
                  focus:border-white/60
                  focus:outline-none
                  focus:ring-1
                  focus:ring-white/30
                "
              />
              {/* Password visibility toggle button inside the field */}
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
              >
                {isVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <FieldError className="mt-1.5 px-2 text-sm text-rose-300" />
          </TextField>
        </div>

        {/* --- FORM ACTIONS --- */}
        <div className="flex flex-col gap-6">
          
          {/* Remember me Checkbox */}
          <Checkbox 
            defaultSelected
            className="text-white/90"
            radius="sm"
            color="success"
            classNames={{
              wrapper: "border border-white/40",
              label: "text-white text-base",
              icon: "text-white"
            }}
          >
            Remember me
          </Checkbox>

          {/* Main Login Submit Button (using the design gradient) */}
          <Button 
            type="submit"
            className="
              w-full
              rounded-[15px]
              bg-linear-to-r from-primary to-primary/80
              py-5
              text-xl
              font-semibold
              text-black
              shadow-lg
              transition-opacity
              hover:opacity-90
            "
            size="lg"
          >
            Login
          </Button>

          {/* Footer Navigation Link */}
          <div className="text-center text-base text-white/90">
            Dont have an account?{" "}
            <Link href="/register" className="font-semibold text-white hover:underline">
              Signup
            </Link>
          </div>
        </div>

        {/* Designer Attribution (matching image) */}
        <div className="mt-8 text-center text-sm text-white/60">
          Created by <span className="font-semibold italic text-white/80">Abul Bashar</span>
        </div>
      </Form>
    </main>
  );
}

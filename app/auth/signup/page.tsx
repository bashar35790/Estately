"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, TextField, Button, Input, FieldError, Checkbox } from "@heroui/react";
import { User, Mail, Lock, Eye, EyeOff, Image as ImageIcon, Loader2 } from "lucide-react";

// 1. Define Type Interfaces based on your ImgBB response schema
interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string; // The direct image link we need
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: { filename: string; name: string; mime: string; extension: string; url: string };
    thumb: { filename: string; name: string; mime: string; extension: string; url: string };
    medium?: { filename: string; name: string; mime: string; extension: string; url: string };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export default function GlassSignupForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  
  // Photo Upload States
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // --- ImgBB Image Upload Handler ---
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    // !!! WARNING: Replace with your actual ImgBB API Key !!!
    const IMGBB_API_KEY = "e3b2227b4908f94c323f9f643fe2b837"; 
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const result: ImgBBResponse = await response.json();

      if (result.success && result.data?.url) {
        setPhotoUrl(result.data.url); // Saves 'https://i.ibb.co/...' directly to state
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error) {
      setUploadError("Network error during upload.");
    } 
    finally {
      setIsUploading(false);
    }
  };

  // --- Form Submission handler ---
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    if (!photoUrl) {
      setUploadError("A profile photo is required.");
      return;
    }

    alert(`Account registration submitted!\n\nPayload:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <main 
      className="relative flex min-h-screen w-full items-center justify-center p-4 py-12 md:py-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* GLASSMORPHISM CARD */}
      <Form 
        onSubmit={onSubmit}
        className="relative z-10 flex w-full max-w-[480px] flex-col gap-5 rounded-[32px] border border-white/20 bg-white/10 p-8 md:p-10 shadow-2xl backdrop-blur-[15px] sm:w-[90%]"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Sign Up</h1>
          <p className="text-sm font-normal text-white/90">Create an account to manage your properties</p>
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="flex flex-col gap-3.5">

          {/* Full Name Input */}
          <TextField isRequired name="name" type="text" validate={v => v.trim().length < 2 ? "Enter your name" : null}>
            <div className="relative">
              <Input placeholder="Full Name" className="glass-input w-full rounded-[15px] border border-white/30 bg-transparent px-5 py-4 text-lg text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none" />
              <User className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/60" />
            </div>
            <FieldError className="mt-1 px-2 text-sm text-rose-300" />
          </TextField>
          
          {/* Email Input */}
          <TextField isRequired name="email" type="email" validate={v => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) ? "Invalid email" : null}>
            <div className="relative">
              <Input placeholder="Email Address" className="glass-input w-full rounded-[15px] border border-white/30 bg-transparent px-5 py-4 text-lg text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none" />
              <Mail className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/60" />
            </div>
            <FieldError className="mt-1 px-2 text-sm text-rose-300" />
          </TextField>

          {/* CUSTOM PHOTO UPLOAD INPUT FIELD */}
          <div className="flex flex-col gap-1">
            {/* Hidden field so the link automatically appends to your HeroUI form data */}
            <input type="hidden" name="photo" value={photoUrl} />
            
            <label className="relative flex w-full cursor-pointer items-center justify-between rounded-[15px] border border-white/30 bg-transparent px-5 py-4 text-lg font-medium text-white/60 transition-all hover:border-white/50">
              <span className="truncate max-w-[280px]">
                {photoUrl ? "✓ Photo Uploaded!" : isUploading ? "Uploading to ImgBB..." : "Upload Profile Photo"}
              </span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="hidden" 
                disabled={isUploading}
              />
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : photoUrl ? (
                <img src={photoUrl} alt="Preview" className="h-7 w-7 rounded-full object-cover border border-white" />
              ) : (
                <ImageIcon className="h-6 w-6 text-white/60" />
              )}
            </label>
            {uploadError && <p className="px-2 text-sm text-rose-300">{uploadError}</p>}
          </div>

          {/* Password Input */}
          <TextField isRequired name="password" type={isPasswordVisible ? "text" : "password"} minLength={8} onChange={v => setPasswordValue(v)} validate={v => v.length < 8 ? "Must be 8+ characters" : null}>
            <div className="relative">
              <Input placeholder="Password" className="glass-input w-full rounded-[15px] border border-white/30 bg-transparent px-5 py-4 text-lg text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none" />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none">
                {isPasswordVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <FieldError className="mt-1 px-2 text-sm text-rose-300" />
          </TextField>

          {/* Confirm Password Input */}
          <TextField isRequired name="confirmPassword" type={isConfirmVisible ? "text" : "password"} validate={v => v !== passwordValue ? "Passwords do not match" : null}>
            <div className="relative">
              <Input placeholder="Confirm Password" className="glass-input w-full rounded-[15px] border border-white/30 bg-transparent px-5 py-4 text-lg text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none" />
              <button type="button" onClick={toggleConfirmVisibility} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none">
                {isConfirmVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <FieldError className="mt-1 px-2 text-sm text-rose-300" />
          </TextField>
        </div>

        {/* --- FORM ACTIONS --- */}
        <div className="flex flex-col gap-4 mt-2">
          <Checkbox isRequired className="text-white/90" radius="sm" color="success" classNames={{ wrapper: "border border-white/40", label: "text-white text-sm sm:text-base", icon: "text-white" }}>
            I agree to the Terms & Conditions
          </Checkbox>

          <Button type="submit" isDisabled={isUploading} className="w-full rounded-[15px] bg-gradient-to-r from-[#A3CF16] to-[#1EAC70] py-5 text-xl font-semibold text-black shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50" size="lg">
            Create Account
          </Button>

          <div className="text-center text-base text-white/90">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-white hover:underline">Login</Link>
          </div>
        </div>
      </Form>
    </main>
  );
}

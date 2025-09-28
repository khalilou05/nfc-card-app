"use client";
import { LoginForm } from "@/components/login-form";
import React, { useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

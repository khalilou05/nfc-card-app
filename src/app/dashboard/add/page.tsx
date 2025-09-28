"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function Page() {
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    website: "",
    fbPage: "",
    igPage: "",
    tiktok: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    const resp = await fetch("", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(resp);
  };

  const items = [
    {
      name: "الإسم الكامل",
      id: "fullName",
      required: true,
    },
    {
      name: "رقم الهاتف",
      id: "phoneNumber",
    },
    {
      name: "الموقع الإلكتروني",
      id: "website",
    },

    {
      name: "صفحة الفيسبوك",
      id: "fbPage",
    },
    {
      name: "صفحة الانستقرام",
      id: "igPage",
    },
    {
      name: "صفحة التيكتوك",
      id: "tiktok",
    },
  ];
  return (
    <div className="h-full w-full flex justify-center">
      <div className="h-4/12 w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>إضافة زبون</CardTitle>
            <CardDescription>يرجي إدخال معلومات الزبون</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex flex-col gap-3"
            >
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-3"
                >
                  <Label htmlFor={item.id}>{item.name}</Label>
                  <Input
                    required={item.required ? true : false}
                    onChange={handleChange}
                    id={item.id}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <div></div>
                <Button style={{ cursor: "pointer" }}>إضافة</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useRouter } from "next/navigation";
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
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    const resp = await fetch(
      "https://nfc-card-backend.khalilbenmeziane.workers.dev/api/add",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const { userId } = await resp.json<{ userId: number }>();

    if (resp.status === 201) {
      setModalOpen(true);
      setTimeout(() => {
        router.push(`/dashboard/customers/${userId}`);
      }, 1000);
    }
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
      <div className="w-4/5">
        <Card>
          <CardHeader>
            <CardTitle>إضافة زبون</CardTitle>
            <CardDescription>يرجي إدخال معلومات الزبون</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
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
                    name={item.id}
                    required={item.required ? true : false}
                    onChange={handleChange}
                    id={item.id}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <div></div>
                <Button
                  onClick={handleSubmit}
                  style={{ cursor: "pointer" }}
                >
                  إضافة
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <AlertDialog open={isModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تم إضافة الزبون</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم تحويلك لصفحة الزبون
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

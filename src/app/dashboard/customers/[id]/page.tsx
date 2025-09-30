"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { use, useEffect, useRef, useState } from "react";
import type { UserData } from "../../../../../types";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [userData, setUserData] = useState<UserData>();
  const [isModalOpen, setModalOpen] = useState(false);

  const { id } = use(params);
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = async () => {
    if (!qrRef.current) return;
    const svgContent = qrRef.current?.outerHTML;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const writeNFC = async () => {
    try {
      // @ts-expect-error qsdqsd
      const nfc = new NDEFReader();
      nfc.scan();
      await nfc.write({
        records: [
          {
            recordType: "url",
            data: `https://nfc-card-app.khalilbenmeziane.workers.dev/${id}`,
          },
        ],
      });
      setModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await fetch(
          `https://nfc-card-backend.khalilbenmeziane.workers.dev/api/customers/${id}`
        );
        const data = await resp.json<UserData>();
        setUserData(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [id]);

  const items = [
    {
      name: "الإسم الكامل",
      id: "fullName",
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
    <div className="grid lg:grid-cols-6 grid-rows-4 gap-2 px-4 sm:grid-cols-1">
      <Card className="col-span-4 row-span-3">
        <CardHeader>
          <CardTitle>معلومات الزبون</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-3"
              >
                <Label htmlFor={item.id}>{item.name}</Label>

                <Input
                  onChange={() => {}}
                  name={item.id}
                  value={userData?.[item.id]}
                  id={item.id}
                />
              </div>
            ))}
            <div className="flex flex-col gap-3">
              <div></div>

              <AlertDialog open={isModalOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                      writeNFC();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    إدخال المعلومات إلي بطاقة NFC
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      إدخال المعلومات إلي بطاقة NFC
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      يرجي تقريب بطاقة NFC من الهاتف
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setModalOpen(false)}
                      style={{ cursor: "pointer" }}
                    >
                      إلغاء
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-fit p-3 row-span-1 col-span-2">
        <QRCodeSVG
          ref={qrRef}
          value={`https://nfc-card-app.khalilbenmeziane.workers.dev/${id}`}
        />
        <Button
          onClick={downloadQRCode}
          style={{ cursor: "pointer" }}
        >
          تحميل
        </Button>
      </Card>
    </div>
  );
}

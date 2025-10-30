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
import { fetchApi } from "@/lib/utils";
import type { Customer } from "@/types/types";
import { QRCodeSVG } from "qrcode.react";
import { Fragment, use, useEffect, useRef, useState } from "react";
import { socialMedia } from "../../../../socialMedia";
export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const [customer, setCustomer] = useState<Customer>();
  const [isModalOpen, setModalOpen] = useState(false);

  const { id } = use(params);
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    let svgContent = qrRef.current.outerHTML;
    if (!svgContent.includes("xmlns=")) {
      svgContent = svgContent.replace(
        "<svg",
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
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

      await nfc.write({
        records: [
          {
            recordType: "url",
            data: `https://twenty-print.com/${id}`,
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
        const resp = await fetchApi(`/api/customers/${id}`);
        const data = await resp.json<Customer>();
        setCustomer({
          ...data,
          socialMedia: { ...JSON.parse(data.socialMedia as string) },
        });
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [id]);

  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row">
      <Card className="sm:w-[60%] w-full">
        <CardHeader>
          <CardTitle>معلومات الزبون</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label htmlFor="fullName">الإسم الكامل</Label>
            <Input
              id="fullName"
              readOnly
              value={customer?.fullName ?? ""}
            />
            <Label htmlFor="phoneNumber">رقم الهاتف</Label>
            <Input
              readOnly
              id="phoneNumber"
              value={customer?.phoneNumber ?? ""}
            />
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              readOnly
              id="email"
              value={customer?.email ?? ""}
            />

            {customer?.socialMedia &&
              Object.entries(customer?.socialMedia).map(([key, value]) => (
                <Fragment key={key}>
                  <Label htmlFor={key}>{socialMedia[key].label}</Label>
                  <Input
                    readOnly
                    id={key}
                    value={value ?? ""}
                  />
                </Fragment>
              ))}
            <div className="flex flex-col gap-3">
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
      <Card className="w-fit h-fit sticky top-0 p-3">
        <QRCodeSVG
          level="H"
          imageSettings={{
            src: "/logo_20.svg",
            height: 55,
            width: 40,
            excavate: true,
          }}
          ref={qrRef}
          value={`https://twenty-print.com/${id}`}
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

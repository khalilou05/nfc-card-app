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

  const logo = `<svg width="215" height="83" viewBox="0 0 215 83" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M110.004 79.8543V71.127H112.953C113.637 71.127 114.197 71.2506 114.632 71.4977C115.069 71.7421 115.393 72.073 115.603 72.4906C115.813 72.9083 115.919 73.3742 115.919 73.8884C115.919 74.4026 115.813 74.8699 115.603 75.2904C115.396 75.7108 115.075 76.046 114.64 76.296C114.205 76.5432 113.649 76.6668 112.97 76.6668H110.856V75.7293H112.936C113.404 75.7293 113.781 75.6483 114.065 75.4864C114.349 75.3244 114.555 75.1057 114.683 74.8301C114.813 74.5517 114.879 74.2378 114.879 73.8884C114.879 73.5389 114.813 73.2264 114.683 72.9509C114.555 72.6753 114.348 72.4594 114.061 72.3031C113.774 72.1441 113.393 72.0645 112.919 72.0645H111.061V79.8543H110.004ZM117.485 79.8543V73.3088H118.456V74.2975H118.524C118.644 73.9736 118.86 73.7108 119.172 73.5091C119.485 73.3074 119.837 73.2066 120.229 73.2066C120.303 73.2066 120.395 73.208 120.506 73.2108C120.617 73.2137 120.701 73.2179 120.757 73.2236V74.2463C120.723 74.2378 120.645 74.225 120.523 74.208C120.404 74.1881 120.277 74.1781 120.144 74.1781C119.826 74.1781 119.541 74.2449 119.291 74.3784C119.044 74.5091 118.848 74.6909 118.703 74.9239C118.561 75.154 118.49 75.4168 118.49 75.7122V79.8543H117.485ZM121.949 79.8543V73.3088H122.955V79.8543H121.949ZM122.461 72.2179C122.265 72.2179 122.096 72.1512 121.954 72.0176C121.815 71.8841 121.745 71.7236 121.745 71.5361C121.745 71.3486 121.815 71.1881 121.954 71.0546C122.096 70.921 122.265 70.8543 122.461 70.8543C122.657 70.8543 122.824 70.921 122.964 71.0546C123.106 71.1881 123.177 71.3486 123.177 71.5361C123.177 71.7236 123.106 71.8841 122.964 72.0176C122.824 72.1512 122.657 72.2179 122.461 72.2179ZM125.803 75.9168V79.8543H124.797V73.3088H125.769V74.3316H125.854C126.007 73.9992 126.24 73.7321 126.553 73.5304C126.865 73.3259 127.269 73.2236 127.763 73.2236C128.206 73.2236 128.594 73.3145 128.926 73.4963C129.259 73.6753 129.517 73.948 129.702 74.3145C129.887 74.6781 129.979 75.1384 129.979 75.6952V79.8543H128.973V75.7634C128.973 75.2492 128.84 74.8486 128.573 74.5617C128.306 74.2719 127.939 74.127 127.473 74.127C127.152 74.127 126.865 74.1966 126.612 74.3358C126.362 74.475 126.165 74.6781 126.02 74.9452C125.875 75.2122 125.803 75.5361 125.803 75.9168ZM134.663 73.3088V74.1611H131.271V73.3088H134.663ZM132.26 71.7406H133.265V77.9793C133.265 78.2634 133.307 78.4764 133.389 78.6185C133.474 78.7577 133.582 78.8514 133.713 78.8997C133.846 78.9452 133.987 78.9679 134.135 78.9679C134.246 78.9679 134.337 78.9622 134.408 78.9509C134.479 78.9367 134.535 78.9253 134.578 78.9168L134.783 79.8202C134.714 79.8458 134.619 79.8713 134.497 79.8969C134.375 79.9253 134.22 79.9395 134.033 79.9395C133.748 79.9395 133.47 79.8784 133.197 79.7563C132.927 79.6341 132.703 79.448 132.524 79.198C132.348 78.948 132.26 78.6327 132.26 78.252V71.7406Z" fill="#004F9F"/>
<path d="M27.2283 5.04533V53.7819H22.1615V5.04533H0.259491V0.64209H49.0592V5.04533H27.2384H27.2283Z" fill="#004F9F"/>
<path d="M29.6246 16.3594H35.0062L46.0739 47.3325L57.294 16.3594H61.518L72.8193 47.3325L83.8871 16.3594H89.2687L75.0532 53.7819H70.5956L59.4568 23.3404L48.3179 53.7819H43.8604L29.6449 16.3594H29.6246Z" fill="#004F9F"/>
<path d="M105.769 15.8278C115.841 15.8278 122.909 21.896 122.909 30.4819C122.909 32.3776 122.604 34.2733 121.832 36.3997H91.0152C91.5533 44.3737 97.2395 50.0608 106.155 50.0608C113.222 50.0608 118.37 46.49 118.837 41.6354H123.213C122.523 48.9976 115.374 54.3136 105.769 54.3136C94.0106 54.3136 86.1718 46.2694 86.1718 35.1058C86.1718 23.9422 94.0816 15.8278 105.769 15.8278ZM118.289 32.528C118.37 31.846 118.441 31.2341 118.441 30.7025C118.441 24.4738 113.293 20.0003 105.759 20.0003C97.6863 20.0003 92.1524 25.1659 91.0761 32.528H118.278H118.289Z" fill="#004F9F"/>
<path d="M124.33 16.6202H129.173V23.9823C132.25 19.1277 137.703 16.0886 144.394 16.0886C153.38 16.0886 158.996 21.4748 158.996 30.211V54.0427H154.152V31.0435C154.152 24.5139 149.928 20.4116 143.084 20.4116C134.86 20.4116 129.173 26.1789 129.173 34.2231V54.0327H124.33V16.6101V16.6202Z" fill="#004F9F"/>
<path d="M169.373 20.3815V43.3807C169.373 47.5532 171.83 50.141 175.983 50.141C177.831 50.141 179.75 49.6094 180.522 48.9273V52.7187C179.364 53.5512 177.141 54.2333 174.45 54.2333C168.307 54.2333 164.54 50.2814 164.54 44.0627V20.3815H157.625V16.3594H164.54V7.17173L169.383 5.27603V16.3594H180.522V20.3815H169.383H169.373Z" fill="#004F9F"/>
<path d="M179.628 23.7917L194.463 55.5974L209.369 23.7917H214.751L191.691 71.8463C189.305 76.8614 185.467 79.8905 181.162 79.8905C179.476 79.8905 177.628 79.4391 176.399 78.5966V74.5745C177.78 75.2566 179.395 75.6377 180.552 75.6377C183.314 75.6377 185.853 73.5113 187.619 70.0208L192.077 60.9836L174.247 23.7917H179.628Z" fill="#004F9F"/>
<path d="M84.0902 79.8905H96.4171L105.779 60.9736H93.4521L84.0902 79.8905Z" fill="url(#paint0_linear_59_15)"/>
<path d="M71.7634 79.8905H84.0902L93.4521 60.9736H81.1253L71.7634 79.8905Z" fill="url(#paint1_linear_59_15)"/>
<path d="M59.4467 79.8905H71.7634L81.1253 60.9736H68.8086L59.4467 79.8905Z" fill="url(#paint2_linear_59_15)"/>
<path d="M47.0386 79.8905H59.3553L68.7172 60.9736H56.3903L47.0386 79.8905Z" fill="#1D1D1B"/>
<defs>
<linearGradient id="paint0_linear_59_15" x1="88.6087" y1="85.6578" x2="101.624" y2="53.5795" gradientUnits="userSpaceOnUse">
<stop stop-color="#00A5DC"/>
<stop offset="1" stop-color="#425EA8"/>
</linearGradient>
<linearGradient id="paint1_linear_59_15" x1="77.5917" y1="82.4682" x2="87.7932" y2="57.425" gradientUnits="userSpaceOnUse">
<stop stop-color="#E83471"/>
<stop offset="1" stop-color="#E61A63"/>
</linearGradient>
<linearGradient id="paint2_linear_59_15" x1="56.9082" y1="87.7541" x2="84.1702" y2="51.5939" gradientUnits="userSpaceOnUse">
<stop stop-color="#F5E727"/>
<stop offset="1" stop-color="#ED6C3F"/>
</linearGradient>
</defs>
</svg>
`;

  const base64 = btoa(logo);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers/${id}`,
          { credentials: "include" }
        );
        const data = await resp.json<Customer>();
        setCustomer({
          ...data,
          socialMedia: { ...JSON.parse(data.socialMedia) },
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
            src: `data:image/svg+xml;base64,${base64}`,
            height: 50,
            width: 50,
            excavate: true,
          }}
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

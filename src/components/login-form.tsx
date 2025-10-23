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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

interface Prop extends React.ComponentProps<"div"> {
  className?: string;
}

export function LoginForm({
  className,

  ...props
}: Prop) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://nfc-card-backend.khalilbenmeziane.workers.dev/login`,
        {
          method: "POST",
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );
      if (resp.status === 200) {
        router.push("/dashboard");
      }
      throw new Error(((await resp.json()) as Record<string, string>)["error"]);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log(error);
    }
  };
  const router = useRouter();
  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>تسجيل الدخول إلى حسابك</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني و كلمة المرور أدناه لدخول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  onChange={handleChange}
                  value={userData.email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">كلمة المرور</Label>
                </div>
                <Input
                  onChange={handleChange}
                  value={userData.password}
                  name="password"
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  disabled={isLoading}
                  style={{ cursor: "pointer" }}
                  type="submit"
                  className="w-full"
                >
                  {isLoading ? <Spinner className="size-6" /> : "الدخول"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

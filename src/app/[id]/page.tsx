import { Card } from "@/components/ui/card";
import Link from "next/link";
import FB from "../../../icons/FB";
import IG from "../../../icons/IG";
import Phone from "../../../icons/Phone";
import TikTok from "../../../icons/TikTok";
import type { UserData } from "../../../types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const resp =
    await fetch(`https://nfc-card-backend.khalilbenmeziane.workers.dev
/api/customers/${id}`);
  const user = await resp.json<UserData>();
  return (
    <div className="flex h-screen w-screen justify-center items-center px-4">
      <Card className="flex flex-col w-full">
        <h1 className="text-center text-2xl">{user.fullName}</h1>
        <div className="flex justify-center gap-3">
          <Link href={`tel:${user.phoneNumber}`}>
            <Phone />
          </Link>
          <Link href={`${user.fbPage}`}>
            <FB />
          </Link>
          <Link href={`${user.igPage}`}>
            <IG />
          </Link>
          <Link href={`${user.tiktok}`}>
            <TikTok />
          </Link>
        </div>
      </Card>
    </div>
  );
}

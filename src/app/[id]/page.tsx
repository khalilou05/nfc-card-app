import SaveContact from "@/components/SaveContact";

import Phone from "@/icons/Phone";
import type { Customer } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { socialMedia } from "../../socialMedia";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/customers/${id}`
  );
  if (!resp.ok) return notFound();
  const customer = await resp.json<Customer>();

  return (
    <div className="flex flex-col h-dvh w-dvw gap-4">
      <div className="h-[30%] relative">
        <Image
          src={`https://pub-9647a39e181348cf8196ba47f8e8bfb0.r2.dev/${customer.coverImg}`}
          fill
          alt="cover"
        />
      </div>
      <div className="flex flex-col justify-center w-full items-center gap-3">
        <div className="relative h-20 w-20 border-1 border-gray rounded-full overflow-hidden">
          <Image
            fill
            src={`https://pub-9647a39e181348cf8196ba47f8e8bfb0.r2.dev/${customer.profileImg}`}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <h1
          className="text-xl font-semibold
"
        >
          {customer.fullName}
        </h1>
        <SaveContact customer={customer} />
      </div>

      <div className="flex items-center flex-col">
        <div className="w-[80%] grid grid-cols-4 gap-2 [&>*:nth-child(4n)]:justify-self-end [&>*:nth-child(4n+2)]:justify-self-center [&>*:nth-child(4n+3)]:justify-self-center">
          <Link href={`tel:${customer.phoneNumber}`}>
            <Phone />
          </Link>
          {Object.entries(JSON.parse(customer.socialMedia)).map(
            ([key, value]) => (
              <Link
                href={value as string}
                key={key}
                target="_blank"
              >
                {socialMedia[key].icon}
              </Link>
            )
          )}
        </div>
      </div>
      <div className="mt-auto flex justify-center">
        <Link
          target="_blank"
          href={"https://www.facebook.com/share/1BLRQguH2s/"}
        >
          <Image
            height={60}
            width={60}
            alt=""
            src={"/logo.svg"}
          />
        </Link>
        POWRED BY{" "}
      </div>
    </div>
  );
}

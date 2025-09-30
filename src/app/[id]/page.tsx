import type { UserData } from "../../../types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const resp = await fetch(`/api/c/${id}`);
  const user = await resp.json<UserData>();
  return <div>{JSON.stringify(user)}</div>;
}

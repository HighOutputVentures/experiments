export default async function revalidatePath(pathname: string) {
  return await fetch("/api/revalidate", {
    method: "post",
    body: JSON.stringify({pathname}),
    headers: {
      "Content-type": "application/json",
    },
  });
}

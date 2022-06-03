import Image from "next/image";

export default function Empty() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
      <Image src="/notfound.svg" alt="" width={300} height={300} />
    </div>
  );
}

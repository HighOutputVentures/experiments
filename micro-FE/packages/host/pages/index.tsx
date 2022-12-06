import dynamic from "next/dynamic";

const Shop = dynamic(() => import("shop/pages/index"), {
  ssr: false,
});

export default function ShopPage() {
  return <Shop />;
}

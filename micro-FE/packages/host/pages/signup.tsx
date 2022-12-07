import dynamic from "next/dynamic";

const Signup = dynamic(() => import("auth/pages/signup"), {
  ssr: false,
});

export default function SignupPage() {
  return <Signup />;
}

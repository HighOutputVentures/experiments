import dynamic from "next/dynamic";

const Login = dynamic(() => import("auth/pages/login"), {
  ssr: false,
});

export default function LoginPage() {
  return <Login />;
}

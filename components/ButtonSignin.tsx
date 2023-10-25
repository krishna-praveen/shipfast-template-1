"use client";

import { useRouter } from "next/navigation";

// A simple button to sign in with our providers (Google & Magic Links) on the /signin page.
// Signin page automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={`btn ${extraStyle ? extraStyle : ""}`}
      onClick={() => {
        router.push("/signin");
      }}
    >
      {text}
    </button>
  );
};

export default ButtonSignin;

import { useEffect } from "react";

export function SignIn() {
  useEffect(() => {
    const googleDiv = document.getElementById("signInDiv");
    // console.log(googleDiv?.children);
    // if (!googleDiv?.children.length) location.reload();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-md bg-zinc-400 p-10">
        <h1 className="mb-4 text-lg font-bold text-white">Fazer Login</h1>
        <div id="signInDiv"></div>
      </div>
    </div>
  );
}

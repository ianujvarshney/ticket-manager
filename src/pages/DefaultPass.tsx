import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Eye, EyeClosed } from "phosphor-react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function DefaultPass() {
  const [pass, setPass] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function keyVerify(e: KeyboardEvent) {
      if (
        e.code.toLowerCase() === "enter" ||
        e.code.toLowerCase() === "numpadenter"
      )
        handleSignIn();
    }

    addEventListener("keydown", keyVerify);

    return () => removeEventListener("keydown", keyVerify);
  }, [pass]);

  function handleSignIn() {
    if (import.meta.env.VITE_DEFAULT_PASS === pass) {
      navigate("/sign-in");
      return;
    }

    alert("Senha Inválida");
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-md bg-zinc-400 p-10 pb-8 pt-8">
        <h1 className="mb-4 text-lg font-bold text-white">
          Digite a senha padrão
        </h1>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={!isPassVisible ? "password" : "text"}
            placeholder="digite a senha padrão"
            className="mb-4 pr-4 "
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            className="absolute right-1 top-[calc(50%_-_8px)] z-10 -translate-y-1/2 p-2"
            onClick={() => setIsPassVisible((prevState) => !prevState)}
          >
            {isPassVisible ? (
              <EyeClosed size={14} className="text-zinc-900" />
            ) : (
              <Eye size={14} className="text-zinc-900" />
            )}
          </button>
        </div>

        <Button onClick={() => handleSignIn()}>Entrar</Button>
      </div>
    </div>
  );
}

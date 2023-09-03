import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Eye, EyeClosed } from "phosphor-react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function DefaultPass() {
  const [pass, setPass] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [hasPass, setHasPass] = useState(false);
  const navigate = useNavigate();

  const passSchema = z
    .object({
      defaultPass: z
        .string({ required_error: "Preencha a senha" })
        .trim()
        .min(4, "A senha deve ter pelo menos 4 caracteres"),
      confirmDefaultPass: z.string().trim().min(4),
    })
    .refine((data) => data.defaultPass === data.confirmDefaultPass, {
      message: "As senhas devem ser iguais",
      path: ["confirmDefaultPass"],
    });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passSchema),
  });

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

  useEffect(() => {
    (async () => {
      const hasDefaultPass = await (window as any).config.hasDefaultPass();
      setHasPass(hasDefaultPass);
    })();
  }, []);

  async function handleSignIn() {
    const resp = await (window as any).config.comparePass(pass);

    if (resp) {
      navigate("/sign-in");
      return;
    }

    alert("Senha Inválida");
  }

  async function onSubmit(formValues: FieldValues) {
    const hasSuccess = await (window as any).config.setDefaultPass(
      formValues.defaultPass
    );

    if (hasSuccess) {
      return setHasPass(true);
    }

    alert("Erro ao criar a senha!");
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center p-4">
      {hasPass && (
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
      )}

      {!hasPass && (
        <form
          className="flex flex-col items-center gap-2 rounded-md bg-zinc-400 p-10 pb-8 pt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-4 text-lg font-bold text-white">
            Crie uma senha padrão
          </h1>

          <div className="relative">
            <Controller
              name="defaultPass"
              control={control}
              render={({ field }) => (
                <Input
                  id="default-password"
                  type={!isPassVisible ? "password" : "text"}
                  placeholder="digite a senha padrão"
                  className="mb-4 pr-4 "
                  {...field}
                />
              )}
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

            {errors?.defaultPass?.message && (
              <span className="absolute bottom-0 z-10 whitespace-nowrap text-xs text-red-600">
                {String(errors?.defaultPass?.message)}
              </span>
            )}
          </div>

          <div className="relative">
            <Controller
              name="confirmDefaultPass"
              control={control}
              render={({ field }) => (
                <Input
                  id="confirm-default-password"
                  type={!isPassVisible ? "password" : "text"}
                  placeholder="confirme a senha"
                  className="mb-4 pr-4 "
                  {...field}
                />
              )}
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

            {errors?.confirmDefaultPass?.message && (
              <span className="absolute bottom-0 z-10 whitespace-nowrap text-xs text-red-600">
                {String(errors?.confirmDefaultPass?.message)}
              </span>
            )}
          </div>

          <Button type="submit">Confirmar</Button>
        </form>
      )}
    </div>
  );
}

import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { Eye, EyeClosed, X } from "phosphor-react";
import { Input } from "../components/Input";
import { Toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

const passSchema = z
  .object({
    currentPass: z.string(),
    newPass: z
      .string({ required_error: "Preencha a senha" })
      .trim()
      .min(4, "A senha deve ter pelo menos 4 caracteres"),
    confirmNewPass: z.string().trim().min(4),
  })
  .refine((data) => data.newPass === data.confirmNewPass, {
    message: "As senhas devem ser iguais",
    path: ["confirmDefaultPass"],
  });

export function ChangePass() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [toastDescription, setToastDescription] = useState("");
  const [toastVisibility, setToastVisibility] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passSchema),
  });

  async function onSubmit(formValues: FieldValues) {
    const { currentPass, newPass } = passSchema.parse(formValues);

    const resp = await (window as any).config.comparePass(currentPass);

    if (!resp) {
      setToastDescription("A senha digitada está incorreta!");
      return setToastVisibility(true);
    }

    try {
      const hasSuccess = await (window as any).config.changePass({
        newPass,
        pass: currentPass,
      });

      if (hasSuccess) {
        alert("The password has been updated successfully!");
        navigate("/");
      }
    } catch (e) {
      alert("Erro ao criar a senha!");
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center p-4">
      <header className="fixed top-0 w-full justify-end flex px-4 py-2">
        <Button onClick={() => navigate("/")}>
          <X />
        </Button>
      </header>

      <form
        className="flex flex-col items-center gap-2 rounded-md bg-zinc-400 p-10 pb-8 pt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 text-lg font-bold text-white">Mudar Senha</h1>

        <div className="relative">
          <Controller
            name="currentPass"
            control={control}
            render={({ field }) => (
              <Input
                id="currentPass"
                type={!isPassVisible ? "password" : "text"}
                placeholder="digite a senha atual"
                className="mb-4 pr-4 "
                {...field}
              />
            )}
          />

          <button
            className="absolute right-1 top-[calc(50%_-_8px)] z-10 -translate-y-1/2 p-2"
            onClick={() => setIsPassVisible((prevState) => !prevState)}
            type="button"
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
            name="newPass"
            control={control}
            render={({ field }) => (
              <Input
                id="new-password"
                type={!isPassVisible ? "password" : "text"}
                placeholder="digite a nova senha"
                className="mb-4 pr-4 "
                {...field}
              />
            )}
          />

          <button
            className="absolute right-1 top-[calc(50%_-_8px)] z-10 -translate-y-1/2 p-2"
            onClick={() => setIsPassVisible((prevState) => !prevState)}
            type="button"
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

        <div className="relative">
          <Controller
            name="confirmNewPass"
            control={control}
            render={({ field }) => (
              <Input
                id="confirm-new-password"
                type={!isPassVisible ? "password" : "text"}
                placeholder="confirme a nova senha"
                className="mb-4 pr-4 "
                {...field}
              />
            )}
          />

          <button
            className="absolute right-1 top-[calc(50%_-_8px)] z-10 -translate-y-1/2 p-2"
            onClick={() => setIsPassVisible((prevState) => !prevState)}
            type="button"
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

        <Toast
          description={toastDescription}
          isOpen={toastVisibility}
          onOpenChange={setToastVisibility}
        />

        <Button type="submit">Confirmar</Button>
      </form>
    </div>
  );
}

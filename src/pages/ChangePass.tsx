import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { Eye, EyeClosed } from "phosphor-react";
import { Input } from "../components/Input";
import { Toast } from "../components/Toast";

const passSchema = z
  .object({
    currentPass: z.string(),
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

export function ChangePass() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [toastDescription, setToastDescription] = useState("");
  const [toastVisibility, setToastVisibility] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passSchema),
  });

  async function onSubmit(formValues: FieldValues) {
    const { currentPass } = passSchema.parse(formValues);

    const resp = await (window as any).config.comparePass(currentPass);

    if (!resp) {
      setToastDescription("A senha digitada está incorreta!");
      return setToastVisibility(true);
    }

    const hasSuccess = await (window as any).config.setDefaultPass(
      formValues.defaultPass
    );

    if (hasSuccess) {
      alert("The password has been updated successfully!");
    }

    alert("Erro ao criar a senha!");
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center p-4">
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

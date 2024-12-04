"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { toast } from "sonner";
import { Google, OpenAI } from "@/components/icons";
import { EyeIcon, EyeOff } from "lucide-react";
import { Models } from "@/lib/types";

const Settings = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [model, setModel] = useState(localStorage.getItem("model") || "gpt4o");
  const [isShowAPiKey, setIsShowAPiKey] = useState(false);

  const onSaveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!localStorage.getItem("apiKey")) {
      localStorage.setItem("apiKey", apiKey);
    }

    if (!localStorage.getItem("model")) {
      localStorage.setItem("model", model);
    }

    if (localStorage.getItem("apiKey") !== apiKey) {
      localStorage.setItem("apiKey", apiKey);
    }

    if (localStorage.getItem("model") !== model) {
      localStorage.setItem("model", model);
    }

    toast.success("Se han guardado los cambios");
  };

  const togglePasswordVisibility = () => {
    setIsShowAPiKey(prev => !prev);
  };

  return (
    <section className="!mt-[30px]">
      <form onSubmit={onSaveSettings}>
        <div className="group-fields">
          <Label>Selecciona el modelo</Label>
          <p>
            Elige el modelo de IA que deseas utilizar para la generación del quiz.
          </p>
          <Select onValueChange={(e) => setModel(e)} defaultValue={model}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar el modelo" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={Models.GPT4o} className="w-full cursor-pointer">
                <div className="select-item">
                  <OpenAI className="text-black dark:text-white" />
                  <p>OpenAI - GPT-4o</p>
                </div>
              </SelectItem>
              <SelectItem value={Models.GPT4oMini} className="w-full cursor-pointer">
                <div className="select-item">
                  <OpenAI className="text-black dark:text-white" />
                  <span className="flex gap-2 items-center">
                    <p>OpenAI - GPT-4o-mini</p>
                  </span>
                </div>
              </SelectItem>
              <SelectItem value={Models.Gemini15ProLatest} className="w-full cursor-pointer">
                <div className="select-item">
                  <Google />
                  <p>Google - Gemini Pro 1.5</p>
                </div>
              </SelectItem>
              <SelectItem value={Models.GeminiFlash15} className="w-full cursor-pointer">
                <div className="select-item">
                  <Google />
                  <p>Google - Gemini Flash 1.5</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="group-fields">
          <Label>Ingresa tu API KEY</Label>
          <p>
            Ingresa tu clave de API para poder utilizar los servicios del modelo que seleccionaste.
          </p>
          <div className="flex relative">
            <Input
              id="apiKey"
              type={isShowAPiKey ? "text" : "password"}
              onChange={(e) => setApiKey(e.target.value)}
              defaultValue={apiKey}
              className="pr-12"
            />
            <Button
              variant="ghost"
              className="absolute right-0.5 h-full w-[40px] p-1"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {isShowAPiKey ? (
                <EyeIcon className="size-[18px] cursor-pointer" />
              ) : (
                <EyeOff className="size-[18px] cursor-pointer" />
              )}
            </Button>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Guardar configuración
        </Button>
      </form>
    </section>
  );
};

export default Settings;
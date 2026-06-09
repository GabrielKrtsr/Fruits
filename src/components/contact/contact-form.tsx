"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Veuillez indiquer votre nom.";
  if (!values.email.trim()) {
    errors.email = "Veuillez indiquer votre e-mail.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Format d'e-mail invalide.";
  }
  if (!values.subject.trim()) errors.subject = "Veuillez indiquer un sujet.";
  if (values.message.trim().length < 10) {
    errors.message = "Votre message doit contenir au moins 10 caractères.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update =
    (field: keyof FormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    // Simulation d'envoi. Branchez ici votre API / service d'e-mail.
    // eslint-disable-next-line no-console
    console.log("📨 Nouveau message de contact :", values);
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    setValues(initialValues);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-fruit-green/30 bg-fruit-green/10 p-10 text-center"
          >
            <CheckCircle2 className="size-12 text-fruit-green" />
            <h3 className="font-display text-xl font-semibold">
              Message envoyé !
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              Merci de nous avoir écrit. Nous revenons vers vous très vite —
              généralement sous 24 h.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Envoyer un autre message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Nom complet"
                error={errors.name}
              >
                <Input
                  id="name"
                  value={values.name}
                  onChange={update("name")}
                  placeholder="Jeanne Dupont"
                  aria-invalid={!!errors.name}
                />
              </Field>

              <Field id="email" label="E-mail" error={errors.email}>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  placeholder="jeanne@exemple.fr"
                  aria-invalid={!!errors.email}
                />
              </Field>
            </div>

            <Field id="subject" label="Sujet" error={errors.subject}>
              <Input
                id="subject"
                value={values.subject}
                onChange={update("subject")}
                placeholder="Une question sur vos paniers ?"
                aria-invalid={!!errors.subject}
              />
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <Textarea
                id="message"
                value={values.message}
                onChange={update("message")}
                placeholder="Dites-nous tout…"
                aria-invalid={!!errors.message}
              />
            </Field>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              disabled={status === "loading"}
              className="mt-2 w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Envoyer le message
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <span
        className={cn(
          "min-h-4 text-xs text-destructive transition-opacity",
          error ? "opacity-100" : "opacity-0"
        )}
      >
        {error ?? ""}
      </span>
    </div>
  );
}

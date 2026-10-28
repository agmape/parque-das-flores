import { useRef, useState, type FormEvent } from "react";
import { MessageCircle, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  CONTACT_EMAIL,
  CONTACT_NAME,
  PHONE_TEL,
  WHATSAPP_DISPLAY,
  mailtoLink,
  whatsappLink,
} from "@/lib/site";
import { submitLead, LeadSubmitError } from "@/lib/leads";
import { track } from "@/lib/tracking/datalayer";

const FORM_NAME = "contato_principal";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Use até 100 caracteres."),
  telefone: z
    .string()
    .trim()
    .max(20, "Telefone muito longo.")
    .regex(/^[+\d\s().-]+$/, "Use apenas números, espaços, parênteses ou hífen.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }, "Informe o telefone com DDD, por exemplo (34) 99999-9999."),
  email: z.string().trim().email("Informe um e-mail válido, por exemplo nome@email.com.").max(120),
  perfil: z.enum(["Comprador", "Corretor"], {
    errorMap: () => ({ message: "Escolha se você é comprador ou corretor." }),
  }),
});

type FieldName = keyof z.infer<typeof leadSchema>;
type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "mt-2 block h-12 w-full rounded-md border border-input bg-card px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-leaf focus:ring-2 focus:ring-leaf/25 aria-[invalid=true]:border-destructive";

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [serverError, setServerError] = useState("");
  const started = useRef(false);
  const sending = useRef(false);

  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_name: FORM_NAME });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return; // evita envio duplo por clique repetido
    const form = event.currentTarget;
    const result = leadSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setServerError("");
    sending.current = true;
    setStatus("sending");
    try {
      await submitLead(result.data, FORM_NAME);
      setStatus("success");
      // Conversão somente após o envio confirmado — sem dados pessoais.
      track("generate_lead", { form_name: FORM_NAME, contact_method: "form" });
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof LeadSubmitError
          ? `${error.message} Tente novamente ou fale pelo WhatsApp.`
          : "Não foi possível enviar. Verifique sua conexão e tente novamente, ou fale pelo WhatsApp.",
      );
    } finally {
      sending.current = false;
    }
  }

  const describedBy = (field: FieldName) => (errors[field] ? `erro-${field}` : undefined);

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative bg-secondary py-14 sm:py-20"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <div className="lg:pt-4">
          <p className="kicker">Atendimento direto</p>
          <h2
            id="contato-title"
            className="mt-2 font-display text-[2.25rem] text-primary sm:text-5xl"
          >
            Receba a tabela e as condições dos lotes
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Deixe seus dados para receber informações ou agendar uma visita. Quem atende é{" "}
            {CONTACT_NAME}.
          </p>
          <ul className="mt-8 space-y-1 text-base">
            <li>
              <a
                href={whatsappLink("Olá! Quero atendimento sobre os lotes do Parque das Flores.")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="contato_whatsapp"
                className="inline-flex min-h-11 items-center gap-3 font-medium text-primary hover:text-leaf"
              >
                <MessageCircle className="size-5 text-leaf" aria-hidden /> WhatsApp{" "}
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                data-cta="contato_telefone"
                className="inline-flex min-h-11 items-center gap-3 font-medium text-primary hover:text-leaf"
              >
                <Phone className="size-5 text-leaf" aria-hidden /> Ligar para {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={mailtoLink(
                  "Interesse — Parque das Flores",
                  "Olá! Gostaria de mais informações sobre os lotes do Parque das Flores em Sacramento-MG.",
                )}
                data-cta="contato_email"
                className="inline-flex min-h-11 min-w-0 items-center gap-3 font-medium text-primary hover:text-leaf"
              >
                <Mail className="size-5 shrink-0 text-leaf" aria-hidden />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-elegant)] sm:p-8">
          {status === "success" ? (
            <div role="status" aria-live="polite" className="flex flex-col items-start py-6">
              <CheckCircle2 className="size-10 text-leaf" aria-hidden />
              <h3 className="mt-4 font-display text-3xl text-primary">Recebemos seus dados</h3>
              <p className="mt-3 text-muted-foreground">
                Nossa equipe vai entrar em contato em breve. Se preferir agilizar, chame agora no
                WhatsApp.
              </p>
              <a
                href={whatsappLink(
                  "Olá! Enviei meus dados pelo site e quero agilizar o atendimento sobre os lotes do Parque das Flores.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="contato_sucesso_whatsapp"
                className="btn-base btn-whatsapp mt-6"
              >
                <MessageCircle className="size-5" aria-hidden /> Continuar pelo WhatsApp
              </a>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              onFocus={onFirstInteraction}
              aria-describedby="contato-privacidade"
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-primary" htmlFor="lead-nome">
                  Nome
                </label>
                <input
                  id="lead-nome"
                  name="nome"
                  autoComplete="name"
                  maxLength={100}
                  required
                  placeholder="Seu nome"
                  className={fieldClass}
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={describedBy("nome")}
                />
                {errors.nome && (
                  <p id="erro-nome" className="mt-1.5 text-sm text-destructive">
                    {errors.nome}
                  </p>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="block text-sm font-semibold text-primary"
                    htmlFor="lead-telefone"
                  >
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="lead-telefone"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    required
                    placeholder="(00) 00000-0000"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.telefone)}
                    aria-describedby={describedBy("telefone")}
                  />
                  {errors.telefone && (
                    <p id="erro-telefone" className="mt-1.5 text-sm text-destructive">
                      {errors.telefone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary" htmlFor="lead-email">
                    E-mail
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={120}
                    required
                    placeholder="seu@email.com"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("email")}
                  />
                  {errors.email && (
                    <p id="erro-email" className="mt-1.5 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <fieldset aria-describedby={describedBy("perfil")}>
                <legend className="text-sm font-semibold text-primary">
                  Você é comprador ou corretor?
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(["Comprador", "Corretor"] as const).map((profile) => (
                    <label
                      key={profile}
                      className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-input bg-card px-4 text-base text-primary transition-colors has-[:checked]:border-leaf has-[:checked]:bg-secondary"
                    >
                      <input
                        type="radio"
                        name="perfil"
                        value={profile}
                        required
                        className="size-4 accent-[var(--leaf)]"
                      />
                      {profile}
                    </label>
                  ))}
                </div>
                {errors.perfil && (
                  <p id="erro-perfil" className="mt-1.5 text-sm text-destructive">
                    {errors.perfil}
                  </p>
                )}
              </fieldset>

              {status === "error" && serverError && (
                <p
                  role="alert"
                  className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                className="btn-base btn-primary w-full disabled:cursor-wait disabled:opacity-80"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden /> Enviando…
                  </>
                ) : (
                  "Quero receber as informações"
                )}
              </button>
              <p id="contato-privacidade" className="text-sm leading-relaxed text-muted-foreground">
                Ao enviar, você autoriza nossa equipe a entrar em contato sobre o Parque das Flores.
                Seus dados não são compartilhados com ferramentas de análise.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

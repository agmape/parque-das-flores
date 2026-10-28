import { useState, type FormEvent } from "react";
import { MessageCircle, Mail, Phone, CheckCircle, ArrowUpRight } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, CONTACT_NAME, WHATSAPP_DISPLAY, mailtoLink, whatsappLink } from "@/lib/site";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100),
  telefone: z.string().trim().max(20).regex(/^[+\d\s().-]+$/, "Informe um telefone válido.").refine(value => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }, "Informe o telefone com DDD."),
  email: z.string().trim().email("Informe um e-mail válido.").max(120),
  perfil: z.enum(["Comprador", "Corretor"], { errorMap: () => ({ message: "Selecione comprador ou corretor." }) }),
});

export function Contato() {
  const [state, handleSubmit] = useForm("mbgjjlle");
  const [errors, setErrors] = useState<Partial<Record<"nome" | "telefone" | "email" | "perfil", string>>>({});
  const [deliveryError, setDeliveryError] = useState(false);
  const field = "mt-2 h-12 w-full rounded-md border border-input bg-background px-4 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.submitting) return;
    const result = leadSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setDeliveryError(false);
    try {
      await handleSubmit(result.data);
    } catch {
      setDeliveryError(true);
    }
  }

  return (
    <section id="contato" className="bg-secondary py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow">Parque das Flores · Sacramento-MG</p>
          <h2 className="mt-3 font-display text-4xl text-primary sm:text-5xl">Encontre seu próximo lote</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">Receba informações sobre os lotes ou agende uma visita. Atendimento direto com {CONTACT_NAME}.</p>
          <div className="mt-6 hidden flex-wrap gap-x-6 gap-y-3 sm:flex">
            <a href={whatsappLink("Olá! Quero atendimento sobre os lotes do Parque das Flores.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:text-leaf"><Phone className="size-4" />{WHATSAPP_DISPLAY}</a>
            <a href={mailtoLink("Interesse — Parque das Flores", "Olá! Gostaria de mais informações sobre os lotes do Parque das Flores em Sacramento-MG.")} className="flex min-w-0 items-center gap-2 text-sm text-primary hover:text-leaf"><Mail className="size-4 shrink-0" /><span className="break-all">{CONTACT_EMAIL}</span></a>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 sm:p-7">
          {state.succeeded ? (
            <div role="status" className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="size-12 text-leaf" />
              <h3 className="mt-5 font-display text-2xl text-primary">Mensagem enviada!</h3>
              <p className="mt-3 text-muted-foreground">Sua mensagem foi enviada com sucesso! Nossa equipe entrará em contato em breve.</p>
              <Button asChild className="mt-6 h-auto whitespace-normal px-5 py-3"><a href={whatsappLink("Olá! Enviei meus dados pelo site e quero agilizar o atendimento sobre os lotes do Parque das Flores.")} target="_blank" rel="noopener noreferrer"><MessageCircle />Falar pelo WhatsApp</a></Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm font-medium text-primary" htmlFor="lead-nome">Nome
                <input id="lead-nome" name="nome" autoComplete="name" className={field} maxLength={100} required placeholder="Seu nome" aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "error-nome" : undefined} />
                {errors.nome && <span id="error-nome" className="mt-1 block text-sm text-destructive">{errors.nome}</span>}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-primary" htmlFor="lead-telefone">Telefone / WhatsApp
                  <input id="lead-telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" className={field} maxLength={20} required placeholder="(00) 00000-0000" aria-invalid={Boolean(errors.telefone)} aria-describedby={errors.telefone ? "error-telefone" : undefined} />
                  {errors.telefone && <span id="error-telefone" className="mt-1 block text-sm text-destructive">{errors.telefone}</span>}
                </label>
                <label className="block text-sm font-medium text-primary" htmlFor="lead-email">E-mail
                  <input id="lead-email" name="email" type="email" autoComplete="email" inputMode="email" className={field} maxLength={120} required placeholder="seu@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} />
                  {errors.email && <span id="error-email" className="mt-1 block text-sm text-destructive">{errors.email}</span>}
                  <ValidationError prefix="E-mail" field="email" errors={state.errors} className="mt-1 block text-sm text-destructive" />
                </label>
              </div>
              <fieldset>
                <legend className="text-sm font-medium text-primary">Você é comprador ou corretor?</legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {["Comprador", "Corretor"].map(profile => (
                    <label key={profile} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-md border border-input px-3 text-sm text-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary">
                      <input type="radio" name="perfil" value={profile} required className="size-4 accent-primary" />{profile}
                    </label>
                  ))}
                </div>
                {errors.perfil && <p className="mt-1 text-sm text-destructive">{errors.perfil}</p>}
              </fieldset>
              <ValidationError errors={state.errors} className="text-sm text-destructive" />
              {state.errors && <p role="alert" className="text-sm text-destructive">Não foi possível enviar. Verifique os dados e tente novamente.</p>}
              {deliveryError && <p role="alert" className="text-sm text-destructive">Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.</p>}
              <Button type="submit" disabled={state.submitting} className="min-h-12 w-full whitespace-normal px-4 py-3">
                {state.submitting ? "Enviando..." : "Quero receber atendimento"}<ArrowUpRight />
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">Ao enviar, você autoriza o contato da nossa equipe sobre o Parque das Flores.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

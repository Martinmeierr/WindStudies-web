import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { cn } from "../components/ui/utils";
import { callWebhook, WebhookError, WEBHOOKS } from "../lib/webhooks";

// ─── Types ──────────────────────────────────────────────────────────────────

interface SondeoFormValues {
  empresa: string;
  instagram: string;
  web: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string[];
  q8: string;
  q9: string;
  q10: string;
}

// ─── Question definitions ────────────────────────────────────────────────────

const QUESTIONS = {
  q2: {
    title: "02 — ¿En qué momento está tu marca hoy?",
    hint: "Elegí la opción que mejor la describe.",
    options: [
      "Estoy arrancando — recién estoy construyendo presencia y audiencia",
      "Tengo presencia pero no estoy logrando convertirla en clientes o ventas",
      "Tengo clientes pero no logro comunicar bien lo que hago",
      "Estoy creciendo y necesito escalar lo que ya funciona",
      "Estoy estancado y necesito replantear cómo me comunico",
    ],
  },
  q3: {
    title: "03 — ¿Qué es lo que más querés resolver en los próximos meses?",
    options: [
      "Que más gente me conozca",
      "Que lo que ya tengo empiece a generar clientes",
      "Que cuando me escriben, se conviertan en ventas",
      "Poder atender todas las consultas que me llegan",
      "Tener un sistema que funcione sin que yo esté encima de todo",
    ],
  },
  q4: {
    title: "04 — ¿Cómo llegan hoy la mayoría de tus clientes?",
    options: [
      "Por recomendación o boca a boca",
      "Por lo que publico en redes",
      "Por publicidad que corro",
      "Mezcla de varias cosas",
      "Todavía no tengo un flujo claro",
    ],
  },
  q5: {
    title: "05 — ¿Cuántas consultas o mensajes recibís por semana?",
    options: [
      "Casi ninguna",
      "Algunas — menos de 10",
      "Bastantes — entre 10 y 40",
      "Muchas — a veces no llego a responder todas",
    ],
  },
  q6: {
    title: "06 — ¿Qué tan claro está lo que ofrecés?",
    options: [
      "Muy claro — sé exactamente qué vendo y a quién",
      "Lo tengo claro pero me cuesta explicarlo bien",
      "Tengo varias cosas y no sé bien qué priorizar",
      "Todavía lo estoy definiendo",
    ],
  },
  q7: {
    title: "07 — ¿Qué estás haciendo hoy para comunicarte con tu audiencia?",
    hint: "Marcá todo lo que aplique.",
    options: [
      "Publico contenido en redes sociales (Instagram, TikTok, YouTube, etc.)",
      "Corro publicidad paga (Meta Ads, Google Ads u otra)",
      "Tengo un flujo de WhatsApp o email para seguir a mis leads",
      "Uso alguna herramienta de automatización (ManyChat, CRM, etc.)",
      "No estoy haciendo nada sistematizado todavía",
      "Tercerizo parte o todo esto a alguien",
    ],
  },
  q9: {
    title: "09 — Si en las próximas semanas te llegara el doble de clientes, ¿podés atenderlos?",
    options: [
      "Sí, tengo capacidad disponible",
      "Podría, pero necesitaría organizar algunas cosas",
      "No, ya estoy al límite de lo que puedo manejar",
      "Todavía no tengo suficiente volumen como para saberlo",
    ],
  },
  q10: {
    title: "10 — ¿Tenés presupuesto destinado a comunicación o publicidad hoy?",
    options: [
      "No, todavía no",
      "Sí, algo pequeño — menos de $300/mes",
      "Sí, entre $300 y $1.000/mes",
      "Sí, más de eso",
    ],
  },
} as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

function QuestionLabel({ number, title, hint }: { number?: string; title: string; hint?: string }) {
  return (
    <div className="pb-4 border-b border-black/10 mb-5">
      {number && <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30 mb-1">{number}</p>}
      <p className="text-base font-semibold text-black leading-snug">{title}</p>
      {hint && <p className="text-xs text-black/40 mt-1">{hint}</p>}
    </div>
  );
}

function RadioOption({ value, label, selected }: { value: string; label: string; selected: boolean }) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all duration-150 select-none",
        selected ? "border-black bg-black/5 text-black" : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
      )}
    >
      <RadioGroupItem value={value} className="shrink-0" />
      <span className="text-sm">{label}</span>
    </label>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SondeoPrevio() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SondeoFormValues>({
    defaultValues: { q7: [] },
  });

  const q7Value = watch("q7") ?? [];

  function toggleQ7(option: string) {
    const current = getValues("q7") ?? [];
    const next = current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option];
    setValue("q7", next, { shouldValidate: true });
  }

  async function onSubmit(data: SondeoFormValues) {
    try {
      await callWebhook(WEBHOOKS.sondeo, data);
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof WebhookError ? err.message : "No se pudo enviar. Intentá de nuevo.");
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center flex flex-col items-center gap-6 max-w-sm">
          <CheckCircle2 className="w-14 h-14 text-black" strokeWidth={1.2} />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">¡Listo, lo recibimos!</h2>
            <p className="text-black/50 mt-2 text-sm leading-relaxed">
              El equipo de WindStudies va a revisar tus respuestas antes de la reunión.
            </p>
          </div>
          <img src={`${import.meta.env.BASE_URL}logo-black.png`} alt="WindStudies" className="h-6 w-auto opacity-30 mt-4" />
          <Link to="/" className="text-sm text-black/40 hover:text-black transition-colors underline underline-offset-4">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/10 bg-white/90 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}logo-black.png`} alt="WindStudies" className="h-7 w-auto object-contain" />
          </Link>
          <p className="text-xs text-black/30 tracking-widest uppercase">Sondeo Previo</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-14">
        {/* Intro */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">WindStudies — Sondeo Previo</h1>
          <p className="text-black/50 text-sm leading-relaxed">
            Antes de empezar: nuestros sistemas no funcionan para todo el mundo. Si tu producto no tiene márgenes sanos o tu capacidad de entrega está rota, el contenido va a acelerar el problema, no resolverlo. Este sondeo existe para entender si tiene sentido trabajar juntos.
          </p>
          <p className="text-xs text-black/30 mt-3">10 preguntas · Menos de 10 minutos · Confidencial</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>

          {/* Datos de contacto */}
          <section className="space-y-5">
            <div className="pb-4 border-b border-black/10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">Datos de contacto</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="empresa">Nombre de tu empresa o marca <span className="text-red-500">*</span></Label>
              <input
                id="empresa"
                {...register("empresa", { required: "Campo obligatorio" })}
                placeholder="Ej: Mi Marca"
                className="w-full border border-black/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
              />
              <FieldError message={errors.empresa?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="instagram">Instagram <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm select-none">@</span>
                <input
                  id="instagram"
                  {...register("instagram", { required: "Campo obligatorio" })}
                  placeholder="tuusuario"
                  className="w-full border border-black/15 bg-transparent pl-7 pr-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
              <FieldError message={errors.instagram?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web">
                Sitio web{" "}
                <span className="text-black/30 font-normal">(opcional)</span>
              </Label>
              <input
                id="web"
                {...register("web")}
                placeholder="https://tudominio.com"
                className="w-full border border-black/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </section>

          {/* Q1 */}
          <section>
            <QuestionLabel
              number="Pregunta 01"
              title="¿Cómo describís lo que hacés en una oración?"
              hint="Como si se lo explicaras a alguien que no conoce tu rubro."
            />
            <textarea
              {...register("q1", { required: "Campo obligatorio" })}
              placeholder="Escribí libremente..."
              rows={3}
              className="w-full border border-black/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-black/30"
            />
            <FieldError message={errors.q1?.message} />
          </section>

          {/* Q2–Q6: Radio groups */}
          {(["q2", "q3", "q4", "q5", "q6"] as const).map((key) => {
            const q = QUESTIONS[key];
            return (
              <section key={key}>
                <QuestionLabel title={q.title} hint={"hint" in q ? q.hint : undefined} />
                <Controller
                  name={key}
                  control={control}
                  rules={{ required: "Seleccioná una opción" }}
                  render={({ field }) => (
                    <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="gap-2">
                      {q.options.map((opt) => (
                        <RadioOption key={opt} value={opt} label={opt} selected={field.value === opt} />
                      ))}
                    </RadioGroup>
                  )}
                />
                <FieldError message={errors[key]?.message} />
              </section>
            );
          })}

          {/* Q7: Checkbox */}
          <section>
            <QuestionLabel
              title={QUESTIONS.q7.title}
              hint={QUESTIONS.q7.hint}
            />
            <div className="flex flex-col gap-2">
              {QUESTIONS.q7.options.map((opt) => {
                const checked = q7Value.includes(opt);
                return (
                  <label
                    key={opt}
                    className={cn(
                      "flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all duration-150 select-none",
                      checked ? "border-black bg-black/5 text-black" : "border-black/15 text-black/60 hover:border-black/40 hover:text-black"
                    )}
                    onClick={() => toggleQ7(opt)}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleQ7(opt)}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
            {errors.q7 && <p className="text-xs text-red-500 mt-1">Seleccioná al menos una opción.</p>}
          </section>

          {/* Q8 */}
          <section>
            <QuestionLabel
              title="08 — ¿Qué resultado concreto esperás lograr en los próximos 90 días?"
              hint="Escribí libremente — no hay respuesta correcta."
            />
            <textarea
              {...register("q8", { required: "Campo obligatorio" })}
              placeholder="Sé lo más específico posible..."
              rows={4}
              className="w-full border border-black/15 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-black/30"
            />
            <FieldError message={errors.q8?.message} />
          </section>

          {/* Q9 */}
          <section>
            <QuestionLabel title={QUESTIONS.q9.title} />
            <Controller
              name="q9"
              control={control}
              rules={{ required: "Seleccioná una opción" }}
              render={({ field }) => (
                <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="gap-2">
                  {QUESTIONS.q9.options.map((opt) => (
                    <RadioOption key={opt} value={opt} label={opt} selected={field.value === opt} />
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError message={errors.q9?.message} />
          </section>

          {/* Q10 */}
          <section>
            <QuestionLabel title={QUESTIONS.q10.title} />
            <Controller
              name="q10"
              control={control}
              rules={{ required: "Seleccioná una opción" }}
              render={({ field }) => (
                <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} className="gap-2">
                  {QUESTIONS.q10.options.map((opt) => (
                    <RadioOption key={opt} value={opt} label={opt} selected={field.value === opt} />
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError message={errors.q10?.message} />
          </section>

          {/* Submit */}
          <div className="pt-4 pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 text-sm font-semibold tracking-wide hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                : "Enviar respuestas"
              }
            </button>
            <p className="text-center text-xs text-black/30 mt-4">
              © {new Date().getFullYear()} WindStudies
            </p>
          </div>

        </form>
      </main>
    </div>
  );
}

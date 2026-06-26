"use client";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { contactConfig } from "@/lib/site/pages";
import { useActionState } from "react";

const initialState: ContactFormState = {};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.success) {
    return (
      <div
        className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20"
        role="status"
      >
        <p className="font-medium text-emerald-800 dark:text-emerald-300">
          Message received
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{state.message}</p>
        <p className="mt-4 text-sm text-muted">
          Direct email:{" "}
          <a
            href={`mailto:${contactConfig.email}`}
            className="font-medium text-accent hover:text-accent-hover"
          >
            {contactConfig.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-foreground"
        >
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-describedby={state.fieldErrors?.name ? "contact-name-error" : undefined}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="Your name"
        />
        <FieldError id="contact-name-error" message={state.fieldErrors?.name} />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-foreground"
        >
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={state.fieldErrors?.email ? "contact-email-error" : undefined}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="you@example.com"
        />
        <FieldError id="contact-email-error" message={state.fieldErrors?.email} />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-describedby={state.fieldErrors?.message ? "contact-message-error" : undefined}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="How can we help?"
        />
        <FieldError id="contact-message-error" message={state.fieldErrors?.message} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

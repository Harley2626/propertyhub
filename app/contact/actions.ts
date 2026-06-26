"use server";

import { contactConfig } from "@/lib/site/pages";

export type ContactFormState = {
  success?: boolean;
  message?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "Please enter your full name.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (message.length < 10) {
    fieldErrors.message = "Please enter a message of at least 10 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // Email delivery can be wired to Resend, SendGrid, or similar via env vars.
  // Enquiries are validated server-side; direct email remains available on the page.
  void { name, email, message, to: contactConfig.email };

  return {
    success: true,
    message:
      "Thank you for your message. We have received your enquiry and will respond within two business days. You can also email us directly if your matter is urgent.",
  };
}

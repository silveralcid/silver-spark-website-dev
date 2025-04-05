"use server"

import { z } from "zod"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate input
    const result = contactSchema.safeParse(formData)

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      }
    }

    const { name, email, company, phone, message } = result.data

    // Here you would typically send the data to your email service or CRM
    // For example, using a service like SendGrid, Mailchimp, etc.

    // Example: Send to email service
    try {
      // const response = await emailService.send({
      //   to: "contact@silverspark.com",
      //   from: "noreply@silverspark.com",
      //   subject: `New contact form submission from ${name}`,
      //   text: `
      //     Name: ${name}
      //     Email: ${email}
      //     ${company ? `Company: ${company}` : ''}
      //     ${phone ? `Phone: ${phone}` : ''}
      //     Message: ${message}
      //   `,
      // });

      // For now, simulate a successful response
      return {
        success: true,
        message: "Your message has been sent successfully!",
      }
    } catch (emailError) {
      console.error("Email service error:", emailError)
      return {
        success: false,
        errors: {
          form: "Failed to send your message. Please try again later.",
        },
      }
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      errors: {
        form: "An unexpected error occurred. Please try again later.",
      },
    }
  }
}


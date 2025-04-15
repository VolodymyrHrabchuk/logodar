// pages/api/submit-form.js
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { fullName, contact, message } = req.body;

  // Basic server-side validation
  if (!fullName || !contact || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Here you would typically:
    // 1. Send email via Resend API
    // 2. Save to database
    // 3. Perform any other necessary processing

    // Example email sending (you'd replace with actual Resend API call)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LOGODAR <onboarding@resend.dev>",
        to: "logodar2020@gmail.com",
        subject: "Нова контактна форма з сайту",
        html: `
          <h1>Нова контактна форма</h1>
          <p><strong>Ім'я:</strong> ${fullName}</p>
          <p><strong>Контакти:</strong> ${contact}</p>
          <p><strong>ПовідомленняMessage:</strong> ${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return res
      .status(200)
      .json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process submission",
    });
  }
}

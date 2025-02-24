// app/api/submit-form/route.js

import { NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

// Define the schema using Zod for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ім'я повинно містити принаймні 2 символи",
  }),
  phone: z.string().regex(/^(\+380|0)\d{9}$/, {
    message: "Введіть правильний номер телефону",
  }),
  email: z.string().email({
    message: "Введіть правильну електронну адресу",
  }),
});

export async function POST(request) {
  try {
    // Parse and validate the incoming JSON data
    const parsedData = formSchema.parse(await request.json());
    const { name, phone, email } = parsedData;

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.error("SPREADSHEET_ID is not defined in environment variables.");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }


    const targetSheetName = "Logodar"; 
    const range = `'${targetSheetName}'!A:D`;
    console.log("Using range:", range); // Debugging log

    // Prepare the data to append, aligning with spreadsheet columns
    const values = [
      [
        name, // Ім'я та прізвище
        phone, // Номер телефону
        email, // E-mail
        new Date().toLocaleString(), // Дата
      ],
    ];
    console.log("Data to append:", values); // Debugging log

    const resource = {
      values,
    };

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource,
    });

    console.log("Append result:", result.status); // Debugging log

    if (result.status === 200) {
      return NextResponse.json(
        { message: "Form submitted successfully." },
        { status: 200 }
      );
    } else {
      console.error("Failed to append data:", result.statusText);
      return NextResponse.json(
        { message: "Failed to submit form." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in API route:", error);
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json(
        { message: "Validation failed.", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}

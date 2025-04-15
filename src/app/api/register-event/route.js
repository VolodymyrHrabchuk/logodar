import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Получаем данные запроса
    const data = await request.json();
    console.log("Received registration request:", data);

    // Читаем URL из переменных окружения (убедитесь, что GOOGLE_APP_SCRIPT настроена)
    const googleAppScriptUrl =
      "https://script.google.com/macros/s/AKfycbwmWJZU64wYVBZ_5pvgjCarsuzxF9vKcUQjeqvkDvWFmrLy13_GNHtCHO07i28qJzE/exec";
    if (!googleAppScriptUrl) {
      throw new Error("Google Apps Script URL is not configured");
    }
    console.log("Forwarding to Google Apps Script:", googleAppScriptUrl);

    // Пересылаем запрос на Google Apps Script
    const response = await fetch(googleAppScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log("Raw Google Apps Script response:", responseText);

    // Если получен код ошибки, возвращаем его для отладки
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Error response from Google Apps Script",
          rawResponse: responseText.substring(0, 500),
          status: response.status,
        },
        { status: response.status }
      );
    }

    // Пытаемся распарсить ответ как JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to parse Google Apps Script response",
          rawResponse: responseText.substring(0, 500),
          status: response.status,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in register-event API:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

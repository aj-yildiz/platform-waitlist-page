import { NextResponse } from "next/server"

/**
 * Google Sheets API Configuration and Health Check
 * This endpoint verifies the Google Sheets integration is working
 */

export async function GET(request: Request) {
  try {
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!googleScriptUrl) {
      throw new Error("GOOGLE_SCRIPT_URL environment variable is not set")
    }

    // Test the connection to Google Sheets
    const response = await fetch(googleScriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      status: "Google Sheets integration is active",
      googleSheetsStatus: result.status,
      message: "The API is properly configured and connected to Google Sheets",
    })

  } catch (error) {
    console.error("Error checking Google Sheets connection:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Google Sheets",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

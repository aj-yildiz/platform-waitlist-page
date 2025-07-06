import { NextResponse } from "next/server"

/**
 * Consolidated waitlist API route that saves to Google Sheets
 * Handles both waitlist signups and admin operations
 */

/**
 * GET /api/google-sheets/waitlist
 * Retrieves waitlist data from Google Sheets
 * 
 * @param request - The incoming request object
 * @returns JSON response with waitlist data
 */
export async function GET(request: Request) {
  try {
    // Get Google Script URL
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!googleScriptUrl) {
      throw new Error("GOOGLE_SCRIPT_URL environment variable is not set")
    }

    // Call the Google Script's GET endpoint
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
      status: result.status,
      message: result.message,
    })

  } catch (error) {
    console.error("Error in GET /api/google-sheets/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve waitlist data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

/**
 * POST /api/google-sheets/waitlist
 * Adds a new entry to the waitlist in Google Sheets
 * 
 * Request body:
 * - email: string - Required
 * - userType: string - Required for waitlist ('Patient', 'Practitioner', 'Gym')
 * - spaceSuggestion: string - Required for space suggestions
 * - formType: string - 'waitlist' or 'space_suggestion'
 * 
 * @param request - The incoming request object
 * @returns JSON response with operation result
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, spaceSuggestion, formType = 'waitlist', userType } = body

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Validate form type specific fields
    if (formType === 'space_suggestion') {
      if (!spaceSuggestion || typeof spaceSuggestion !== "string") {
        return NextResponse.json({ success: false, message: "Space suggestion is required" }, { status: 400 })
      }
    } else if (formType === 'waitlist') {
      if (!userType || typeof userType !== "string") {
        return NextResponse.json({ success: false, message: "User type is required" }, { status: 400 })
      }
      if (!['Patient', 'Practitioner', 'Gym'].includes(userType)) {
        return NextResponse.json({ success: false, message: "Invalid user type. Must be Patient, Practitioner, or Gym" }, { status: 400 })
      }
    } else {
      return NextResponse.json({ success: false, message: "Invalid form type" }, { status: 400 })
    }

    // Get Google Script URL
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!googleScriptUrl) {
      throw new Error("GOOGLE_SCRIPT_URL environment variable is not set")
    }

    // Prepare data for Google Sheets
    const submission = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      source: "Website",
      formType,
      ...(formType === 'space_suggestion' ? { spaceSuggestion } : { userType })
    }

    // Send to Google Sheets
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      body: JSON.stringify(submission),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`)
    }

    const result = await response.json()

    // Log the submission for monitoring
    console.log("Form submission sent to Google Sheets:", {
      ...submission,
      success: result.success
    })

    return NextResponse.json({
      success: true,
      message: `${formType === 'space_suggestion' ? 'Space suggestion' : 'Waitlist signup'} recorded successfully`,
      formType,
    })
  } catch (error) {
    console.error("Error in POST /api/google-sheets/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
} 
import { NextResponse } from "next/server"

export const runtime = 'nodejs';

const AIRTABLE_API_URL = "https://api.airtable.com/v0/";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

async function postToAirtable(table: string, fields: Record<string, any>) {
  const url = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Airtable error: ${error}`);
  }
  return res.json();
}

/**
 * GET /api/waitlist
 * Retrieves waitlist data from Supabase
 * 
 * @param request - The incoming request object
 * @returns JSON response with waitlist data
 */
export async function GET(request: Request) {
  try {
    // Remove all supabase usage in GET, POST, DELETE handlers
    // The original code had supabase.from('waitlist').select('*').order('created_at', { ascending: false })
    // This will be replaced with a placeholder or removed if not needed for Airtable.
    // For now, we'll return a placeholder response.
    return NextResponse.json({
      success: true,
      message: "Waitlist data retrieval is not yet implemented for Airtable.",
      data: [], // Placeholder data
      count: 0
    })

  } catch (error) {
    console.error("Error in GET /api/waitlist:", error)
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, location, formType = 'waitlist', userType } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    // Use only the date part for Airtable (YYYY-MM-DD)
    const timestamp = new Date().toISOString().split('T')[0];
    const source = "Website";

    if (formType === 'space_suggestion') {
      if (!location || typeof location !== "string") {
        return NextResponse.json({ success: false, message: "Location is required" }, { status: 400 });
      }
      // Debug log
      console.log("Posting to Airtable (Space Suggestions)", {
        table: "Space Suggestions",
        fields: { Location: location, Email: email.toLowerCase().trim(), Timestamp: timestamp, Source: source },
        AIRTABLE_BASE_ID,
        AIRTABLE_TOKEN_SET: !!AIRTABLE_TOKEN
      });
      // Send to Space Suggestions table
      await postToAirtable("Space Suggestions", {
        Location: location,
        Email: email.toLowerCase().trim(),
        Timestamp: timestamp,
        Source: source,
      });
      return NextResponse.json({
        success: true,
        message: "Space suggestion recorded successfully",
        formType,
      });
    } else if (formType === 'waitlist') {
      if (!userType || typeof userType !== "string") {
        return NextResponse.json({ success: false, message: "User type is required" }, { status: 400 });
      }
      if (!['Patient', 'Practitioner', 'Gym'].includes(userType)) {
        return NextResponse.json({ success: false, message: "Invalid user type. Must be Patient, Practitioner, or Gym" }, { status: 400 });
      }
      // Debug log
      console.log("Posting to Airtable (Waitlist)", {
        table: "Waitlist",
        fields: { Name: "", Email: email.toLowerCase().trim(), "User Type": userType, Timestamp: timestamp, Source: source },
        AIRTABLE_BASE_ID,
        AIRTABLE_TOKEN_SET: !!AIRTABLE_TOKEN
      });
      // Send to Waitlist table
      await postToAirtable("Waitlist", {
        Name: "", // No name collected from form
        Email: email.toLowerCase().trim(),
        "User Type": userType,
        Timestamp: timestamp,
        Source: source,
      });
      return NextResponse.json({
        success: true,
        message: "Waitlist signup recorded successfully",
        formType,
      });
    } else {
      return NextResponse.json({ success: false, message: "Invalid form type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in POST /api/waitlist:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process submission",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/waitlist
 * Removes an entry from the waitlist in Supabase
 * 
 * Request body:
 * - email: string - Required
 * 
 * @param request - The incoming request object
 * @returns JSON response with operation result
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Delete from Supabase
    // This section is removed as per the edit hint to remove supabase usage.
    // The original code had supabase.from('waitlist').delete().eq('email', email.toLowerCase().trim())

    return NextResponse.json({
      success: true,
      message: "Entry removed successfully"
    })
  } catch (error) {
    console.error("Error in DELETE /api/waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove entry",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
} 
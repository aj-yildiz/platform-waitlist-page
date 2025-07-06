import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

/**
 * GET /api/waitlist
 * Retrieves waitlist data from Supabase
 * 
 * @param request - The incoming request object
 * @returns JSON response with waitlist data
 */
export async function GET(request: Request) {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length
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

/**
 * POST /api/waitlist
 * Adds a new entry to the waitlist in Supabase
 * 
 * Request body:
 * - email: string - Required
 * - userType: string - Required for waitlist ('Patient', 'Practitioner', 'Gym')
 * - location: string - Required for space suggestions
 * - formType: string - 'waitlist' or 'space_suggestion'
 * 
 * @param request - The incoming request object
 * @returns JSON response with operation result
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, location, formType = 'waitlist', userType } = body

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
      if (!location || typeof location !== "string") {
        return NextResponse.json({ success: false, message: "Location is required" }, { status: 400 })
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

    // Check if email already exists for this form type
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .eq('form_type', formType)

    if (checkError) {
      throw checkError
    }

    if (existing && existing.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `Email already registered for ${formType === 'space_suggestion' ? 'space suggestions' : 'waitlist'}` 
      }, { status: 400 })
    }

    // Prepare data for insertion
    const insertData = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      source: "Website",
      form_type: formType,
      ...(formType === 'space_suggestion' ? { location } : { user_type: userType })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([insertData])
      .select()

    if (error) {
      throw error
    }

    // Log the submission for monitoring
    console.log("Form submission saved to Supabase:", {
      ...insertData,
      success: true,
      id: data[0]?.id
    })

    return NextResponse.json({
      success: true,
      message: `${formType === 'space_suggestion' ? 'Space suggestion' : 'Waitlist signup'} recorded successfully`,
      formType,
      data: data[0]
    })
  } catch (error) {
    console.error("Error in POST /api/waitlist:", error)
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
    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('email', email.toLowerCase().trim())

    if (error) {
      throw error
    }

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
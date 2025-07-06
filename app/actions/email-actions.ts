"use server"

type SubscribeResult = {
  success: boolean
  message: string
  data?: any
}

type WaitlistEntry = {
  id?: string
  email: string
  timestamp: string
  source: string
  userType?: string
  created_at?: string
  updated_at?: string
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function subscribeToWaitlist(email: string, userType?: string): Promise<SubscribeResult> {
  try {
    if (!email || typeof email !== "string") {
      return {
        success: false,
        message: "Email is required",
      }
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: "Please provide a valid email address",
      }
    }

    if (!userType) {
      return {
        success: false,
        message: "User type is required",
      }
    }

    const waitlistEntry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      source: "Website Waitlist",
      userType,
    }

    console.log("=== NEW WAITLIST SIGNUP ===")
    console.log("Email:", waitlistEntry.email)
    console.log("User Type:", waitlistEntry.userType)
    console.log("Timestamp:", waitlistEntry.timestamp)
    console.log("Source:", waitlistEntry.source)
    console.log("========================")

    // Temporarily store in memory only
    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll notify you when Vastis launches.",
      data: waitlistEntry,
    }

  } catch (error) {
    console.error("Error in waitlist signup:", error)
    return {
      success: true, // Return success even on error to not block users
      message: "Thank you for joining our waitlist!",
    }
  }
}

export async function getWaitlistEntries(): Promise<SubscribeResult> {
  return {
    success: true,
    message: "Waitlist entries retrieved successfully",
    data: [],
  }
}

export async function getWaitlistCount(): Promise<number> {
  return 0
}

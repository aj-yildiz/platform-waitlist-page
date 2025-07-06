"use client"

import * as React from "react"
import { Button } from "../../components/ui/button"

type UserType = "Patient" | "Practitioner" | "Gym"

export default function SignupForm() {
  const [email, setEmail] = React.useState("")
  const [userType, setUserType] = React.useState<UserType | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userType) {
      setMessage("Please select a user type")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userType,
          formType: "waitlist",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Thank you for joining our waitlist! We'll keep you updated.")
        setEmail("")
        setUserType(null)
      } else {
        setMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#245FCB] focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
        />
        <div className="flex gap-3 justify-between">
          <label className="flex-1">
            <input
              type="radio"
              name="userType"
              className="sr-only peer"
              onChange={() => setUserType("Patient")}
              checked={userType === "Patient"}
            />
            <div className="w-full text-center p-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-checked:border-[#245FCB] peer-checked:bg-blue-50 hover:bg-gray-50 transition-all duration-200">
              Patient
            </div>
          </label>
          <label className="flex-1">
            <input
              type="radio"
              name="userType"
              className="sr-only peer"
              onChange={() => setUserType("Practitioner")}
              checked={userType === "Practitioner"}
            />
            <div className="w-full text-center p-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-checked:border-[#245FCB] peer-checked:bg-blue-50 hover:bg-gray-50 transition-all duration-200">
              Practitioner
            </div>
          </label>
          <label className="flex-1">
            <input
              type="radio"
              name="userType"
              className="sr-only peer"
              onChange={() => setUserType("Gym")}
              checked={userType === "Gym"}
            />
            <div className="w-full text-center p-3 rounded-xl border-2 border-gray-200 cursor-pointer peer-checked:border-[#245FCB] peer-checked:bg-blue-50 hover:bg-gray-50 transition-all duration-200">
              Gym
            </div>
          </label>
        </div>
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#245FCB] text-white hover:bg-[#1e4fa3] py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
      {message && (
        <div className="mt-4 p-4 rounded-xl bg-white shadow-lg">
          <p className={`text-center ${message.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        </div>
      )}
    </form>
  )
} 
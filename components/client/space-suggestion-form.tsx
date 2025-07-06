"use client"

import * as React from "react"
import { Button } from "../../components/ui/button"

export default function SpaceSuggestionForm() {
  const [email, setEmail] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/google-sheets/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          location,
          formType: "space-suggestion",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage("Thank you for your suggestion! We'll keep you updated.")
        setEmail("")
        setLocation("")
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
        <input
          type="text"
          placeholder="Enter location (suburb, city)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#245FCB] focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#245FCB] text-white hover:bg-[#1e4fa3] py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSubmitting ? "Submitting..." : "Suggest Location"}
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
/**
 * Admin panel for managing the waitlist
 * This page provides an interface for viewing and managing waitlist entries
 */

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Download, RefreshCw } from "lucide-react"

/**
 * Type definition for waitlist entry
 */
type WaitlistEntry = {
  id: string
  email: string
  timestamp: string
  source: string
  created_at: string
  updated_at: string
  form_type: 'waitlist' | 'space_suggestion'
  user_type?: 'Patient' | 'Practitioner' | 'Gym'
  location?: string
}

/**
 * Admin panel component for waitlist management
 *
 * Features:
 * - View all waitlist entries
 * - Add test entries
 * - Remove entries
 * - Export to CSV
 * - Real-time statistics
 */
export default function WaitlistAdminPage() {
  // State management
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testEmail, setTestEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  /**
   * Fetches waitlist data from the API
   */
  const fetchWaitlistData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/waitlist")
      const data = await response.json()

      if (data.success) {
        setEntries(data.data || [])
        setTotalCount(data.count || 0)
      } else {
        setError(data.message || "Failed to fetch waitlist data")
      }
    } catch (err) {
      setError("Failed to connect to API")
      console.error("Error fetching waitlist data:", err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Submits a test email to the waitlist
   */
  const submitTestEmail = async () => {
    if (!testEmail) return

    try {
      setSubmitting(true)

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: testEmail }),
      })

      const data = await response.json()

      if (data.success) {
        alert(data.duplicate ? "Email already exists!" : "Test email added successfully!")
        setTestEmail("")
        fetchWaitlistData() // Refresh the list
      } else {
        alert(`Failed: ${data.message}`)
      }
    } catch (err) {
      alert("Failed to submit test email")
      console.error("Error submitting test email:", err)
    } finally {
      setSubmitting(false)
    }
  }

  /**
   * Removes an email from the waitlist
   */
  const removeEmail = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the waitlist?`)) {
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        alert("Email removed successfully!")
        fetchWaitlistData() // Refresh the list
      } else {
        alert(`Failed: ${data.message}`)
      }
    } catch (err) {
      alert("Failed to remove email")
      console.error("Error removing email:", err)
    }
  }

  /**
   * Exports waitlist entries to CSV format
   */
  const exportToCSV = () => {
    if (entries.length === 0) {
      alert("No entries to export")
      return
    }

    // Create CSV content
    const headers = ["Email", "Source", "Form Type", "User Type", "Location", "Timestamp", "Created At"]
    const csvContent = [
      headers.join(","),
      ...entries.map((entry) =>
        [
          entry.email,
          entry.source,
          entry.form_type,
          entry.user_type || "",
          entry.location || "",
          entry.timestamp,
          new Date(entry.created_at).toLocaleString()
        ].join(","),
      ),
    ].join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Load data on component mount
  useEffect(() => {
    fetchWaitlistData()
  }, [])

  return (
    <div className="container py-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Waitlist Admin</h1>
          <p className="text-muted-foreground">Manage and monitor your waitlist</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchWaitlistData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                entries.filter((entry) => new Date(entry.created_at).toDateString() === new Date().toDateString())
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                entries.filter((entry) => {
                  const entryDate = new Date(entry.created_at)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return entryDate >= weekAgo
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Email Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Test Email Submission</CardTitle>
          <CardDescription>Add a test email to verify the system is working</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={submitTestEmail} disabled={submitting || !testEmail}>
              {submitting ? "Submitting..." : "Add Test Email"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Waitlist Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Waitlist Entries</CardTitle>
          <CardDescription>All emails collected from the waitlist form</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error: {error}
              <br />
              <Button onClick={fetchWaitlistData} variant="outline" size="sm" className="mt-2">
                Retry
              </Button>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No waitlist entries yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Form Type</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.email}</TableCell>
                      <TableCell>
                        <Badge variant={entry.form_type === 'waitlist' ? 'default' : 'secondary'}>
                          {entry.form_type === 'waitlist' ? 'Waitlist' : 'Space Suggestion'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {entry.user_type ? (
                          <Badge variant="outline">{entry.user_type}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {entry.location ? (
                          <span className="text-sm">{entry.location}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{entry.source}</Badge>
                      </TableCell>
                      <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEmail(entry.email)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

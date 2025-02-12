import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HelpCenter() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Help Center</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search for help..." />
        <Button type="submit">Search</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Account Setup</li>
              <li>Creating Your First Invoice</li>
              <li>Managing Clients</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing & Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Payment Methods</li>
              <li>Invoicing Best Practices</li>
              <li>Handling Late Payments</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Common Issues</li>
              <li>Error Messages</li>
              <li>Contact Support</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


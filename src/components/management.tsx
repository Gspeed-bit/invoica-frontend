import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Management() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage user accounts, permissions, and roles.</p>
            <Button className="mt-4">Manage Users</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure billing cycles, payment methods, and invoicing rules.</p>
            <Button className="mt-4">Billing Settings</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Adjust system-wide settings and preferences.</p>
            <Button className="mt-4">System Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


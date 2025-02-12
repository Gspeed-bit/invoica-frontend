import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function Clients() {
  const clients = [
    { id: 1, name: "Acme Corp", email: "contact@acme.com", status: "Active" },
    { id: 2, name: "Globex Corporation", email: "info@globex.com", status: "Inactive" },
    { id: 3, name: "Soylent Corp", email: "hello@soylent.com", status: "Active" },
    { id: 4, name: "Initech", email: "support@initech.com", status: "Active" },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Clients</h1>
      <Button>Add New Client</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <Button variant="ghost">View</Button>
                <Button variant="ghost">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


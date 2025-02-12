import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function InvoiceTable() {
  const items = [
    {
      no: 1,
      name: "Product Name",
      description: "Product Description",
      quantity: "150 Unit(s)",
      unitPrice: "€20",
      vat: "0%",
      amount: "€3,000",
      finalAmount: "€3,000",
    },
    // Add more items as needed
  ]

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">NO.</TableHead>
            <TableHead className="min-w-[200px]">ARTICLE</TableHead>
            <TableHead className="min-w-[100px]">QUANTITY</TableHead>
            <TableHead className="min-w-[100px]">UNIT PRICE</TableHead>
            <TableHead className="min-w-[80px]">VAT</TableHead>
            <TableHead className="min-w-[100px]">AMOUNT</TableHead>
            <TableHead className="min-w-[120px]">FINAL AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.no}>
              <TableCell>{item.no}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-[#667085]">{item.description}</div>
                </div>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitPrice}</TableCell>
              <TableCell>{item.vat}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.finalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


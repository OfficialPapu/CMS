import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function RecentPurchasesTable({PurchaseData}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Due</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {PurchaseData.map((purchase) => (
          <TableRow key={purchase.purchase_id}>
            <TableCell>{purchase.name}</TableCell>
            <TableCell>{purchase.item}</TableCell>
            <TableCell>Rs. {purchase.total_price}</TableCell>
            <TableCell>{purchase.purchase_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


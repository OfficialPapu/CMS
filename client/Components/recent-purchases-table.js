import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentPurchases = [
  {
    id: 1,
    student: "John Doe",
    item: "Lunch Combo",
    amount: 12.99,
    date: "2024-01-27",
  },
  {
    id: 2,
    student: "Jane Smith",
    item: "Breakfast Set",
    amount: 8.99,
    date: "2024-01-27",
  },
  {
    id: 3,
    student: "Mike Johnson",
    item: "Snack Pack",
    amount: 5.99,
    date: "2024-01-27",
  },
]

export function RecentPurchasesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentPurchases.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell>{purchase.student}</TableCell>
            <TableCell>{purchase.item}</TableCell>
            <TableCell>${purchase.amount}</TableCell>
            <TableCell>{purchase.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


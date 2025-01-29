"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const initialStudent = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  totalDues: 50.97,
}

const initialPurchases = [
  { id: 1, item: "Lunch Combo", price: 12.99, date: "2024-01-27" },
  { id: 2, item: "Breakfast Set", price: 8.99, date: "2024-01-26" },
  { id: 3, item: "Snack Pack", price: 5.99, date: "2024-01-25" },
]

export default function AccountSummaryPage() {
  const [student, setStudent] = useState(initialStudent)
  const [purchases, setPurchases] = useState(initialPurchases)

  const clearDues = () => {
    setStudent({ ...student, totalDues: 0 })
    // In a real application, you would also update this in the backend
  }

  return (
    <div className="p-6 space-y-6 md:max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Account Summary</h1>

      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{student.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{student.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>{student.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Total Dues:</p>
              <p>${student.totalDues.toFixed(2)}</p>
            </div>
          </div>
          <Button onClick={clearDues} className="mt-4">
            Clear Dues
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.item}</TableCell>
                  <TableCell>${purchase.price.toFixed(2)}</TableCell>
                  <TableCell>{purchase.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


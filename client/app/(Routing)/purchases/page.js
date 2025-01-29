"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialPurchases= [
  { id: 1, studentName: "John Doe", item: "Lunch Combo", price: 12.99, date: "2024-01-27" },
  { id: 2, studentName: "Jane Smith", item: "Breakfast Set", price: 8.99, date: "2024-01-27" },
]

export default function RecordPurchasesPage() {
  const [purchases, setPurchases] = useState(initialPurchases)
  const [newPurchase, setNewPurchase] = useState({
    studentName: "",
    item: "",
    price: 0,
    date: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const addPurchase = () => {
    setPurchases([...purchases, { ...newPurchase, id: purchases.length + 1 }])
    setNewPurchase({ studentName: "", item: "", price: 0, date: "" })
  }

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.studentName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Record Purchases</h1>

      <div className="flex space-x-4">
        <Input
          placeholder="Search student..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Purchase</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Purchase</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="studentName" className="text-right">
                  Student Name
                </Label>
                <Input
                  id="studentName"
                  value={newPurchase.studentName}
                  onChange={(e) => setNewPurchase({ ...newPurchase, studentName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item" className="text-right">
                  Item
                </Label>
                <Input
                  id="item"
                  value={newPurchase.item}
                  onChange={(e) => setNewPurchase({ ...newPurchase, item: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newPurchase.price}
                  onChange={(e) => setNewPurchase({ ...newPurchase, price: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newPurchase.date}
                  onChange={(e) => setNewPurchase({ ...newPurchase, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addPurchase}>Add Purchase</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPurchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.studentName}</TableCell>
              <TableCell>{purchase.item}</TableCell>
              <TableCell>${purchase.price.toFixed(2)}</TableCell>
              <TableCell>{purchase.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


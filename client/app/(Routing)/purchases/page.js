"use client";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchInitialPurchases = async () => {
  try {
    const response = await axios.get(BASEURL + "/api/purchases", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    return response.data.purchases;
  } catch (error) {
    toast.error("Failed to fetch purchases.", error);
    return [];
  }
};

const initialPurchases = [
  { id: 1, name: "John Doe", item: "Lunch Combo", price: 12.99, date: "2024-01-27" },
  { id: 2, name: "Jane Smith", item: "Breakfast Set", price: 8.99, date: "2024-01-27" },
]

const fetchInitialStudents = async () => {

  try {
    const response = await axios.get(BASEURL + "/api/students", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    return response.data.students
  } catch (error) {
    toast.error("Failed to add student.", error);
    return initialPurchases
  }
}
export default function RecordPurchasesPage() {
  const [students, setStudents] = useState([]);
  const [purchases, setPurchases] = useState([])
  const [newPurchase, setNewPurchase] = useState({
    student_id: "",
    name: "",
    item: "",
    price: 0,
    date: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const getStudents = async () => {
      const response = await fetchInitialStudents()
      const students = response;
      setStudents(students);
    }
    const getPurchase = async () => {
      const response = await fetchInitialPurchases()
      const purchasedata = response;
      setPurchases(purchasedata);
    }
    getPurchase();
    getStudents();
  }, [])


  const addPurchase = async () => {
    const selectedStudent = students.find((s) => s.student_id === Number(newPurchase.student_id));
    if (selectedStudent) {
      try {
        const response = await axios.post(BASEURL + "/api/purchases", {
          ...newPurchase,
          name: selectedStudent.name,
        }, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log(response);

        if (response.data.message == "Purchase recorded successfully") {
          setPurchases([...purchases, { ...newPurchase, id: purchases.length + 1, name: selectedStudent.name }]);
          setNewPurchase({ student_id: "", name: "", item: "", price: 0, date: "" });
          toast.success("Purchase added successfully");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to add purchase", error);
      }
    } else {
      toast.error("Student not found");
    }
  };


  const filteredPurchases = purchases.filter((purchase) =>
    purchase.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  useEffect(() => {
    console.log(filteredPurchases);
  }, [filteredPurchases]);

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
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
                <Label htmlFor="student_id" className="text-right">
                  Student Name
                </Label>
                <select
                  id="student_id"
                  value={newPurchase.student_id}
                  onChange={(e) => setNewPurchase({ ...newPurchase, student_id: e.target.value })}
                  className="col-span-3 border outline-none p-2 rounded"
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.student_id} value={student.student_id}>
                      {student.name}
                    </option>
                  ))}
                </select>
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
                  value={newPurchase.price || 0}
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
            <TableRow key={purchase.purchase_id}>
              <TableCell>{purchase.name}</TableCell>
              <TableCell>{purchase.item}</TableCell>
              <TableCell>Rs. {purchase.total_price}</TableCell>
              <TableCell>
                {purchase.purchase_date ? purchase.purchase_date : purchase.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

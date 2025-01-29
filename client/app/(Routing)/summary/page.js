"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;


export default function AccountSummaryPage() {

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [studentsList, setstudentsList] = useState([]);
  const [purchases, setPurchases] = useState([])
  const [totalDues, setTotalDues] = useState(0);


  const getStudentsdata = async () => {

    try {
      const response = await axios.get(BASEURL + "/api/summary", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      return response.data.Summary
    } catch (error) {
      toast.error("Failed to add student.", error);
    }
  }



  const clearDues = () => {
    const UpdateDue = async () => {
      if (selectedStudent) {
        const response = (await axios.put(BASEURL + "/api/summary/" + selectedStudent.student_id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })).data;
        if (response.message === 'Student updated successfully') {
          toast.success(response.message);
          setTotalDues(0);
        }
      }
    }
    UpdateDue();
  }


  useEffect(() => {
    const getStudents = async () => {
      const response = await getStudentsdata()
      const students = response;
      setstudentsList(students);
    }
    getStudents();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStudent) {
        const response = (await axios.get(BASEURL + "/api/summary/" + selectedStudent.student_id, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })).data.Summary
        setPurchases(response);
        setTotalDues(response.reduce((sum, purchase) => sum + Number(purchase.total_price), 0));
      }
    }
    fetchData();
  }, [selectedStudent]);




  return (
    <div className="p-6 space-y-6 md:max-w-7xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Account Summary</h1>
      {!selectedStudent ? (
        // List of students
        <div>
          <h2 className="text-xl font-semibold">Select a Student</h2>
          <div className="space-y-4">
            {studentsList.map((student) => (
              <div
                key={student.student_id}
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => { setSelectedStudent(student) }}
              >
                <p className="font-semibold">{student.name}</p>
                <p>{student.email}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Student Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p>{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="font-semibold">Total Dues:</p>
                  <p>Rs. {totalDues}</p>
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
                  {Array.isArray(purchases) ? (
                    purchases.map((purchase) => (
                      <TableRow key={purchase.purchase_id}>
                        <TableCell>{purchase.item}</TableCell>
                        <TableCell>Rs. {purchase.total_price}</TableCell>
                        <TableCell>{purchase.purchase_date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="3">No purchase history available.</TableCell>
                    </TableRow>
                  )}

                  {selectedStudent.purchases}
                </TableBody>

              </Table>
            </CardContent>
          </Card>

          <Button onClick={() => setSelectedStudent(null)} className="mt-4">
            Back to Students List
          </Button>
        </div>
      )}
    </div>
  )
}

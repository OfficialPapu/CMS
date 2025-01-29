"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useEffect } from "react"
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;


export default function ReportsPage() {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchInitialReportData = async () => {
      try {
        const response = await axios.get(BASEURL + "/api/reports")
        setReportData(response.data.reports)
      } catch (error) {
        console.error("Error fetching initial report data:", error)
      }
    }
    fetchInitialReportData()
  }, [])


  return (
    <div className="space-y-6 md:px-24 py-6 px-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((data) => (
                <TableRow key={data.student_id}>
                  <TableCell>{data.studentName}</TableCell>
                  <TableCell>{data.totalPurchases}</TableCell>
                  <TableCell>Rs. {data.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


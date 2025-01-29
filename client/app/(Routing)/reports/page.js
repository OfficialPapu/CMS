"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const initialReportData = [
  { id: 1, studentName: "John Doe", totalPurchases: 15, totalAmount: 189.85 },
  { id: 2, studentName: "Jane Smith", totalPurchases: 12, totalAmount: 145.5 },
  { id: 3, studentName: "Mike Johnson", totalPurchases: 8, totalAmount: 98.75 },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly")
  const [reportData, setReportData] = useState(initialReportData)

  const generateReport = () => {
    // In a real application, this would fetch data from the backend based on the selected report type
    console.log(`Generating ${reportType} report`)
  }

  return (
    <div className="space-y-6 md:px-24 py-6 px-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</CardTitle>
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
                <TableRow key={data.id}>
                  <TableCell>{data.studentName}</TableCell>
                  <TableCell>{data.totalPurchases}</TableCell>
                  <TableCell>${data.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


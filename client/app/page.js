"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Users, DollarSign, ShoppingBag, Clock } from "lucide-react"
import { RecentPurchasesTable } from "@/Components/recent-purchases-table"
import axios from "axios"
import { useEffect, useState } from "react";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;


const fetchInitialStudents = async () => {
  try {
    const response = await axios.get(BASEURL + "/api/students", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    return response.data
  } catch (error) {
    toast.error("Failed to add student.", error);
    return students
  }
}

const fetchInitialPurchases = async () => {
  try {
    const response = await axios.get(BASEURL + "/api/purchases", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    return response.data.purchases;
  } catch (error) {
    toast.error("Failed to fetch purchases.", error);
    return [];
  }
};


export default function DashboardPage() {
  const [PurchaseData, setPurchasesData] = useState([]);
  const [TotalStudents, setTotalStudents] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [TotalDues, setTotalDues] = useState(0);

  useEffect(() => {
    const getPurchase = async () => {
      const response = await fetchInitialPurchases()
      setPurchasesData(response);
      setTotalPurchases(response.length);
      setTotalDues(response.reduce((sum, response) => sum + parseInt(response.total_price), 0))
    }
    getPurchase();

    const getStudents = async () => {
      const response = await fetchInitialStudents()
      const { students } = response;
      setTotalStudents(students.length)
    }
    getStudents()

  }, [])

  return (
    <div className="md:max-w-7xl mx-auto px-6 py-8">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{TotalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">Total Dues</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {TotalDues}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium">Today's Purchases</CardTitle>
              <ShoppingBag className="h-4 w-4 text-brand-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPurchases}</div>
            </CardContent>
          </Card>

        </div>

        <div className="grid gap-4 grid-cols-1">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentPurchasesTable PurchaseData={PurchaseData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


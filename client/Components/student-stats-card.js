import { Card, CardContent } from "@/components/ui/card"

export function StudentStatsCard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium">Active Students</div>
            <div className="text-2xl font-bold text-brand-orange">876</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium">New This Month</div>
            <div className="text-2xl font-bold text-brand-orange">34</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium">Avg. Daily Purchases</div>
            <div className="text-2xl font-bold text-brand-orange">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-sm font-medium">Paid Accounts</div>
            <div className="text-2xl font-bold text-brand-orange">654</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


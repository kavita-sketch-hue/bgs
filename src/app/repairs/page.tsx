"use client"

import { useState } from "react"
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Search,
  Filter,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const MOCK_REPAIRS = [
  {
    id: "REP-001",
    assetName: "Dell UltraSharp 27\"",
    issue: "Screen Flicker",
    condition: "Fair",
    status: "In Progress",
    costEstimate: "$150",
    requestDate: "Mar 28, 2026",
    priority: "Medium",
  },
  {
    id: "REP-002",
    assetName: "MacBook Pro 16\"",
    issue: "Battery Replacement",
    condition: "Poor",
    status: "Pending",
    costEstimate: "$200",
    requestDate: "Mar 30, 2026",
    priority: "High",
  },
  {
    id: "REP-003",
    assetName: "Aeron Chair",
    issue: "Hydraulic Leak",
    condition: "Fair",
    status: "Completed",
    costEstimate: "$85",
    requestDate: "Mar 20, 2026",
    priority: "Low",
  },
  {
    id: "REP-004",
    assetName: "Standing Desk",
    issue: "Motor Jammed",
    condition: "Fair",
    status: "Pending",
    costEstimate: "$120",
    requestDate: "Mar 31, 2026",
    priority: "Medium",
  },
]

export default function RepairLoopPage() {
  const [activeTab, setActiveTab ] = useState("all")

  const filteredRepairs = activeTab === "all" 
    ? MOCK_REPAIRS 
    : MOCK_REPAIRS.filter(r => r.status.toLowerCase() === activeTab.replace("-", " ").toLowerCase())

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Repair Loop</h1>
          <p className="text-muted-foreground">Manage asset restoration and prevent unnecessary replacements.</p>
        </div>
        <Button className="flex items-center gap-2 font-bold h-11">
          <Wrench className="h-4 w-4" />
          New Repair Request
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {[
          { label: "Pending", count: 2, icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "In Progress", count: 1, icon: Wrench, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Completed", count: 1, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Total Saved", count: "$340", icon: ArrowRight, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 bg-secondary/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">{stat.label}</p>
                <p className="text-xl font-bold">{stat.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 bg-secondary/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Active Tickets</CardTitle>
              <CardDescription>Monitor the status of internal repairs.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="h-8 w-48 pl-8 text-xs border-0 bg-background/50" />
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Filter className="h-3 w-3" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-primary/10">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Issue / Condition</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Est. Cost</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairs.map((repair) => (
                <TableRow key={repair.id} className="border-primary/5 hover:bg-background/40 transition-colors cursor-pointer group">
                  <TableCell className="font-mono text-xs">{repair.id}</TableCell>
                  <TableCell className="font-medium">{repair.assetName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{repair.issue}</span>
                      <span className="text-xs text-muted-foreground">Original: {repair.condition}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        repair.priority === "High" ? "border-red-500/50 text-red-600 bg-red-500/5" : 
                        repair.priority === "Medium" ? "border-orange-500/50 text-orange-600 bg-orange-500/5" :
                        "border-blue-500/50 text-blue-600 bg-blue-500/5"
                      }
                    >
                      {repair.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        repair.status === "Completed" ? "bg-green-500" :
                        repair.status === "In Progress" ? "bg-blue-500 animate-pulse" :
                        "bg-orange-500"
                      }`} />
                      <span className="text-sm font-medium">{repair.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{repair.costEstimate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-8 flex items-center gap-4 bg-orange-500/5 p-6 rounded-lg border border-orange-500/10">
        <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold">AI Predictive Maintenance Alert</h4>
          <p className="text-sm text-muted-foreground">
            3 monitors in Department X are 4+ years old. Suggesting proactive battery/capacitor refresh to extend life by another 2 years.
          </p>
        </div>
        <Button variant="outline" className="border-orange-500/50 text-orange-600 hover:bg-orange-500/10 h-9 font-bold">
          View Suggested Repairs
        </Button>
      </div>
    </div>
  )
}

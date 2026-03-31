"use client"

import dynamic from "next/dynamic"
import { 
  Download, 
  FileText, 
  Share2, 
  History,
  TrendingUp,
  ShieldCheck,
  Earth
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dynamic import for PDF components to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
)
const SustainabilityCertificate = dynamic(
  () => import("@/components/reporting/SustainabilityCertificate").then((mod) => mod.SustainabilityCertificate),
  { ssr: false }
)

export default function ImpactStatsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sustainability Analytics</h1>
          <p className="text-muted-foreground">Certified environmental impact reports for your organization.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Report
          </Button>
          <PDFDownloadLink
            document={
              <SustainabilityCertificate 
                organization="Acme Corp" 
                month="March" 
                year="2026" 
                dollarsSaved="$124,500"
                co2Avoided="8,240 kg"
                landfillDiverted="1,120 kg"
              />
            }
            fileName="EcoLoop_Sustainability_Certificate_March_2026.pdf"
          >
            {/* @ts-ignore */}
            {({ loading }) => (
              <Button className="flex items-center gap-2 font-bold" disabled={loading}>
                <Download className="h-4 w-4" />
                {loading ? "Generating..." : "Download Certificate"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8 space-y-8">
          <Card className="border-0 bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Earth className="h-5 w-5 text-primary" />
                Planetary Impact
              </CardTitle>
              <CardDescription>Estimated resources saved by reusing internal assets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Water Saved", value: "450k Liters", sub: "Production offset" },
                  { label: "Raw Materials", value: "2,400 kg", sub: "Mining avoided" },
                  { label: "Energy Saved", value: "12.4 MWh", sub: "Mfg process" },
                  { label: "Trees Equivalent", value: "142", sub: "CO2 absorption" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
                    <p className="text-lg font-bold mt-1 text-primary">{item.value}</p>
                    <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-secondary/50">
            <CardHeader>
              <CardTitle>Historical Impact Trend</CardTitle>
              <CardDescription>Monthly growth in circularity savings.</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] flex items-end justify-between gap-1">
              {[20, 35, 30, 45, 40, 55, 50, 65, 60, 75, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 space-y-2">
                  <div 
                    className="w-full bg-primary/20 rounded-sm hover:bg-primary transition-all cursor-pointer" 
                    style={{ height: `${h}%` }}
                  />
                  <p className="text-[10px] text-center text-muted-foreground">M{i+1}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4 space-y-8">
          <Card className="border-0 bg-primary text-primary-foreground">
            <CardHeader>
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mb-2">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <CardTitle>ESG Verification</CardTitle>
              <CardDescription className="text-primary-foreground/80">Your data is ready for year-end reporting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                EcoLoop's tracking methodology adheres to ISO 14001 environmental management standards.
              </p>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white font-bold">
                View Audit Trail
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-sm border-b pb-2">Recent Certificates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border">
                {[
                  { month: "February 2026", co2: "7.2k kg" },
                  { month: "January 2026", co2: "6.8k kg" },
                  { month: "December 2025", co2: "5.9k kg" },
                ].map((cert) => (
                  <div key={cert.month} className="px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{cert.month}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{cert.co2}</Badge>
                  </div>
                ))}
               </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <Button variant="link" className="text-xs h-auto p-0 flex items-center gap-1 group">
                <History className="h-3 w-3" />
                View all past reports
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

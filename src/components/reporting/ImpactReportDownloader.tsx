"use client"

import React from 'react'
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { SustainabilityCertificate } from "./SustainabilityCertificate"

interface ImpactReportDownloaderProps {
  organization: string
  month: string
  year: string
  dollarsSaved: string
  co2Avoided: string
  landfillDiverted: string
}

export default function ImpactReportDownloader({
  organization,
  month,
  year,
  dollarsSaved,
  co2Avoided,
  landfillDiverted
}: ImpactReportDownloaderProps) {
  return (
    <PDFDownloadLink
      document={
        <SustainabilityCertificate 
          organization={organization} 
          month={month} 
          year={year} 
          dollarsSaved={dollarsSaved}
          co2Avoided={co2Avoided}
          landfillDiverted={landfillDiverted}
        />
      }
      fileName={`EcoLoop_Sustainability_Certificate_${month}_${year}.pdf`}
    >
      {/* @ts-ignore */}
      {({ loading }) => (
        <Button className="flex items-center gap-2 font-bold" disabled={loading}>
          <Download className="h-4 w-4" />
          {loading ? "Generating..." : "Download Certificate"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

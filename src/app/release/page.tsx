"use client"

import { useState } from "react"
import { 
  Camera, 
  Upload, 
  ScanLine, 
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReleaseAssetsPage() {
  const [isAiScanning, setIsAiScanning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    category: "",
    condition: "",
    location: "",
  })

  const simulateAiScan = () => {
    setIsAiScanning(true)
    setTimeout(() => {
      setFormData({
        name: "Dell UltraSharp 27\"",
        brand: "Dell",
        model: "U2723QE",
        category: "Monitors",
        condition: "Good",
        location: "Current Office",
      })
      setIsAiScanning(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Release Assets</h1>
        <p className="text-muted-foreground">Offload surplus inventory into the internal ecosystem.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-0 bg-secondary/50">
          <CardHeader>
            <CardTitle>AI Vision Tagging</CardTitle>
            <CardDescription>Upload a photo and let EcoLoop identify the asset for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full rounded-lg border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-12 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Camera className="h-8 w-8" />
              </div>
              <p className="font-medium">Drop an image here</p>
              <p className="text-sm text-muted-foreground">or click to browse from device</p>
            </div>
            
            <Button 
              className="w-full mt-6 flex items-center gap-2 font-semibold h-12" 
              onClick={simulateAiScan}
              disabled={isAiScanning}
            >
              {isAiScanning ? (
                <>
                  <ScanLine className="h-5 w-5 animate-bounce" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <ScanLine className="h-5 w-5" />
                  Run AI Vision Scan
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 text-sm">
              <Info className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">
                Vision AI automatically detects brand, model, and suggests a condition grade (New/Good/Fair).
              </p>
            </div>
          </CardFooter>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="border-0 bg-secondary/50">
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
              <CardDescription>Confirm or edit the metadata for this asset.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Asset Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Office Chair" 
                  className="bg-background border-0" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input 
                    id="brand" 
                    placeholder="e.g. Herman Miller" 
                    className="bg-background border-0" 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input 
                    id="model" 
                    placeholder="e.g. Aeron" 
                    className="bg-background border-0" 
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category || ""} 
                  onValueChange={(val) => setFormData({...formData, category: val || ""})}
                >
                  <SelectTrigger className="bg-background border-0">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Monitors">Monitors</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition Grade</Label>
                <Select 
                  value={formData.condition || ""} 
                  onValueChange={(val) => setFormData({...formData, condition: val || ""})}
                >
                  <SelectTrigger className="bg-background border-0">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. Storage Room B" 
                  className="bg-background border-0" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full font-bold h-12">
                Release into System
              </Button>
              {isSuccess && (
                <div className="flex items-center gap-2 text-green-600 font-medium animate-in fade-in slide-in-from-bottom-1">
                  <CheckCircle2 className="h-5 w-5" />
                  Asset successfully added to Marketplace!
                </div>
              )}
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

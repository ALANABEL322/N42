import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Calendar as CalendarComponent } from "../../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { cn } from "../../../lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../../components/ui/pagination"

export default function ReportGenerator() {
  const [reportType, setReportType] = useState("")
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [dataImportance, setDataImportance] = useState("")
  const [activeTab, setActiveTab] = useState("month")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)

  const formatarData = (date: Date | undefined) => {
    if (!date) return ""
    return new Intl.DateTimeFormat('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    }).format(date)
  }

  const previousReports = [
    {
      id: 1,
      type: "Report Type",
      date: "00/00/00",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: 2,
      type: "Report Type",
      date: "00/00/00",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: 3,
      type: "Report Type",
      date: "00/00/00",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
  ]

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl mt-12">
      <h1 className="text-3xl font-bold mb-6">Generate Reports</h1>

      <Card className="mb-8 bg-[#faf7f5] border-[#f0e9e5]">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="reportType" className="block text-sm font-medium mb-2">
                  What type of report do you want?
                </label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete">Complete Report</SelectItem>
                    <SelectItem value="summary">Executive Summary</SelectItem>
                    <SelectItem value="detailed">Detailed Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Period</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">From</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fromDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {fromDate ? formatarData(fromDate) : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">To</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !toDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {toDate ? formatarData(toDate) : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="dataImportance" className="block text-sm font-medium mb-2">
                  What data is important?
                </label>
                <Select value={dataImportance} onValueChange={setDataImportance}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select important data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="users_last_month">Users registered in the last month</SelectItem>
                    <SelectItem value="sales_last_month">Sales of the last month</SelectItem>
                    <SelectItem value="website_usage">Website Usage</SelectItem>
                    <SelectItem value="generated_brands">Generated Brands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Button variant="outline" className="bg-white border-[#e5e5e5] hover:bg-gray-50 text-black">
                Cancel
              </Button>
              <Button className="bg-[#e67817] hover:bg-[#d16a14] text-white">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Previous Reports</h2>
        <Tabs defaultValue="month" value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-white border">
            <TabsTrigger value="day" className="data-[state=active]:bg-gray-100">
              Day
            </TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-gray-100">
              Month
            </TabsTrigger>
            <TabsTrigger value="year" className="data-[state=active]:bg-gray-100">
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {previousReports.map((report) => (
          <Card key={report.id} className="bg-[#faf7f5] border-[#f0e9e5]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{report.type}</CardTitle>
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.content.map((paragraph, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {renderPagination()}
    </div>
  )
}
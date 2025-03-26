import { FileText } from 'lucide-react'

export default function Reports() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <FileText className="h-6 w-6 text-gray-400" />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Available Reports</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Generate Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report cards */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">User Activity Report</h3>
            <p className="text-sm text-gray-500 mt-1">Daily user activity summary</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Performance Report</h3>
            <p className="text-sm text-gray-500 mt-1">System performance metrics</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium">Usage Report</h3>
            <p className="text-sm text-gray-500 mt-1">Resource usage statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
}

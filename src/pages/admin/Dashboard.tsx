import { Button } from '@/components/ui/button'
import Sidebar from '../../components/Sidebar'
import { Metrics } from '../../components/metrics/Metrics'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleGenerateReport = () => {
    navigate('/admin/reports')
  }
  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <Sidebar />
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Metrics</h1>
       <Metrics />
       <Button 
          onClick={handleGenerateReport}
          className="mt-5 bg-[#E46A10] hover:bg-[#E46A10]/90 text-white"
        >
          Generate Report
        </Button>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Metrics } from '../../components/metrics/Metrics'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  const handleGenerateReport = () => {
    navigate('/admin/reports')
  }
  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      <div className="flex-1 min-h-screen bg-white p-8 ml-0 xl:ml-64">        <div className="max-w-7xl mx-auto">
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
    </div>
  )
}

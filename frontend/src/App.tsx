import { ToastContainer, Zoom } from "react-toastify"
import './App.css'
import Dashboard from './features/dashboard/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './layouts/Sidebar'
import TopBar from './layouts/TopBar'
import { AlertLogs } from './features/alerts/AlertLogs'
import { BedActivity } from './features/bedActivity/BedActivity'
import { useEffect } from "react"
import { initSocket } from "./realtime/socketInit"
import { setupAlertReaction } from "./features/alerts/alertReaction"
import { useNavigate } from "react-router-dom"
import MatToBedMapping from "./features/mapping/MatToBedMapping"
import Analytics from "./features/analytics/Analytics"
import { DataEntry } from "./features/dataEntry/DataEntry"



function App() {
  const navigate = useNavigate()

  useEffect(() => {
    initSocket();
    setupAlertReaction(navigate);
  }, [navigate])


  return (
    <div className="flex max-h-screen bg-gray-100 max-w-full">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alertLogs" element={<AlertLogs />} />
          <Route path="/bedactivity" element={<BedActivity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mattobedmapping" element={<MatToBedMapping />} />
          <Route path="/dataEntry" element={<DataEntry />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          transition={Zoom}
          className="!w-[650px]"
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-3xl justify-between overflow-hidden cursor-default mb-4 shadow-2xl"
          }
          progressClassName="!bg-white/40"
        />
      </div>
    </div>
  )
}

export default App

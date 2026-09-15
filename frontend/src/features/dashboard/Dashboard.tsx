import StatCard from "./StatCard"
import HospitalMap from "./HospitalMap"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { TOTAL_BED } from "../../config/constants"
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"

const Dashboard = observer(() => {
    const intl = useIntl()
    const { alertStore } = useStore()

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = currentTime.toISOString().split("T")[0];


    return (
        <main className="ml-64 min-h-screen overflow-y-auto bg-[#f7f9fb] p-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                <StatCard
                    title={intl.formatMessage({id: "active_alerts"})}
                    value={alertStore.alerts.length}
                    icon="warning"
                    isAlert={true}
                />

                <StatCard
                    title={intl.formatMessage({id: "safe_status"})}
                    value={TOTAL_BED - alertStore.alerts.length}
                    icon="check_circle"
                />

                <StatCard
                    title={intl.formatMessage({id: "total_occupancy"})}
                    value={TOTAL_BED}
                    subValue="/12"
                    icon="hotel"
                />

                <StatCard
                    title={dateString}
                    value={timeString}
                    subValue=""
                    icon="schedule"
                    variant="clinical"
                    trend={intl.formatMessage({id: "current_time"})}
                />
            </div>

            <HospitalMap />
        </main>
    )
})

export default Dashboard
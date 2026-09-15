import BedItem from "./BedItem";
import { observer } from "mobx-react-lite";
import { useHospitalMapRooms } from "./useHospitalMapRooms";
import { useIntl } from "react-intl";

const HospitalMap = observer(() => {
    const intl = useIntl();
    const rooms = useHospitalMapRooms();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {rooms.map(({ roomNumber, roomBeds }) => {
                return (
                    <div key={roomNumber} className={`bg-white p-6 rounded-xl border transition-all duration-300 hover:shadow-xl ${roomBeds[0]?.status === "alert" ? "border-red-500/30 ring-1 ring-red-500/10 shadow-lg shadow-red-500/5" : "border-slate-200/60"}`}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 font-headline">{intl.formatMessage({id: "room"})} {roomNumber}</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-wide">{intl.formatMessage({id: "floor"})} {roomNumber.startsWith('1') ? '1' : '2'}</p>
                            </div>
                            {roomBeds[0]?.status === "alert"  ? (
                                <div className="w-3 h-3 bg-[#b61722] rounded-full animate-pulse"></div>
                            ) : (
                                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {roomBeds.map((bed) => (
                                <BedItem key={bed.id} bed={bed} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>

    );
});

export default HospitalMap;
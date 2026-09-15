import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";

const MatToBedMapping = observer(() => {

    const { mappingStore } = useStore();

    useEffect(() => {
        mappingStore.getMatToBedMapping();
    }, [mappingStore])

    return (
        <div className="flex flex-col gap-4 p-4 border">
            <div className="grid grid-cols-5 gap-4 items-center bg-white shadow-md rounded-xl p-2 border text-center font-bold text-2xl">
                <h2 className=" px-3 py-2 ">Username</h2>
                <h2 className=" px-3 py-2">Bed</h2>
                <h2 className=" px-3 py-2">Floor</h2>
                <h2 className=" px-3 py-2">Building</h2>
                <h2 className=" px-3 py-2">Mat ID</h2>
            </div>
            <div className="flex flex-col items-center border justify p-4">
                {mappingStore.mappingData.map((m) => (
                    <div
                        key={m.users.id}
                    className="grid grid-cols-5 gap-4 shadow-md rounded-xl p-2 max-w-fit "
                    >
                        <input
                            value={m.users.userName}
                            disabled
                            className="border rounded-lg px-3 py-2 bg-gray-100"
                            type="text"
                        />

                        <input
                            value={m.users.bed}
                            disabled
                            className="border rounded-lg px-3 py-2 bg-gray-100"
                            type="text"
                        />

                        <input
                            value={m.users.floor}
                            disabled
                            className="border rounded-lg px-3 py-2 bg-gray-100 "
                            type="text"
                        />

                        <input
                            value={m.users.building}
                            disabled
                            className="border rounded-lg px-3 py-2 bg-gray-100"
                            type="text"
                        />

                        <input
                            value={m.esp.matId}
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
})

export default MatToBedMapping;
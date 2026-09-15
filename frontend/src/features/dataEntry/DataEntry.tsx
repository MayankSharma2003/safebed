import { useStore } from "../../hooks/useStore";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { saveData } from "./api";

type user = {
    userId: number,
    userName: string
}

const defaultValue = {
    user: 484,
    date: new Date().toISOString(),
    action: "LOW",
    actionTaken: "Yes"
}

export const DataEntry = () => {

    const { bedsStore } = useStore();

    const [users, setUsers] = useState<user[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await bedsStore.loadBeds();
            setUsers(bedsStore.beds.map((b) => ({ userId: b.id, userName: b.userName })))
        };
        void fetchData();
    }, [bedsStore]);



    const [form, setForm] = useState(defaultValue);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await saveData({...form, date: new Date(form.date).toISOString()});
        if (result === 201) {
            setForm(defaultValue)
        }
    };

    return (
        <main className="ml-64 min-h-screen bg-[#f7f9fb] p-8">

            <div className="mb-8">
                <h3 className="text-2xl font-bold font-headline text-slate-900">
                    <FormattedMessage id="data_entry" defaultMessage="Data Entry" />
                </h3>

                <p className="text-sm text-slate-500">
                    <FormattedMessage
                        id="data_entry_subheading"
                        defaultMessage="Create a new data entry record."
                    />
                </p>
            </div>

            <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Time */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Time
                        </label>

                        <input
                            name="date"
                            type="datetime-local"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Action */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Action
                        </label>

                        <input
                            name="action"
                            type="text"
                            value={form.action}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Action Taken */}

                    {form.action === "HIGH" && (

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Action Taken
                            </label>

                            <select
                                name="actionTaken"
                                value={form.actionTaken}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                    )}

                    {/* User */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            User
                        </label>

                        <select
                            name="user"
                            value={form.user}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >

                            {users && users.map((b) => (

                                <option
                                    key={b.userId}
                                    value={b.userId}
                                >
                                    {b.userName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Button */}

                    <div className="flex justify-end pt-4">

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            Submit
                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
};

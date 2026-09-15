import { reaction } from "mobx";
import { rootStore } from "../../stores/RootStore";
import { toast, Zoom } from "react-toastify";
import { startAlertSpeech, stopAlertSpeech } from "./alertSpeech";
import { triggerAlert } from "./triggerAlert";
import { FormattedMessage } from "react-intl";

let isReactionInitialized = false;

export function setupAlertReaction(navigate: (path: string) => void) {
    const { alertStore } = rootStore;

    if (isReactionInitialized) return;

    isReactionInitialized = true;

    reaction(
        () => alertStore.activeAlert,
        (alert) => {
            if (!alert) return;

            navigate("/dashboard");

            startAlertSpeech(alert.message);
            triggerAlert(alert.matId);

            const toastId = toast.error(
                () => (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            {/* Glowing Pulse Icon */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
                                <div className="relative bg-white text-rose-600 p-2 rounded-xl shadow-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl font-bold">warning</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-200 opacity-80">
                                    <FormattedMessage id="immediate_alert" />
                                </p>
                                <h3 className="text-lg font-black text-white leading-tight">
                                    {alert.message}
                                </h3>
                                <p className="text-[11px] font-bold text-rose-100 mt-0.5">
                                    <FormattedMessage id="please_check_patient_at" /> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                    transition: Zoom,
                    icon: false,
                    style: {
                        width: "600px",
                        background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)", // Rose-600 to Rose-700
                        borderRadius: "24px",
                        padding: "20px",
                        boxShadow: "0 20px 25px -5px rgba(225, 29, 72, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.2)"
                    },
                    onClose: () => {
                        triggerAlert(alert.matId);
                        stopAlertSpeech();
                        alertStore.removeToastId(alert.alertId);
                        alertStore.removeAlert(alert.alertId);
                    },
                }
            );

            alertStore.setToastId(alert.alertId, toastId);
        }
    );
}
import { makeAutoObservable } from "mobx";

export type Alert = {
  matId: number;
  alertId: number;
  bedId: number;
  building: string;
  floor: number | string;
  room: string;
  bed: string;
  message: string;
};

export class AlertStore {
  alerts: Alert[] = [];
  activeAlert: Alert | null = null;

  toastMap = new Map<number, number | string>();

  constructor() {
    makeAutoObservable(this);
  }

  addAlert(alert: Alert) {
    this.alerts.push(alert);
    this.activeAlert = alert;
  }

  clearActiveAlert() {
    this.activeAlert = null;
  }

  removeAlert(alertId: number) {
  const index = this.alerts.findIndex(a => a.alertId === alertId);
  if (index !== -1) {
    this.alerts.splice(index, 1);
  }
}

  setToastId(alertId: number, toastId: number | string) {
    this.toastMap.set(alertId, toastId);
  }

  getToastId(alertId: number) {
    return this.toastMap.get(alertId);
  }

  removeToastId(alertId: number) {
    this.toastMap.delete(alertId);
  }

  getAlertByBedId(bedId: number) {
    return this.alerts.find(alert => alert.bedId === bedId);
  }
}

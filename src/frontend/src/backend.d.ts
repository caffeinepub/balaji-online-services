import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Notification {
    id: bigint;
    createdAt: bigint;
    dateLabel: string;
    message: string;
}
export interface backendInterface {
    addNotification(password: string, message: string, dateLabel: string): Promise<void>;
    deleteNotification(password: string, id: bigint): Promise<void>;
    editNotification(password: string, id: bigint, message: string, dateLabel: string): Promise<void>;
    getNotifications(): Promise<Array<Notification>>;
}

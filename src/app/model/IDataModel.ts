export interface IDataModel {
    title: string,
    timeframes: ITimeFrame,
    style: string
};

export interface ITimeFrame {
    daily: ITimeFrameObj,
    weekly: ITimeFrameObj,
    monthly: ITimeFrameObj
}
export interface ITimeFrameObj {
    current: number,
    previous: number
}
export enum TimeFrameEnum {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly'
}

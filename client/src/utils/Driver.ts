export interface Driver {
    id?: number;
    name: string;
    team: string;
    points: number;
}

export const defaultDriver: Driver = {
    name: "",
    team: "",
    points: 0
};
import { Decimal } from "@prisma/client/runtime/library";

export interface Driver {
    id?: number;
    name: string;
    team: string;
    points: Decimal;
}

export const defaultDriver: Driver = {
    name: "",
    team: "",
    points: new Decimal(0),
};
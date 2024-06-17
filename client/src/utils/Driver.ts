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

export const DRIVERS: Driver[] = [
    { id: 1, name: "Carlos Sainz", team: "Ferrari", points: 230.6 },
    { id: 2, name: "Lando Norris", team: "McLaren", points: 199.8 },
    { id: 3, name: "Lewis Hamilton", team: "Mercedes", points: 214.2 },
    { id: 4, name: "Charles Leclerc", team: "Ferrari", points: 200.7 },
    { id: 5, name: "Max Verstappen", team: "RedBull", points: 333.3 }
];
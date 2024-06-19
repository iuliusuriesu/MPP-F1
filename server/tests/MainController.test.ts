import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { mainRouter } from "../src/controller/MainController";
import { Decimal } from "@prisma/client/runtime/library";

const app = express();
app.use(express.json());
app.use(mainRouter);

const drivers = [
    { id: 1, name: "Carlos Sainz", team: "Ferrari", points: new Decimal(230.5) },
    { id: 2, name: "Lando Norris", team: "McLaren", points: new Decimal(198.4) },
    { id: 3, name: "Lewis Hamilton", team: "Mercedes", points: new Decimal(215.6) },
];

vi.mock('../src/service/MainService', () => ({
    getAllDrivers: vi.fn().mockImplementation(async () => {
        return drivers;
    })
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('GET /drivers', () => {
    it('should return all drivers', async () => {
        const result = await request(app).get('/drivers');

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(3);

        for(let i = 0; i < result.body.length; i++) {
            const driver = result.body[i];
            expect(driver.name).toBe(drivers[i].name);
            expect(driver.team).toBe(drivers[i].team);
            expect(driver.points).toBe(drivers[i].points.toString());
        }
    });
});
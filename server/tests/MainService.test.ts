import { describe, it, expect, beforeEach, vi } from "vitest";
import prismaMock from "./prismaMock";
import { mockReset } from "vitest-mock-extended";
import { Decimal } from "@prisma/client/runtime/library";
import { addDriver, getAllDrivers, getDriverById } from "../src/service/MainService";
import { DriverNotFoundError, InvalidDriverError } from "../src/utils/Errors";

beforeEach(() => {
    mockReset(prismaMock);
});

vi.mock('../src/utils/prisma', () => ({
    default: prismaMock,
}));

describe('getAllDrivers', () => {
    it('should return a list with all drivers', async () => {
        const drivers = [
            { id: 1, name: "Carlos Sainz", team: "Ferrari", points: new Decimal(230.5) },
            { id: 2, name: "Lando Norris", team: "McLaren", points: new Decimal(198.4) },
            { id: 3, name: "Lewis Hamilton", team: "Mercedes", points: new Decimal(215.6) },
        ];

        prismaMock.drivers.findMany.mockResolvedValue(drivers);

        const result = await getAllDrivers();
        expect(result.length).toBe(3);
        expect(result).toEqual(drivers);
    });

    it('should return null if there are no drivers in the database', async () => {
        prismaMock.drivers.findMany.mockResolvedValue([]);

        const result = await getAllDrivers();
        expect(result.length).toBe(0);
        expect(result).toEqual([]);
    });
});

describe('getDriverById', () => {
    it('should return the driver with the given id', async () => {
        const driver = {
            id: 1,
            name: "Carlos Sainz",
            team: "Ferrari",
            points: new Decimal(230.5),
        };

        prismaMock.drivers.findUnique.mockResolvedValue(driver);

        const result = await getDriverById(1);

        expect(result.name).toBe("Carlos Sainz");
        expect(result.team).toBe("Ferrari");
        expect(result.points.toNumber()).toBe(230.5);

        expect(prismaMock.drivers.findUnique).toBeCalledWith({
            where: {
                id: 1,
            },
        });
    });

    it('should throw DriverNotFoundError if a driver with the given id does not exist', async () => {
        prismaMock.drivers.findUnique.mockResolvedValue(null);

        try {
            await getDriverById(100);
            expect(1).toBe(2);
        }
        catch (err) {
            expect(err).toBeInstanceOf(DriverNotFoundError);
            expect(err).toHaveProperty('message', 'Driver with id = 100 was not found!');
        }
    });
});

describe('addDriver', () => {
    it('should add the driver to the database', async () => {
        const driver = {
            id: 4,
            name: "Charles Leclerc",
            team: "Ferrari",
            points: new Decimal(200.2),
        };

        prismaMock.drivers.create.mockResolvedValue(driver);

        const result = await addDriver(driver);

        expect(result).toEqual(driver);

        expect(prismaMock.drivers.create).toHaveBeenCalledWith({
            data: {
                ...driver,
                id: undefined,
            },
        });
    });

    it('should throw InvalidDriverError if the driver is not valid', async () => {
        const driver = {
            id: 4,
            name: "charles leclerc",
            team: "Ferrari",
            points: new Decimal(200.2),
        };

        try {
            await addDriver(driver);
            expect(1).toBe(2);
        }
        catch (err) {
            expect(err).toBeInstanceOf(InvalidDriverError);
        }
    });
});
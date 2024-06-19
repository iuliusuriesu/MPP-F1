import { Driver } from "../domain/Driver";
import { DriverNotFoundError, InvalidDriverError } from "../utils/Errors";
import prisma from "../utils/prisma";

function validateDriver(driver: Driver) {
    // Name of the driver must start with a capital letter and must contain at least 3 characters
    if (driver.name.length < 3 || driver.name[0] < 'A' || driver.name[0] > 'Z') {
        throw new InvalidDriverError('Driver name must start with a capital and must contain at least 3 letters!');
    }

    // Points must be at least 0 and no more than 1000
    if (driver.points.toNumber() < 0 || driver.points.toNumber() >= 1000) {
        throw new InvalidDriverError('Driver must have between 0 and 999 points!');
    }
}

export async function getAllDrivers() {
    const drivers = await prisma.drivers.findMany();
    return drivers;
}

export async function getDriverById(driverId: number) {
    const driver = await prisma.drivers.findUnique({
        where: {
            id: driverId,
        },
    });

    if (driver === null) {
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }
    return driver;
}

export async function addDriver(driver: Driver) {
    validateDriver(driver);

    driver.id = undefined;
    const addedDriver = await prisma.drivers.create({
        data: driver,
    });
    return addedDriver;
}

export async function deleteDriver(driverId: number) {
    try {
        const deletedDriver = await prisma.drivers.delete({
            where: {
                id: driverId,
            },
        });
        return deletedDriver;
    }
    catch (err) {
        //console.log(err);
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }
}

export async function updateDriver(driverId: number, newDriver: Driver) {
    validateDriver(newDriver);

    try {
        newDriver.id = driverId;
        const updatedDriver = await prisma.drivers.update({
            where: {
                id: driverId,
            },
            data: newDriver,
        });
        return updatedDriver;
    }
    catch (err) {
        console.log(err);
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }
}

export async function getPointsChartData() {
    // answer[i] = how many drivers have points in the i-th hundred
    const drivers = await prisma.drivers.findMany();

    const answer: number[] = [];
    for(let i = 0; i < 10; i++) {
        answer.push(0);
    }

    for(let i = 0; i < drivers.length; i++) {
        const points = drivers[i].points.toNumber();
        const index = Math.floor(points / 100);
        answer[index]++;
    }

    return answer;
}

export async function getDriverPage(pageNumber: number, pageSize: number) {
    const drivers = await prisma.drivers.findMany({
        skip: pageSize * (pageNumber - 1),
        take: pageSize,
    });
    return drivers;
}
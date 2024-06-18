import { DRIVERS, Driver, defaultDriver, setDrivers } from "../domain/Driver";
import { DriverNotFoundError, InvalidDriverError } from "../utils/Errors";

function validateDriver(driver: Driver) {
    // Name of the driver must start with a capital letter and must contain at least 3 characters
    if (driver.name.length < 3 || driver.name[0] < 'A' || driver.name[0] > 'Z') {
        throw new InvalidDriverError('Driver name must start with a capital and must contain at least 3 letters!');
    }

    // Points must be at least 0 and no more than 1000
    if (driver.points < 0 || driver.points > 1000) {
        throw new InvalidDriverError('Driver must have between 0 and 1000 points!');
    }
}

export function getAllDrivers(): Driver[] {
    return DRIVERS;
}

export function getDriverById(driverId: number): Driver {
    const driver = DRIVERS.find((driver) => driver.id === driverId);
    if (driver === undefined) {
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }

    return driver;
}

export function addDriver(driver: Driver): Driver {
    validateDriver(driver);

    const lastId = DRIVERS[DRIVERS.length - 1].id;
    if (lastId === undefined) {
        return defaultDriver;
    }

    driver.id = lastId + 1;
    DRIVERS.push(driver);
    return driver;
}

export function deleteDriver(driverId: number): Driver {
    const driver = DRIVERS.find((driver) => driver.id === driverId);
    if (driver === undefined) {
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }

    const newDriverList = DRIVERS.filter((driver) => driver.id !== driverId);
    setDrivers(newDriverList);
    return driver;
}

export function updateDriver(driverId: number, newDriver: Driver): Driver {
    const index = DRIVERS.findIndex((driver) => driver.id === driverId);
    if (index === -1) {
        throw new DriverNotFoundError('Driver with id = ' + driverId + ' was not found!');
    }

    validateDriver(newDriver);

    newDriver.id = driverId;
    DRIVERS[index] = newDriver;
    return newDriver;
}
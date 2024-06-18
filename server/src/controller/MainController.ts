import { Router } from "express";
import { addDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver } from "../service/MainService";
import { Driver } from "../domain/Driver";
import { DriverNotFoundError, InvalidDriverError } from "../utils/Errors";

export const mainRouter = Router();

mainRouter.get('/drivers', (req, res) => {
    const drivers = getAllDrivers();
    res.send(drivers);
});

mainRouter.get('/drivers/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const driver = getDriverById(id);
        res.send(driver);
    }
    catch (err) {
        res.status(404).send((err as DriverNotFoundError).message);
    }
});

mainRouter.post('/drivers', (req, res) => {

    if (!req.body.name) {
        res.status(400).send('Name is required!');
        return;
    }

    if (!req.body.team) {
        res.status(400).send('Team is required!');
        return;
    }

    if (!req.body.points) {
        res.status(400).send('Points is required!');
        return;
    }

    const driver: Driver = {
        name: req.body.name,
        team: req.body.team,
        points: parseFloat(req.body.points),
    };

    try {
        const addedDriver = addDriver(driver);
        res.send(addedDriver);
    }
    catch (err) {
        res.status(400).send((err as InvalidDriverError).message);
    }
});

mainRouter.delete('/drivers/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const driver = deleteDriver(id);
        res.send(driver);
    }
    catch (err) {
        res.status(404).send((err as DriverNotFoundError).message);
    }
});

mainRouter.put('/drivers/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const newDriver: Driver = {
        name: req.body.name,
        team: req.body.team,
        points: parseFloat(req.body.points),
    }

    try {
        const driver = updateDriver(id, newDriver);
        res.send(driver);
    }
    catch (err) {
        if (err instanceof DriverNotFoundError) {
            res.status(404).send(err.message);
        }
        else {
            res.status(400).send((err as InvalidDriverError).message);
        }
    }
});
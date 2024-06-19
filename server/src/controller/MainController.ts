import { Router } from "express";
import { addDriver, deleteDriver, getAllDrivers, getDriverById, getDriverPage, getPointsChartData, updateDriver } from "../service/MainService";
import { Driver } from "../domain/Driver";
import { DriverNotFoundError, InvalidDriverError } from "../utils/Errors";
import { Decimal } from "@prisma/client/runtime/library";

export const mainRouter = Router();

mainRouter.get('/drivers', async (req, res) => {
    const drivers = await getAllDrivers();
    res.send(drivers);
});

mainRouter.get('/drivers/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const driver = await getDriverById(id);
        res.send(driver);
    }
    catch (err) {
        res.status(404).send((err as DriverNotFoundError).message);
    }
});

mainRouter.post('/drivers', async (req, res) => {

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
        points: new Decimal(req.body.points),
    };

    try {
        const addedDriver = await addDriver(driver);
        res.send(addedDriver);
    }
    catch (err) {
        res.status(400).send((err as InvalidDriverError).message);
    }
});

mainRouter.delete('/drivers/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const driver = await deleteDriver(id);
        res.send(driver);
    }
    catch (err) {
        res.status(404).send((err as DriverNotFoundError).message);
    }
});

mainRouter.put('/drivers/:id', async (req, res) => {
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

    const id = parseInt(req.params.id);

    const newDriver: Driver = {
        name: req.body.name,
        team: req.body.team,
        points: new Decimal(req.body.points),
    }

    try {
        const driver = await updateDriver(id, newDriver);
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

mainRouter.get('/points-chart-data', async (req, res) => {
    const pointsChartData = await getPointsChartData();
    res.send(pointsChartData);
});

mainRouter.get('/driver-page/:pageNumber', async (req, res) => {
    const pageNumber = parseInt(req.params.pageNumber);
    let pageSize = Number(req.query.pageSize);

    if (isNaN(pageSize)) {
        pageSize = 3;
    }

    const drivers = await getDriverPage(pageNumber, pageSize);
    res.send(drivers);
});
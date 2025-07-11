import express from 'express';
import { getCarById, getCarDetials } from '../controllers/carController';


const carRouter = express.Router();

carRouter.get('/cars', getCarDetials)
carRouter.get('/cars/:id', getCarById)
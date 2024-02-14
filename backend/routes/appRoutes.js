import express from "express";
import { create, getAll, getById, update, remove } from "../controllers/appController.js";
import { checkToken } from "../middleware/auth.middleware.js";

const appRouter = express.Router();

// CREATE APPLICATION
appRouter.post("/application", checkToken, create);

// REQUEST ALL APPLICATION
appRouter.get('/applications', checkToken, getAll);

// REQUEST APPLICATION BY ID
appRouter.get('/applications/:appId', checkToken, getById);

// UPDATE APPLICATION
appRouter.put('/applications/:appId', checkToken, update);

// DELETE APPLICATION
 
appRouter.delete('/application/:appId', checkToken, remove);



export { appRouter }
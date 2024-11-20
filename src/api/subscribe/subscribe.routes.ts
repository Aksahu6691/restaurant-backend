import express from "express";
import { subscribeUser } from "./subscribe.controller";

const subscribeRoutes = express.Router();

subscribeRoutes.post('/', subscribeUser)

export default subscribeRoutes;
import express from "express";
import { FakeDatagenerator } from "../controller/ActionsController.js";

const router = express.Router();

router .get("/fake-data", FakeDatagenerator);

export default router;
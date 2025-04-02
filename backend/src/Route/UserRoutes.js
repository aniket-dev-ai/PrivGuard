import express from "express";
import { createUser, loginuser } from "../controller/UserController.js";

const router = express.Router();

router.post("/create", createUser);

router.post("/login", loginuser);

export default router;

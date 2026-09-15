import { Router } from "express";
import * as usersService from "./users.service";

export const usersRouter = Router();

usersRouter.get("/users", async (_req, res) => {
  const users = await usersService.listUsers();
  res.json(users);
});

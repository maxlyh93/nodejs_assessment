import express from "express";
import {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
  getPosts,
} from "../controllers/UserController.js";

import { searching } from "../controllers/searchController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/posts", getPosts);
router.get("/users/:id", getUserById);
router.post("/users", saveUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/search", searching);

export default router;

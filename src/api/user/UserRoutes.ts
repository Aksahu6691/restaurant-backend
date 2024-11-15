import express from 'express';
import { addUser, deleteUser, getUser, updateUser } from './UserController';

const userRoutes = express.Router();

userRoutes
    .post('/add', addUser)
    .get('/get/:id?', getUser)
    .patch('/get/id', updateUser)
    .delete('/delete/id', deleteUser)

export default userRoutes;
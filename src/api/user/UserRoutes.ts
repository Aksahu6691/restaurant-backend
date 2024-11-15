import express from 'express';
import { addUser, deleteUser, getUser, updateUser } from './UserController';
import { protect } from '../../middleware/authentication';
import { userLogin } from './UserCreadential';

const userRoutes = express.Router();

userRoutes
    .post('/add', addUser)
    .get('/get/:id?', protect, getUser)
    .patch('/get/id', protect, updateUser)
    .delete('/delete/id', protect, deleteUser)
    .post('/login', userLogin)

export default userRoutes;
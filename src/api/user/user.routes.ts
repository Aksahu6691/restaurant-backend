import express from 'express';
import { protect } from '../../middleware/authentication';
import { addUser, deleteUser, getUser, updateUser } from './user.controller';
import { userLogin } from './user.creadential';
import checkAuth from '../../middleware/checkAuth';

const userRoutes = express.Router();

userRoutes
    .post('/add', addUser)
    .get('/get/:id?', protect, getUser)
    .patch('/update/id', protect, updateUser)
    .delete('/delete/id', protect, deleteUser)
    .post('/login', userLogin)

export default userRoutes;
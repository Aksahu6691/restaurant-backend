import express from 'express';
import { protect } from '../../middleware/authentication';
import { addUser, deleteUser, getUser, updateUser } from './user.controller';
import { userLogin } from './user.creadential';

const userRoutes = express.Router();

userRoutes
    .post('/add', addUser)
    .get('/get/:id?', getUser)
    .patch('/update/id', updateUser)
    .delete('/delete/id', deleteUser)
    .post('/login', userLogin)

export default userRoutes;
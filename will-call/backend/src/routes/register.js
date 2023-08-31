import express from 'express';
const registerRoute = express.Router();

import { handleNewUser } from '../modules/user.js';

registerRoute.post('/', handleNewUser);

export default registerRoute;

import express from 'express';
const loginRoute = express.Router();

import { handleLogin } from '../modules/user.js';

loginRoute.post('/', handleLogin);

export default loginRoute;
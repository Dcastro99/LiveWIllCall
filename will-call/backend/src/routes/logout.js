import express from 'express';
const logoutRoute = express.Router();

import { handleLogout } from '../modules/user.js';

logoutRoute.get('/', handleLogout);

export default logoutRoute;
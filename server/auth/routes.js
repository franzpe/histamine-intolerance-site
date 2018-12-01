import { Router } from 'express';

import { verifyUser } from './auth';
import * as controller from './controller';

const router = Router();

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signin);

export default router;

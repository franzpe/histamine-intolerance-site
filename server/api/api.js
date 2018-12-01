import { Router } from 'express';

import userRoutes from './user/userRoutes';

const router = Router();

// api router will mount other routers
// for all our resources
router.use('/users', userRoutes);

export default router;

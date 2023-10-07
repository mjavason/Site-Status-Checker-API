import express from 'express';
const router = express.Router();
import siteRouter from './site.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/site', siteRouter);

export default router;

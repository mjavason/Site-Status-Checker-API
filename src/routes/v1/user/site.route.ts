import { Router } from 'express';
const router = Router();
import {
  processRequestBody,
  processRequestParams,
  processRequestQuery,
} from 'zod-express-middleware';
import { siteController } from '../../../controllers';
import { siteValidation } from '../../../validation';

router.get('/search', processRequestQuery(siteValidation.find.query), siteController.find);

router.get('/count', processRequestQuery(siteValidation.find.query), siteController.getCount);

router.get('/', siteController.getAll);

router.get('/:pagination', siteController.getAll);

router.post('/', processRequestBody(siteValidation.create.body), siteController.create);

router.patch('/:id', processRequestBody(siteValidation.update.body), siteController.update);

router.delete('/:id', processRequestParams(siteValidation.delete.params), siteController.delete);

export default router;

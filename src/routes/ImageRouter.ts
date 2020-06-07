import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import imageService from '../service/ImageProcessService';
import Logger from '../modules/logger';

const route = Router();

export default (app: Router) => {
  app.use('/image', route);
  
  route.post('/:menu', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageServiceInstance = Container.get(imageService);
      const image = await imageServiceInstance.generate(req.body);

      res.status(200);
      res.json({
        code: res.statusCode,
        message: 'OK',
        data: image
      });
    } catch (e) {
      Logger.error(e);

      res.status(404);
      res.json({
        code: 404,
        message: 'ERROR',
        data: null
      });
    }
  });

};
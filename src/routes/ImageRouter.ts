import { Router, Request, Response, NextFunction } from 'express';
import Logger from '../modules/logger';

const route = Router();

export default (app: Router) => {
  app.use('/image', route);
  
  route.post('/:menu', (req: Request, res: Response, next: NextFunction) => {

    Logger.debug('test');
    
    res.json({
      code: res.statusCode,
      message: 'OK',
      item: null
    });
  });
};
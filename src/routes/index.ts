import { Router } from 'express';
import image from './ImageRouter';

export default () => {
  const app = Router();

  image(app);

  return app;
}
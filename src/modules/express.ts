import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from '../routes';

export default ({ app }: { app: express.Application }) => {

  // Health Check
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Nginx, Heroku 등에서 reverse proxy 를 사용할때 유용하다.
  // heroku 나 Cloudwatch logs 의 진짜 IP 를 볼 수 있다.
  app.enable('trust proxy');
  // CORS 설정
  app.use(cors());
  // PUT, DELETE 와 관련된 미들웨어
  app.use(require('method-override')());
  // req.body 의 raw 문자열을 json 으로 변환
  app.use(bodyParser.json());
  // Default API Route 설정
  app.use('/', routes());

  // 404 에러 발생 시 Error 핸들러로 전송
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    let status: number = parseInt(err.status) || 500;
    res.status(status);
    res.json({ code: res.statusCode, message: 'Error', item: null });
  });

};
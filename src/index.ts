import express from 'express';
import config from './config';
import Logger from './modules/logger';

async function startApplication () {
  const app = express();

  // modules/index.ts 의 기본값으로 변수명(expressApp) 과 값(app) 을 전달
  await require('./modules').default({ expressApp: app });

  app.listen(config.port || 3000, () => {
    Logger.info("Application Start");
  });
}

startApplication();
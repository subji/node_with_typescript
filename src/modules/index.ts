import expressModule from './express';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: any }) => {
  
  await expressModule({ app: expressApp });
  Logger.info('Express Loaded');
}
import expressModule from './express';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: any }) => {
  
  // Load Express Module
  await expressModule({ app: expressApp });
  Logger.info('Express Loaded');
}
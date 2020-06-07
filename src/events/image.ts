import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import puppeteer from 'puppeteer';

import Logger from '../modules/logger';
import events from './index';

@EventSubscriber()
export default class ImageSubscriber {

  @On(events.image.issueTransition)
  public onIssueTransition (parameter: any) {
    try {
      console.log(parameter);
      
    } catch (e) {
      throw e;
    }
  }
}
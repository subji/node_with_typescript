import { Service, Container, Inject } from 'typedi';
import puppeteer from 'puppeteer';

import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import Logger from '../modules/logger';
import events from '../events/index';

import IssueTransitionService from './IssueTransitionService';
import IssueAssociationService from './IssueAssociationService';

interface analysisMap {
  [key: string]: any
};

@Service()
export default class ImageProcessService {

  issueTransition: IssueTransitionService;
  issueAssociation: IssueAssociationService;

  constructor(
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    issueTransition: IssueTransitionService,
    issueAssociation: IssueAssociationService,
  ) {
    this.issueTransition = issueTransition;
    this.issueAssociation = issueAssociation;
  }
  
  public async generate (parameter: any): Promise<string> {
    let image = '';

    try {
      console.log(parameter);
      
      const func: analysisMap = {
        'issue-transition-image': IssueTransitionService.make,
        'issue-association-image': IssueAssociationService.make,
      }
      
      image = await func[parameter.analysis](parameter);
    } catch (e) {
      throw e;
    }

    return image;
  }

}

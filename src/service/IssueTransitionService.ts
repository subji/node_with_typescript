
import puppeteer, { ElementHandle } from 'puppeteer';
import Logger from '../modules/logger';

export default class IssueTransitionService {

  public static async make (parameter: any): Promise<any> {
    async function clear(page: any, selector: any) {
      await page.evaluate((selector: any) => {
        document.querySelector(selector).value = '';
      }, selector);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('http://localhost:8093/analysis/issue');
    await page.setViewport({ width: 1600, height: 800, deviceScaleFactor: 3 });

    // 분석 기간 설정
    await page.evaluate((parameter) => {
      let endDate = parameter.endDate;
      let startDate = parameter.startDate;
      endDate = endDate.substring(0, 4) + '.' + endDate.substring(4, 6) + '.' + endDate.substring(6);
      startDate = startDate.substring(0, 4) + '.' + startDate.substring(4, 6) + '.' + startDate.substring(6);

      // HTMLInputElement 로 타입을 지정해줘야 Null 에러가 발생하지 않는다.
      const endDateElement: HTMLInputElement = document.querySelector('#endDate') as HTMLInputElement;
      const startDateElement: HTMLInputElement = document.querySelector('#startDate') as HTMLInputElement;
      const searchKeywordElement: HTMLInputElement = document.querySelector('#searchKeyword') as HTMLInputElement;
      // 분석 종료 날짜 
      endDateElement.value = endDate;
      // 분석 시작 날짜
      startDateElement.value = startDate;
    }, parameter);
    
    await clear(page, '#searchKeyword');
    const searchInput: ElementHandle<HTMLInputElement> = await page.$('#searchKeyword') as ElementHandle<HTMLInputElement>;
    searchInput.type(parameter.searchKeyword);
    searchInput.press('Enter');

    // 분석 주기 선택
    await page.evaluate((parameter) => {
      const period: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="issue_transition_period"]') as NodeListOf<HTMLInputElement>;

      period.forEach((elem, index) => {
        elem.checked = false;
      });

      period.forEach((elem, index) => {
        elem.checked = elem.value !== parameter.period ? false : true;
      });
    }, parameter);
    
    // 분석 채널 선택
    await page.evaluate((parameter) => {
      const channel: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="issue_transition_channel"]') as NodeListOf<HTMLInputElement>;

      channel.forEach((elem, index) => {
        elem.checked = false;
      });

      channel.forEach((elem, index) => {
        elem.checked = parameter.channel.indexOf(elem.value) > -1 ? true : false;
      });
    }, parameter);

    // 로딩 팝업이 종료될때까지 대기
    await page.waitForSelector('.layerMaskBackground-temp', { hidden: true });
    await page.waitForSelector('#wait_pop', { hidden: true });
    // 언급량 추이 그래프 표시될때까지 대기
    await page.waitForSelector('#issueAnalysisTransition', { visible: true });

    // 언급량 추이 그래프가 표시되었을때 
    const target = await page.$('div.' + parameter.analysis) as any;

    target!.evaluate(() => {
      // remove element from the DOM
      document
        .querySelectorAll('[data-html2canvas-ignore="true"]')
        .forEach(function (elem) {
          elem.parentElement!.removeChild(elem);
        });
    });

    // High Quality Image
    const image = await target.screenshot({ 
      type: 'png',
      width: 1600,
      height: 800,
      encoding: 'base64' 
    });

    await browser.close();

    return image;
  };

};
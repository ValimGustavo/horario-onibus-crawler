import { SELECTORS } from './selectors-enum';
import puppeteer, { Puppeteer } from 'puppeteer';

async function getSchedule(lineBus: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://painel.mobilibus.com/bus2you/home?p=1b5ym', {
    waitUntil: 'networkidle2',
  });

  await page.click(SELECTORS.INPUT_COMBOBOX);

  const id = await getElementId(lineBus, page)
  await page.click(`#${id}`);



  // await browser.close();
}

getSchedule('12')


async function getPositionLine(lineBus: string, page: puppeteer.Page):Promise<number | undefined> {
  const position = await page.$$eval(SELECTORS.OPTIONS_COMBOBOX_LINE_BUS_NUMBER, (elements, lineBus: any) => {
    console.log(lineBus)
    let positionElement = 0;
    for (const element of elements) {
      if (element.textContent?.trim().toLowerCase() === lineBus.trim().toLocaleLowerCase()) {
        console.log(element);
        return positionElement;
      }
      positionElement++;
    }
  }, lineBus);
  
  return position;
}


async function getElementId(lineBus: string, page: puppeteer.Page) {
  console.log(lineBus)
  const position = await getPositionLine(lineBus, page);

  if (position === undefined) {
    throw new Error('line bus not found');
  }

  const id = await page.$$eval(SELECTORS.OPTIONS_COMBOBOX_ELEMENT, (elements, position: any) => {
    return elements[position].id
  }, position);

  return id;
}
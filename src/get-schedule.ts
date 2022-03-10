import { SELECTORS } from './selectors-enum';
import puppeteer, { ElementHandle, Puppeteer } from 'puppeteer';
import { Itinerary } from './interface/itinenary.interface';

async function getSchedule(lineBus: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://painel.mobilibus.com/bus2you/home?p=1b5ym', {
    waitUntil: 'networkidle2',
  });

  await page.click(SELECTORS.INPUT_COMBOBOX);

  const id = await getElementId(lineBus, page)
  await page.click(`#${id}`);


  await page.waitForSelector(SELECTORS.ITINERARIES_CONTAINER);

  const list = await getItineraries(lineBus, page)

  console.log(JSON.stringify(list, null, 2))

  // await browser.close();
}

getSchedule('12')


async function getPositionLine(lineBus: string, page: puppeteer.Page): Promise<number | undefined> {

  await page.waitForSelector(SELECTORS.OPTIONS_COMBOBOX_LINE_BUS_NUMBER)

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

  console.log(id)
  return id;
}

async function getStartPoint(element: ElementHandle) {
  const startPoint = await element.$eval(SELECTORS.LINE_BUS_START_POINT, (elem) => {
    return elem.textContent
  });

  if (startPoint === undefined || startPoint === null) {
    throw new Error('start point not found');
  }

  return startPoint

}

async function getDailyHours(element: ElementHandle) {
  return await element.$$(SELECTORS.DAILY_HOURS);
}

function getDailyWeek(element: ElementHandle) {
  const dailyWeek = element.$eval(SELECTORS.DAILY_WEEK, (element) => {
    return element.innerHTML;
  })

  if (dailyWeek === undefined || dailyWeek === null) {
    throw new Error('daily week not found')
  }

  return dailyWeek;
}

async function getHours(dailyHour: ElementHandle) {
  return await dailyHour.$$eval(SELECTORS.DAILY_HOURS_INFO, elements => {
    return elements.map(element => {
      return (<HTMLAnchorElement>element).text?.trim().split(' ')[0]
    })
  })
}

async function getItineraries(lineBus: string, page: puppeteer.Page) {

  const containers = await page.$$(SELECTORS.ITINERARIES_CONTAINER);

  console.log('containers', containers)
  const itineraries: Itinerary[] = [];

  for (const container of containers) {
    itineraries.push(await extractItineraryToContainer(container))
  }

  return {
    lineBus,
    itineraries
  }
}

async function extractItineraryToContainer(container: ElementHandle): Promise<Itinerary> {
  const itinerary: Itinerary = {
    startPoint: '',
    dailyHours: []
  };


  itinerary.startPoint = await getStartPoint(container);
  const dailyHours = await getDailyHours(container);
  for (const dailyHour of dailyHours) {
    itinerary.dailyHours.push({
      dailyWeek: await getDailyWeek(dailyHour),
      hours: await getHours(dailyHour)
    })
  }


  return itinerary;
}
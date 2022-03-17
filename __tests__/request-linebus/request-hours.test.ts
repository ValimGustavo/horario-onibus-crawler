import { LineBus } from './../../src/interface/line-bus.interface';
import { ItineraryRepository } from './../../src/repository/itinerary.repository';
import { ItineraryPersistanceInMemory } from './../../src/persistance/itinerary-persistance-memory.repository';
import { ItineraryService } from "../../src/services/Itinerary.service";

describe('get next hour', () => {
  test('get hour 05:27 to lineBus 123456 in start point A', async () => {
    const hour = new Date('2022-03-12T05:26:00');
    const dailyWeek = 'DIAS ÚTEIS';
    const startPoint = "Saída PONTO A";

    const lineBusTest = await getLineBus('123456') as LineBus

    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave({ hour, dailyWeek });

    const nextHour = itineraryService.nextHour(startPoint, timer)

    expect(nextHour).toBe('05:27')
  })

  test('get hour not found to lineBus 123456 in start point A', async () => {
    const hour = new Date('2022-03-12T23:59:00');
    const dailyWeek = 'DIAS ÚTEIS';
    const startPoint = "Saída PONTO A";


    const lineBusTest = await getLineBus('123456') as LineBus


    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave({ hour, dailyWeek });
    const itinerary = itineraryService.getItinerary(startPoint);

    expect(() => itineraryService.nextHour(startPoint, timer)).toThrowError('hour not found to itinerary');
  })

  test('get itinerary not found to lineBus 123456 because start point C not exist', async () => {
    const startPoint = "Saída PONTO C";
    const lineBusTest = await getLineBus('123456')
    const itineraryService = new ItineraryService(lineBusTest);
    expect(() => itineraryService.getItinerary(startPoint)).toThrowError('itinerary Saída PONTO C to lineBus 123456 not found');
  })


  test('send hour and daily null', async () => {

    const date = new Date();
    const expectDate = {
      hour: date.getHours(),
      minutes: date.getMinutes(),
    }

    const lineBusTest = await getLineBus('123456') as LineBus

    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave();

    const timerExpect = {
      hour: timer.hour.getHours(),
      minutes: timer.hour.getMinutes()
    }

    expect(expectDate).toEqual(timerExpect);
  })

  test('get start points to lineBus 123456', async () => {
    const lineBusTest = await getLineBus('123456') as LineBus

    const itineraryService = new ItineraryService(lineBusTest);
    const startPoints = itineraryService.getStartPoints();

    expect(startPoints[0]).toEqual("Saída PONTO A");
    expect(startPoints[1]).toEqual("Saída PONTO B");
  })
})


async function getLineBus(lineBus:string):Promise<LineBus>{
  const itineraryInMemory = new ItineraryPersistanceInMemory();
  const itineraryRepository = new ItineraryRepository(itineraryInMemory);
  return await itineraryRepository.findLineBus('123456') as LineBus
}
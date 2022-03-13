import { Timer } from './../interface/timer.interface';
import { Itinerary } from './../interface/itinenary.interface';
import { LineBus } from './../interface/line-bus.interface';

export class ItineraryService {
  lineBusData: LineBus;
  constructor(lineBusData: LineBus) {
    this.lineBusData = lineBusData;
  }

  getDailyWeek(day: number) {
    switch (day) {
      case 0: return 'DOMINGO'
      case 6: return 'SABADO'
      default: return 'DIAS ÚTEIS'
    }
  }

  getItineraries(startPointSearch: string) {
    const [itineraryA, itineraryB] = this.lineBusData.itineraries;

    if (itineraryA.startPoint === startPointSearch) {
      return itineraryA
    }

    if (itineraryB.startPoint === startPointSearch) {
      return itineraryB
    }

    throw new Error(`itinerary ${startPointSearch} to lineBus ${this.lineBusData.lineBus} not found`);
  }

  setHoursIfNotHave(timer: Timer) {
    let { dailyHour, hour } = timer;
    if (!hour) {
      hour = new Date();
    }

    if (!dailyHour) {
      dailyHour = this.getDailyWeek(hour.getDay())
    }

    return {dailyHour, hour};
  }

  nextHour(itinerary:Itinerary, timer:Timer){

  }
}
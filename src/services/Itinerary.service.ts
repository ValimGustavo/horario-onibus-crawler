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

  getItinerary(startPointSearch: string) {
    const [itineraryA, itineraryB] = this.lineBusData.itineraries;

    if (itineraryA.startPoint === startPointSearch) {
      return itineraryA
    }

    if (itineraryB.startPoint === startPointSearch) {
      return itineraryB
    }

    throw new Error(`itinerary ${startPointSearch} to lineBus ${this.lineBusData.lineBus} not found`);
  }

  setHoursIfNotHave(timer?: Timer) {

    if(timer !== undefined){
      return timer;
    }
    let dailyHour, hour;
    if (!hour) {
      hour = new Date();
    }

    if (dailyHour === null || dailyHour === undefined) {
      dailyHour = this.getDailyWeek(hour.getDay())
    }

    return {dailyHour, hour};
  }

  nextHour(itinerary:Itinerary, timer:Timer){
    const itineraryByDay = itinerary.dailyHours.find(itineraryByDay => {
      if(itineraryByDay.dailyWeek === timer.dailyHour){
        return itineraryByDay;
      }
    })

    if(itineraryByDay === undefined){
      throw new Error(`itinerary ${itinerary.startPoint} to ${timer.dailyHour} not found`)
    }

    const hourSearch = this.formatHour(timer.hour)


    for(const hour of itineraryByDay.hours){
      if(hourSearch <= hour){
        return hour
      }
    }

    throw new Error('hour not found to itinerary')
  }

  //TODO: create new service to function
  formatHour(hourDateFormat:Date){
    const hour = hourDateFormat.getHours().toString().padStart(2,'0');
    const minutes = hourDateFormat.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`
  }
}
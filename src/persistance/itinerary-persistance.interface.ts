import { Itinerary } from '../interface/itinerary.interface';
import { LineBus } from '../interface/line-bus.interface';

export interface ItineraryPersistance {
    findLineBus(lineBus: string):Promise<LineBus | undefined>
}
import { LineBus } from './../interface/line-bus.interface';
import { ItineraryPersistance } from '../persistance/itinerary-persistance.interface';

export class ItineraryRepository implements ItineraryPersistance {
    private itineraryRepository
    constructor(itineraryPersistance: ItineraryPersistance){
        this.itineraryRepository = itineraryPersistance;
    }

    async findLineBus(lineBus: string): Promise<LineBus | undefined> {
        return await this.itineraryRepository.findLineBus(lineBus)
    }
}
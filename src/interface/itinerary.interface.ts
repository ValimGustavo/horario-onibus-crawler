export interface Itinerary{
    startPoint: string,
    dailyHours: {
      dailyWeek: string,
      hours: string[]
    }[]
  }
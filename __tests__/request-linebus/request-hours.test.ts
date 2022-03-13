import { ItineraryService } from "../../src/services/Itinerary.service";

describe('get next hour', () => {
  test('get hour 05:27 to lineBus 123456 in start point A', () => {
    const hour = new Date('2022-03-12T05:26:00');
    const dailyHour = 'DIAS ÚTEIS';
    const startPoint = "Saída PONTO A";


    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave({ hour, dailyHour });
    const itinerary = itineraryService.getItinerary(startPoint);

    const nextHour = itineraryService.nextHour(itinerary, timer)

    expect(nextHour).toBe('05:27')
  })

  test('get hour not found to lineBus 123456 in start point A', () => {
    const hour = new Date('2022-03-12T23:59:00');
    const dailyHour = 'DIAS ÚTEIS';
    const startPoint = "Saída PONTO A";


    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave({ hour, dailyHour });
    const itinerary = itineraryService.getItinerary(startPoint);

    expect(() => itineraryService.nextHour(itinerary, timer)).toThrowError('hour not found to itinerary');
  })

  test('get itineray not found to lineBus 123456 because start point C not exist', () => {
    const startPoint = "Saída PONTO C";
    const itineraryService = new ItineraryService(lineBusTest);
    expect(() => itineraryService.getItinerary(startPoint)).toThrowError('itinerary Saída PONTO C to lineBus 123456 not found');
  })


  test('send hour and daily null', () => {

    const date = new Date();
    const expectDate = {
      hour: date.getHours(),
      minutes: date.getMinutes(),
    }
    const itineraryService = new ItineraryService(lineBusTest);
    const timer = itineraryService.setHoursIfNotHave();

    const timerExpect = {
      hour: timer.hour.getHours(),
      minutes: timer.hour.getMinutes()
    }

    expect(expectDate).toEqual(timerExpect);
  })
})


const lineBusTest = {
  "lineBus": "123456",
  "itineraries": [
    {
      "startPoint": "Saída PONTO A",
      "dailyHours": [
        {
          "dailyWeek": "DIAS ÚTEIS",
          "hours": [
            "05:05",
            "05:27",
            "05:45",
            "06:07",
            "06:27",
            "06:47",
            "07:07",
            "07:27",
            "07:47",
            "08:07",
            "08:27",
            "08:52",
            "09:32",
            "10:10",
            "10:45",
            "11:42",
            "12:27",
            "13:12",
            "13:45",
            "14:22",
            "14:57",
            "15:20",
            "15:32",
            "16:07",
            "16:20",
            "16:47",
            "17:17",
            "17:37",
            "18:02",
            "18:27",
            "18:40",
            "19:07",
            "19:42",
            "20:20",
            "21:00",
            "22:00",
            "22:50"
          ]
        },
        {
          "dailyWeek": "SABADO",
          "hours": [
            "05:10",
            "06:00",
            "06:28",
            "06:56",
            "07:24",
            "07:52",
            "08:20",
            "08:55",
            "09:30",
            "10:05",
            "10:40",
            "11:40",
            "12:15",
            "12:50",
            "13:25",
            "14:00",
            "14:17",
            "15:45",
            "16:32",
            "18:23",
            "19:28",
            "21:43",
            "22:50"
          ]
        },
        {
          "dailyWeek": "DOMINGO",
          "hours": [
            "05:00",
            "06:05",
            "07:10",
            "08:20",
            "09:30",
            "11:40",
            "12:50",
            "14:00",
            "15:10",
            "16:20",
            "17:30",
            "18:40",
            "19:50",
            "22:00"
          ]
        }
      ]
    },
    {
      "startPoint": "Saída PONTO B",
      "dailyHours": [
        {
          "dailyWeek": "DIAS ÚTEIS MARÇO",
          "hours": [
            "05:10",
            "05:25",
            "05:40",
            "05:57",
            "06:17",
            "06:37",
            "06:57",
            "07:17",
            "07:37",
            "08:17",
            "08:55",
            "09:35",
            "10:32",
            "11:17",
            "11:55",
            "12:30",
            "13:12",
            "13:47",
            "14:22",
            "14:57",
            "15:32",
            "16:07",
            "16:27",
            "16:52",
            "17:17",
            "17:30",
            "17:57",
            "18:17",
            "18:47",
            "19:12",
            "19:52",
            "20:37",
            "21:17",
            "22:12",
            "23:00"
          ]
        },
        {
          "dailyWeek": "SABADO",
          "hours": [
            "05:00",
            "05:18",
            "05:46",
            "06:14",
            "06:42",
            "07:10",
            "07:45",
            "08:20",
            "08:55",
            "09:30",
            "10:30",
            "11:05",
            "11:40",
            "12:15",
            "12:50",
            "13:07",
            "13:25",
            "14:00",
            "14:35",
            "15:21",
            "17:13",
            "18:18",
            "20:33",
            "21:40",
            "22:50"
          ]
        },
        {
          "dailyWeek": "DOMINGO",
          "hours": [
            "05:00",
            "06:05",
            "07:10",
            "08:20",
            "10:30",
            "11:40",
            "12:50",
            "14:00",
            "15:10",
            "16:20",
            "17:30",
            "18:40",
            "20:50",
            "22:00"
          ]
        }
      ]
    }
  ]
}
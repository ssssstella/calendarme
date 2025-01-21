export const times = [
  {
    id: 0,
    time: '00:00',
  },
  {
    id: 1,
    time: '00:30',
  },
  {
    id: 2,
    time: '01:00',
  },
  {
    id: 3,
    time: '01:30',
  },
  {
    id: 4,
    time: '02:00',
  },
  {
    id: 5,
    time: '02:30',
  },
  {
    id: 6,
    time: '03:00',
  },
  {
    id: 7,
    time: '03:30',
  },
  {
    id: 8,
    time: '04:00',
  },
  {
    id: 9,
    time: '04:30',
  },
  {
    id: 10,
    time: '05:00',
  },
  {
    id: 11,
    time: '05:30',
  },
  {
    id: 12,
    time: '06:00',
  },
  {
    id: 13,
    time: '06:30',
  },
  {
    id: 14,
    time: '07:00',
  },
  {
    id: 15,
    time: '07:30',
  },
  {
    id: 16,
    time: '08:00',
  },
  {
    id: 17,
    time: '08:30',
  },
  {
    id: 18,
    time: '09:00',
  },
  {
    id: 19,
    time: '09:30',
  },
  {
    id: 20,
    time: '10:00',
  },
  {
    id: 21,
    time: '10:30',
  },
  {
    id: 22,
    time: '11:00',
  },
  {
    id: 23,
    time: '11:30',
  },
  {
    id: 24,
    time: '12:00',
  },
  {
    id: 25,
    time: '12:30',
  },
  {
    id: 26,
    time: '13:00',
  },
  {
    id: 27,
    time: '13:30',
  },
  {
    id: 28,
    time: '14:00',
  },
  {
    id: 29,
    time: '14:30',
  },
  {
    id: 30,
    time: '15:00',
  },
  {
    id: 31,
    time: '15:30',
  },
  {
    id: 32,
    time: '16:00',
  },
  {
    id: 33,
    time: '16:30',
  },
  {
    id: 34,
    time: '17:00',
  },
  {
    id: 35,
    time: '17:30',
  },
  {
    id: 36,
    time: '18:00',
  },
  {
    id: 37,
    time: '18:30',
  },
  {
    id: 38,
    time: '19:00',
  },
  {
    id: 39,
    time: '19:30',
  },
  {
    id: 40,
    time: '20:00',
  },
  {
    id: 41,
    time: '20:30',
  },
  {
    id: 42,
    time: '21:00',
  },
  {
    id: 43,
    time: '21:30',
  },
  {
    id: 44,
    time: '22:00',
  },
  {
    id: 45,
    time: '22:30',
  },
  {
    id: 46,
    time: '23:00',
  },
  {
    id: 47,
    time: '23:30',
  },
]

export function getTimeZone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const longOffsetFormatter = new Intl.DateTimeFormat("en-US", {timeZone: timezone, timeZoneName: "longOffset"});
  const longOffsetString = longOffsetFormatter.format(new Date()); 
  const gmtOffset = longOffsetString.split('GMT')[1];

  return {timezone, gmtOffset};
}
import { CXData } from '../types/cx'

export const CXDummy: CXData = {
  user: { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com' },
  quickActions: [
    {id:'a1',title:'Book Appointment',subtitle:'New booking'},
    {id:'a2',title:'Upload Docs',subtitle:'Add documents'},
    {id:'a3',title:'Payments',subtitle:'Pay bills'},
    {id:'a4',title:'View Records',subtitle:'My history'},
  ],
  currentToken: { code: 'PR-126', service: 'Passport Renewal', branch: 'DTC Center', position: '45 of 128', wait: '40 mins', status: 'Waiting' },
  upcoming: { day: 'Mon', date: '20', service: 'Driving License', branch: 'City Center', time: '02:00 PM', status: 'Confirmed' },
  notifications: [
    {id:'n1',title:'Payment received',subtitle:'₹2,500 received',time:'5m ago'},
    {id:'n2',title:'Appointment reminder',subtitle:'Tomorrow at 10:30 AM',time:'1h ago'},
  ],
  bookings: [
    {id:'BK-2024-00123',service:'Passport Renewal',date:'20 May 2024, 10:30 AM',status:'Confirmed'},
    {id:'BK-2024-00124',service:'Driving License',date:'22 May 2024, 02:00 PM',status:'Scheduled'},
    {id:'BK-2024-00125',service:'Trade License',date:'25 May 2024, 11:00 AM',status:'Pending'},
  ],
  services: [
    {id:'s1',name:'Passport Renewal',count:3,next:'20 May'},
    {id:'s2',name:'Driving License',count:1,next:'22 May'},
  ]
}

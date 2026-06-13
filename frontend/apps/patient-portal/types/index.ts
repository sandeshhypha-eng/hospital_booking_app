export type Booking = {
  id: string
  doctorId: string
  doctorName: string
  date: string
  slot: string
  status: 'Pending' | 'Confirmed' | 'Cancelled'
}

export type Slot = { id: string; time: string; available: boolean }

export type PatientProfile = { id: string; name: string; phone: string; email?: string }

export type NotificationRecord = { id: string; channel: string; body: string; date: string }

export * from './types'

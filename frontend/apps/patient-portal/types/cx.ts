export interface User { id: string; name: string; email?: string }
export interface QuickAction { id: string; title: string; subtitle?: string }
export interface Token { code: string; service: string; branch?: string; position?: string; wait?: string; status?: string }
export interface Appointment { day?: string; date?: string; service: string; branch?: string; time?: string; status?: string }
export interface NotificationItem { id: string; title: string; subtitle?: string; time?: string }
export interface Booking { id: string; service: string; date: string; status: string }
export interface ServiceItem { id: string; name: string; count?: number; next?: string }

export interface CXData {
  user: User
  quickActions: QuickAction[]
  currentToken: Token
  upcoming: Appointment
  notifications: NotificationItem[]
  bookings: Booking[]
  services: ServiceItem[]
}

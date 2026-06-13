"use client"
import React from 'react'
import Sidebar from '../../components/cx/Sidebar'
import Topbar from '../../components/cx/Topbar'
import QuickActionCard from '../../components/cx/QuickActionCard'
import TokenCard from '../../components/cx/TokenCard'
import AppointmentCard from '../../components/cx/AppointmentCard'
import NotificationsList from '../../components/cx/NotificationsList'
import BookingsTable from '../../components/cx/BookingsTable'
import ServicesList from '../../components/cx/ServicesList'
import MarketingCard from '../../components/cx/MarketingCard'
import SupportSection from '../../components/cx/SupportSection'
import { CXDummy } from '../../lib/cx-data'

export default function Page(){
  const data = CXDummy
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex">
        <aside className="w-72 hidden md:block">
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Topbar userName={data.user.name} />
          <main className="p-6 max-w-7xl mx-auto">
            <section className="mb-6">
              <div className="rounded-[16px] bg-white shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold">Good Morning, {data.user.name} 👋</h1>
                  <p className="text-gray-600 mt-1">How can we help you today?</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                  {data.quickActions.map(a=> (
                    <QuickActionCard key={a.id} title={a.title} subtitle={a.subtitle} />
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 space-y-6">
                <TokenCard token={data.currentToken} />
                <BookingsTable bookings={data.bookings} />
              </div>
              <aside className="space-y-6">
                <AppointmentCard appointment={data.upcoming} />
                <NotificationsList items={data.notifications} />
                <ServicesList services={data.services} />
              </aside>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <MarketingCard />
              </div>
              <div>
                <SupportSection />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}


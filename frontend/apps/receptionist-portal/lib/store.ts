import create from 'zustand'

type QueueEntry = { id: string; tokenNumber: string; patientName: string; status: string }

type Store = { queue: QueueEntry[]; setQueue: (q: QueueEntry[])=>void }

export const useQueueStore = create<Store>((set)=>({ queue: [], setQueue: (q)=>set({ queue: q }) }))

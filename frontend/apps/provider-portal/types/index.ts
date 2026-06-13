export type PatientProfile = { id:string; name:string; phone:string; email?:string }
export type FileRecord = { fileId:string; url:string; category:string }
export type ClinicalNote = { id:string; title:string; body:string; date:string }
export * from './types'

import { Degree, Role } from './enum'

export type User = {
  id: string
  phone: string
  role: Role
  avatar: string
  name: string
  address: string
  email: string
}

export type Specialty = {
  id: string
  name: string
}

export type MedicalSchool = {
  id: string
  name: string
  abbr: string
}

export type DoctorEducation = {
  degree: Degree
  year: string
  major: Specialty
  medicalSchool: MedicalSchool
}

export type DoctorSpecialty = {
  experience: number
  specialty: Specialty
}

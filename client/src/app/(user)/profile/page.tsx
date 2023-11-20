'use client'

import { useAppSelector } from '@redux/store'
import DoctorProfile from '@components/doctor/profile'
import PatientProfile from '@components/patient/profile'

export default function Profile() {
  const user = useAppSelector(state => state.user.user)

  return (
    <>
      <DoctorProfile />
    </>
  )
}

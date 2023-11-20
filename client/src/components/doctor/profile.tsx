'use client'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icon } from '@iconify/react'

import { AppDispatch, useAppSelector } from '@redux/store'
import { useDispatch } from 'react-redux'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useEffect, useState } from 'react'
import {
  getDoctorEducation,
  getDoctorSpecialty,
} from '@redux/slices/doctor-profile.slice'
import { Button } from '../ui/button'
import { EducationDialog } from './education-dialog'
import { SpecialtyDialog } from './specialty-dialog'
const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name must be at least 1 characters.',
    })
    .max(50, {
      message: 'Name must not be longer than 30 characters.',
    }),
  address: z
    .string()
    .min(1, {
      message: 'Address must be at least 1 characters.',
    })
    .max(100, {
      message: 'Address must not be longer than 100 characters.',
    }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email.',
    })
    .min(1, {
      message: 'Email must be at least 1 characters.',
    })
    .max(100, {
      message: 'Email must not be longer than 100 characters.',
    }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export default function Account() {
  const dispatch = useDispatch<AppDispatch>()
  const [openEducation, setOpenEducation] = useState(false)
  const [openSpecialty, setOpenSpecialty] = useState(false)

  const education = useAppSelector(state => state.doctorProfile.doctorEducation)
  const specialties = useAppSelector(
    state => state.doctorProfile.doctorSpecialty,
  )
  useEffect(() => {
    dispatch(getDoctorEducation())
    dispatch(getDoctorSpecialty())
  }, [])

  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center mt-3">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Specialty</CardTitle>
          <CardDescription>Update your specialty information</CardDescription>
          {specialties.length > 0
            ? specialties.map((item, index) => (
                <Card key={index} className="w-full flex">
                  <CardHeader>
                    <CardTitle>
                      Have {item.experience} years of experience in{' '}
                      {item.specialty.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))
            : 'No education information found.'}
          <SpecialtyDialog
            openSpecialty={openSpecialty}
            setOpenSpecialty={setOpenSpecialty}
          />
        </CardHeader>
      </Card>
      <Card className="w-3/4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Education</CardTitle>
            <Button
              variant={'ghost'}
              className="rounded-full"
              onClick={() => {
                setOpenEducation(true)
              }}
            >
              <Icon icon={'radix-icons:plus'} width="20"></Icon>
            </Button>
          </div>
          <CardDescription>Update your education information</CardDescription>
          <Separator />
          <div className="flex flex-col gap-4">
            {' '}
            {education.length > 0
              ? education.map((item, index) => (
                  <Card
                    key={index}
                    className="w-full flex border-none shadow-none gap-2"
                  >
                    <CardHeader>
                      <img
                        width="48"
                        src="https://media.licdn.com/dms/image/C560BAQEK6ZLIjmNY7w/company-logo_100_100/0/1630663792279/hcmut_bachkhoa_logo?e=1708560000&amp;v=beta&amp;t=kJ0wIMVVWJAvax8U9d0I_7G5t1H__YJ7TxcF3odgSO4"
                        loading="lazy"
                        height="48"
                        alt="Ho Chi Minh City University of Technology logo"
                        id="ember348"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between gap-1 pb-1">
                      <div className="font-bold">
                        Degree {item.degree}: {item.medicalSchool.name}
                      </div>
                      <CardDescription>
                        Year of graduation: {item.year}
                      </CardDescription>
                      <CardDescription>
                        Major in: {item.major.name}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))
              : 'No education information found.'}
            <EducationDialog
              openEducation={openEducation}
              setOpenEducation={setOpenEducation}
            />
          </div>
        </CardHeader>
      </Card>
    </section>
  )
}

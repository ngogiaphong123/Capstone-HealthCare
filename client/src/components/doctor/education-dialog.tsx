'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import * as z from 'zod'
import { Degree } from '@redux/slices/types/enum'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from '@lib/utils'
import { AppDispatch, useAppSelector } from '@redux/store'
import { useDispatch } from 'react-redux'
import { searchMedicalSchools } from '../../redux/slices/education.slice'

const educationFormSchema = z.object({
  medicalSchoolId: z.string().min(1, {
    message: 'Medical School must be at least 1 characters.',
  }),
  specialtyId: z.string().min(1, {
    message: 'Specialty must be at least 1 characters.',
  }),
  degree: z.nativeEnum(Degree),
  year: z.string().min(1, {
    message: 'Year must be at least 1 characters.',
  }),
})
type EducationFormValues = z.infer<typeof educationFormSchema>

export function EducationDialog({
  openEducation,
  setOpenEducation,
}: {
  openEducation: boolean
  setOpenEducation: Dispatch<SetStateAction<boolean>>
}) {
  const [searchTerm, setSearchTerm] = useState<string>('NONE')
  const dispatch = useDispatch<AppDispatch>()
  const medicalSchools = useAppSelector(state => state.education.medicalSchools)
  const specialties = useAppSelector(state => state.specialty.specialties)
  const defaultValues: EducationFormValues = {
    medicalSchoolId: '',
    specialtyId: '',
    degree: Degree.DOCTOR_OF_MEDICINE,
    year: '',
  }
  const form = useForm<EducationFormValues>({
    defaultValues,
    resolver: zodResolver(educationFormSchema),
  })
  async function onSubmit(values: EducationFormValues) {
    console.log(values)
  }
  let medicalSchoolsList: any[] = []
  if (!isEmpty(medicalSchools)) {
    medicalSchoolsList = medicalSchools.map(medicalSchool => ({
      label: medicalSchool.name,
      value: medicalSchool.id,
    }))
  }
  useEffect(() => {
    dispatch(searchMedicalSchools(searchTerm))
  }, [searchTerm])

  return (
    <Dialog open={openEducation} onOpenChange={setOpenEducation}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="medicalSchoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical School:</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalSchoolId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree:</FormLabel>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Degree</SelectLabel>
                        {Object.values(Degree).map(degree => (
                          <SelectItem key={degree} value={degree}>
                            {degree.replace(/_/g, ' ').charAt(0).toUpperCase() +
                              degree.replace(/_/g, ' ').slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { AppDispatch, useAppSelector } from '@redux/store'
import { useDispatch } from 'react-redux'
import { editProfile, uploadAvatar } from '@redux/slices/user.slice'
import { useToast } from '@components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { useState } from 'react'
import { Skeleton } from '../../../components/ui/skeleton'

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
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const user = useAppSelector(state => state.user.user)
  const dispatch = useDispatch<AppDispatch>()
  const defaultValues: AccountFormValues = {
    name: user.name,
    address: user.address,
    email: user.email,
  }
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
  async function upload(input: File | null = null) {
    try {
      setOpen(false)
      setIsUploading(true)
      const result = await dispatch(uploadAvatar(input))
      if (result.meta.requestStatus === 'rejected')
        throw new Error(result.payload)
      toast({
        title: 'Upload avatar success',
        description: 'You have uploaded your avatar successfully',
      })
      setIsUploading(false)
    } catch (err: any) {
      toast({
        title: 'Upload avatar failed',
        description: `${err.message}`,
        variant: 'destructive',
      })
      setIsUploading(false)
    }
  }
  async function onSubmit(data: AccountFormValues) {
    try {
      const result = await dispatch(editProfile(data))
      if (result.meta.requestStatus === 'rejected')
        throw new Error(result.payload)
      toast({
        title: 'Edit profile success',
        description: 'You have edited your profile successfully',
      })
    } catch (err: any) {
      toast({
        title: 'Edit profile failed',
        description: `${err.message}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <section className="w-full flex items-center justify-center mt-3">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            {' '}
            Make changes to your profile here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Avatar>
                  {isUploading ? (
                    <Skeleton className="w-[100px] rounded-full" />
                  ) : (
                    <>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </>
                  )}
                </Avatar>
              </DialogTrigger>
              <CardDescription>
                {' '}
                <DialogTrigger>
                  <b className="text-blue-800">Change profile photo</b>{' '}
                </DialogTrigger>
              </CardDescription>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Profile Photo</DialogTitle>
                </DialogHeader>
                <Button variant={'ghost'}>
                  <label className="cursor-pointer w-full h-full">
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => {
                        if (!e.target.files) return
                        upload(e.target.files[0])
                      }}
                    />
                    Upload new photo
                  </label>
                </Button>
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    upload()
                  }}
                >
                  <label className="cursor-pointer text-red-500">
                    Remove current photo
                  </label>
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the email that will be displayed on your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed on your profile
                      and in emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your address" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the address that will be displayed on your profile
                      and in emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}

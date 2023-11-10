'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { login } from '@redux/slices/auth.slice'
import { useToast } from '@components/ui/use-toast'

const formSchema = z.object({
  phone: z.string().refine(
    val => {
      return /^0[0-9]{9,10}$/.test(val)
    },
    { message: 'Phone number is invalid' },
  ),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .max(20, {
      message: 'Password must be at most 20 characters',
    }),
})
export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await dispatch(login(values))
      if (result.meta.requestStatus === 'rejected')
        throw new Error(result.payload)
      toast({
        title: 'Login success',
        description: 'You have logged in successfully',
      })
      router.push('/')
    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: `${err.message}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <section className="flex justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-1/2"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  We'll never share your phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  )
}

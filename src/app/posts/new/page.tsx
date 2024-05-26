import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function NewPost() {
  const session = await auth()
  if (!session) {
    redirect('/posts')
  }
  async function createNewPost(form: FormData) {
    'use server'
    const title = form.get('title')
    const content = form.get('content')

    if (!session) {
      throw new Error("Você não tem permissão para criar novas postagens")
    }

    try {
      await prisma.post.create({
        data: {
          title: title!.toString(),
          content: content!.toString(),
          ownerGoogleId: session!.user!.email!,
        }
      })
      revalidatePath('/posts')
    } catch (err) {
      console.error({ reason: err })
      throw new Error("Erro interno, tente novamente mais tarde")
    }

    redirect('/posts')
  }

  return <form action={createNewPost} className='flex flex-col w-full gap-8'>
    <div className='flex flex-col gap-2'>
      <label className='text-lg' htmlFor='title'>
        Título
      </label>
      <input className='border-solid border-gray-600 border-[1px] p-4' name='title' id='title' minLength={2} required type='text' placeholder='Escreva algo chamativo' />
    </div>
    <div className='flex flex-col gap-2'>
      <label className='text-lg' htmlFor='content'>
        Descrição
      </label>
      <textarea className='border-solid border-gray-600 border-[1px] p-4' name="content" id='content' minLength={2} required placeholder='Descreva seu problema em detalhes aqui...' />
    </div>
    <button className='bg-gray-600 p-4 text-white'>Enviar</button>
  </form>
}
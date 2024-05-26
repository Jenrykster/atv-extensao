import Post from '@/components/Post';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const session = await auth()

  const posts = await prisma.post.findMany({
    orderBy: [
      {
        upvotes: 'asc'
      },
      { createdAt: 'desc' }
    ]
  })

  async function deletePost(id: number) {
    'use server'

    await prisma.post.delete({ where: { id, ownerGoogleId: session?.user?.email! } })
    revalidatePath('/posts')
  }

  return (
    <section className='flex flex-col gap-4'>
      {posts.length === 0 && <p className='text-center text-2xl text-gray-700'>
        Nenhuma postagem disponível
      </p>}
      {
        posts.map(post =>
          <Post
            id={post.id}
            key={post.id}
            title={post.title}
            ownsPost={post.ownerGoogleId === session?.user?.email!}
            content={post.content}
            onDelete={deletePost}
          />
        )
      }
    </section>
  );
}

import Post from '@/components/Post';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const session = await auth()

  const posts = await prisma.post.findMany({
    orderBy: [
      { createdAt: 'desc' }
    ],
    include: {
      reaction: true
    }

  })

  async function deletePost(id: number) {
    'use server'

    await prisma.post.delete({ where: { id, ownerGoogleId: session?.user?.email! }, include: { reaction: true } })
    revalidatePath('/posts')
  }

  async function handleOpinion(postId: number, type: 'agree' | 'disagree') {
    'use server'

    const ownerId = session?.user?.email!
    await prisma.reaction.upsert({
      where: {
        postId_ownerGoogleId: {
          ownerGoogleId: ownerId,
          postId: postId
        }
      },
      create: {
        ownerGoogleId: ownerId,
        postId: postId,
        upvote: type === 'agree',
      },
      update: {
        upvote: type === 'agree',
      }
    })

    revalidatePath('/posts')
  }

  const sortedPosts = posts.map(post => {
    const score = post.reaction.reduce((prev, curr) => curr.upvote ? prev + 1 : prev - 1, 0)
    return {
      ...post,
      reaction: post.reaction.find(reaction => reaction.ownerGoogleId === session?.user?.email!),
      score
    }
  }).sort((prev, curr) => {
    return prev.score > curr.score ? -1 : 1
  })

  return (
    <section className='flex flex-col gap-4'>
      {posts.length === 0 && <p className='text-center text-2xl text-gray-700'>
        Nenhuma postagem disponível
      </p>}
      {
        sortedPosts.map(post =>
          <Post
            session={session}
            key={post.id}
            postData={{
              ...post,
              reaction: post.reaction!,
              upvotes: post.score
            }}
            onDelete={deletePost}
            onOpinion={handleOpinion}
          />
        )
      }
    </section>
  );
}

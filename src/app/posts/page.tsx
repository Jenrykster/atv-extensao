import prisma from '@/lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        upvotes: 'asc'
      },
      { createdAt: 'desc' }
    ]
  })

  return (
    <section className='flex flex-col gap-4'>
      {posts.length === 0 && <p className='text-center text-2xl text-gray-700'>
        Nenhuma postagem disponível
      </p>}
      {
        posts.map(post =>
          <div className='rounded-md flex flex-col gap-2 bg-gray-300 border-gray-600 border-solid border-2 p-8' key={post.id}>
            <h1 className='text-xl font-semibold'>{post.title}</h1>
            <p>{post.content}</p>
          </div>)
      }
    </section>
  );
}

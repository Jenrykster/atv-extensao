import prisma from '@/lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      upvotes: 'asc'
    }
  })

  return (
    <section>
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
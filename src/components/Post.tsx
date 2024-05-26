'use client'

import type { Post, Reaction } from '@prisma/client';
import { Session } from 'next-auth';
interface IPostProps {
  postData: Post & {
    reaction: Reaction
    upvotes: number;
  };
  session: Session | null;
  onDelete: (id: number) => void;
  onOpinion: (id: number, type: 'agree' | 'disagree') => void
}

export default function Post({ onDelete, onOpinion, postData, session }: IPostProps) {

  function agreeWithPost() {
    onOpinion(postData.id, 'agree')
  }

  function disagreeWithPost() {
    onOpinion(postData.id, 'disagree')
  }
  const hasUpvoted = postData.reaction && postData.reaction.upvote
  const hasDownvoted = postData.reaction && !postData.reaction.upvote
  const ownsPost = session?.user?.email === postData.ownerGoogleId

  return <div className='relative rounded-md overflow-hidden flex flex-col gap-2 bg-gray-300 border-gray-600 border-solid border-2 p-8'>
    {ownsPost && <button onClick={() => onDelete(postData.id)} className='px-2  absolute right-0 top-0 bg-red-400 '>
      X
    </button>}
    <h1 className='text-xl font-semibold'>{postData.title}</h1>
    <p>{postData.content}</p>
    {!ownsPost && session && <div className='-mx-8 -mb-8 mt-4'>
      <button disabled={hasUpvoted} onClick={agreeWithPost} className={`p-2 w-1/2 bg-green-400 ${hasUpvoted && 'opacity-30'}`}>Concordo</button>
      <button disabled={hasDownvoted} onClick={disagreeWithPost} className={`p-2 w-1/2 bg-red-400 ${hasDownvoted && 'opacity-30'}`}>Discordo</button>
    </div>}
  </div>
}
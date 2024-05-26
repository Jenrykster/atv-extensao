'use client'
interface IPostProps {
  title: string;
  id: number;
  content: string
  onDelete: (id: number) => void;
  ownsPost?: boolean
}

export default function Post(props: IPostProps) {

  return <div className='relative rounded-md overflow-hidden flex flex-col gap-2 bg-gray-300 border-gray-600 border-solid border-2 p-8'>
    {props.ownsPost && <button onClick={() => props.onDelete(props.id)} className='px-2  absolute right-0 top-0 bg-red-400 '>
      X
    </button>}
    <h1 className='text-xl font-semibold'>{props.title}</h1>
    <p>{props.content}</p>
  </div>
}
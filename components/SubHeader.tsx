import {
  BsBook,
  BsBookHalf,
  BsFillJournalBookmarkFill,
  BsNewspaper,
} from 'react-icons/bs'
import { VscSignIn } from 'react-icons/vsc'
import { signOut, useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  return (
    <div className="  flex  border-b border-white/20 bg-[#101010] ">
      <div
        className="mx-5 mt-3 mb-2 flex cursor-pointer rounded-sm bg-sky-400 px-3 py-1  text-sm text-white"
        onClick={() => (session ? signOut() : signIn())}
      >
        <VscSignIn className=" mr-2 text-base" />
        <h1 className="hidden lg:inline-flex">
          {session ? 'LOGOUT' : 'LOGIN'}
        </h1>
      </div>
      {/* Container */}
      <div className="mx-[35%] my-2 flex gap-20">
        <div className="group  hidden cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/20 lg:inline-flex">
          <BsBook className=" rotate-3 text-white/50  group-hover:text-blue-400 " />
          <h1 className=" text-xs text-white">Studio</h1>
        </div>
        {/* Blogs */}
        <div className="group -mx-28 flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10 lg:mx-0">
          <BsFillJournalBookmarkFill className=" rotate-3 text-white/50  group-hover:text-blue-400 lg:inline-flex " />
          <h1 className=" text-xs text-white">BLOGS</h1>
        </div>
        {/* Magazine */}
        <div className="group mx-10 flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10 lg:mx-0">
          <BsNewspaper className=" group- text-white/50 hover:text-blue-400 " />
          <h1 className="text-xs  text-white">MAGAZINE</h1>
        </div>
        {/* Premium */}
        <div className="flex">
          <h1 className="cursor-pointer rounded-sm bg-sky-400 px-2 pt-2 text-xs font-semibold  text-white">
            PREMIUM
          </h1>
        </div>
      </div>
    </div>
  )
}

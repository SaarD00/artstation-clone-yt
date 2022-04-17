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
      <h1
        className="mx-5 mt-3 mb-2 flex cursor-pointer rounded-sm bg-sky-400 px-3 py-1  text-sm text-white"
        onClick={() => (session ? signOut() : signIn())}
      >
        <VscSignIn className=" mr-2 text-base" />
        {session ? 'LOGOUT' : 'LOGIN'}
      </h1>
      {/* Container */}
      <div className="mx-[35%] my-2 flex gap-20">
        {/* Studio */}
        <div className=" group flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsBook className="hidden rotate-3 text-white/50  group-hover:text-blue-400 lg:inline-flex " />
          <h1 className="hidden text-xs text-white  lg:inline-flex">STUDIOS</h1>
        </div>
        {/* Blogs */}
        <div className="group flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsFillJournalBookmarkFill className="  text-white/50 group-hover:text-blue-400" />
          <h1 className="text-xs   text-white">BLOGS</h1>
        </div>
        {/* Magazine */}
        <div className="group flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsNewspaper className=" group- text-white/50 hover:text-blue-400 " />
          <h1 className="text-xs  text-white">MAGAZINE</h1>
        </div>
        {/* Premium */}
        <div className="flex">
          <h1 className="rounded-sm bg-sky-400 px-2 pt-2 text-xs font-semibold  text-white">
            PREMIUM
          </h1>
        </div>
      </div>
    </div>
  )
}

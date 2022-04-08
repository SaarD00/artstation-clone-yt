import {
  BsBook,
  BsBookHalf,
  BsFillJournalBookmarkFill,
  BsNewspaper,
} from 'react-icons/bs'
import { VscSignIn } from 'react-icons/vsc'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

export default function Header() {
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  return (
    <div className="  flex  border-b border-white/20 bg-[#101010] ">
      <h1
        className="mx-5 mt-3 mb-2 flex cursor-pointer rounded-sm bg-sky-400 px-3 py-1  text-sm text-white"
        onClick={() => (address ? disconnect() : connectWithMetamask())}
      >
        <VscSignIn className=" mr-2 text-base" />
        {address ? 'LOGOUT' : 'LOGIN'}
      </h1>
      {/* Container */}
      <div className="mx-[35%] my-2 flex gap-20">
        {/* Studio */}
        <div className="flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsBook className="rotate-3  text-white/50 hover:text-blue-400 " />
          <h1 className="text-xs  text-white">STUDIOS</h1>
        </div>
        {/* Blogs */}
        <div className="flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsFillJournalBookmarkFill className="  text-white/50 hover:text-blue-400" />
          <h1 className="text-xs  text-white">BLOGS</h1>
        </div>
        {/* Magazine */}
        <div className="flex cursor-pointer gap-2 rounded-full p-2 duration-500 hover:bg-white/10">
          <BsNewspaper className=" text-white/50 hover:text-blue-400 " />
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

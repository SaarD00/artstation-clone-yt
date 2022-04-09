import React from 'react'
import { HiOutlinePaperAirplane, HiSearch } from 'react-icons/hi'
import { BsUpload, BsBell, BsHeart, BsCart3 } from 'react-icons/bs'
import Link from 'next/link'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  const { data: session } = useSession()
  return (
    <div className="fixed z-50 flex h-[72px] w-screen border-b border-white/20 bg-[#171717]">
      <header className="flex">
        {/*Logo  */}
        <div className="">
          <Link href="/">
            <img
              className="h-[70px] cursor-pointer"
              src="https://www.artstation.com/assets/about/logo/logo-artstation-horizontal-cbbe936e68623842ca878651bfd9ceb3.png"
            />
          </Link>
        </div>
        {/* Input */}
        <div className="mx-3 my-5 flex ">
          <HiSearch className="absolute mx-3 my-2 text-gray-500 " />
          <input
            type="search"
            id="search"
            className="mx-1 flex  w-[1050px] flex-grow rounded-sm border border-white/20 bg-[#0B0B0B] py-[3px]  px-2 pl-8 text-xs text-white placeholder-gray-500 outline-none focus:border-none focus:outline focus:outline-cyan-500/50"
            placeholder="search"
          />
        </div>
        {/* Icons */}
        <div className="my-6 mx-2 flex space-x-6">
          {/* Upload Icon */}
          <div className="flex cursor-pointer gap-3">
            <BsUpload className="font-bold text-white duration-150 ease-out hover:text-blue-400" />
            <h1 className=" text-xs font-semibold text-white">UPLOAD</h1>
          </div>
          {/* Notification */}
          <div className="flex cursor-pointer gap-3">
            <BsBell className="font-bold text-white duration-150 hover:text-blue-400" />
          </div>
          {/* Send */}
          <div className=" hidden rotate-[30deg] cursor-pointer gap-3 lg:flex">
            <HiOutlinePaperAirplane className="font-bold text-white duration-150 hover:text-blue-400" />
          </div>
          {/* Heart */}
          <div className="hidden cursor-pointer gap-3 lg:flex">
            <BsHeart className="text-white duration-150 hover:text-blue-400" />
          </div>
          {/* Cart */}
          <div className="hidden cursor-pointer gap-3 lg:flex">
            <BsCart3 className="text-white duration-150 hover:text-blue-400" />
          </div>
        </div>
        {/* Profile */}
        <div className="group">
          <p className=" absolute -mx-10 my-14 w-36 rounded-full bg-gray-800/50 p-2 px-5 text-white/50 opacity-0 duration-300  group-hover:opacity-100 ">
            {session ? 'Welcome!' : 'Connect with Twitter'}
          </p>
          <img
            onClick={() => (session ? '' : signIn())}
            className="my-4 mx-3 h-8 cursor-pointer rounded-full"
            src={
              session
                ? `${session.user?.image}`
                : 'https://www.gravatar.com/avatar/4eaa8aea3ab7c58082edc5eda9265900.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg'
            }
          />
        </div>
        <div>{/* Options */}</div>
      </header>
    </div>
  )
}

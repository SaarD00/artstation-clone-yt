import React from 'react'
import { BsArrowDown, BsCompass } from 'react-icons/bs'

function Channels() {
  return (
    <div className="h-screen  bg-[#171717]">
      {/* CHANLLES */}
      <div className="mx-5 my-16 flex justify-between">
        {/* CHANNELS TAB */}
        <div className=" hidden h-16 w-28 items-center justify-center rounded-sm bg-[#333333] px-1 py-3 lg:flex ">
          <h3 className=" text-center text-sm font-semibold text-white">
            Channels
          </h3>
          <BsArrowDown className="ml-3 text-sky-500" />
        </div>
        {/* EXPLORE TAB */}
        <div className="flex h-16 w-[118px] items-center justify-center gap-2 rounded-sm bg-[#333333] outline outline-sky-500">
          <BsCompass className="absolute -mx-10 text-sky-500" />
          <h1 className="absolute hidden text-center text-sm font-semibold text-white">
            Explore
          </h1>
          <div className="blur-sm">
            <img
              className="h-[65px] rounded-sm  "
              src="https://cdn.artstation.com/assets/community/channels/channel-explore.jpg"
            />
          </div>
        </div>
        {/* FAN ART */}
        <div className=" flex h-16 w-[118px] items-center justify-center gap-2 rounded-sm bg-[#333333]">
          <BsCompass className="absolute -mx-10 text-sky-500" />
          <h1 className="absolute  text-center text-sm font-semibold text-white">
            Fan Art
          </h1>
          <div className="">
            <img
              className="h-[65px] rounded-sm opacity-40  "
              src="https://cdna.artstation.com/p/channels/covers/000/000/082/20200505142057/thumb/thumb.jpg?1588706457"
            />
          </div>
        </div>
        {/* Game Art */}
        <div className=" flex h-16 w-[118px] items-center justify-center gap-2 rounded-sm bg-[#333333]">
          <BsCompass className="absolute -mx-10 text-sky-500" />
          <h1 className="absolute  text-center text-sm font-semibold text-white">
            Game Art
          </h1>
          <div className="">
            <img
              className="h-[65px] rounded-sm opacity-40  "
              src="https://cdnb.artstation.com/p/channels/covers/000/000/085/20200505143053/thumb/thumb.jpg?1588707053"
            />
          </div>
        </div>
        {/* FILM AND TV */}
        <div className=" flex h-16 w-[118px] items-center justify-center gap-2 rounded-sm bg-[#333333]">
          <BsCompass className="absolute -mx-10 text-sky-500" />
          <h1 className="absolute  text-center text-sm font-semibold text-white">
            Film and TV
          </h1>
          <div className="">
            <img
              className="h-[65px] rounded-sm opacity-30  "
              src="https://cdna.artstation.com/p/channels/covers/000/004/824/20210816001753/thumb/thumb.jpg?1629091073"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels

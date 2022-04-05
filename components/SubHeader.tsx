import {
  BsBook,
  BsBookHalf,
  BsFillJournalBookmarkFill,
  BsNewspaper,
} from 'react-icons/bs'

export default function Header() {
  return (
    <div className="  flex  border-b border-white/20 bg-[#101010] ">
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

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import imageUrlBuilder from '@sanity/image-url'
import SubHeader from '../components/SubHeader'
import Channels from '../components/Channels'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  const { data: session } = useSession()
  const imageUrlbuilder = imageUrlBuilder(sanityClient)
  return (
    <div className=" overflow-hidden bg-[#171717]">
      <Head>
        <title>Artstation Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="my-[74px] items-center">
        <SubHeader />
      </div>

      {/* posts */}
      <div className="-my-16 grid grid-cols-1 gap-3 overflow-hidden bg-[#171717] p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-5">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-900">
                <div className=" absolute my-[160px] flex justify-between p-5 text-white">
                  <div>
                    <p className="text-lg font-light">{post.title}</p>
                    <p className="text-xs font-extralight text-gray-400">
                      {post.description} by{' '}
                      <span className="font-semibold text-gray-200">
                        {post.author.name}
                      </span>
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full object-contain"
                    src={urlFor(post.author.image).url()}
                  />
                </div>
                <img
                  className="h-60 w-fit object-cover transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).width(200).quality(100).url()}
                />
              </div>
            </Link>
          )
        })}
      </div>
      <div>
        <Channels />
      </div>
      {/* Community posts */}
      <div></div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type =="post"]{
    _id,
    title,
    author -> {
    name,
    image,
  },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

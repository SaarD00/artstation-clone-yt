import Head from 'next/head'
import { useState } from 'react'
import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Post } from '../../typings'
import Header from '../../components/Header'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)

    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }
  return (
    <div className="min-h-screen bg-[#171717] ">
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/images/logo/medium-1.svg" />
      </Head>
      <div className="grid min-h-screen grid-cols-7 overflow-hidden bg-black">
        <Header />
        {/* Main body */}
        <div className="col-span-4  mb-[700px] scale-150">
          <img
            className=" m mx-9 h-full w-full   object-contain  px-10"
            src={urlFor(post.mainImage).url()!}
          />
        </div>
        <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />

        {/* Comments */}
        <div className=" col-span-2 flex flex-col bg-[#171717]">
          <div className="">
            <article className="my-20">
              <h1 className=" my-10 text-center text-3xl text-white">
                {post.title}
              </h1>
              <h2 className="mx-2 text-xl font-light text-gray-500">
                {post.description}
              </h2>

              <div className="mx-5 my-5 flex items-center space-x-2">
                <img
                  className="h-10 w-10 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
                <p className="text-sm font-extralight text-gray-500">
                  Blog post By{' '}
                  <span className="font-bold text-sky-700">
                    {post.author.name}
                  </span>{' '}
                  - Published at {new Date(post._createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mx-5 mt-2 text-gray-300">
                <PortableText
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECTID}
                  content={post.body}
                  serializers={{
                    h1: (props: any) => (
                      <h1 className="my-5 text-2xl font-bold" {...props}></h1>
                    ),
                    h2: (props: any) => (
                      <h1 className="my-5 text-xl font-bold" {...props}></h1>
                    ),
                    li: ({ children }: any) => (
                      <li className="ml-4 list-disc">{children}</li>
                    ),
                    link: ({ children, href }: any) => (
                      <a href={href} className="text-blue-500 hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                />
              </div>
            </article>
          </div>
          <div className="col-span-2 my-10 flex  flex-col space-y-2 p-10">
            <h3 className="text-4xl text-white">Comments</h3>
            <hr className="" />

            {post.comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className=" font-extralight text-gray-400"
                >
                  <div className="flex gap-3">
                    <img
                      className="h-7 rounded-full"
                      src="https://www.gravatar.com/avatar/4eaa8aea3ab7c58082edc5eda9265900.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
                    />
                    <div className="flex-col">
                      <p className="font-semibold text-sky-400">
                        {comment.name}:
                      </p>
                      <p className="mx-2 my-2 font-extralight text-gray-300/80">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {submitted ? (
            <div className=" my-10  mx-auto flex max-w-2xl flex-col bg-[#282626]  p-10 text-white">
              <h3>Thank you for submitting your comment</h3>
              <p>
                Once it has been approved, it will appear below! Takes Around
                5hrs to 10hrs{' '}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-2 my-16 flex  flex-col bg-[#171717] p-5"
            >
              <h3 className="text-sm text-sky-500">Enjoyed this article?</h3>
              <h4 className="text-3xl font-bold text-white">Comments</h4>
              <hr className="mt-2 py-3" />

              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
              />

              <label className="mb-5 block">
                <input
                  {...register('name', { required: true })}
                  className="form-input mt-1 block w-full rounded bg-[#0f0f0f] py-2 px-3 text-gray-300 placeholder-slate-600 shadow outline-none ring-yellow-500 focus:ring"
                  placeholder="your name"
                  type="text"
                />
              </label>
              <label className="mb-5 block">
                <input
                  {...register('email', { required: true })}
                  className="form-input mt-1 block w-full rounded bg-[#0f0f0f]  py-2 px-3 text-gray-300 placeholder-slate-600 shadow outline-none ring-yellow-500 focus:ring"
                  placeholder="email@domain.com"
                  type="email"
                />
              </label>
              <label className="mb-5 block">
                <textarea
                  {...register('comment', { required: true })}
                  className="form-textarea mt-1 block h-36 w-full rounded bg-[#0f0f0f]  py-2 px-3 text-gray-300 placeholder-slate-600 shadow outline-none ring-yellow-500 focus:ring"
                  placeholder="share your comment"
                  rows={8}
                />
              </label>
              <div className="flex flex-col">
                {errors.name && (
                  <span className="text-red-500">
                    - The Name Field is required
                  </span>
                )}
                {errors.comment && (
                  <span className="text-red-500">
                    - The Comment Field is required
                  </span>
                )}
                {errors.email && (
                  <span className="text-red-500">
                    - The Email Field is required
                  </span>
                )}
              </div>

              <input
                type="submit"
                className="focus:shadow-outline cursor-pointer rounded bg-sky-500/80  px-4 py-2 font-bold text-white shadow hover:bg-blue-500"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug {
      current
  }
}`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  author -> {
    name,
    image
  },
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id && 
    approved == true
  ],
  description,
  mainImage,
  slug,
  body
}`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}

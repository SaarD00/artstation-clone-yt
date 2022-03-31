import imageUrlBuilder from '@sanity/image-url'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from "../../sanity"
import { Post } from "../../typings"
import PortableText from 'react-portable-text'
import {useForm, SubmitHandler} from "react-hook-form"
import { useState } from 'react'

interface IFormInput {
    _id:string;
    name:string;
    email:string;
    comment:string;
}

interface Props {
    post: Post;
}

function Post({ post }: Props) {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data)
            setSubmitted(true);
        }).catch((err) => {
            console.log(err);
            setSubmitted(false);
        })
    };
  return (
    <main>
      <Header />

      <img className='w-full object-cover h-40' src={urlFor(post.mainImage).url()!} />

      <article className='max-w-3xl mx-auto p-5'>
          <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
          <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>

          <div className='items-center space-x-2 flex'>
              <img className='h1-10 w-10 rounded-full object-contain' src={urlFor(post.author.image).url()!} />
                <p className='font-extralight text-xs'>Blog post by <span className='text-green-600 font-semibold'>{post.author.name}</span>{" "}  - Published at {new Date(post._createdAt).toLocaleString()}</p>
          </div>

          <div>
              <PortableText
              className='mt-10'
              dataset={process.env.NEXT_PUBLIC_SANITY_DATABASE!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={
                  {
                      h1: (props: any) => (
                          <h1 className='text-2xl font-bold my-5' {...props}/>
                      ),
                      h2: (props: any) => (
                        <h1 className='text-xl font-bold my-5' {...props}/>
                    ),
                    li: ({children}: any) => (
                        <li className='text-2xl font-bold my-5'>{children}</li>
                    ),

                      
                  }
              } />
          </div>
      </article>

      <hr className='max-w-lg my-5 mx-auto border border-yellow-500'></hr>

      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
        <h3>Thank you for submitting your comment</h3>
        <p>Once it has been approved, it will appear below! </p>
      </div>
      ): (

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
          <h3 className='text-sm text-yellow-500'>Enjoyed this Article?</h3>
          <h4 className='text-3xl font-bold'>Leave a Comment Below!</h4>
          <hr className='py-3 mt-2'></hr>


          <input {...register("_id")} type="hidden" name='_id' value={post._id} />
          <label className='block mb-5'>
              <span  className='text-gray-700'>Name</span>
                  <input {...register("name", { required: true})} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none' placeholder='john apple seed' type="text" />
           </label>
           <label className='block mb-5'>
              <span  className='text-gray-700'>Email</span>
                  <input {...register("email", {required: true})} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none' placeholder='john apple seed' type="email" />
           </label>
           <label className='block mb-5'>
              <span  className='text-gray-700'>Comment</span>
                  <textarea {...register("comment", {required: true})} className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='john apple seed' rows={8} />
           </label>

           {/* errors will return if validation is failed */}
           <div className='flex p-5 flex-col'>
                {errors.name && (<span className='text-red-500'>Name is required</span>)}
                {errors.email && (<span className='text-red-500'>Email is required</span>)}
                {errors.comment && (<span className='text-red-500'>Comment is required</span>)}

           </div>

           <input type="submit" className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' />
           
      </form>
      )}

      {/* Comments */}
      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow  shadow-yellow-500">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />

          {post.comments.map((comment) => {
            return (
              <div key={comment._id}>
                <p>
                  <span className="text-yellow-500">{comment.name}: </span>
                  {comment.comment}
                </p>
              </div>
            );
          })}
          
      </div>


    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type=="post"]{
        _id,
        slug {
        current
      }
      }` ;
      const posts = await sanityClient.fetch(query);

      const paths = posts.map((post: Post) => ({
          params: {
              slug: post.slug.current 
          }
      }) );

      return {
          paths,
          fallback: 'blocking'
      }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type=="post" && slug.current == $slug] [0]{
        _id,
        _createdAt,
        title,
        author-> {
        name,
        image
      },
      'comments': *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true],
      description,
      mainImage,
      slug,
      body
      } `

      const post = await sanityClient.fetch(query,{
          slug: params?.slug
      });

      if (!post) {
          return {
              notFound: true
          }
      }

      return {
          props: {
              post,
          },
          revalidate: 120, // after 120 seconds update old cache lol its  a iSR REALLY GOOOD THINGY BBUBUUBUB
      }
}

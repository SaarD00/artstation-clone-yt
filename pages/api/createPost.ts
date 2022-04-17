// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
  };

  const client = sanityClient(config);


  export default async function createPost(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { _id, name, email, Post } = JSON.parse(req.body);
    try {
      await client.create({
        _type: 'post',
        post: {
          _type: 'reference',
          _ref: _id,
        },
        name,
        email,
        Post,
      });
    } catch (err) {
      return res.status(500).json({ message: "Couldn't submit post", err });
    }

    console.log("subbmited")
    res.status(200).json({ message: 'post submitted' });
  }

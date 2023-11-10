import Post from '@/app/interfaces/Posts'
import React from 'react'
import PostDetail from './Post'

interface Props {
    posts: Post[]
}

const Posts = ({ posts }: Props) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3  gap-4'>
            {
                posts.map((post, i) => (
                    <PostDetail key={i} post={post} />
                ))
            }
        </div>
    )
}

export default Posts
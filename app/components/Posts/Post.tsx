import Post from '@/app/interfaces/Posts'
import Image from 'next/image'
import React from 'react'

interface Props {
    post: Post
}

const PostDetail = ({ post }: Props) => {

    return (
        <div className='m-auto my-4 h-[400px] w-[300px]'>
            <Image objectFit='contain' width={300} height={400} src={'/' + post.media} alt={post.alt !== undefined ? post.alt : ''} className='rounded-2xl' />
        </div>
    )
}

export default PostDetail
import React from 'react'
import { Link } from 'react-router-dom'
import appwriteservice from "../appwrite/config.js"


function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 p-4 rounded-xl'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteservice.getFilePreview(featuredImage)} alt={title} className='w-full h-48 object-cover rounded-xl' />
        </div>
        <h2 className='text-xl font-bold'>
            {title}
        </h2>
        </div>
    </Link>
  )
}

export default PostCard

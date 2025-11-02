import { Link } from 'react-router-dom'
import appwriteservice from "../appwrite/config.js"
import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function PostCard({
    $id, title, featuredImage
}) {
  const filePreview = featuredImage ? appwriteservice.getFilePreview(featuredImage) : null;
  
  return (
    <Link to={`/post/${$id}`} className='block'>
        <div className='w-full h-full bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300'>
        <div className='w-full h-48 bg-gray-200'>
            {filePreview ? (
              <LazyLoadImage 
                src={filePreview} 
                alt={title} 
                className='w-full h-full object-cover'
                wrapperClassName='w-full h-full'
                effect="blur"
                placeholder={<div className="w-full h-full bg-gray-200 animate-pulse" />}
                onError={(e) => {
                  console.error(`Failed to load image for "${title}":`, filePreview);
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojOTk5O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE3cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
        </div>
        <div className='p-4'>
            <h2 className='text-lg font-bold line-clamp-2 min-h-[2rem]'>
                {title}
            </h2>
        </div>
        </div>
    </Link>
  )
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string
}

export default PostCard

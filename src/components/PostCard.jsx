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
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 p-4 rounded-xl'>
        <div className='w-full justify-center mb-4'>
            {filePreview && (
              <LazyLoadImage 
                src={filePreview} 
                alt={title} 
                className='w-full h-48 object-cover rounded-xl'
              />
            )}
        </div>
        <h2 className='text-xl font-bold'>
            {title}
        </h2>
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

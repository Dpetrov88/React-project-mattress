import { Link } from 'react-router-dom'

export const HomeItem = ({
    _id,
    image,
    brand,
    price,
}) => {
    return (
     <div className="mattress">
        <div className="image-wrap">
            <img src={image}  />
        </div>
        <h3>{brand}</h3>
        <div className="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <h4>Price: {price}$</h4>
        <div className="data-buttons">
            <Link to={`/catalog/${_id}`} className="btn details-btn">Details</Link>
        </div>
     </div>
    )
}
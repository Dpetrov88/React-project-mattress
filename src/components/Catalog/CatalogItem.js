import { Link } from 'react-router-dom'

export const CatalogItem = ({
    _id,
    brand,
    category,
    image,
    price,
}) => {
   
    return ( 
        
        <div  className="offer">
            <img src={image} alt="./images/back.webp" />
            <p><strong>Brand: </strong><span className="title"><strong>{brand}</strong></span> </p>
            <p><strong>Category: </strong><span className="title"><strong>{category}</strong></span> </p>
            <p><strong>Price:</strong><span className="salary"><strong>${price}</strong></span></p>
            <Link to={`/catalog/${_id}`} className="details-button" >Details</Link>
        </div>
       
    )
};
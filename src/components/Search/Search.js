import { useMattressContex } from "../../contexts/MattresContext"
import { Link } from 'react-router-dom'

export const Search = () => {
    const {s} = useMattressContex();
    
    
    return (
        <section id="search" >
        {s.map(x => 
     <div key={x._id} className="mattresss">
        <div className="image-wrapp">
            <img src={x.image} alt='No img' />
        </div>
        <h3>{x.brand}</h3>
        <div className="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <h4>Price: {x.price}$</h4>
        <div className="data-buttons">
            <Link to={`/catalog/${x._id}`} className="btn details-btn">Details</Link>
        </div>
     </div>
     )}
    {s.length === 0 && 
    <h1>Sorry! We coudn`t find this mattress!</h1>}
   </section>
    )
}
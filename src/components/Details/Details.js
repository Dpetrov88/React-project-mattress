import { useParams, useNavigate, Link} from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import {mattressServiceFactory}from '../../service/mattressService';
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = () => {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const {mattressId } = useParams();
    const [ mattress, setMattress ] = useState({});
    const mattressService = useService(mattressServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        mattressService.getOne(mattressId)
            .then(result => {
                setMattress(result)
            });
    },[mattressId]);

    const isOwner = mattress._ownerId === userId; 

    const onDeleteClick = async() => {
        
        await mattressService.delete(mattress._id);

        navigate('/catalog');
    }

    return(
        <section id="detailsPage">
    <div className="wrapper">
        <div className="mattressCover">
            <img src={mattress.image} />
        </div>
        <div className="mattressInfo">
            <div className="mattressText">
                <h1>Brand: {mattress.brand}</h1>
                <h3><strong>Category:</strong> {mattress.cattegory}</h3>
                <h3><strong>Size:</strong> {mattress.size}</h3>
                <h3><strong>Price:</strong> {mattress.price}</h3>
             
                <p><strong>Description:</strong>{mattress.summary}</p>
            </div>
                {isOwner && (

                <div className="actionBtn">
                    <Link to={`/catalog/${mattress._id}/edit`} className="edit">Edit</Link>
                    <button onClick={onDeleteClick}>Delete</button>
                
                </div>
                 )}

                 {!isOwner && isAuthenticated && (
                    <div className="actionBtn">
                    
                    <button >Buy</button>
                
                </div>
                 )}
        </div>
    </div>
</section>
    )
}
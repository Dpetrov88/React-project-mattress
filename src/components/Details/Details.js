import { useParams, useNavigate, Link} from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {mattressServiceFactory}from '../../service/mattressService';
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";
import { useMattressContex } from "../../contexts/MattresContext";
import * as buyService  from '../../service/buyService';

export const Details = () => {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const {mattressId } = useParams();
    const {deleteMattress} = useMattressContex();
    const [show, setShow] = useState(false);
    const [ mattress, setMattress ] = useState({});
    const [buy, setBuy] = useState({});
    const mattressService = useService(mattressServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        mattressService.getOne(mattressId)
            .then(result => {
                setMattress(result)
            });
    },[mattressId]);

    useEffect(() => {
        buyService.getBuy(mattressId, userId)
            .then(result => {
                setBuy(result)
            });
    },[]);

    console.log(buy);

    const isOwner = mattress._ownerId === userId; 

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const onDeleteClick = async() => {
              await mattressService.delete(mattress._id);
              deleteMattress(mattress._id);
              navigate('/catalog');
    }

    const onBuyClick = () => {
     buyService.create(mattress,mattressId);
    
     navigate('/profile')
    }
    return(
        <>
        {show && (

         <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Are you sure you want to delete mattress {mattress.brand}?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">Close</Button>
          <Button onClick={onDeleteClick} variant="primary">Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
        )}
        <section id="detailsPage">
    <div className="wrapper">
        <div className="mattressCover">
            <img src={mattress.image} alt='No img' />
        </div>
        <div className="mattressInfo">
            <div className="mattressText">
                <h1>Brand: {mattress.brand}</h1>
                <h3><strong>Category:</strong> {mattress.category}</h3>
                <h3><strong>Size:</strong> {mattress.size}</h3>
                <h3><strong>Price:</strong> {mattress.price}$</h3>
             
                <p><strong>Description:</strong>{mattress.summary}</p>
            </div>
      
                {isOwner && (

                <div className="actionBtn">
                    <Link to={`/catalog/${mattress._id}/edit`} className="edit">Edit</Link>
                    <button onClick={handleShow}>Delete</button>
                
                </div>
                 )}

                 {!isOwner && isAuthenticated && buy === 0 ? 
                    <div className="actionBtn">
                    
                    <button onClick={onBuyClick}>Buy</button>
                
                </div>
                : 
                <div className="actionBtn">
                    
                    <p>You already bougth this mattress!</p>
                
                </div>
                }
        </div>
    </div>
</section>
</>
    )
}
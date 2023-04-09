import { useState, useEffect , useContext} from "react";

import { AuthContext } from '../../contexts/AuthContext'; 
import * as buyService  from '../../service/buyService';


export const Profile = () => {
const { userId } = useContext(AuthContext);
const [buy,setBuy] = useState([]);


useEffect(() => {
   buyService.getAll(userId)
   .then(result => {
       setBuy(result)
      
   })
},[]);

 return (
     <>
        <section  id="profile">
            {buy.length > 0 &&
            
        <h1>You bougth:</h1>
            }

        {buy.map(x => 
            <div key={x._id} className="offer">
            <img src={x.mattress['image']} alt="./images/back.webp" />
            <p><strong>Brand: </strong><span className="title"><strong>{x.mattress['brand']}</strong></span> </p>
            <p><strong>Category: </strong><span className="title"><strong>{x.mattress['category']}</strong></span> </p>
            <p><strong>Price:</strong><span className="salary"><strong>{x.mattress['price']}$</strong></span></p>
         
        </div>
            )}
        
            {buy.length === 0 &&
           <section className="no-mattress">
               <h1>You don`t bougth any mattress yet!</h1>

           </section> 
            }
        
        

    </section>

           
            </>
    );
}
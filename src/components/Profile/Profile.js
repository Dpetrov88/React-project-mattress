import { useState, useEffect , useContext} from "react";

import { AuthContext } from '../../contexts/AuthContext'; 
import * as buyService  from '../../service/buyService';
// import { mattressServiceFactory } from "../../service/mattressService";
// import { useService } from "../../hooks/useService";

export const Profile = () => {
// const mattressService = useService(mattressServiceFactory);
const { userId } = useContext(AuthContext);
const [buy,setBuy] = useState([]);


useEffect(() => {
   buyService.getAll(userId)
   .then(result => {
       setBuy(result)
      
   })
},[]);

console.log(buy);

 return (
     <>
        <section  className="buy">
        <h1>You bougth:</h1>

        {/* <!-- Display ul: with list-items for every user's books (if any) --> */}
        {buy.map(x => 
        <ul key={x._id} className="my-books-list">

            <li className="buyMattress">
                <h3>$ </h3>
                <p>Type: Ubav</p>
                <p className="img"><img src=''/></p>
            </li> 
        </ul>
            
            )}
        

        <p className="no-books">You do not buy yet!</p>
        
        

    </section>

           
            </>
    );
}
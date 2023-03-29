import { useMattressContex } from '../../contexts/MattresContext'
import { CatalogItem } from './CatalogItem'

export const Catalog = () => {

    const {mattress } = useMattressContex();
    return (

<section  id='catalog'>
           <h2>All Mattressess</h2>
        
           {mattress.map(x => 
                < CatalogItem key={x._id} {...x} />
           )}

            {mattress.length === 0 && (

            <p className="noMattress">No mattress yet!</p>
            )}

       </section>
    )
}

import { createContext, useEffect, useState, useContext } from "react";
import {mattressServiceFactory} from "../service/mattressService";
import {useNavigate} from 'react-router-dom';

export const MattressContex = createContext();

export const MattressProvider = ({
    children,
}) => {
    const navigate = useNavigate();
	const [mattress, setMattress] = useState([]);
    const [searching,setSearching] = useState([]);

	const mattressService = mattressServiceFactory();
	
    useEffect(() => {
		mattressService.getAll()
		.then(result => {
			setMattress(result)
		})
	},[]);

    const onCreateMattressSubmit = async(data) => {
        const {brand, category, size, image, price, summary} = data;
        if (!brand || !category || !size || !image || !price || !summary) {
            return alert('All fields are requared!')
        }

        try {
            const newMattress = await mattressService.create(data);
    
            setMattress(state => [...state, newMattress] );
    
            navigate('/catalog')
            
        } catch (error) {
            alert(error.message)
        }

	};


	const onEditMattresssubmit = async(values) => {
        const {brand, category, size, image, price, summary} = values;
        
        if (!brand || !category || !size || !image || !price || !summary) {
            return alert('All fields are requared!')
        }

        try {
            const result = await mattressService.edit(values._id, values);
    
            setMattress(state => state.map(x => x._id === values._id ? result : x));
    
            navigate(`/catalog/${values._id}`);
            
        } catch (error) {
            alert(error.message)
        }
	};

    const deleteMattress = (mattressId) => {
        setMattress(state => state.filter(mattress => mattress._id !== mattressId ));
    };

    const onSearchSubmit = async(search) => {
        if (search.search === '') {
            return
        }
        
      const result = await mattressService.getSearch(search);
      setSearching(result);
        navigate('/search');

    }

    const contextValue = {
        mattress,
        searching,
        onCreateMattressSubmit,
        onEditMattresssubmit,
        deleteMattress,
        onSearchSubmit
    }

    return (
        <MattressContex.Provider value={contextValue}> 
            {children}
        </MattressContex.Provider>
    );
};

export const useMattressContex = () => {
    const contex = useContext(MattressContex);

    return contex;
};
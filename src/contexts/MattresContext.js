import { createContext, useEffect, useState, useContext } from "react";
import {mattressServiceFactory} from "../service/mattressService";
import {useNavigate} from 'react-router-dom';

export const MattressContex = createContext();

export const MattressProvider = ({
    children,
}) => {
    const navigate = useNavigate();
	const [mattress, setMattress] = useState([]);
	const mattressService = mattressServiceFactory();
	
    useEffect(() => {
		mattressService.getAll()
		.then(result => {
			setMattress(result)
		})
	},[]);

    const onCreateMattressSubmit = async(data) => {
		const newMattress = await mattressService.create(data);

		setMattress(state => [...state, newMattress] );

		navigate('/catalog')
	};


	const onEditMattresssubmit = async(values) => {
		const result = await mattressService.edit(values._id, values);

		setMattress(state => state.map(x => x._id === values._id ? result : x));

		navigate(`/catalog/${values._id}`);
	};

    const contextValue = {
        mattress,
        onCreateMattressSubmit,
        onEditMattresssubmit,
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
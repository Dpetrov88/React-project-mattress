import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMattressContex } from "../../contexts/MattresContext";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { mattressServiceFactory } from "../../service/mattressService";

export const Edit = () => {
    const {onEditMattresssubmit} = useMattressContex()
    const { mattressId } = useParams();
    const mattressService = useService(mattressServiceFactory);
    const {values, changeHandler, onSubmit, changeValues} = useForm({
        _id: '',
        brand : '',
        category: '',
        size: '',
        image: '',
        summary: '',
        price: "",
    },onEditMattresssubmit);

    useEffect(() => {
        mattressService.getOne(mattressId)
            .then(result => {
                changeValues(result);
            });
    }, [mattressId]);

    return(
        <section id="edit">
            <form method="POST" onSubmit={onSubmit}  >
                <div className="form">
                    <h1>Edit Mattress</h1>

                    <label htmlFor="leg-title">Brand:</label>
                    <input value={values.brand} onChange={changeHandler} type="text" id="title" name="brand" placeholder="Enter brand..." />

                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter mattress category..." />

                    <label htmlFor="levels">Size:</label>
                    <input value={values.size} onChange={changeHandler}  id="size" name="size" min="1" placeholder="90/190" />

                    <label htmlFor="img">Image:</label>
                    <input value={values.image} onChange={changeHandler} type="text" id="imageUrl" name="image" placeholder="Upload a photo..." />

                    <label htmlFor="price">Price:</label>
                    <input value={values.price} onChange={changeHandler} type="number" id="price" name="price" placeholder="0" />

                    <label htmlFor="summary">Summary:</label>
                    <textarea value={values.summary} onChange={changeHandler} name="summary" id="summary" placeholder="write..."></textarea>
                    <button type="submit">Edit</button>
                </div>
            </form>
        </section>
    )
};
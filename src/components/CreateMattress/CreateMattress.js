
import { useMattressContex } from '../../contexts/MattresContext';
import { useForm } from '../../hooks/useForm';

export const CreateMattress = () => {
    const {onCreateMattressSubmit} = useMattressContex();
    const {values, changeHandler, onSubmit} = useForm({
        brand : '',
        category: '',
        size: '',
        image: '',
        summary: '',
        price: "",
    
},onCreateMattressSubmit);
   

    return (
        <section id="create">
            <form method='POST' onSubmit={onSubmit} >
                <div className="form">
                    <h1>Create Mattress</h1>

                    <label htmlFor="leg-title">Brand:</label>
                    <input value={values.brand} onChange={changeHandler} type="text"  name="brand" placeholder="Enter brand..." />

                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={changeHandler} type="text"  name="category" placeholder="one side/double side" />

                    <label htmlFor="levels">Size:</label>
                    <input value={values.size} onChange={changeHandler}  name="size" placeholder="90/190" />

                    <label htmlFor="img">Image:</label>
                    <input value={values.image} onChange={changeHandler} type="text"  name="image" placeholder="Upload a photo..." />

                    <label htmlFor="price">Price: $ </label>
                    <input value={values.price} onChange={changeHandler} type="number"  name="price" placeholder="0" />

                    <label htmlFor="summary">Summary: </label>
                    <textarea name="summary"  value={values.summary} onChange={changeHandler} placeholder="write..."></textarea>
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    )
}
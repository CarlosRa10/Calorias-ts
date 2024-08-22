
import { useState,ChangeEvent,FormEvent, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
  }
  


export default function Form({dispatch}:FormProps) {
    //definiendo nuestro state y conectarlo a los diferentes inputs
    const [activity,setActivity]=useState<Activity>({//setActivity es un objeto
        category:1,
        name:'',
        calories:0
    })
    
//actualizar el value de el input
    const handleChange = (e:ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLInputElement>) =>{//si no le especificamos el tipo de dato da eny
        const isNumberField = ['category','calories'].includes(e.target.id)//include es un array metodo-- si estoy escribiendo en categoria o en caloria me arroja un true, si no un false
        //console.log(isNumberField)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity =()=>{
        const {name,calories} = activity
        return name.trim() !== '' && calories > 0//El método trim( ) elimina los espacios en blanco en ambos extremos del string.
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'save-activity', payload: {newActivity:activity}})
    }

  return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div
            className="grid grid-cols-1 gap-3"
        >
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category =>(
                    <option
                        key={category.id}
                        value={category.id}//sincronizar mi state con la seleccion , pero para que se refleje los cambios tengo que tener un onChange
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div
            className="grid grid-cols-1 gap-3"
        >
           <label htmlFor="name" className="font-bold">Actividad:</label>
           <input 
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg "
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
           />
        </div>

        <div
            className="grid grid-cols-1 gap-3"
        >
           <label htmlFor="calories" className="font-bold">Calorías:</label>
           <input 
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg "
            placeholder="Calorias. ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
           />
        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-black uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1?'Guardar Comida':'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

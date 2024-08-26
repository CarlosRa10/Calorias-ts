
import { useState,ChangeEvent,FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state:ActivityState
  }
  
const initialState : Activity = {
    id:uuidv4(),
    category:1,
    name:'',
    calories:0
}

export default function Form({dispatch, state}:FormProps) {
    //definiendo nuestro state y conectarlo a los diferentes inputs
    //setActivity es un objeto
    //Se define un estado local llamado activity y 
    //se inicializa con el valor de initialState utilizando el hook useState. El tipo de activity es Activity.
    const [activity,setActivity]=useState<Activity>(initialState)
    useEffect(()=>{
    
    if(state.activeId){//Aquí se comprueba si state.activeId tiene un valor asignado. Si es así, se procede con el siguiente paso.
//Se filtra el array state.activities para encontrar el elemento cuyo id coincide con state.activeId.
//El resultado de este filtrado es un array, del cual se toma el primer elemento (índice 0) y se asigna a la variable selectedActivity.
        const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId )[0]
        setActivity(selectedActivity)
    }
    },[state.activeId])    //El useEffect se ejecuta cada vez que el valor de state.activeId cambia.
    //El código dentro del useEffect se ejecutará cuando se cumpla esta condición.
    
//actualizar el value de el input
    const handleChange = (e:ChangeEvent<HTMLSelectElement>|ChangeEvent<HTMLInputElement>) =>{//si no le especificamos el tipo de dato da eny
//Se crea una variable booleana isNumberField que determina si el campo del formulario que se está actualizando es de tipo "category" o "calories".
//Esto se hace comprobando si el id del elemento del formulario que generó el evento (e.target.id) se encuentra en el array ['category','calories'].
        const isNumberField = ['category','calories'].includes(e.target.id)//include es un array metodo-- si estoy escribiendo en categoria o en caloria me arroja un true, si no un false
        //console.log(isNumberField)//si se manupula 'category','calories' es true

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity =()=>{
        //Aquí se utiliza la desestructuración de objetos de JavaScript para extraer las propiedades name y calories del objeto activity.
        const {name,calories} = activity
        return name.trim() !== '' && calories > 0//El método trim( ) elimina los espacios en blanco en ambos extremos del string.
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'save-activity', payload: {newActivity:activity}})

        setActivity({
            ...initialState,
//Además, se agrega una nueva propiedad id y se le asigna un valor generado por la función uuidv4().
            id:uuidv4()
        })
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

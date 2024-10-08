//useReducer es una forma de almacenar tu state
//useReducer es una alternativa a useState... de hecho esta basado en useState, es una funcion que usa dentro de ella useState
//useReducer es un Hook para manejar el state
//useReducer es un Hook de react que te permite agregar un reducer a tus componente
//el Hook useReducer en React es una alternativa a useState que se utiliza para manejar estados más complejos y transiciones de estado que involucran lógica más 
//complicada. Mientras que useState es perfecto para el manejo de estados simples, useReducer es más adecuado para situaciones donde el nuevo estado depende del estado anterior
//o situaciones donde el nuevo estado depende del estado anterior o cuando hay múltiples sub-valores o lógica condicional a considerar.  
//useReducer composicion... el hook toma dos argumentos - Es una funcion que toma el estado actual y una accion, y devuelve un nuevo estado.
//state - es el valor del estado cuya lógica se maneja dentro del Reducer
//initialState - es el estado inicial con el que es creado el reducer, este initialState es similar a los valores de inicio de useState
//Actions - las acciones son las funciones que manejan toda la lógica para modificar tu state
//las acciones nos va a ayudar a describir que es lo que esta pasando y que información es la que va a modificar y que parte de nuestro state 
//una accion consta de dos partes - el type que es la descripción y el payload que es la informacion que modifica o que vamos a agregar a nuestro state 
//Payload - es la informacion que modifica tu state
//Dispatch es la funcion que manda llamar la accion con el payload
import { Activity } from "../types"



//type- va a describir lo que va a pasar en el reducer
//2)las acciones son 'save-activity' que toma un payload o informacion y un payload toma basicamente el parametro que le estarias pasando al reducer
export type ActivityActions = 
    { type:'save-activity', payload:{newActivity : Activity} }|//El type describe que es lo que esta suecediendo - el payload son los datos que se van agregar a tu state
    { type:'set-activeId', payload:{ id : Activity['id']} } |
    { type:'delete-activity', payload:{ id : Activity['id']} } |
    { type:'restart-app' } 
//El state de nuestro reducer se va a llamar activities y va hacer de tipo de Activity como arreglo[]
export type ActivityState = {
    activities : Activity[],
    activeId:Activity['id']//un lookup-buscador

}


const localStorageActivities =():Activity[]=>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities):[]
} 


//state inicial - nuestro inicial state es un objeto y tambien hay que asignarle un type- vamos a gregarle un arreglo 
export const initialState : ActivityState = {
//Este campo del objeto initialState es un arreglo vacío llamado activities.
    activities : localStorageActivities(),//Este arreglo probablemente contendrá la lista de actividades que el usuario ha registrado.
    activeId:''//Este campo probablemente se utilizará para rastrear la actividad actualmente seleccionada o en focus por el usuario.
}
//1)nuestro Reducer -el reducer conecta las acciones y los states
export const ActivityReducer = (
        state:ActivityState = initialState,
        action:ActivityActions
    ) => {
    
        if(action.type === 'save-activity'){
            //Este código maneja la lógica para actualizar el state
            let updatedActivities : Activity[] = []
            if(state.activeId){
                updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity:activity)
            }else{
                updatedActivities = [...state.activities, action.payload.newActivity]//agregarcopia
            }
            return {
                ...state,//Tomom una copia
                activities : updatedActivities,
                activeId:''
            }
        }

        if(action.type === 'set-activeId'){
            //lo que llegue del payload es lo que define ese state
            return{
                ...state,
                activeId: action.payload.id
            }
        }

        if(action.type === 'delete-activity'){
            return {
                ...state,
                activities: state.activities.filter( activity => activity.id !== action.payload.id)
            }
        }

        if(action.type === 'restart-app'){
            return{
                activities:[],
                activeId:''
            }
        }
        return state
}
//No tenemos un estado global y la tenemos que importar y pasarlo via pasarlo via props las funciones que requerimos en nuestros componentes 
//para poder utilizar nuestros reducer tenemos que importar un hook nuevo que se llama useReducer
//Tailwind CSS IntelliSense - ES7+ React/Redux/React-Native snippets - Simple React Snippets - Error lens - CodeSnap - Live Server - Material Icon Theme
//npm i @heroicons/react
import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {
  //ActivityReducer es una función que toma el estado actual y una acción, y devuelve un nuevo estado.
  //initialState es el estado inicial de la aplicación.
  //state es el estado actual de la aplicación.
  //dispatch es una función que se utiliza para enviar acciones al reducer.
  //useReducer toma dos parametros, toma el reducer y el state inicial - el arreglo[] nos va a retornar el estado de ese reducer-dispatch es una funcion especial que te permite las acciones
  //3)Para poder utilizar el reducer de activityReducer tenemos que importar el hook de useReducer y en que reducer quieres utilizarlo que puedes crear multiples reducer
  const [state, dispatch] = useReducer(ActivityReducer,initialState)//dispatch (la función para enviar acciones al reductor).

  useEffect(()=>{
    //convertir en string ese arreglo *--- va a escuchar por el estado de actividades
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = () => useMemo(()=>state.activities.length ,[state.activities])
  
  return (
    <>
        <header 
          className="bg-lime-600 py-3">
            <div className="max-w-4xl mx-auto flex justify-between">
              <h1 className="text-center text-lg font-bold text-white uppercase">
                  Contador de Calorías
              </h1>

              <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
              disabled={!canRestartApp()}
              onClick={()=>dispatch({type:'restart-app'})}
              >
                  Reiniciar App
              </button>
            </div>
        </header>

        <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
              <Form 
                dispatch={dispatch}
                state={state}
              />
          </div>
        </section>
        
        <section className="bg-gray-800 py-10">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker
              activities={state.activities}
            />
          </div>
        </section>

        <section className="p-10 mx-auto max-w-4xl">
          <ActivityList
            activities={state.activities}
            dispatch = {dispatch}          
          />
        </section>
    </>
  )
}

export default App

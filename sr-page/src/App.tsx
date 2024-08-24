import Grabacion from "./components/Grabacion"
import Transcripcion from "./components/Transcripcion"

function App() {

  return (
    <>
      <header className="bg-teal-300 py-5">

        <h1 className="text-center text-4xl font-black">
          Reconocimiento de voz v1.0
        </h1>

      </header>

      <div className="bg-slate-100 py-10">

        <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 bg-slate-200 px-5 rounded-lg">

        <section className="md:col-span-1 text-center">
            
            <Grabacion 
            
            />

            <div className="mt-5">
              <p className="text-2xl font-bold py-3">¿Qué grabar?</p>
              <div className="text-lg text-left px-5 py-2 bg-slate-500 text-slate-100 rounded-lg mx-6">
                El modelo que fue entrenado es solo para palabras selectas en ingles, palabras como:
                <p className="text-left px-10 py-2">
                    Yes - No - Up - Down - Left - Right - On - Off - Stop - Go
                </p>
                Con el tiempo mejoraré el modelo para que pueda reconocer más palabras y oraciones completas en español.
                Si te gusta o quisieras colaborar hazmelo saber ;)
              </div>
            </div>
          </section >
          
          <section className="md:col-span-1">
            <Transcripcion 
            
            
            />
          </section>

          



        </main>

      </div>
      

    </>
  )
}

export default App

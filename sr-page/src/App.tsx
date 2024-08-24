
function App() {

  return (
    <>
      <header className="bg-teal-300 py-5">

        <h1 className="text-center text-4xl font-black">
          Reconocimiento de voz v1.0
        </h1>

      </header>

      <body className="bg-slate-100 py-10">

        <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 bg-slate-200 px-5">

        <section className="md:col-span-1 text-center">
            <h2 className="text-2xl font-bold mb-5">Grabación</h2>
            <button className="bg-teal-500 text-white font-bold py-2 px-5 rounded-md">Iniciar grabación</button>
            <button className="bg-red-500 text-white font-bold py-2 px-5 rounded-md ml-5">Detener grabación</button>
            <div className="mt-5">
              <p className="text-2xl font-bold py-3">¿Qué grabar?</p>
              <p className="text-lg text-left px-5 py-2 bg-slate-500 text-slate-100 rounded-lg mx-6">
                El modelo que fue entrenado es solo para palabras selectas en ingles, palabras como:
                <div className="text-left px-10 py-2">
                    Yes - No - Up - Down - Left - Right - On - Off - Stop - Go
                </div>
                Con el tiempo mejoraré el modelo para que pueda reconocer más palabras y oraciones completas en español.
                Si te gusta o quisieras colaborar hazmelo saber ;)
              </p>
            </div>
          </section >
          
          <section className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-5">Transcripción</h2>
            <div className="bg-slate-400 text-slate-950 p-5 rounded-lg">
              <p className="text-lg text-left">Aún no se grabo nada</p>
            </div>
            <button className="bg-teal-500 text-white font-bold py-2 px-5 rounded-md mt-5">Reproducir grabación</button>
          </section>

          



        </main>

      </body>
      

    </>
  )
}

export default App

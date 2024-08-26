
type AudioRecorderProps = {
    audioURL: string,
    prediction: string
}


export default function Transcripcion({ audioURL,prediction }: AudioRecorderProps) {
  return (
    <>
    
    <h2 className="text-2xl font-bold mb-5">Palabra Reconocida</h2>
    <div className="bg-slate-400 text-slate-950 p-5 rounded-lg">
        {prediction ? <p className="text-lg text-left">{prediction}</p> : <p className="text-lg text-left">Aún no se grabo nada</p>}
    </div>
    
    <div className="flex justify-center">
        {audioURL && <audio src={audioURL} controls className="block mt-5"></audio>}
    </div>
    

    </>
  )
}

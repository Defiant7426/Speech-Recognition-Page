
type AudioRecorderProps = {
    isRecording: boolean,
    startRecording: () => void,
    stopRecording: () => void
}

export default function Grabacion({ isRecording, startRecording, stopRecording }: AudioRecorderProps) {

  return (
    <>
        <h2 className="text-2xl font-bold mb-5">Grabación</h2>
        <button className="bg-teal-500 text-white font-bold py-2 px-5 rounded-md disabled:opacity-50 hover:bg-teal-700"
            onClick={startRecording} disabled={isRecording}
            >Iniciar grabación</button>
        <button className="bg-red-500 text-white font-bold py-2 px-5 rounded-md ml-5 disabled:opacity-50 hover:bg-red-700"
            onClick={stopRecording} disabled={!isRecording}
            >Detener grabación</button>
    
    </>
  )
}

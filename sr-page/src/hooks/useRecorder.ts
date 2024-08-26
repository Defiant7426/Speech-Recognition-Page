import { useEffect,useState } from "react"

export default function useRecorder() {

    const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioURL, setAudioURL] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [prediction, setPrediction] = useState('')

    useEffect(() => { 
        if(recorder===null) { // si no hay grabación
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // si el navegador soporta getUserMedia
                console.log('getUserMedia supported.')
                navigator.mediaDevices.getUserMedia( { audio: true } ) // pedimos permiso para grabar audio
                    .then(stream => {
                        const newRecorder = new MediaRecorder(stream) // creamos un nuevo objeto MediaRecorder
                        setRecorder(newRecorder) // guardamos el objeto en el estado
                    })
                    .catch(err => console.error('Error: ', err))
            }
        }

        return () => {
            if(recorder) {
                recorder.stream.getTracks().forEach(track => track.stop()) // detenemos la grabación
            }
        }
    }, [recorder])

    const startRecording = () => { // función para iniciar la grabación
        if(recorder) {
            recorder.start() // iniciamos la grabación
            setIsRecording(true)

            recorder.ondataavailable = (e) => {
                const audioBlob = new Blob([e.data], { type : 'audio/wav' }) // creamos un blob con los datos de la grabación
                setAudioBlob(audioBlob)
                const audioURL = URL.createObjectURL(audioBlob) // creamos una URL para reproducir el audio
                setAudioURL(audioURL)
            }
        }
    }

    const stopRecording = () => {
        return new Promise<void>((resolve) => {
          if (recorder && isRecording) {
            recorder.onstop = () => {
              setIsRecording(false);
              resolve();
            };
            recorder.stop();
          } else {
            resolve();
          }
        });
      };

    // aqui enviamos el audioBlob a la API de FastAPI

    const sendAudio = async (url: string) => {
        console.log('Estado: ', audioBlob)
        if(audioBlob) {
            const formData = new FormData() // creamos un objeto FormData, esto  es necesario para enviar archivos
            formData.append('file', audioBlob, 'recording.wav')
            console.log('Enviando audio...')
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                })
                if(!response.ok) {
                    throw new Error('Error al enviar el audio')
                }
                const data = await response.json() // convertimos la respuesta a JSON
                setPrediction(data.prediction)
                console.log('Predicción: ', data.prediction)
            } catch (error) {
                console.error('Error al enviar el audio: ', error)
            }
        }
    }

  return {
    audioURL,
    isRecording,
    prediction,
    startRecording,
    stopRecording,
    sendAudio,
    audioBlob
  }
    
}

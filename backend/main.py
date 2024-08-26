from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
import os
from scipy.io import wavfile
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("model/model.h5")

clases = ['bed',
 'bird',
 'cat',
 'dog',
 'down',
 'eight',
 'five',
 'four',
 'go',
 'happy',
 'house',
 'left',
 'marvin',
 'nine',
 'no',
 'off',
 'on',
 'one',
 'right',
 'seven',
 'sheila',
 'six',
 'stop',
 'three',
 'tree',
 'two',
 'up',
 'wow',
 'yes',
 'zero']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:

        if not os.path.exists("temp"):
            os.mkdir("temp")

        file_location = f"temp/{file.filename}"
        with open(file_location, "wb") as f:
           f.write(file.file.read())

        sample_data, sample = wavfile.read(file_location)

        samples = sample_data.astype(np.float32)
        samples = samples / np.max(np.abs(samples))
        samples = samples.reshape(1, -1)

        prediction = model.predict(samples)
        predicted_class = clases[np.argmax(prediction)]

        os.remove(file_location)

        #return JSONResponse(content={"prediction": predicted_class})
        return JSONResponse(content={"prediction": "pruebita"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
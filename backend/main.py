from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import os
import librosa
import logging

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
CORS(app)


# Configurar el logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model = tf.keras.models.load_model("model/model.h5")

clases = ['bed', 'bird', 'cat', 'dog', 'down', 'eight', 'five', 'four', 'go', 'happy', 'house', 'left', 'marvin', 'nine', 'no', 'off', 'on', 'one', 'right', 'seven', 'sheila', 'six', 'stop', 'three', 'tree', 'two', 'up', 'wow', 'yes', 'zero']

@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files['file']
        logger.info("Received file: %s", file.filename)

        if not os.path.exists("temp"):
            os.mkdir("temp")
            logger.info("Created temp directory")

        file_location = f"temp/{file.filename}"
        file.save(file_location)
        logger.info("File saved to %s", file_location)

        # Load audio file using librosa
        try:
            samples, sample_rate = librosa.load(file_location, sr=1600)
            logger.info("File read successfully with librosa")

            # Reescalar la tasa de muestreo a 8 kHz
            samples = librosa.resample(samples, orig_sr=16000, target_sr=8000)

            # Normalizar los datos
            samples = samples.astype(np.float32)
            samples = samples / np.max(np.abs(samples))

            # Redimensionar para que la longitud sea de 8000 muestras
            if len(samples) == 8000:
                samples = samples.reshape(1, -1)
            else:
                # Si el tamaño no coincide, podemos rellenar o truncar
                if len(samples) < 8000:
                    samples = np.pad(samples, (0, 8000 - len(samples)), mode='constant')
                else:
                    samples = samples[:8000]
                samples = samples.reshape(1, -1)

            logger.info("File processed successfully")
        except Exception as e:
            logger.error("Error reading WAV file with librosa: %s", e)
            return jsonify({"error": "Error reading WAV file"}), 500

        # Realizar la predicción
        prediction = model.predict(samples)
        predicted_class = clases[np.argmax(prediction)]
        logger.info("Prediction made successfully")

        # Eliminar el archivo temporal
        os.remove(file_location)
        logger.info("Temporary file removed")

        return jsonify({"prediction": predicted_class})
    except Exception as e:
        logger.error("Error processing file: %s", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

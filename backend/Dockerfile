# Usar una imagen base de Python
FROM python:3.9-slim

# Instalar dependencias del sistema necesarias para librosa y soundfile
RUN apt-get update && apt-get install -y \
    libsndfile1 \
    ffmpeg

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requisitos y la aplicación al contenedor
COPY requirements.txt requirements.txt
COPY . .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["python", "main.py"]

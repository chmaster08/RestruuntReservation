FROM python:3.10
WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r requirements.txt --no-cache-dir
EXPOSE 5000
COPY ./ ./app/

CMD ["python", "app.py"]

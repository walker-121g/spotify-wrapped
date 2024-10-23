FROM node:21

RUN apt-get update && \
    apt-get install -y python3 python3-pip make python3-venv

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN npm install -g pnpm

WORKDIR /app

COPY . ./

RUN /opt/venv/bin/pip3 install -Ur requirements.txt

RUN cd frontend && pnpm install

RUN make build-frontend

EXPOSE 8000

CMD ["/opt/venv/bin/python3", "./backend/manage.py", "runserver", "0.0.0.0:8000"]
FROM denoland/deno:latest as base

WORKDIR /app

COPY . ./

RUN deno cache src/config/deps.ts

EXPOSE 9090

CMD ["run", "--allow-net", "--allow-write", "--allow-env", "--allow-read", "src/mod.ts"]
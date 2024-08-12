FROM node:22-alpine

RUN apk add --update --no-cache openssl

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000:4000

RUN npx prisma generate
RUN npx prisma migrate dev

CMD [ "yarn", "run", "dev" ]

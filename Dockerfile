FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/sqlite.db
ENV IMAGE_STORAGE_PATH=/data/uploads
ENV JWT_SECRET=build-placeholder

RUN npm run build

EXPOSE 3000

CMD ["sh", "./start.sh"]

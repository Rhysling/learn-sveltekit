FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/sqlite.db
ENV IMAGE_STORAGE_PATH=/data/uploads

CMD ["sh", "-c", "npx prisma migrate deploy && node build"]

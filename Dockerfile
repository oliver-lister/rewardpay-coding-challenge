FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN echo "Running tests..." && npm test --verbose

RUN echo "Building application..." && npm run build

CMD ["npm", "start"]

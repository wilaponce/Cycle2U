# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Tailwind CSS and Framer Motion
RUN npm install -D tailwindcss postcss autoprefixer
RUN npm install motion
RUN npm install framer-motion
RUN npm install react-leaflet@4.2.1 leaflet

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

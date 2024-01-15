# Stage 1: Build Angular application
FROM node:20.0.0 as build

WORKDIR /usr/local/app

COPY package*.json ./

COPY ./ /usr/local/app/

RUN npm install --force

WORKDIR /usr/local/app
RUN npm install -g @angular/cli  # Install Angular CLI globally
RUN ng build

# Stage 2: Create production-ready image with NGINX
FROM nginx:latest

COPY default.conf /etc/nginx/conf.d
COPY --from=build /usr/local/app/dist/ProyectoFinal /usr/share/nginx/html

EXPOSE 80

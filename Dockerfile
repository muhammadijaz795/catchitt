# Stage 2: Serve app with nginx server, by moving dist folder to nginx directory
FROM nginx:latest

#override nginx config to include api reverse proxy
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

EXPOSE 83
CMD [ "/bin/bash", "-c", "nginx -g 'daemon off;'" ]




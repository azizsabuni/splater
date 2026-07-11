FROM nginx:alpine

# Copy static assets into Nginx html directory
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

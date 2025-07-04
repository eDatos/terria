###
# Dockerfile usado para consutruir la imagen del terria
#
# Antes de construir la imagen debemos haber compilado previamente el proyecto (desde el directorio raíz):
#
# mvn clean package
#
# A continuación podremos construir la imagen ejecutando siempre desde el directorio raíz del proyecto:
#
# docker build -f dockerfiles/Dockerfile -t terria:<version> .
#
# Para ejecutar un contenedor asociado a esta imagen:
# docker run -i --rm -p 8080:80 terria:<version>
#
###
FROM nginx:alpine
COPY ./wwwroot /usr/share/nginx/html

EXPOSE 80

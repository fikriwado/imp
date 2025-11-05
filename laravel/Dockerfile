FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

ARG USER=appuser

RUN addgroup -g 1000 ${USER} \
    && adduser -D -u 1000 -G ${USER} ${USER}

RUN apk add --no-cache git unzip

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY --chown=${USER}:${USER} composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY --chown=${USER}:${USER} . .

RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

USER ${USER}

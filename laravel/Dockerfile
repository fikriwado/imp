FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

ARG USER=appuser

RUN apk add --no-cache git unzip \
    && docker-php-ext-install pdo pdo_mysql

RUN addgroup -g 1000 ${USER} \
    && adduser -D -u 1000 -G ${USER} ${USER}

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY --chown=${USER}:${USER} composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY --chown=${USER}:${USER} . .

RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

USER ${USER}

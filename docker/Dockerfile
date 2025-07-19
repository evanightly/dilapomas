FROM php:8.4-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    supervisor \
    cron

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u 1000 -d /home/sipengaduan sipengaduan
RUN mkdir -p /home/sipengaduan/.composer && \
    chown -R sipengaduan:sipengaduan /home/sipengaduan

# Copy application files
COPY . /var/www/html

# Install PHP dependencies
# RUN composer install --no-dev --optimize-autoloader --no-interaction

# Install Node.js dependencies and build assets
# RUN npm install && npm run build

# Set proper permissions
RUN chown -R sipengaduan:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy cron jobs
COPY docker/crontab /etc/cron.d/laravel-cron
RUN chmod 0644 /etc/cron.d/laravel-cron && crontab /etc/cron.d/laravel-cron

# Expose port 9000 and start php-fpm server
EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

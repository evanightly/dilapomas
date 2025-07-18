#!/bin/bash

# Production deployment script for sipengaduan
# This script sets up the production environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Configuration
PROJECT_DIR="/home/sipengaduan"
BACKUP_DIR="/var/backups/sipengaduan"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root"
    exit 1
fi

# Create necessary directories
log "Creating necessary directories..."
mkdir -p "$PROJECT_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p /var/log/sipengaduan

# Set up Git repository
if [ ! -d "$PROJECT_DIR/.git" ]; then
    log "Cloning repository..."
    git clone https://github.com/evanightly/dilapomas.git "$PROJECT_DIR"
else
    log "Repository already exists, updating..."
    cd "$PROJECT_DIR"
    git fetch --all
    git reset --hard origin/main
fi

# Set up environment file
log "Setting up environment file..."
cd "$PROJECT_DIR"
if [ ! -f ".env" ]; then
    cp .env.example .env
    warning "Please update .env file with your production settings"
fi

# Create initial containers
log "Building and starting containers..."
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
log "Waiting for services to be ready..."
sleep 30

# Run Laravel setup
log "Running Laravel setup..."
docker exec sipengaduan-app php artisan key:generate --force
docker exec sipengaduan-app php artisan migrate --force
docker exec sipengaduan-app php artisan config:cache
docker exec sipengaduan-app php artisan route:cache
docker exec sipengaduan-app php artisan view:cache
docker exec sipengaduan-app php artisan storage:link

# Set up cron job for backups
log "Setting up backup cron job..."
cat > /etc/cron.d/sipengaduan-backup << 'EOF'
# Backup sipengaduan database daily at 2 AM
0 2 * * * root /usr/local/bin/backup-sipengaduan.sh >> /var/log/sipengaduan/backup.log 2>&1
EOF

# Create backup script
cat > /usr/local/bin/backup-sipengaduan.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/sipengaduan"
DATE=$(date +%Y%m%d-%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
docker exec sipengaduan-db mysqldump -u root -p${DB_PASSWORD} ${DB_DATABASE} > "$BACKUP_DIR/database-$DATE.sql"

# Backup storage
tar -czf "$BACKUP_DIR/storage-$DATE.tar.gz" -C /home/sipengaduan/storage .

# Remove old backups (keep last 7 days)
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup-sipengaduan.sh

# Set up log rotation
log "Setting up log rotation..."
cat > /etc/logrotate.d/sipengaduan << 'EOF'
/home/sipengaduan/storage/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 664 1000 www-data
    postrotate
        docker exec sipengaduan-app php artisan cache:clear
    endscript
}
EOF

# Set up firewall rules
log "Setting up firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

log "Production setup completed successfully!"
log "Next steps:"
log "1. Update .env file with your production settings"
log "2. Set up GitHub secrets for deployment"
log "3. Your application will be accessible at: http://YOUR_VPS_IP"
log ""
log "Optional (later when you get a domain):"
log "1. Set up SSL certificate"
log "2. Configure your domain DNS"

log "Access your application at: http://YOUR_VPS_IP"

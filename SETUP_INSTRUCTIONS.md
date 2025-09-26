# PoultryConnect Database Setup Instructions

## Prerequisites

Before setting up the database, ensure you have the following installed:

1. **PostgreSQL 13+** - Download from [postgresql.org](https://www.postgresql.org/download/)
2. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
3. **npm** - Comes with Node.js

## Quick Setup Guide

### 1. Database Setup

```bash
# Create PostgreSQL database
sudo -u postgres createdb poultryconnect_dev
sudo -u postgres createdb poultryconnect_test

# Create user (optional, can use default postgres user)
sudo -u postgres createuser poultryconnect_user
sudo -u postgres psql -c "ALTER USER poultryconnect_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE poultryconnect_dev TO poultryconnect_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE poultryconnect_test TO poultryconnect_user;"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your database credentials
nano .env
```

### 3. Environment Configuration

Edit the `.env` file with your specific configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=poultryconnect_dev
DB_NAME_TEST=poultryconnect_test
DB_USER=postgres
DB_PASSWORD=your_password_here

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 4. Run Migrations

```bash
# Run database migrations
npm run migrate

# Seed initial data
npm run seed
```

### 5. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Detailed Setup Instructions

### Database Schema Migration

The migration script will:

1. **Create all tables** with proper relationships and constraints
2. **Add indexes** for performance optimization
3. **Create triggers** for automatic timestamp updates
4. **Create views** for common queries
5. **Insert initial system settings**

### Initial Data Seeding

The seed script will populate the database with:

1. **Sample Users** - Test accounts for development
2. **Feed Types** - Common poultry feed categories
3. **Knowledge Articles** - Educational content
4. **Market Prices** - Historical price data for the last 30 days

### Sample User Accounts

After seeding, you can use these test accounts:

| Email | Password | Role |
|-------|----------|------|
| john.doe@example.com | password123 | Farmer |
| mary.smith@example.com | password123 | Farmer |
| ahmed.hassan@example.com | password123 | Farmer |

## API Endpoints

Once the server is running, you can access the API at `http://localhost:3000`

### Authentication Endpoints

```bash
# Register new user
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Management Endpoints

```bash
# Get user profile
GET /api/users/profile
Authorization: Bearer <token>

# Update user profile
PUT /api/users/profile
Authorization: Bearer <token>
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348012345678"
}
```

### Farm Management Endpoints

```bash
# Get user's farms
GET /api/farms
Authorization: Bearer <token>

# Create new farm
POST /api/farms
Authorization: Bearer <token>
{
  "name": "My Farm",
  "address": "123 Farm Road",
  "city": "Lagos",
  "state": "Lagos",
  "latitude": 6.5244,
  "longitude": 3.3792
}

# Get farm details
GET /api/farms/:farmId
Authorization: Bearer <token>
```

### Flock Management Endpoints

```bash
# Get farm's flocks
GET /api/farms/:farmId/flocks
Authorization: Bearer <token>

# Create new flock
POST /api/farms/:farmId/flocks
Authorization: Bearer <token>
{
  "name": "Broiler Flock 1",
  "breed": "Ross 308",
  "poultryType": "broiler",
  "purpose": "meat",
  "dateAcquired": "2024-01-01",
  "initialQuantity": 100,
  "ageWeeks": 4
}
```

### Market Price Endpoints

```bash
# Get current market prices
GET /api/market-prices

# Get price history
GET /api/market-prices/history?productType=chicken&location=Lagos&days=30

# Set price alert
POST /api/price-alerts
Authorization: Bearer <token>
{
  "productType": "chicken",
  "location": "Lagos",
  "alertType": "price_increase",
  "thresholdPrice": 3000
}
```

## Database Maintenance

### Regular Maintenance Tasks

```bash
# Update database statistics
psql -d poultryconnect_dev -c "ANALYZE;"

# Vacuum database
psql -d poultryconnect_dev -c "VACUUM ANALYZE;"

# Check database size
psql -d poultryconnect_dev -c "SELECT pg_size_pretty(pg_database_size('poultryconnect_dev'));"
```

### Backup and Restore

```bash
# Create backup
pg_dump -h localhost -U postgres -d poultryconnect_dev > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql -h localhost -U postgres -d poultryconnect_dev < backup_20240101_120000.sql
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if PostgreSQL is running
   - Verify connection parameters in `.env`
   - Check firewall settings

2. **Permission Denied**
   - Ensure database user has proper permissions
   - Check database ownership

3. **Migration Errors**
   - Check for existing tables that might conflict
   - Verify database user permissions
   - Check PostgreSQL version compatibility

### Performance Optimization

1. **Index Usage**
   ```sql
   -- Check index usage
   SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
   FROM pg_stat_user_indexes
   ORDER BY idx_scan DESC;
   ```

2. **Query Performance**
   ```sql
   -- Enable query logging
   SET log_statement = 'all';
   SET log_min_duration_statement = 1000; -- Log queries taking > 1 second
   ```

3. **Connection Pooling**
   - Use connection pooling for production
   - Monitor connection usage
   - Set appropriate pool sizes

## Production Deployment

### Environment Variables

For production, ensure these environment variables are set:

```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_NAME=poultryconnect_prod
DB_USER=your_production_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_very_secure_jwt_secret
```

### Security Considerations

1. **Database Security**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access by IP
   - Regular security updates

2. **Application Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs
   - Use secure headers

3. **Data Protection**
   - Encrypt sensitive data
   - Regular backups
   - Access logging
   - Data retention policies

## Monitoring and Logging

### Database Monitoring

```sql
-- Monitor active connections
SELECT count(*) as active_connections
FROM pg_stat_activity
WHERE state = 'active';

-- Monitor database size
SELECT pg_size_pretty(pg_database_size('poultryconnect_dev'));

-- Monitor slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Application Logging

The application includes comprehensive logging for:
- Database queries
- API requests
- Error tracking
- Performance metrics

## Support

For additional support:

1. Check the documentation in `DATABASE_DESIGN_DOCUMENTATION.md`
2. Review the database schema in `database-schema.sql`
3. Check application logs for error details
4. Verify environment configuration

## Next Steps

After successful setup:

1. **Test API endpoints** using the provided examples
2. **Create test data** for your specific use case
3. **Configure monitoring** for production deployment
4. **Set up automated backups** for data protection
5. **Plan scaling strategy** based on usage patterns

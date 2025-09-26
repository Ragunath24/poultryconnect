-- PoultryConnect Database Schema
-- Comprehensive database design for poultry management application
-- Supports scalability, data relationships, and real-time features

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE USER MANAGEMENT
-- =============================================

-- Users table - Core user information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url TEXT,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    location_latitude DECIMAL(10, 8),
    location_longitude DECIMAL(11, 8),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Nigeria',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User profiles - Extended profile information
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    experience_years INTEGER DEFAULT 0,
    farm_size_acres DECIMAL(8, 2),
    primary_poultry_type VARCHAR(50),
    secondary_poultry_type VARCHAR(50),
    farming_method VARCHAR(50) CHECK (farming_method IN ('free_range', 'cage', 'deep_litter', 'battery_cage', 'organic')),
    certifications TEXT[], -- Array of certification names
    languages_spoken TEXT[], -- Array of language codes
    preferred_language VARCHAR(10) DEFAULT 'en' CHECK (preferred_language IN ('en', 'ta', 'hi')), -- User's preferred language
    social_media_links JSONB, -- Store social media URLs
    preferences JSONB, -- User preferences and settings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- POULTRY MANAGEMENT
-- =============================================

-- Farms - User's farm locations
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location_latitude DECIMAL(10, 8) NOT NULL,
    location_longitude DECIMAL(11, 8) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Nigeria',
    total_area_acres DECIMAL(8, 2),
    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Flocks - Groups of birds
CREATE TABLE flocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    poultry_type VARCHAR(50) NOT NULL CHECK (poultry_type IN ('broiler', 'layer', 'dual_purpose', 'turkey', 'duck', 'quail', 'guinea_fowl')),
    purpose VARCHAR(50) CHECK (purpose IN ('meat', 'eggs', 'breeding', 'dual_purpose')),
    date_acquired DATE NOT NULL,
    source VARCHAR(200), -- Where birds were purchased from
    initial_quantity INTEGER NOT NULL,
    current_quantity INTEGER NOT NULL,
    age_weeks INTEGER NOT NULL,
    expected_lifespan_weeks INTEGER,
    housing_type VARCHAR(50) CHECK (housing_type IN ('free_range', 'cage', 'deep_litter', 'battery_cage')),
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Individual birds tracking (for breeding/valuable birds)
CREATE TABLE birds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    tag_number VARCHAR(50) UNIQUE,
    breed VARCHAR(100),
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'unknown')),
    date_hatched DATE,
    weight_grams INTEGER,
    health_status VARCHAR(50) DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'sick', 'recovering', 'deceased')),
    is_breeding_stock BOOLEAN DEFAULT FALSE,
    parent_male_id UUID REFERENCES birds(id),
    parent_female_id UUID REFERENCES birds(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- FEED AND NUTRITION
-- =============================================

-- Feed types and inventory
CREATE TABLE feed_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('starter', 'grower', 'layer', 'broiler', 'supplement')),
    protein_percentage DECIMAL(5, 2),
    energy_kcal_per_kg INTEGER,
    description TEXT,
    manufacturer VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feed inventory
CREATE TABLE feed_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    feed_type_id UUID NOT NULL REFERENCES feed_types(id),
    quantity_kg DECIMAL(10, 2) NOT NULL,
    unit_cost DECIMAL(10, 2),
    purchase_date DATE,
    expiry_date DATE,
    supplier VARCHAR(200),
    batch_number VARCHAR(100),
    storage_location VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feeding records
CREATE TABLE feeding_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    feed_type_id UUID NOT NULL REFERENCES feed_types(id),
    quantity_kg DECIMAL(8, 2) NOT NULL,
    feeding_date DATE NOT NULL,
    feeding_time TIME,
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- HEALTH AND MEDICAL
-- =============================================

-- Vaccination records
CREATE TABLE vaccinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    vaccine_name VARCHAR(200) NOT NULL,
    vaccine_type VARCHAR(100),
    dosage VARCHAR(100),
    vaccination_date DATE NOT NULL,
    next_due_date DATE,
    administered_by VARCHAR(200),
    batch_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health records
CREATE TABLE health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID REFERENCES flocks(id) ON DELETE CASCADE,
    bird_id UUID REFERENCES birds(id) ON DELETE CASCADE,
    record_type VARCHAR(50) NOT NULL CHECK (record_type IN ('checkup', 'treatment', 'mortality', 'disease_outbreak')),
    condition VARCHAR(200),
    symptoms TEXT,
    treatment TEXT,
    medication VARCHAR(200),
    dosage VARCHAR(100),
    treatment_date DATE NOT NULL,
    recovery_date DATE,
    veterinarian VARCHAR(200),
    cost DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- PRODUCTION TRACKING
-- =============================================

-- Egg production records
CREATE TABLE egg_production (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    production_date DATE NOT NULL,
    eggs_collected INTEGER NOT NULL,
    eggs_broken INTEGER DEFAULT 0,
    eggs_dirty INTEGER DEFAULT 0,
    average_weight_grams DECIMAL(5, 2),
    quality_grade VARCHAR(10) CHECK (quality_grade IN ('A', 'B', 'C')),
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Weight tracking
CREATE TABLE weight_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    bird_id UUID REFERENCES birds(id) ON DELETE CASCADE,
    weight_grams INTEGER NOT NULL,
    measurement_date DATE NOT NULL,
    age_weeks INTEGER,
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mortality records
CREATE TABLE mortality_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    flock_id UUID NOT NULL REFERENCES flocks(id) ON DELETE CASCADE,
    bird_id UUID REFERENCES birds(id) ON DELETE CASCADE,
    death_date DATE NOT NULL,
    age_weeks INTEGER,
    cause_of_death VARCHAR(200),
    symptoms_before_death TEXT,
    disposal_method VARCHAR(100),
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- MARKET AND PRICING
-- =============================================

-- Market price data
CREATE TABLE market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_type VARCHAR(100) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL, -- kg, crate, dozen, etc.
    location VARCHAR(200) NOT NULL,
    market_name VARCHAR(200),
    price_date DATE NOT NULL,
    source VARCHAR(200), -- Data source/provider
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Price alerts
CREATE TABLE price_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_type VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('price_increase', 'price_decrease', 'price_threshold')),
    threshold_price DECIMAL(10, 2),
    percentage_change DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SALES AND TRANSACTIONS
-- =============================================

-- Sales records
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    sale_date DATE NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    product_description TEXT,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    buyer_name VARCHAR(200),
    buyer_contact VARCHAR(200),
    payment_method VARCHAR(50) CHECK (payment_method IN ('cash', 'bank_transfer', 'check', 'mobile_money')),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'overdue')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SOCIAL FEATURES
-- =============================================

-- Posts and content sharing
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type VARCHAR(50) DEFAULT 'general' CHECK (post_type IN ('general', 'question', 'tip', 'achievement', 'market_update')),
    media_urls TEXT[], -- Array of image/video URLs
    tags TEXT[], -- Array of hashtags
    location VARCHAR(200),
    is_public BOOLEAN DEFAULT TRUE,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments on posts
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES comments(id), -- For nested comments
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User connections/following
CREATE TABLE user_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    connection_type VARCHAR(50) DEFAULT 'follow' CHECK (connection_type IN ('follow', 'friend', 'mentor', 'mentee')),
    is_mutual BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- =============================================
-- KNOWLEDGE BASE
-- =============================================

-- Knowledge articles
CREATE TABLE knowledge_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    tags TEXT[],
    author_id UUID REFERENCES users(id),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- NOTIFICATIONS
-- =============================================

-- Notification system
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN ('system', 'price_alert', 'health_reminder', 'feeding_reminder', 'social', 'market_update')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT, -- Deep link or URL for action
    metadata JSONB, -- Additional data for the notification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SYSTEM AND AUDIT
-- =============================================

-- System settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type VARCHAR(50) DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for important actions
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(location_latitude, location_longitude);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Farm indexes
CREATE INDEX idx_farms_user_id ON farms(user_id);
CREATE INDEX idx_farms_location ON farms(location_latitude, location_longitude);
CREATE INDEX idx_farms_is_primary ON farms(is_primary) WHERE is_primary = TRUE;

-- Flock indexes
CREATE INDEX idx_flocks_farm_id ON flocks(farm_id);
CREATE INDEX idx_flocks_poultry_type ON flocks(poultry_type);
CREATE INDEX idx_flocks_date_acquired ON flocks(date_acquired);
CREATE INDEX idx_flocks_is_active ON flocks(is_active) WHERE is_active = TRUE;

-- Bird indexes
CREATE INDEX idx_birds_flock_id ON birds(flock_id);
CREATE INDEX idx_birds_tag_number ON birds(tag_number);
CREATE INDEX idx_birds_health_status ON birds(health_status);

-- Production indexes
CREATE INDEX idx_egg_production_flock_date ON egg_production(flock_id, production_date);
CREATE INDEX idx_weight_records_flock_date ON weight_records(flock_id, measurement_date);
CREATE INDEX idx_mortality_records_flock_date ON mortality_records(flock_id, death_date);

-- Market price indexes
CREATE INDEX idx_market_prices_product_date ON market_prices(product_type, price_date);
CREATE INDEX idx_market_prices_location ON market_prices(location);
CREATE INDEX idx_market_prices_date ON market_prices(price_date);

-- Social indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_post_type ON posts(post_type);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_user_connections_follower ON user_connections(follower_id);
CREATE INDEX idx_user_connections_following ON user_connections(following_id);

-- Notification indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =============================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_flocks_updated_at BEFORE UPDATE ON flocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_birds_updated_at BEFORE UPDATE ON birds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feed_inventory_updated_at BEFORE UPDATE ON feed_inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_articles_updated_at BEFORE UPDATE ON knowledge_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- User dashboard summary view
CREATE VIEW user_dashboard_summary AS
SELECT 
    u.id as user_id,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT f.id) as total_farms,
    COUNT(DISTINCT fl.id) as total_flocks,
    COALESCE(SUM(fl.current_quantity), 0) as total_birds,
    COUNT(DISTINCT s.id) as total_sales,
    COALESCE(SUM(s.total_amount), 0) as total_revenue
FROM users u
LEFT JOIN farms f ON u.id = f.user_id AND f.is_active = TRUE
LEFT JOIN flocks fl ON f.id = fl.farm_id AND fl.is_active = TRUE
LEFT JOIN sales s ON u.id = s.user_id
WHERE u.is_active = TRUE
GROUP BY u.id, u.first_name, u.last_name;

-- Flock performance summary view
CREATE VIEW flock_performance_summary AS
SELECT 
    fl.id as flock_id,
    fl.name as flock_name,
    fl.breed,
    fl.poultry_type,
    fl.current_quantity,
    fl.age_weeks,
    f.name as farm_name,
    u.first_name || ' ' || u.last_name as owner_name,
    COALESCE(AVG(ep.eggs_collected), 0) as avg_daily_eggs,
    COALESCE(AVG(wr.weight_grams), 0) as avg_weight_grams,
    COUNT(mr.id) as total_mortalities
FROM flocks fl
JOIN farms f ON fl.farm_id = f.id
JOIN users u ON f.user_id = u.id
LEFT JOIN egg_production ep ON fl.id = ep.flock_id
LEFT JOIN weight_records wr ON fl.id = wr.flock_id
LEFT JOIN mortality_records mr ON fl.id = mr.flock_id
WHERE fl.is_active = TRUE
GROUP BY fl.id, fl.name, fl.breed, fl.poultry_type, fl.current_quantity, fl.age_weeks, f.name, u.first_name, u.last_name;

-- Market price trends view
CREATE VIEW market_price_trends AS
SELECT 
    product_type,
    product_name,
    location,
    price_per_unit,
    unit,
    price_date,
    LAG(price_per_unit) OVER (PARTITION BY product_type, location ORDER BY price_date) as previous_price,
    CASE 
        WHEN LAG(price_per_unit) OVER (PARTITION BY product_type, location ORDER BY price_date) IS NOT NULL 
        THEN ROUND(((price_per_unit - LAG(price_per_unit) OVER (PARTITION BY product_type, location ORDER BY price_date)) / LAG(price_per_unit) OVER (PARTITION BY product_type, location ORDER BY price_date)) * 100, 2)
        ELSE NULL 
    END as price_change_percentage
FROM market_prices
ORDER BY product_type, location, price_date DESC;

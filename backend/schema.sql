
-- Lead Capture Table

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  business_name VARCHAR(150),
  message TEXT,

  ai_score VARCHAR(20),          -- Hot / Warm / Cold
  ai_reason TEXT,                -- one-line reason
  ai_email_draft TEXT,           -- AI generated email

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
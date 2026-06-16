CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  business_name VARCHAR(150),
  message TEXT,

  ai_score VARCHAR(10),
  ai_reason TEXT,
  ai_email_draft TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
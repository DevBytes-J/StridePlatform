-- Tours table
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft', -- draft, active
  steps JSONB DEFAULT '[]',
  views INTEGER DEFAULT 0,
  completions INTEGER DEFAULT 0,
  avg_time INTEGER DEFAULT 0, -- in seconds
  rating DECIMAL(2,1) DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_high_priority BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own tours"
  ON tours FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tours"
  ON tours FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tours"
  ON tours FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tours"
  ON tours FOR DELETE
  USING (auth.uid() = user_id);

-- Index
CREATE INDEX tours_user_id_idx ON tours(user_id);

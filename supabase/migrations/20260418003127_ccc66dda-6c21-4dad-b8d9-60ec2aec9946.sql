-- Feedback table (Google-style reviews)
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Validation: rating 1..5 and lengths via trigger (no time-dep so check is fine, but use trigger for consistency)
CREATE OR REPLACE FUNCTION public.validate_feedback()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'rating must be between 1 and 5';
  END IF;
  IF length(NEW.name) < 1 OR length(NEW.name) > 60 THEN
    RAISE EXCEPTION 'name length invalid';
  END IF;
  IF length(NEW.message) < 1 OR length(NEW.message) > 1000 THEN
    RAISE EXCEPTION 'message length invalid';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_validate_feedback
BEFORE INSERT OR UPDATE ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.validate_feedback();

CREATE TRIGGER trg_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved feedback"
ON public.feedback FOR SELECT
USING (approved = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit feedback"
ON public.feedback FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update feedback"
ON public.feedback FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete feedback"
ON public.feedback FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Multi-images for products
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS images TEXT[] NOT NULL DEFAULT '{}';
# StridePlatform API Endpoints

Base URL: `https://stride-platform.vercel.app`

## 1. Get Tour Configuration

Fetch the tour configuration including all steps.

**Endpoint:** `GET /api/tours/:tourId`

**Request:**
```
GET https://stride-platform.vercel.app/api/tours/abc123
```

**Response (200 OK):**
```json
{
  "id": "abc123",
  "title": "My Awesome Tour",
  "steps": [
    {
      "id": "step_1",
      "title": "Welcome!",
      "content": "Click here to start.",
      "target_selector": "#start-btn",
      "position": "bottom"
    },
    {
      "id": "step_2",
      "title": "Next Step",
      "content": "Now try this feature.",
      "target_selector": ".feature-btn",
      "position": "top"
    }
  ]
}
```

**Response (404 Not Found):**
```json
{
  "error": "Tour not found"
}
```

**Position Values:** `"top"`, `"bottom"`, `"left"`, `"right"`

---

## 2. Track Tour Events

Log user interactions with the tour.

**Endpoint:** `POST /api/tours/:tourId/events`

**Request:**
```
POST https://stride-platform.vercel.app/api/tours/abc123/events
Content-Type: application/json

{
  "eventType": "step_completed",
  "stepId": "step_1"
}
```

**Event Types:**
- `"tour_started"` - User started the tour
- `"step_completed"` - User completed a step
- `"step_skipped"` - User skipped a step
- `"tour_completed"` - User finished the entire tour
- `"tour_dismissed"` - User closed/dismissed the tour

**Response (200 OK):**
```json
{
  "success": true
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid request body"
}
```

---

## CORS Configuration

All endpoints support CORS with the following headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST`
- `Access-Control-Allow-Headers: Content-Type`

---

## Usage in StrideCore

### Example: Fetch Tour

```typescript
const PLATFORM_URL = 'https://stride-platform.vercel.app';

export async function fetchTour(tourId: string) {
  try {
    const res = await fetch(`${PLATFORM_URL}/api/tours/${tourId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch tour:', err);
    return null;
  }
}
```

### Example: Track Event

```typescript
const PLATFORM_URL = 'https://stride-platform.vercel.app';

export async function trackEvent(tourId: string, eventType: string, stepId?: string) {
  try {
    await fetch(`${PLATFORM_URL}/api/tours/${tourId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, stepId })
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}
```

### Example: Complete Integration

```typescript
// lib/api-client.ts
const PLATFORM_URL = 'https://stride-platform.vercel.app';

export interface Tour {
  id: string;
  title: string;
  steps: TourStep[];
}

export interface TourStep {
  id: string;
  title: string;
  content: string;
  target_selector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export async function fetchTour(tourId: string): Promise<Tour | null> {
  try {
    const res = await fetch(`${PLATFORM_URL}/api/tours/${tourId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch tour:', err);
    return null;
  }
}

export async function trackEvent(
  tourId: string, 
  eventType: 'tour_started' | 'step_completed' | 'step_skipped' | 'tour_completed' | 'tour_dismissed',
  stepId?: string
): Promise<void> {
  try {
    await fetch(`${PLATFORM_URL}/api/tours/${tourId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, stepId })
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}
```

---

## Testing

### Test GET endpoint:
```bash
curl https://stride-platform.vercel.app/api/tours/abc123
```

### Test POST endpoint:
```bash
curl -X POST https://stride-platform.vercel.app/api/tours/abc123/events \
  -H "Content-Type: application/json" \
  -d '{"eventType":"tour_started"}'
```

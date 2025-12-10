# Stride Platform API Endpoints

## Base URL
```
https://stride-platform.vercel.app
```

## Endpoints for StrideCore Widget

### 1. Get Tour Configuration
**Endpoint:** `GET /api/tours/{tourId}`

**Example:**
```
GET https://stride-platform.vercel.app/api/tours/abc-123-def-456
```

**Response:**
```json
{
  "id": "abc-123-def-456",
  "title": "Welcome Tour",
  "steps": [
    {
      "id": "step_1",
      "title": "Welcome!",
      "content": "Click here to start.",
      "target_selector": "#start-button",
      "position": "bottom"
    },
    {
      "id": "step_2",
      "title": "Next Step",
      "content": "This is the second step.",
      "target_selector": ".menu-item",
      "position": "right"
    }
  ]
}
```

### 2. Track Tour Events
**Endpoint:** `POST /api/tours/{tourId}/events`

**Example:**
```
POST https://stride-platform.vercel.app/api/tours/abc-123-def-456/events
```

**Request Body:**
```json
{
  "eventType": "tour_started",
  "stepId": null
}
```

**Event Types:**
- `tour_started` - User started the tour (increments views)
- `step_completed` - User completed a step
- `tour_completed` - User finished entire tour (increments completions)

**Response:**
```json
{
  "success": true
}
```

## Testing the Integration

### Step 1: Create a Tour
1. Go to https://stride-platform.vercel.app
2. Sign up and create an account
3. Create a new tour with steps
4. Publish the tour
5. Copy the tour ID from the analytics page

### Step 2: Test API Endpoints Manually
**Test tour fetch:**
```bash
curl https://stride-platform.vercel.app/api/tours/YOUR_TOUR_ID
```

**Test event tracking:**
```bash
curl -X POST https://stride-platform.vercel.app/api/tours/YOUR_TOUR_ID/events \
  -H "Content-Type: application/json" \
  -d '{"eventType": "tour_started"}'
```

### Step 3: Test Widget Integration
Create a simple HTML file to test:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Stride Widget</title>
</head>
<body>
    <h1>My Test Website</h1>
    <button id="start-button">Get Started</button>
    <div class="menu-item">Menu Item</div>
    
    <!-- Replace YOUR_TOUR_ID with actual tour ID -->
    <script src="https://your-stridecore-domain.com/embed.js" data-tour-id="YOUR_TOUR_ID"></script>
</body>
</html>
```

### Step 4: Verify Analytics
1. After testing the widget, go back to your dashboard
2. Check the Analytics page
3. Verify that views and completions are being tracked

## Embed Code
Get this from your tour's Analytics page:
```html
<script src="https://your-stridecore-domain.com/embed.js" data-tour-id="YOUR_TOUR_ID"></script>
```

## StrideCore Widget Configuration
Update your `lib/api-client.ts`:
```typescript
const PLATFORM_URL = 'https://stride-platform.vercel.app';

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

## CORS Headers
All endpoints include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

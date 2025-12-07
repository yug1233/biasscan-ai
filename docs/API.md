# API Documentation

BiasScan AI provides a comprehensive set of functions for bias detection and data management.

## Table of Contents

- [Bias Detection](#bias-detection)
- [Authentication](#authentication)
- [Database Operations](#database-operations)
- [PDF Generation](#pdf-generation)
- [Utilities](#utilities)

## Bias Detection

### `detectBias(file, fileType)`

Analyzes a file for bias patterns.

**Parameters:**
- `file` (File): The file to analyze
- `fileType` (string): Either 'csv' or 'image'

**Returns:**
```javascript
{
  biases: [
    {
      type: 'Gender',
      distribution: { male: '60', female: '40' },
      riskLevel: 'Medium',
      recommendation: 'Resample to achieve 50/50 balance...'
    }
  ],
  overallRisk: 'Medium',
  totalRows: 100,
  columnsAnalyzed: 3,
  timestamp: '2024-12-07T...'
}
```

**Example:**
```javascript
import { detectBias } from './lib/biasDetection'

const file = event.target.files[0]
const results = await detectBias(file, 'csv')
console.log(results.overallRisk) // 'High', 'Medium', or 'Low'
```

### `generateCleanedDataset(originalData, biasMetrics)`

Generates a resampled dataset with reduced bias.

**Parameters:**
- `originalData` (Array): Original dataset
- `biasMetrics` (Object): Bias analysis results

**Returns:** Array of resampled data

### `exportToCSV(data, filename)`

Exports data to CSV file.

**Parameters:**
- `data` (Array): Data to export
- `filename` (string): Output filename

**Example:**
```javascript
import { exportToCSV } from './lib/biasDetection'

exportToCSV(cleanedData, 'cleaned-dataset.csv')
```

## Authentication

### `signUp(email, password)`

Creates a new user account.

**Parameters:**
- `email` (string): User email
- `password` (string): User password (min 6 characters)

**Returns:**
```javascript
{
  data: { user, session },
  error: null
}
```

**Example:**
```javascript
import { signUp } from './lib/supabase'

const { data, error } = await signUp('user@example.com', 'password123')
if (error) console.error(error.message)
```

### `signIn(email, password)`

Signs in an existing user.

**Parameters:**
- `email` (string): User email
- `password` (string): User password

**Returns:** Same as signUp

### `signInWithGoogle()`

Initiates Google OAuth flow.

**Returns:**
```javascript
{
  data: { provider, url },
  error: null
}
```

### `signOut()`

Signs out the current user.

**Returns:**
```javascript
{ error: null }
```

### `getCurrentUser()`

Gets the currently authenticated user.

**Returns:** User object or null

## Database Operations

### `createScan(scanData)`

Saves a scan to the database.

**Parameters:**
```javascript
{
  user_id: 'uuid',
  file_name: 'dataset.csv',
  file_size: 1024,
  file_type: 'csv',
  bias_metrics: { ... },
  overall_risk: 'Medium'
}
```

**Returns:**
```javascript
{
  data: [{ id, created_at, ... }],
  error: null
}
```

### `getUserScans(userId)`

Retrieves all scans for a user.

**Parameters:**
- `userId` (string): User UUID

**Returns:** Array of scan objects

### `createReview(reviewData)`

Creates a new review.

**Parameters:**
```javascript
{
  user_id: 'uuid',
  rating: 5,
  comment: 'Great tool!',
  status: 'pending'
}
```

### `getReviews(limit)`

Gets approved reviews.

**Parameters:**
- `limit` (number): Maximum reviews to return

**Returns:** Array of review objects

### `updateUserSubscription(userId, plan)`

Updates user's subscription plan.

**Parameters:**
- `userId` (string): User UUID
- `plan` (string): 'free' or 'pro'

### `getUserProfile(userId)`

Gets user profile data.

**Parameters:**
- `userId` (string): User UUID

**Returns:** User profile object

## PDF Generation

### `generateBiasReport(biasMetrics, fileName)`

Generates and downloads a PDF report.

**Parameters:**
- `biasMetrics` (Object): Bias analysis results
- `fileName` (string): Original file name

**Example:**
```javascript
import { generateBiasReport } from './lib/pdfGenerator'

generateBiasReport(results, 'my-dataset.csv')
// Downloads: biasscan-report-{timestamp}.pdf
```

## Utilities

### `formatDate(date)`

Formats a date string.

**Parameters:**
- `date` (string): ISO date string

**Returns:** Formatted date (e.g., "December 7, 2024")

### `formatFileSize(bytes)`

Formats file size in human-readable format.

**Parameters:**
- `bytes` (number): File size in bytes

**Returns:** Formatted size (e.g., "1.5 MB")

### `truncateText(text, maxLength)`

Truncates text to specified length.

**Parameters:**
- `text` (string): Text to truncate
- `maxLength` (number): Maximum length

**Returns:** Truncated text with ellipsis

### `cn(...inputs)`

Merges Tailwind CSS classes.

**Parameters:**
- `inputs` (string[]): Class names to merge

**Returns:** Merged class string

**Example:**
```javascript
import { cn } from './lib/utils'

const className = cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)
```

## Error Handling

All async functions return an object with `data` and `error` properties:

```javascript
const { data, error } = await someFunction()

if (error) {
  console.error('Error:', error.message)
  // Handle error
} else {
  console.log('Success:', data)
  // Use data
}
```

## Rate Limits

- Free tier: 10 scans per month
- Pro tier: Unlimited scans
- File size limit: 100MB
- API calls: No hard limit (Supabase limits apply)

## Best Practices

1. **Always check for errors:**
   ```javascript
   const { data, error } = await createScan(scanData)
   if (error) throw error
   ```

2. **Use try-catch for async operations:**
   ```javascript
   try {
     const results = await detectBias(file, 'csv')
   } catch (error) {
     console.error('Detection failed:', error)
   }
   ```

3. **Validate input before processing:**
   ```javascript
   if (file.size > 100 * 1024 * 1024) {
     throw new Error('File too large')
   }
   ```

4. **Clean up resources:**
   ```javascript
   // Files are automatically cleaned from memory
   // No manual cleanup needed
   ```

## Support

For API questions or issues:
- Email: api@biasscan.ai
- GitHub Issues: [Report a bug](https://github.com/yug1233/biasscan-ai/issues)
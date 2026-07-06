# Dynamic Product Catalog System

Your Next.js website now includes an automated product image fetching system. You only need to provide product information (name, price, colors, and status), and the system will automatically fetch high-quality product images from the internet.

## How It Works

### 1. **Automatic Image Fetching**
- When a product is displayed, the system automatically fetches a high-quality image from Unsplash
- Images are fetched based on the product name (e.g., "iPhone 15", "iPad A16")
- Results are cached in memory for instant loading on subsequent requests

### 2. **Fallback Placeholder**
- If no image is found or if the API fails, a clean placeholder image is displayed
- This ensures your store never shows broken images

### 3. **High-Quality Images**
- Images are optimized using Next.js Image component
- Automatic responsive sizing
- Progressive loading for better UX

## Adding New Products

You only need to edit the `products` array in `/app/page.tsx`:

```typescript
const products: Product[] = [
  {
    name: "iPhone 15",
    price: "₱3,299",
    status: "Order Now",
  },
  {
    name: "iPad Air",
    price: "₱2,899",
    status: "Order Now",
  },
];
```

That's it! The system automatically:
- ✅ Fetches product images from the internet
- ✅ Caches images for fast loading
- ✅ Shows placeholders if images can't be found
- ✅ Never needs manual image uploads

## Configuration

### Unsplash API (Optional - for even better images)

To use real Unsplash images instead of placeholders:

1. Sign up at [https://unsplash.com/developers](https://unsplash.com/developers)
2. Create an application to get your Access Key
3. Add to your `.env.local`:
   ```
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```
4. Restart the dev server

### Product Image Customization

If you want to fetch images with specific color variants:

```typescript
// The system can search for color-specific images
// Example: "iPhone 15 Blue" instead of just "iPhone 15"
```

Currently, the system searches by product name only. For color-specific images, customize the search query when needed.

## API Endpoint

The system uses an internal API endpoint: `/api/images`

Query parameters:
- `product` (required): Product name to search for
- `color` (optional): Color variant

Example:
```
GET /api/images?product=iPhone%2015&color=Blue
```

## Image Caching Strategy

### Client-Side Cache
- Automatically caches fetched images in memory
- Instant loading for products viewed multiple times
- Persists during the user session

### Server-Side Cache
- API responses are cached for 24 hours
- Reduces API calls to Unsplash

## Troubleshooting

### Images Not Loading
1. Check browser console for errors
2. Verify product name matches actual product names
3. Try clearing browser cache
4. Restart the dev server

### No Unsplash API Key
- The system falls back to placeholder SVG images
- Add your Unsplash API key to enable real images
- See Configuration section above

### Custom Domain Images
To use your own image hosting instead of Unsplash:

1. Modify `/app/api/images/route.ts`
2. Replace Unsplash fetch with your image hosting API
3. Update `useProductImage` hook if needed

## Best Practices

1. **Product Names**: Use specific, clear names like "iPhone 15 Pro" not just "Phone"
2. **Testing**: Test new products to ensure images load correctly
3. **Performance**: Images are automatically optimized, no additional action needed
4. **Updates**: Images are cached - to refresh, clear the image cache in the API

## File Structure

```
components/
  └── ProductCard.tsx          # Uses useProductImage hook
  └── ProductModal.tsx         # Uses useProductImage hook
  └── CheckoutPage.tsx         # Uses useProductImage hook

app/
  └── page.tsx                 # Product definitions
  └── api/
      └── images/
          └── route.ts         # Image fetching API

hooks/
  └── useProductImage.ts       # Custom hook for image fetching
```

## Future Enhancements

Potential improvements you could add:
- Store images in a database instead of memory cache
- Add image optimization and cropping
- Support bulk image imports
- Add color-variant image search
- Integrate with e-commerce image APIs
- Add image management dashboard

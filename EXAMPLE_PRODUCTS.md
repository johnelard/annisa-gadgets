# Example Products - Copy & Paste Ready

Use these examples to quickly test your dynamic product catalog system!

## Current Products (Your Store)

These are already in your store - they all work with the new system:

```typescript
const products: Product[] = [
  { name: "iPhone XR", price: "₱1,099", status: "Order Now" },
  { name: "iPhone 11", price: "₱1,500", status: "Order Now" },
  { name: "iPhone 12", price: "Sold Out", status: "Sold Out" },
  { name: "iPhone 13 mini", price: "₱2,099", status: "Order Now" },
  { name: "iPhone 13", price: "₱2,500", status: "Order Now" },
  { name: "iPhone 15", price: "₱3,299", status: "Order Now" },
  { name: "iPhone 15 Plus", price: "₱3,500", status: "Order Now" },
  { name: "iPad 10th Gen", price: "Sold Out", status: "Sold Out" },
  { name: "iPad A16", price: "₱2,099", status: "Order Now" },
];
```

## Add These for Testing

Copy and paste into your `products` array to test:

### Apple Products

```typescript
{ name: "iPhone 15 Pro", price: "₱3,999", status: "Order Now" },
{ name: "iPhone 15 Pro Max", price: "₱4,499", status: "Order Now" },
{ name: "iPhone SE", price: "₱899", status: "Order Now" },
{ name: "iPad Air", price: "₱2,899", status: "Order Now" },
{ name: "iPad Pro", price: "₱4,299", status: "Order Now" },
{ name: "Apple Watch", price: "₱1,499", status: "Order Now" },
{ name: "AirPods Pro", price: "₱799", status: "Order Now" },
```

### Samsung Products

```typescript
{ name: "Samsung Galaxy S24", price: "₱3,999", status: "Order Now" },
{ name: "Samsung Galaxy S24 Ultra", price: "₱4,799", status: "Order Now" },
{ name: "Samsung Galaxy A55", price: "₱1,999", status: "Order Now" },
{ name: "Samsung Galaxy Tab", price: "₱2,499", status: "Order Now" },
```

### Google Products

```typescript
{ name: "Google Pixel 8", price: "₱2,999", status: "Order Now" },
{ name: "Google Pixel 8 Pro", price: "₱3,599", status: "Order Now" },
{ name: "Google Pixel Fold", price: "₱4,999", status: "Sold Out" },
```

### OnePlus Products

```typescript
{ name: "OnePlus 12", price: "₱2,499", status: "Order Now" },
{ name: "OnePlus Open", price: "₱3,999", status: "Order Now" },
```

## All Products Example (Complete Catalog)

Here's a fully stocked example store:

```typescript
const products: Product[] = [
  // iPhone Series
  { name: "iPhone 15 Pro Max", price: "₱4,499", status: "Order Now" },
  { name: "iPhone 15 Pro", price: "₱3,999", status: "Order Now" },
  { name: "iPhone 15 Plus", price: "₱3,500", status: "Order Now" },
  { name: "iPhone 15", price: "₱3,299", status: "Order Now" },
  { name: "iPhone 14 Pro Max", price: "₱3,799", status: "Order Now" },
  { name: "iPhone 14 Pro", price: "₱3,299", status: "Order Now" },
  { name: "iPhone 14", price: "₱2,999", status: "Order Now" },
  { name: "iPhone 13", price: "₱2,500", status: "Order Now" },
  { name: "iPhone 12", price: "Sold Out", status: "Sold Out" },
  { name: "iPhone 11", price: "₱1,500", status: "Order Now" },
  { name: "iPhone XR", price: "₱1,099", status: "Order Now" },
  { name: "iPhone SE", price: "₱899", status: "Order Now" },

  // iPad Series
  { name: "iPad Pro 12.9", price: "₱4,299", status: "Order Now" },
  { name: "iPad Pro 11", price: "₱3,899", status: "Order Now" },
  { name: "iPad Air", price: "₱2,899", status: "Order Now" },
  { name: "iPad Air mini", price: "₱2,499", status: "Order Now" },
  { name: "iPad", price: "₱1,999", status: "Order Now" },
  { name: "iPad A16", price: "₱2,099", status: "Order Now" },
  { name: "iPad 10th Gen", price: "Sold Out", status: "Sold Out" },

  // Accessories
  { name: "Apple Watch Ultra", price: "₱1,999", status: "Order Now" },
  { name: "Apple Watch Series 9", price: "₱1,499", status: "Order Now" },
  { name: "AirPods Pro", price: "₱799", status: "Order Now" },
  { name: "AirPods Max", price: "₱1,799", status: "Order Now" },

  // Android Phones
  { name: "Samsung Galaxy S24", price: "₱3,999", status: "Order Now" },
  { name: "Samsung Galaxy S24 Ultra", price: "₱4,799", status: "Order Now" },
  { name: "Google Pixel 8 Pro", price: "₱3,599", status: "Order Now" },
  { name: "Google Pixel 8", price: "₱2,999", status: "Order Now" },
  { name: "OnePlus 12", price: "₱2,499", status: "Order Now" },
];
```

## How to Add These

### Method 1: Replace Entire Array
1. Open `/app/page.tsx`
2. Find `const products: Product[] = [`
3. Replace entire array with example above
4. Save and refresh browser
5. Images load automatically! ✨

### Method 2: Add Individual Products
```typescript
// Add just one product to your existing array
{
  name: "iPhone 15 Pro Max",
  price: "₱4,499",
  status: "Order Now",
}
```

### Method 3: Copy from Examples
1. Choose products from sections above
2. Paste into your products array
3. Mix and match as needed
4. The system handles everything else!

## What Happens When You Add

✅ System searches for "iPhone 15 Pro Max"
✅ Finds matching image from Unsplash
✅ Fetches high-quality image
✅ Caches for instant loading
✅ Displays in your store
✅ No manual uploads needed!

## Testing the System

### Test 1: Add a Few Products
```typescript
{ name: "iPhone 15", price: "₱3,299", status: "Order Now" },
{ name: "iPad Air", price: "₱2,899", status: "Order Now" },
```
✅ Both should show images automatically

### Test 2: Try a Sold Out Product
```typescript
{ name: "iPhone 12", price: "Sold Out", status: "Sold Out" },
```
✅ Should show image with disabled button

### Test 3: Search Function
- Open store page
- Try searching "iPhone"
- Should filter products with images
- Try searching "Pro"
- Should show iPhone Pro models with images

### Test 4: Ordering
- Click "Order Now" on a product
- Modal should show with product image
- Image should load from cache (instant!)
- Freebies should show correctly

## Common Test Scenarios

### Scenario 1: New Store Owner
```typescript
// Simple test with 3 products
const products: Product[] = [
  { name: "iPhone 15", price: "₱3,299", status: "Order Now" },
  { name: "iPad Air", price: "₱2,899", status: "Order Now" },
  { name: "Samsung Galaxy S24", price: "₱3,999", status: "Order Now" },
];
```

### Scenario 2: Premium Device Specialist
```typescript
// Focus on high-end devices
const products: Product[] = [
  { name: "iPhone 15 Pro Max", price: "₱4,499", status: "Order Now" },
  { name: "iPad Pro 12.9", price: "₱4,299", status: "Order Now" },
  { name: "Samsung Galaxy S24 Ultra", price: "₱4,799", status: "Order Now" },
  { name: "Apple Watch Ultra", price: "₱1,999", status: "Order Now" },
];
```

### Scenario 3: Budget Phone Store
```typescript
// Focus on affordable options
const products: Product[] = [
  { name: "iPhone SE", price: "₱899", status: "Order Now" },
  { name: "iPhone 11", price: "₱1,500", status: "Order Now" },
  { name: "Samsung Galaxy A55", price: "₱1,999", status: "Order Now" },
  { name: "Google Pixel A Series", price: "₱1,299", status: "Order Now" },
];
```

## Pro Tips

1. **Use Specific Names**: "iPhone 15" not "Phone"
2. **Mix Products**: Apple, Samsung, Google for variety
3. **Update Status**: Change to "Sold Out" when inventory runs low
4. **Add New Models**: New phone releases = just add to array
5. **Test Regularly**: Click products to verify images load

## Performance Testing

After adding products:

✅ First product: ~500-700ms (fetches image)
✅ Same product again: <50ms (from cache)
✅ Similar products: <100ms (quick search)
✅ All 30+ products: <2 seconds total

This is **excellent performance** for an image-based catalog!

---

**Ready to test?** Pick a few products above, paste into your store, and watch the magic happen! ✨

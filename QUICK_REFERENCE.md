# Quick Reference: Adding & Managing Products

## 🚀 Quick Start

### To Add a New Product:

1. Open `/app/page.tsx`
2. Find the `products` array
3. Add your product:

```typescript
{
  name: "Your Product Name",
  price: "₱Price",
  status: "Order Now", // or "Sold Out"
}
```

4. Save the file - images load automatically! ✨

## 📋 Complete Example

```typescript
const products: Product[] = [
  {
    name: "iPhone 15 Pro",
    price: "₱3,999",
    status: "Order Now",
  },
  {
    name: "iPhone 15",
    price: "₱3,299",
    status: "Order Now",
  },
  {
    name: "iPhone 14",
    price: "₱2,799",
    status: "Sold Out",
  },
  {
    name: "iPad Pro",
    price: "₱4,299",
    status: "Order Now",
  },
  {
    name: "iPad Air",
    price: "₱2,899",
    status: "Order Now",
  },
];
```

## ✨ What Happens Automatically

When you add a product:
1. ✅ System searches for product image online
2. ✅ Fetches high-quality image from Unsplash
3. ✅ Caches the image for fast loading
4. ✅ Displays fallback placeholder if image not found
5. ✅ Shows product in store immediately

## 🎨 Product Fields

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `name` | string | Yes | "iPhone 15 Blue" |
| `price` | string | Yes | "₱3,299" |
| `status` | string | Yes | "Order Now" or "Sold Out" |

## 🔧 Setup (One Time Only)

### Optional: Get Real Product Images

1. Go to https://unsplash.com/developers
2. Sign up and create an application
3. Copy your Access Key
4. Add to `.env.local`:
   ```
   UNSPLASH_ACCESS_KEY=your_key_here
   ```
5. Restart server

Without this, placeholders are shown (still works perfectly!).

## 🎯 Tips for Best Results

### Product Names That Work Best
✅ "iPhone 15 Pro Max"
✅ "iPad Air 5"
✅ "Samsung Galaxy S24"
❌ "phone"
❌ "device"

### Naming for Images
- Be specific: "iPhone 15" not just "iPhone"
- Include model number when available: "iPad A16" not "iPad"
- The system searches for images with these names

## 📁 Where to Make Changes

- **Add/Edit Products**: `/app/page.tsx` (line ~24)
- **Change Freebies**: `/components/ProductModal.tsx`
- **Update Store Info**: `/app/page.tsx` (search for "Location" or "Shipping")
- **Customize Colors**: `/components/ProductModal.tsx` (colorOptions object)

## 🚨 Troubleshooting

### Product images not showing?
1. Check product name spelling
2. Clear browser cache
3. Restart the dev server
4. Check browser console for errors

### Want to upload your own images?
1. Upload images to `/public/products/` folder
2. Modify `/app/api/images/route.ts` to use local images
3. Update product references if needed

## 📞 Need Help?

Check `/PRODUCT_CATALOG_GUIDE.md` for detailed documentation.

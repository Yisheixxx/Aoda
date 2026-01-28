# ODEH - Organ & Donor Extensive Help

A static HTML website providing comprehensive support for the Jewish community navigating medical transplants and organ donation.

## Features

- **Static HTML** - No build process required
- **Responsive Design** - Works on all devices
- **Dark Mode** - Toggle with persistent preference
- **Multiple Pages**:
  - Home
  - About Us
  - Specialties
  - Success Stories
  - Costs & Needs
  - Contact

## Usage

Simply open `index.html` in any modern web browser. No installation or dependencies required.

### Local Development

To serve locally, you can use any static file server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js (if installed):**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Free Hosting Options

Since this is a static HTML site, you can host it for free on several platforms:

### 1. **Netlify** (Recommended - Easiest)
- **URL**: https://www.netlify.com/
- **Steps**:
  1. Sign up for free account
  2. Drag and drop your project folder onto Netlify dashboard
  3. Your site is live instantly!
  4. Get a free subdomain: `your-site.netlify.app`
  5. Can add custom domain later
- **Features**: Free SSL, CDN, continuous deployment from Git (optional)

### 2. **Vercel**
- **URL**: https://vercel.com/
- **Steps**:
  1. Sign up for free account
  2. Install Vercel CLI: `npm i -g vercel`
  3. Run `vercel` in your project folder
  4. Follow prompts
- **Features**: Free SSL, global CDN, automatic deployments

### 3. **GitHub Pages** (Great for version control)
- **URL**: https://pages.github.com/
- **Steps**:
  1. Create a GitHub repository
  2. Upload your files to the repository
  3. Go to Settings > Pages
  4. Select main branch and `/` folder
  5. Your site will be at `username.github.io/repository-name`
- **Features**: Free SSL, integrated with Git, custom domains supported

### 4. **Cloudflare Pages**
- **URL**: https://pages.cloudflare.com/
- **Steps**:
  1. Sign up for free Cloudflare account
  2. Connect your Git repository or upload files
  3. Deploy automatically
- **Features**: Free SSL, fast CDN, unlimited bandwidth

### 5. **Surge.sh** (Simple command-line deployment)
- **URL**: https://surge.sh/
- **Steps**:
  1. Install: `npm install -g surge`
  2. Run `surge` in your project folder
  3. Follow prompts to create account and deploy
- **Features**: Free SSL, custom domains, simple CLI

### Quick Deploy Commands

**Netlify (via CLI)**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Surge**:
```bash
npm install -g surge
surge
```

**GitHub Pages** (if using Git):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
# Then enable Pages in GitHub repository settings
```

### Recommended: Netlify
For the easiest deployment, use **Netlify** - just drag and drop your folder and you're live in seconds!

## File Structure

```
├── index.html          # Home page
├── about.html          # About Us page
├── specialties.html    # Specialties page
├── success.html        # Success Stories page
├── costs.html          # Costs & Needs page
├── contact.html        # Contact page
├── images/            # Brand images directory
│   ├── logo.png       # Main ODEH logo (required)
│   └── logo-icon.png  # Icon/favicon version (optional)
└── js/
    └── app.js         # Shared JavaScript (dark mode, navigation)
```

## Adding Logo Images

To use the actual logo images from your brand presentation:

1. **Extract images from PDF**: Open "Brand Pres. Odeh.pdf" and extract the logo images
2. **Save as PNG or SVG**: 
   - Save the main logo as `images/logo.png` (or `.svg`)
   - Save an icon version as `images/logo-icon.png` for favicon
3. **Recommended sizes**:
   - `logo.png`: At least 200px wide, transparent background preferred
   - `logo-icon.png`: 32x32px or 64x64px for favicon

**Note**: If images are not found, the site will automatically fall back to the text-based logo with Hebrew "אודה" and "ODEH".

## Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS** - Styling (via CDN)
- **Vanilla JavaScript** - No frameworks required
- **Material Icons** - Icon library (via CDN)
- **Cardknox** - Payment processing for credit card donations

## Payment Integration (Cardknox iForm)

The donation form on the Costs & Needs page uses Cardknox iForm - a hosted payment form solution that handles all PCI compliance requirements.

### Setup Instructions:

1. **Get Cardknox Account**:
   - Sign up for a Cardknox merchant account at https://www.cardknox.com/
   - Log into the Cardknox Merchant Portal: https://portal.cardknox.com/

2. **Create iForm**:
   - Navigate to **Settings > iForm** in the merchant portal
   - Create a new iForm or use an existing one
   - Customize the form with your branding and payment options
   - Copy the iForm URL (format: `https://www.cardknox.com/iform/[your-iform-id]`)

3. **Configure iForm URL**:
   - Open `js/cardknox.js`
   - Replace `YOUR_IFORM_URL_HERE` with your actual Cardknox iForm URL
   - The iForm will automatically update with the selected donation amount

### Benefits of iForm:
- ✅ **Fully Hosted** - Cardknox handles all PCI compliance
- ✅ **No Server Required** - Payments process directly through Cardknox
- ✅ **Secure** - All card data stays on Cardknox servers
- ✅ **Customizable** - Match your brand colors and styling
- ✅ **Simple Integration** - Just embed an iframe

**Note**: The iForm handles all payment processing securely. No server-side code is required for basic payment processing.

## License

© 2024 ODEH. Organ & Donor Extensive Help. All rights reserved.

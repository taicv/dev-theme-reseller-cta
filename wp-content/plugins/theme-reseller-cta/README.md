# Theme Reseller CTA

A lightweight WordPress plugin that adds a floating contact button for theme resellers to display their contact information on demo sites.

## Features

- 🎯 **Floating Contact Button** - Customizable floating button that appears on the homepage
- 🎨 **Customizable Design** - Configure colors, position, and spacing to match your brand
- 🔄 **API Integration** - Dynamic reseller data fetching with fallback to defaults
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Lightweight** - Minimal performance impact with clean, efficient code
- 🛡️ **WordPress Standards** - Follows WordPress coding standards and best practices

## Installation

1. **Upload the plugin**
   ```
   wp-content/plugins/theme-reseller-cta/
   ```

2. **Activate the plugin**
   - Go to WordPress Admin → Plugins
   - Find "Theme Reseller CTA" and click "Activate"

3. **Configure settings**
   - Edit `theme-reseller-cta-config.php` to customize your settings

## Configuration

All configuration is done through the `theme-reseller-cta-config.php` file:

### API Settings
```php
// API endpoint for dynamic reseller data
define( 'TRC_ENDPOINT_DOMAIN', 'https://your-api-domain.com' );
```

### Default Reseller Information
```php
define( 'TRC_DEFAULT_WEBSITE', 'https://yourwebsite.com/' );
define( 'TRC_DEFAULT_PHONE', '0123 456 789' );
define( 'TRC_DEFAULT_NAME', 'Your Company Name' );
define( 'TRC_DEFAULT_MESSAGE', 'You are viewing a demo from your company' );
```

### Visual Customization
```php
// Button position: bottom-right, bottom-left, top-right, top-left
define( 'TRC_BUTTON_POSITION', 'bottom-right' );

// Colors (hex codes)
define( 'TRC_BUTTON_COLOR', '#ffffff' );
define( 'TRC_MODAL_BACKGROUND_COLOR', '#1e73be' );

// Spacing from screen edge (pixels)
define( 'TRC_BUTTON_SPACING', '20' );

// Enable/disable the button
define( 'TRC_ENABLE_BUTTON', true );
```

## How It Works

1. **URL Parameter Detection** - The plugin checks for an `id` parameter in the URL
2. **API Call** - Makes a request to fetch reseller data: `{API_URL}/wp-json/api/v1/reseller/{id}`
3. **Fallback** - If API fails or no ID provided, uses default configuration values
4. **Display** - Shows floating button only on the homepage/front page

### API Response Format
The plugin expects this JSON response format:
```json
{
  "data": {
    "status": 200,
    "reseller": {
      "nickname": "Reseller Name",
      "billing_phone": "0123456789",
      "url": "https://reseller-website.com"
    }
  }
}
```

## Usage Examples

### Demo URL with Reseller ID
```
https://yourdemo.com/?id=reseller123
```

### Manual Configuration
Simply edit the constants in `theme-reseller-cta-config.php` for static setups.

## File Structure

```
theme-reseller-cta/
├── theme-reseller-cta.php          # Main plugin file
├── theme-reseller-cta-config.php   # Configuration file
├── asset/
│   └── js/
│       └── theme-reseller-cta.js   # Frontend JavaScript
├── readme.txt                      # WordPress.org readme
└── README.md                       # This file
```

## Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.2 or higher
- **License**: GPL-2.0-or-later

## Development

### WordPress Coding Standards
This plugin follows WordPress coding standards:
- Proper sanitization and escaping
- WordPress native functions usage
- No external dependencies
- Clean and documented code

### Security Features
- ✅ Input sanitization with `sanitize_text_field()`
- ✅ Output escaping with `esc_html()`, `esc_url()`
- ✅ WordPress nonce verification for forms
- ✅ Capability checks with `current_user_can()`
- ✅ No direct file access protection

### Performance
- Lightweight JavaScript (< 5KB)
- Only loads on homepage
- Efficient CSS injection
- Minimal DOM manipulation

## Troubleshooting

### Button not appearing?
1. Check if `TRC_ENABLE_BUTTON` is set to `true`
2. Verify you're on the homepage/front page
3. Check browser console for JavaScript errors

### API not working?
1. Verify `TRC_ENDPOINT_DOMAIN` is correct
2. Check if the API endpoint is accessible
3. Ensure proper JSON response format

### Styling issues?
1. Check CSS conflicts with your theme
2. Adjust `TRC_BUTTON_SPACING` if button is cut off
3. Modify colors in the configuration file

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Follow WordPress coding standards
4. Test thoroughly
5. Submit a pull request

## License

This plugin is licensed under the GPL-2.0-or-later license. See [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) for details.

## Support

For support, feature requests, or bug reports:
- Visit: [https://themewpgiare.com/](https://themewpgiare.com/)
- Email: support@themewpgiare.com

## Changelog

### 1.0.0 (Current)
- ✨ Initial release
- ✨ Floating contact button functionality
- ✨ API integration for dynamic reseller data
- ✨ Customizable button position and colors
- ✨ WordPress coding standards compliance
- ✨ Responsive design implementation

---

**Made with ❤️ for the WordPress community**

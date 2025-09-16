=== Theme Reseller CTA ===
Contributors: yourname
Donate link: https://themewpgiare.com/
Tags: reseller, cta, contact, floating button, theme demo
Requires at least: 5.0
Tested up to: 6.8
Requires PHP: 7.2
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A lightweight plugin that adds a floating contact button for theme resellers to display their contact information on demo sites.

== Description ==

Theme Reseller CTA is a simple yet effective plugin designed for theme resellers who want to display their contact information on WordPress demo sites. The plugin adds a customizable floating button that, when clicked, displays a modal with reseller contact details.

**Key Features:**

* Floating contact button on homepage
* Customizable button position (bottom-right, bottom-left, top-right, top-left)
* Configurable button and modal colors
* API integration for dynamic reseller data
* Fallback to default contact information
* Responsive design
* Lightweight and fast
* WordPress coding standards compliant

**Perfect for:**

* Theme resellers showcasing demos
* WordPress theme developers
* Demo site management
* Client contact facilitation

The plugin automatically detects reseller information via URL parameters and API calls, making it easy to manage multiple demo sites with different reseller information.

== Installation ==

1. Upload the `theme-reseller-cta` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Configure the plugin settings in `theme-reseller-cta-config.php`
4. The floating button will appear on your homepage

== Frequently Asked Questions ==

= How do I customize the button appearance? =

Edit the configuration constants in `theme-reseller-cta-config.php`:
* `TRC_BUTTON_COLOR` - Button color (hex code)
* `TRC_BUTTON_POSITION` - Button position (bottom-right, bottom-left, top-right, top-left)
* `TRC_BUTTON_SPACING` - Distance from screen edge in pixels
* `TRC_MODAL_BACKGROUND_COLOR` - Modal background color

= How does the reseller API work? =

The plugin checks for an `id` parameter in the URL and makes an API call to fetch reseller data. If the API call fails or no ID is provided, it uses the default values from the configuration file.

= Can I disable the floating button? =

Yes, set `TRC_ENABLE_BUTTON` to `false` in the configuration file.

= Which pages does the button appear on? =

Currently, the button only appears on the homepage/front page to avoid interfering with the demo content.

= Is the plugin translation ready? =

The plugin uses the `theme-reseller-cta` text domain and is ready for translation.

== Screenshots ==

1. Floating contact button on the homepage
2. Contact modal with reseller information
3. Configuration options in the config file

== Changelog ==

= 1.0.0 =
* Initial release
* Floating contact button functionality
* API integration for dynamic reseller data
* Customizable button position and colors
* WordPress coding standards compliance

== Upgrade Notice ==

= 1.0.0 =
Initial release of Theme Reseller CTA plugin.

== Configuration ==

The plugin can be configured by editing the `theme-reseller-cta-config.php` file. Available options include:

* **TRC_ENDPOINT_DOMAIN** - API endpoint domain
* **TRC_DEFAULT_WEBSITE** - Default reseller website
* **TRC_DEFAULT_PHONE** - Default phone number
* **TRC_DEFAULT_NAME** - Default reseller name
* **TRC_DEFAULT_MESSAGE** - Default message text
* **TRC_BUTTON_POSITION** - Button position on screen
* **TRC_BUTTON_COLOR** - Button color
* **TRC_MODAL_BACKGROUND_COLOR** - Modal background color
* **TRC_BUTTON_SPACING** - Button spacing from edge
* **TRC_ENABLE_BUTTON** - Enable/disable button

== Support ==

For support and feature requests, please visit: https://themewpgiare.com/

== Development ==

This plugin follows WordPress coding standards and best practices:

* Proper sanitization and escaping
* No external dependencies
* Minimal performance impact
* Clean uninstall process
* GPL-2.0-or-later license

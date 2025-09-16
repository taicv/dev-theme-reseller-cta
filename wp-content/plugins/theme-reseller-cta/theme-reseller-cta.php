<?php
/**
 * Plugin Name:       Theme Reseller CTA
 * Description:       Enqueue the theme-reseller-cta JavaScript on the front end.
 * Version:           1.0.0
 * Author:            Your Name
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       theme-reseller-cta
 * Requires at least: 5.0
 * Requires PHP:      7.2
 *
 * @package Theme_Reseller_CTA
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'THEME_RESELLER_CTA_VERSION' ) ) {
	define( 'THEME_RESELLER_CTA_VERSION', '1.0.0' );
}

// Include configuration file
require_once plugin_dir_path( __FILE__ ) . 'theme-reseller-cta-config.php';

/**
 * Enqueue front-end assets for Theme Reseller CTA.
 *
 * @return void
 */
function trc_enqueue_frontend_assets() {
	// Only enqueue on the front end.
	if ( is_admin() ) {
		return;
	}

	// Only enqueue on the homepage.
	if ( ! is_front_page() ) {
		return;
	}

	$relative_js_path = 'asset/js/theme-reseller-cta.js';
	$file_path        = plugin_dir_path( __FILE__ ) . $relative_js_path;
	$file_url         = plugins_url( $relative_js_path, __FILE__ );

	$version = THEME_RESELLER_CTA_VERSION;
	if ( file_exists( $file_path ) ) {
		$mtime   = filemtime( $file_path );
		$version = $mtime ? (string) $mtime : $version;
	}

	wp_register_script(
		'theme-reseller-cta',
		$file_url,
		array(),
		$version,
		true
	);

	// Localize script with configuration data
	wp_localize_script(
		'theme-reseller-cta',
		'trcConfig',
		array(
			'apiUrl'         => defined( 'TRC_ENDPOINT_DOMAIN' ) ? TRC_ENDPOINT_DOMAIN . "/wp-json/api/v1/reseller/" : '/wp-json/api/v1/reseller/',
			'defaultWebsite' => defined( 'TRC_DEFAULT_WEBSITE' ) ? TRC_DEFAULT_WEBSITE : 'https://themewpgiare.com/',
			'defaultPhone'   => defined( 'TRC_DEFAULT_PHONE' ) ? TRC_DEFAULT_PHONE : '0989 072 072',
			'defaultName'    => defined( 'TRC_DEFAULT_NAME' ) ? TRC_DEFAULT_NAME : 'themewpgiare.com',
			'buttonPosition' => defined( 'TRC_BUTTON_POSITION' ) ? TRC_BUTTON_POSITION : 'bottom-right',
			'buttonColor'    => defined( 'TRC_BUTTON_COLOR' ) ? TRC_BUTTON_COLOR : '#007cba',
			'buttonSpacing'  => defined( 'TRC_BUTTON_SPACING' ) ? TRC_BUTTON_SPACING : '10',
			'enableButton'   => defined( 'TRC_ENABLE_BUTTON' ) ? TRC_ENABLE_BUTTON : true,
			'modalBackgroundColor' => defined( 'TRC_MODAL_BACKGROUND_COLOR' ) ? TRC_MODAL_BACKGROUND_COLOR : '#1e73be',
			'defaultMessage' => defined( 'TRC_DEFAULT_MESSAGE' ) ? TRC_DEFAULT_MESSAGE : 'Bạn đang xem demo từ themewpgiare.com',
		)
	);

	wp_enqueue_script( 'theme-reseller-cta' );
}
add_action( 'wp_enqueue_scripts', 'trc_enqueue_frontend_assets' );



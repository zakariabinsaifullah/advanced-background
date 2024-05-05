<?php
/**
 * Plugin Name:       Advanced Background For Gutenberg
 * Description:       <strong>Advanced Background Block</strong> is a custom Gutenberg Block to design <strong>Responsive Row in Gutenberg Editor</strong>. It comes with a lot of features so that you can easily make an attractive section.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.5.5
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       section-builder-block
 * Domain Path:       /languages
 */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// include_once file 
include_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';

final class SBB_BLOCKS_CLASS {

	/**
	 * Constructor
	 * 
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {

		$this->constants();

		// block initialization
		add_action( 'init', [ $this, 'sbb_blocks_init' ] );

		// plugin redirecting 
		add_action( 'activated_plugin', [ $this, 'scbb_user_redirecting' ] );
	}

	// Redirecting
	function scbb_user_redirecting( $plugin ) {
		if( plugin_basename(__FILE__) == $plugin ){
			wp_redirect( admin_url( 'tools.php?page=scbb-section-builder' ) );
			die();
		}
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Constants
	 * 
	 * @since 1.0.0
	 * @access public
	 */
	public function constants() {
		define( 'SBB_VERSION', '1.5.5' );
		define( 'SBB_URL', plugin_dir_url( __FILE__ ) );
		define( 'SBB_LIB_URL', SBB_URL . 'lib/' );		
	}

	/**
	 * Blocks Registration 
	 */

	public function sbb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	 // render inline css
	public function sbb_render_inline_css( $handle, $css ) {
		wp_register_style( $handle, false );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, $css );
	}
	

	/**
	 * Blocks Initialization
	*/
	public function sbb_blocks_init() {
		// register single block
		$this->sbb_register_block( 'container', array(
			'render_callback' => array( $this, 'sbb_container_render' ),
		) );
	}

	/**
	 * Container Block Render
	 */
	public function sbb_container_render($attributes, $content) {
		if(! is_admin(  )){
			$handle = 'sbb-'.$attributes['id'];
			$custom_css = '';

			// desktop view
			$custom_css .= '@media (min-width: 992px) {';
				// padding
				if( isset( $attributes['deskPadding'] ) && ! empty( $attributes['deskPadding'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							padding-top: '.$attributes['deskPadding']['top'].';
							padding-right: '.$attributes['deskPadding']['right'].';
							padding-bottom: '.$attributes['deskPadding']['bottom'].';
							padding-left: '.$attributes['deskPadding']['left'].';
						}
					';
				}
				// margin 
				if( isset( $attributes['deskMargin'] ) && ! empty( $attributes['deskMargin'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							margin-top: '.$attributes['deskMargin']['top'].';
							margin-right: '.$attributes['deskMargin']['right'].';
							margin-bottom: '.$attributes['deskMargin']['bottom'].';
							margin-left: '.$attributes['deskMargin']['left'].';
						}
					';
				}
			$custom_css .= '}';

			// tablet view
			$custom_css .= '@media (min-width: 768px) and (max-width: 991px) {';
				// padding
				if( isset( $attributes['tabPadding'] ) && ! empty( $attributes['tabPadding'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							padding-top: '.$attributes['tabPadding']['top'].';
							padding-right: '.$attributes['tabPadding']['right'].';
							padding-bottom: '.$attributes['tabPadding']['bottom'].';
							padding-left: '.$attributes['tabPadding']['left'].';
						}
					';
				}
				// margin 
				if( isset( $attributes['tabMargin'] ) && ! empty( $attributes['tabMargin'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							margin-top: '.$attributes['tabMargin']['top'].';
							margin-right: '.$attributes['tabMargin']['right'].';
							margin-bottom: '.$attributes['tabMargin']['bottom'].';
							margin-left: '.$attributes['tabMargin']['left'].';
						}
					';
				}
			$custom_css .= '}';

			// mobile view
			$custom_css .= '@media (max-width: 767px) {';
				// padding
				if( isset( $attributes['mobPadding'] ) && ! empty( $attributes['mobPadding'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							padding-top: '.$attributes['mobPadding']['top'].';
							padding-right: '.$attributes['mobPadding']['right'].';
							padding-bottom: '.$attributes['mobPadding']['bottom'].';
							padding-left: '.$attributes['mobPadding']['left'].';
						}
					';
				}
				// margin 
				if( isset( $attributes['mobMargin'] ) && ! empty( $attributes['mobMargin'] ) ) {
					$custom_css .= '
						#scbb__id_'.$attributes['id'].' {
							margin-top: '.$attributes['mobMargin']['top'].';
							margin-right: '.$attributes['mobMargin']['right'].';
							margin-bottom: '.$attributes['mobMargin']['bottom'].';
							margin-left: '.$attributes['mobMargin']['left'].';
						}
					';
				}
			$custom_css .= '}';


			$this->sbb_render_inline_css( $handle, $custom_css );
		}
		return $content;
	}
}

/**
 * Kickoff
*/

SBB_BLOCKS_CLASS::init();

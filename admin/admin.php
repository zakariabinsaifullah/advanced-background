<?php
/**
 * Admin Support Page
*/

class SCBB_Admin_Page {
    /**
     * Contructor 
    */
    public function __construct(){
        add_action( 'admin_menu', [ $this, 'scbb_plugin_admin_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'scbb_admin_page_assets' ] );
    }

    // Admin Assets
    public function scbb_admin_page_assets($screen) {
        if( 'tools_page_scbb-section-builder' == $screen ) {
            wp_enqueue_style( 'admin-asset', plugins_url('assets/css/admin.css', __FILE__ ) );
        }
        wp_enqueue_style( 'admin-editor', plugins_url('assets/css/editor.css', __FILE__ ) );
    }

    // Admin Page
    public function scbb_plugin_admin_page(){
        add_submenu_page( 'tools.php', __('Section Builder', 'section-builder-block'), __('Section Builder', 'section-builder-block'), 'manage_options', 'scbb-section-builder', [ $this, 'scbb_admin_page_content_callback' ] );
    }
    public function scbb_admin_page_content_callback(){
        ?>
            <div class="admin_page_container">
                <div class="plugin_head">
                    <div class="head_container">
                        <h1 class="plugin_title"> <?php echo esc_html__( 'Section Builder Block ', 'section-builder-block' );?> </h1>
                        <h4 class="plugin_subtitle"> <?php echo esc_html__( 'A Custom Gutenberg Block to Build Responsive Rows or Sections', 'section-builder-block' );?> </h4>
                        <div class="support_btn">
                            <a href="https://makegutenblock.com/contact" target="_blank" style="background: #D37F00"> <?php echo esc_html__( 'Build Your Own Block', 'section-builder-block' );?> </a>
                            <a href="https://wordpress.org/plugins/section-builder-block/#reviews" target="_blank" style="background: #0174A2"><?php echo esc_html__( 'Rate Plugin', 'section-builder-block' );?> </a>
                        </div>
                    </div>
                </div>
                <div class="plugin_body">
                    <div class="doc_video_area">
                        <div class="doc_video">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/PRNaUJe-1mE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="support_area">
                        <div class="single_support">
                            <h4 class="support_title"><?php echo esc_html__( 'Freelance Work ', 'section-builder-block' );?></h4>
                            <div class="support_btn">
                                <a href="https://www.fiverr.com/users/devs_zak/" target="_blank" style="background: #1DBF73"><?php echo esc_html__( '@Fiverr', 'section-builder-block' );?> </a>
                                <a href="https://www.upwork.com/freelancers/~010af183b3205dc627" target="_blank" style="background: #14A800"><?php echo esc_html__( '@UpWork', 'section-builder-block' );?></a>
                            </div>
                        </div>
                        <div class="single_support">
                            <h4 class="support_title"><?php echo esc_html__( 'Get Support', 'section-builder-block' );?></h4>
                            <div class="support_btn">
                                <a href="https://makegutenblock.com/contact" target="_blank" style="background: #002B42"><?php echo esc_html__( 'Contact', 'section-builder-block' );?> </a>
                                <a href="mailto:zbinsaifullah@gmail.com" style="background: #EA4335"><?php echo esc_html__( 'Send Mail', 'section-builder-block' );?></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php 
    }
}
 new SCBB_Admin_Page();
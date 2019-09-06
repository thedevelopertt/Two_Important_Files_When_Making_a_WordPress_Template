<!DOCTYPE>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri())?>/dist/css/style.css">
</head>
<body>

<section>
    <h1><?php echo bloginfo('name') ?></h1>
    <p><?php echo bloginfo('description'); ?></p>
</section>

<section>
    <?php while(have_posts()){
        the_post();
    ?>
        <div class="article-preview">
            <img src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php the_title(); ?>">
            <h2><?php the_title() ?></h2>
            <p><?php the_excerpt(); ?></p>
        </div>
    <?php }?>

</section>

</body>
</html>


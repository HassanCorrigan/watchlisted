import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, viewport-fit=cover'
      />
      <meta name='title' content='Logo' />
      <meta name='description' content='' />
      <meta name='keywords' content='' />

      <meta name='apple-mobile-web-app-cabable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://' />
      <meta property='og:title' content='Logo' />
      <meta property='og:description' content='' />
      <meta property='og:image' content='/images/opengraph-twitter-card.jpg' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://' />
      <meta property='twitter:title' content='Logo' />
      <meta property='twitter:description' content='' />
      <meta
        property='twitter:image'
        content='/images/opengraph-twitter-card.jpg'
      />

      <title>Logo</title>
    </Head>
  );
};

export default Meta;

import Head from 'next/head';

const Meta = ({ title, description, keywords, url }) => {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, viewport-fit=cover maximum-scale=1'
      />
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      <meta name='apple-mobile-web-app-cabable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='/images/opengraph-twitter-card.jpg' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta
        property='twitter:image'
        content='/images/opengraph-twitter-card.jpg'
      />

      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Watchlisted - a Trakt.tv movie and tv app',
  description:
    'Watchlisted is a simple and minimal movie and tv tracker app with Trakt.tv support, keeping you up to date with the latest releases with an easy to manage tv and movie library.',
  keywords: 'movie, tv, app, trakt.tv, tracker',
  url: 'https://watchlisted.app',
};

export default Meta;

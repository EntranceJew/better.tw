import Versions from './versions.json';

const makeVersionsObject = version => ({
  addons: {
    'BetterTweetDeck@erambert.me': {
      updates: [
        {
          version,
          update_link: 'https://example.com/addon-0.3.xpi',
        },
      ],
    },
  },
});

export function handler(event, context, callback) {
  const { firefox } = Versions;

  if (event.headers['user-agent'].indexOf('Gecko/') === -1) {
    return callback(null, {
      statusCode: 404,
      body: JSON.stringify({
        error: 'No updates found',
      }),
    });
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(makeVersionsObject(firefox)),
  });
}

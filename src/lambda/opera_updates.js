import Versions from './versions.json';

export function handler(event, context, callback) {
  const { x } = event.queryStringParameters;
  const xSearchParams = new URL(`http://localhost:1234/?${x}`).searchParams;
  const operaVersion = Versions.opera;

  if (!xSearchParams.get('v') || !xSearchParams.get('id')) {
    return callback(null, {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Not found',
      }),
    });
  }

  return callback(null, {
    statusCode: 200,
    body: `
    <?xml version='1.0' encoding='UTF-8'?>
    <gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='${xSearchParams.id}'>
    <updatecheck codebase='https://github.com/eramdam/BetterTweetDeck/releases/download/${operaVersion}/better-tweetdeck.nex' version='${operaVersion}' />
  </app>
</gupdate>
    `.trim(),
  });
}

import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const CLIENT_ID = '954557855733-9fovnaaj81f4cpbceqfpn72i2e8oksaa.apps.googleusercontent.com'
  const GAPI_KEY = 'AIzaSyBBZEk5Pc3CKb79HfwePVumjIuxdamEyeU'
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';

  app.config.globalProperties.$gapi = window.gapi
  app.config.globalProperties.$rjmgclientid = CLIENT_ID
  app.config.globalProperties.$rjmgapikey = GAPI_KEY
  app.config.globalProperties.$rjmgscopes = SCOPES

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: GAPI_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    function localcallback(token) {
      console.log('ERROR should not be using this callback')
    }
    window.google.accounts.id.initialize({
      client_id: GAPI_KEY,
      callback: localcallback
    });

  }

  window.gapi.load('client', initializeGapiClient)


})

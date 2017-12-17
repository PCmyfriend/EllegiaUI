class IdTokenParser {

  static parse(idToken) {
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}

export default IdTokenParser;

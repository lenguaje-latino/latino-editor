import * as lzs from 'lz-string';

export const BASE_URL = 'https://editor.lenguajelatino.org/';

export function getSharedUrl(code, site = BASE_URL) {
  const url = new URL('/', site);
  url.searchParams.set('code', lzs.compressToEncodedURIComponent(code));
  return url;
}

export function getSharedCode() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const fileUrl = params.get('file');
  const base64 = params.get('base64');
  const code = params.get('code');

  return {
    fileUrl: fileUrl && '' !== fileUrl.trim() ? fileUrl : null,
    base64: base64 && '' !== base64.trim() ? atob(base64) : null,
    code: code && '' !== code.trim() ? lzs.decompressFromEncodedURIComponent(code) : null,
  };
}

export class FileUtils {

  public static base64ToFile(base64: string, fileName: string): File {
    let byteString = '';
    if (base64.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(base64.split(',')[1]);
    } else {
      byteString = unescape(base64.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], {type: mimeString});
    return new File([blob], 'file.png', {type: mimeString});
  }
}

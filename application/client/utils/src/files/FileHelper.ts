export class FileHelper {
  static async toBase64Async(file: File) {
    return new Promise<string | null>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64 = fileReader.result?.toString() ?? null;
        resolve(base64);
      };

      fileReader.readAsDataURL(file);
    });
  }

  static clearBase64(base64: string): string {
    return base64.substring(base64.indexOf(',') + 1);
  }

  static getFileExtension(file: File) {
    return (
      file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) ||
      file.name
    );
  }
}

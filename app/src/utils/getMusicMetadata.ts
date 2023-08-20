import path from "path";

const promisifyMetadata = async (file: string) => {
  return new Promise((resolve, reject) => {
    const absPath = path.join(__dirname, "..", "public/music", file);
    console.log(absPath);
    // const readableStream = fs.createReadStream(absPath);
    // mm(
    //   readableStream,
    //   { duration: true },
    //   (error: Error, metadata: MM.Metadata) => {
    //     if (error) {
    //       return reject(error);
    //     }
    //     readableStream.close();
    //     return resolve(metadata);
    //   }
    // );
  });
};

export const getMusicMetadata = async (): Promise<any> => {
  try {
    const metadata = await promisifyMetadata(
      "Ars_Sonor_-_02_-_Never_Give_Up.mp3"
    );
    console.log(metadata);
    return metadata;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

// export const getMusicMetadata = async (path: string): Promise<any> => {
//   try {
//     const metadata = await mm.parseFile(
//       "../utils/Ars_Sonor_-_02_-_Never_Give_Up.mp3"
//     );
//     console.log(metadata);
//     return metadata;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     }
//   }
// };

import { S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  credentials: {
    accessKeyId: "e7abdac69086c1391545a98e01ab1bdf",
    secretAccessKey: "11bfa2b40a5644d7a84073552d4a3d5028c50b5b257bcaf7ec439f3f7463c2b6"
  },
  endpoint: "https://1161d92f4e0fcb3de00dd52e550dd8d4.r2.cloudflarestorage.com",
  forcePathStyle: true,
  region: "auto"
});

export { client as c };

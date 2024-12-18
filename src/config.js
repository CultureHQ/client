const config = {
  apiHost: "https://api.culturehq.com",
  awsAccessKeyId: "AKIAIPWT257FWZ5I4ZGQ",
  signerURL: "https://production-upload-signer.culturehq.com/production/signature",
  signerAuthToken: "SIGNER-AUTH-TOKEN",
  uploadBucket: "https://culturehq-direct-uploads.s3-us-west-2.amazonaws.com",
  AWSAccessKey: "AWS-KEY",
  AWSSecretAccessKey: "AWS-SECRET"
};

export const configure = options => Object.assign(config, options);

export default config;

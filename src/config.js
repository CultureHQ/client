const config = {
  apiHost: "https://api.culturehq.com",
  awsAccessKeyId: "AKIAIPWT257FWZ5I4ZGQ",
  signerURL: "https://mqxr6sjf84.execute-api.us-west-2.amazonaws.com/production/signature",
  uploadBucket: "https://culturehq-direct-uploads.s3-us-west-2.amazonaws.com"
};

export const configure = options => Object.assign(config, options);

export default config;

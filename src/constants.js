const PROD = {
  API_HOST: "https://api.culturehq.com",
  AWS_ACCESS_KEY_ID: "AKIAIPWT257FWZ5I4ZGQ",
  SIGNER_URL: "https://726l7tpb5a.execute-api.us-west-2.amazonaws.com/production/signature",
  UPLOAD_BUCKET: "https://culturehq-direct-uploads.s3-us-west-2.amazonaws.com"
};

const DEV = {
  API_HOST: "http://localhost:3000",
  AWS_ACCESS_KEY_ID: null,
  SIGNER_URL: "http://localhost:3001",
  UPLOAD_BUCKET: "http://localhost:3001"
};

export process.env.NODE_ENV === "production" ? PROD : DEV;

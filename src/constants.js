const CONSTANTS = {
  production: {
    API_HOST: "https://api.culturehq.com",
    AWS_ACCESS_KEY_ID: "AKIAIPWT257FWZ5I4ZGQ",
    SIGNER_URL: "https://mqxr6sjf84.execute-api.us-west-2.amazonaws.com/production/signature",
    UPLOAD_BUCKET: "https://culturehq-direct-uploads.s3-us-west-2.amazonaws.com"
  },
  development: {
    API_HOST: "http://localhost:3000",
    AWS_ACCESS_KEY_ID: null,
    SIGNER_URL: "http://localhost:3001",
    UPLOAD_BUCKET: "http://localhost:3001"
  },
  test: {
    API_HOST: "http://localhost:8080",
    AWS_ACCESS_KEY_ID: "access-key-id",
    SIGNER_URL: "http://localhost:8081",
    UPLOAD_BUCKET: "http://localhost:8082"
  }
};

const {
  API_HOST,
  AWS_ACCESS_KEY_ID,
  SIGNER_URL,
  UPLOAD_BUCKET
} = CONSTANTS[process.env.NODE_ENV || "development"];

export {
  API_HOST,
  AWS_ACCESS_KEY_ID,
  SIGNER_URL,
  UPLOAD_BUCKET
};

//Dependencies

//module scaffolding
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "hsjdhsoakdjerjos",
  maxChecks: 5,
  twilio: {
    fromPhone: '+12184527093',
    accountSid: 'AC10636bdacd997d45c458f158f2d2e769',
    authToken: '68ec48e88a57beab9b2a6c436c93057c'
  }
};

environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "hseorksjdoerjaakd",
  maxChecks: 5,
  twilio: {
    fromPhone: '+12184527093',
    accountSid: 'AC10636bdacd997d45c458f158f2d2e769',
    authToken: '68ec48e88a57beab9b2a6c436c93057c'
  }
};

//determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;

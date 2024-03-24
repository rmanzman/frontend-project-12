const endpoints = {
  login: () => '/api/v1/login',
  signup: () => '/api/v1/signup',
  channels: () => '/api/v1/channels',
};

const routes = {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  notFoundPagePath: () => '*',
  signupPagePath: () => '/signup',
};

export { endpoints, routes };

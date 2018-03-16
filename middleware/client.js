import { createClient } from '@commercetools/sdk-client';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createUserAgentMiddleware } from '@commercetools/sdk-middleware-user-agent';

// NOTE we should not use these directly but rather have them passed in from
// the application
const userAgentMiddleware = createUserAgentMiddleware({
  libraryName: 'merchant-center-frontend',
  libraryVersion: '1.0.0',
  contactUrl: 'https://mc.commercetools.com',
  contactEmail: 'mc@commercetools.com',
});

// NOTE we should not use these directly but rather have them passed in from
// the application
const httpMiddleware = createHttpMiddleware({
  host: window.app.mcApiUrl,
  includeResponseHeaders: true,
  credentialsMode: 'include',
});
const client = createClient({
  middlewares: [userAgentMiddleware, httpMiddleware],
});

export default client;

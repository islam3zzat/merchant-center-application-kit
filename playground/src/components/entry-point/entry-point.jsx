import { lazy } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  ApplicationShell,
  setupGlobalErrorListener,
} from '@commercetools-frontend/application-shell';
import history from '@commercetools-frontend/browser-history';
import configureApolloClient from '../../apollo-client';
import loadMessages from '../../messages';
import DemoCustomView from '../custom-views/demo-custom-view';

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncPlaygroundRoutes = lazy(() =>
  import('../../routes' /* webpackChunkName: "app-kit-playground" */)
);

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

const apolloClient = configureApolloClient();

const EntryPoint = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        path="/custom-views/:customViewId/projects/:projectKey"
        element={<DemoCustomView />}
      />
      <Route
        element={
          <ApplicationShell
            environment={window.app}
            applicationMessages={loadMessages}
            apolloClient={apolloClient}
          >
            <AsyncPlaygroundRoutes />
          </ApplicationShell>
        }
      />
    </Routes>
  </HistoryRouter>
);
EntryPoint.displayName = 'EntryPoint';

export default EntryPoint;

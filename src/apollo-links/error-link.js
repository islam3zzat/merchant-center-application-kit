import { onError } from 'apollo-link-error';
import { STATUS_CODES, LOGOUT_REASONS } from '@commercetools-local/constants';
import { STORAGE_KEYS } from '../constants';

/* eslint-disable import/prefer-default-export */
// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page resetting the store and showing the proper message
export const createErrorLink = ({ history, storage }) =>
  onError(({ networkError }) => {
    const isAuthenticated =
      storage.get(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

    if (
      networkError &&
      networkError.statusCode === STATUS_CODES.UNAUTHORIZED &&
      isAuthenticated
    ) {
      history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
    }
  });

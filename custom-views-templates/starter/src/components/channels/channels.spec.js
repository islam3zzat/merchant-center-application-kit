import { HttpResponse, graphql } from 'msw';
import { setupServer } from 'msw/node';
import {
  renderCustomView,
  fireEvent,
  screen,
} from '@commercetools-frontend/application-shell/test-utils';
import { buildGraphqlList } from '@commercetools-test-data/core';
import * as Channel from '@commercetools-test-data/channel';
import { LocalizedString } from '@commercetools-test-data/commons';
import ApplicationRoutes from '../../routes';

const mockServer = setupServer();
afterEach(() => mockServer.resetHandlers());
beforeAll(() => {
  mockServer.listen({
    // for debugging reasons we force an error when the test fires a request with a query or mutation which is not mocked
    // more: https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest
    onUnhandledRequest: 'error',
  });
});
afterAll(() => {
  mockServer.close();
});

it('should render channels and paginate to second page', async () => {
  mockServer.use(
    graphql.query('FetchChannels', ({ variables }) => {
      // Simulate a server side pagination.
      const { offset } = variables;
      const totalItems = 25; // 2 pages
      const itemsPerPage = offset === 0 ? 20 : 5;

      return HttpResponse.json({
        data: {
          channels: buildGraphqlList(
            Array.from({ length: itemsPerPage }).map((_, index) => {
              const channelNumber = offset === 0 ? index : 20 + index;
              return Channel.random()
                .name(
                  LocalizedString.presets
                    .empty()
                    .en(`Channel no. ${channelNumber}`)
                )
                .key(`channel-key-${channelNumber}`);
            }),
            {
              name: 'Channel',
              total: totalItems,
            }
          ),
        },
      });
      // return res(
      //   ctx.data({
      //     channels: buildGraphqlList(
      //       Array.from({ length: itemsPerPage }).map((_, index) => {
      //         const channelNumber = offset === 0 ? index : 20 + index;
      //         return Channel.random()
      //           .name(
      //             LocalizedString.presets
      //               .empty()
      //               .en(`Channel no. ${channelNumber}`)
      //           )
      //           .key(`channel-key-${channelNumber}`);
      //       }),
      //       {
      //         name: 'Channel',
      //         total: totalItems,
      //       }
      //     ),
      //   })
      // );
    })
  );

  renderCustomView({
    locale: 'en',
    projectKey: 'my-project',
    children: <ApplicationRoutes />,
  });

  // First page
  await screen.findByText('Channels list');
  await screen.findByText('Channel no. 0');

  // Go to second page
  fireEvent.click(screen.getByLabelText('Next page'));

  // Second page
  await screen.findByText('Channel no. 22');
  expect(screen.queryByText('Channel no. 0')).not.toBeInTheDocument();
});

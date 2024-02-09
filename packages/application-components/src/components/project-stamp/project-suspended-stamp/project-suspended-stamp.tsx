import { useIntl } from 'react-intl';
import Stamp from '@commercetools-uikit/stamp';
import messages from '../messages';

const ProjectSuspendedStamp = () => {
  const intl = useIntl();

  return (
    <Stamp
      tone="critical"
      isCondensed={true}
      label={intl.formatMessage(messages.ProjectSuspended)}
    />
  );
};

export default ProjectSuspendedStamp;

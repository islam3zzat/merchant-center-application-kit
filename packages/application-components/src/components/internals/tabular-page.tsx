import { Fragment, type ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { designTokens as uiKitDesignTokens } from '@commercetools-uikit/design-system';
import { designTokens as appKitDesignTokens } from '../../theming';

declare let window: ApplicationWindow;

const TabControls = styled.div`
  margin-top: ${uiKitDesignTokens.spacingS};
`;

type TControlsContainterProps = {
  tabControls: ReactNode;
  formControls?: ReactNode;
  children?: never;
};

const ControlsContainter = (props: TControlsContainterProps) => (
  <div
    css={css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: ${uiKitDesignTokens.spacing40};
    `}
  >
    <TabControls role="tablist">{props.tabControls}</TabControls>
    {props.formControls}
  </div>
);
ControlsContainter.displayName = 'ControlsContainter';

type TTabularPageContainerProps = {
  children: ReactNode;
  color: 'surface' | 'neutral';
};

const TabularPageContainer = (props: TTabularPageContainerProps) => (
  <div
    css={css`
      background-color: ${uiKitDesignTokens.colorSurface};
      padding: ${appKitDesignTokens.paddingForTabularPageHeader};
      border-bottom: 1px solid ${uiKitDesignTokens.colorNeutral90};
    `}
  >
    {props.children}
  </div>
);
TabularPageContainer.displayName = 'TabularPageContainer';
const defaultProps: Pick<TTabularPageContainerProps, 'color'> = {
  color: 'surface',
};
TabularPageContainer.defaultProps = defaultProps;

const FormControlsContainer = styled.div`
  margin-bottom: ${uiKitDesignTokens.spacingM};
`;

const CustomViewsSelectorWrapper = styled.div`
  margin: ${appKitDesignTokens.marginForCustomViewsSelectorAsTabular};
`;

const CustomViewsTabularPageContainer = (props: { children: ReactNode }) => {
  const isRenderedInCustomView = Boolean(window.app.customViewId);
  // wrapper which only appears when rendered in a Custom View
  const Wrapper = isRenderedInCustomView ? 'div' : Fragment;
  return (
    <Wrapper
      css={css`
        > div {
          padding: ${uiKitDesignTokens.spacing50} ${uiKitDesignTokens.spacing55}
            0 !important;
        }
      `}
    >
      {props.children}
    </Wrapper>
  );
};

export {
  ControlsContainter,
  TabularPageContainer,
  FormControlsContainer,
  CustomViewsSelectorWrapper,
  CustomViewsTabularPageContainer,
};

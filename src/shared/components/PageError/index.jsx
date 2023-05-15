import React from 'react';

import { ErrorPage, ErrorPageInner, ErrorBox, StyledIcon, Title } from './Styles';

const PageError = () => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <StyledIcon type="bug" />
        <Title>This page does not exist</Title>
        <p>
          {'Oops! The page you are looking for does not exist. Click '}
          <a href="/">here</a>
          {'  to go back to the homepage.'}
        </p>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;

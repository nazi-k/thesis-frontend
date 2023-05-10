import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { InputDebounced, Avatar, Button } from 'shared/components';

export const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
`;

export const StyledAvatar = styled(Avatar)`
  box-shadow: 0 0 0 2px #fff;
  ${mixin.clickable}
  &:hover {
    box-shadow: 0 0 0 4px ${mixin.lighten(color.primary, 1)};
  }
`;

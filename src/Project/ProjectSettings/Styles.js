import styled from 'styled-components';

import { font, color } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const FormCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormElement = styled(Form.Element)`
  width: 100%;
  max-width: 640px;
`;

export const FormHeading = styled.h1`
  padding: 6px 0 15px;
  ${font.size(24)}
  ${font.medium}
`;

export const ActionButton = styled(Button)`
  margin-top: 30px;
`;

export const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.borderLight};
`;

export const EmailListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const EmailContainer = styled.div`
  background-color: #eaeaea;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const EmailAddress = styled.div`
  margin-right: 5px;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
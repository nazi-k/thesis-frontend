import styled from 'styled-components';
import { color, mixin } from 'shared/utils/styles';
import { Button, Form } from 'shared/components';

export const ListCont = styled.div`
  background-color: ${color.backgroundLight};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const ListHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
padding: 10px;
margin-bottom: 5px;
border-radius: 3px;
background: #fff;
box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
transition: background 0.1s;
${mixin.clickable}
@media (max-width: 1100px) {
  padding: 10px 8px;
}
&:hover {
  background: ${mixin.rgba(color.primary, 0.1)};
}
`;

export const ItemName = styled.div`
  font-weight: bold;
`;

export const ItemCategory = styled.div`
  color: #888888;
  margin-right: 10px;
`;

export const ItemDescription = styled.div`
  color: #888888;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 5px 0;
  }
`;

export const AddProjectButton = styled.button`
  background-color: #0072c6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #005ea2;
  }
`;

export const FormCont = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const FormHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FormElement = styled(Form.Element)`
  margin-bottom: 20px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
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
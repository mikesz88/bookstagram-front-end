import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
  width: ${({larger}) => larger ? `250px` : `125px`};
  height: ${({larger}) => larger ? `50px` : ``};
  background-color: ${({theme}) => theme.colors.darkBlue};
  border-color: ${({theme}) => theme.colors.darkBlue};
  border-radius: 25px;

  &:hover {
    background-color: ${({theme}) => theme.colors.lightBlue};
    border-color: ${({theme}) => theme.colors.lightBlue};

    }
`;
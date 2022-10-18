import styled from 'styled-components';
import { Form } from 'antd';

export const TableSearcherStyled = styled(Form)`
  margin-left: auto;

  & .form__field-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    margin-bottom: 1rem;
  }

  & .form__actions-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
`;

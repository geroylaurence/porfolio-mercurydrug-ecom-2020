import styled from 'styled-components';

const HrLight = styled.hr`
  background-color: ${p => p.theme.colors.primary};
  height: 4px;
  margin-top: 0;
  width: 100%;
`;

const HrMedium = styled.hr`
  background-color: ${p => p.theme.colors.primary};
  height: 9px;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
`;

export {
  HrLight,
  HrMedium,
};
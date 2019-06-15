import React from 'react';
import styled from 'styled-components';

function Logo() {
  return (
    <HeaderView>
      <LogoDesign>
        <LogoText>
          B
        </LogoText>
      </LogoDesign>
      <HeaderTitle>
        Barragens
      </HeaderTitle>
    </HeaderView>
  );
}

const HeaderView = styled.div`
  margin-bottom: 50px;
`;

const HeaderTitle = styled.p`
  color: #223B41;
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;

const LogoDesign = styled.div`
  border-radius: 100%;
  width: 120px;
  height: 120px;
  border: 10px solid #F9E5C8;
  background: #223B41;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.p`
  font-family: sans-serif;
  color: #F9E5C8;
  font-size: 90px;
  margin: 0;
`;

export default Logo;
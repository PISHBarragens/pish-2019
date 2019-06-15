import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, ButtonBlock } from '../style/app.style';
import Logo from './logo.component';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
  }

  login() {
    this.props.history.push(`/barragens`);
  }

  handlerInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { email, password } = this.state;

    return (
      <LoginDiv>
        <div className="content">
          <div className="header">
            <Logo />
          </div>
          <div className="input">
            <p>Email</p>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              name="email"
              onChange={this.handlerInput}
            />
          </div>
          <div className="input">
            <p>Senha</p>
            <Input 
              type="password" 
              placeholder="Senha"
              value={password}
              name="password"
              onChange={this.handlerInput}
            />
          </div>
          <div>
            <ButtonBlock onClick={this.login}>
              Entrar
            </ButtonBlock>
          </div>
        </div>
      </LoginDiv>
    );
  }
}

const LoginDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  div.content {
    padding: 3em;
    border: 1px solid #b7b4b4;
    border-radius: 10px;
    width: fit-content;
    margin: auto;
    div.input p {
      margin-bottom: 0.5em;
    }
    div.header {
      width: fit-content;
      margin: auto;
      margin-bottom: 3em;
    }
    ${ButtonBlock} {
      margin-top: 2em;
    }
  }
`;


export default Login;
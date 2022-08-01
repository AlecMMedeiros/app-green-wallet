import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

   validateEmail= () => {
     const { email } = this.state;
     return /\S+@\S+\.\S+/.test(email);
   }

   validatePassword= () => {
     const { password } = this.state;
     const checkValidPassword = password.length;
     const passwordMinimumLength = 6;
     return checkValidPassword >= passwordMinimumLength;
   }

  validateFields= () => {
    const { isDisable } = this.state;
    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    const checker = (validEmail * validPassword);
    if (isDisable === false && checker === 0) this.setState({ isDisable: true });
    if (checker === 1) this.setState({ isDisable: false });
  }

  handleSubmit = () => {
    const { dispatchPersonalData, history } = this.props;
    dispatchPersonalData(this.state);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateFields());
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <form className="LoginForm">
        <fieldset>
          <p>GreenWallet</p>
          <input
            className="loginForm placeholder col-10 bg-light"
            data-testid="email-input"
            autoComplete="username"
            name="email"
            value={ email }
            type="email"
            placeholder="e-mail"
            onChange={ this.handleChange }
          />
          <input
            className="loginForm placeholder col-10 bg-light"
            data-testid="password-input"
            name="password"
            autoComplete="current-password"
            value={ password }
            type="password"
            placeholder="password"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            className="loginForm btn btn-light"
            data-testid="login-btn"
            value="Entrar"
            onClick={ this.handleSubmit }
            disabled={ isDisable }
          >
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchPersonalData: (loginData) => dispatch(userLogin(loginData)),
});

Login.propTypes = {
  dispatchPersonalData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

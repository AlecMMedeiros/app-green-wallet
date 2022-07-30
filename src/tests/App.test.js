import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import Wallet from '../pages/Wallet';
import rootReducer from '../redux/reducers';
import userEvent from '@testing-library/user-event';

describe('Página de Login', () => {
    let currentLocation;
    it('verifica se tela de login é exibida corretamente', () => {
        renderWithRouterAndRedux(<App />)

        expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { hidden: false })).toBeDisabled();
    });
    it('verifica se ao clicar no botão de login, o usuário é redirecionado para outra página:', () => {
        renderWithRouterAndRedux(<App />)

        const userInputEmail = screen.getByTestId('email-input');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputPass = screen.getByTestId('password-input');
        userEvent.type(userInputPass, '123456789');

        const loginButton = screen.getByTestId('login-btn');       
        userEvent.click(loginButton);
        expect(loginButton).not.toBeInTheDocument();
    });
})

describe('Testa o componente Wallet ', () => {
    it('Testa a exição dos objectos do compomente Wallet', () => {
        const initialStateMock = {
            user: {
                email: 'teste@teste.com',
                password: '1234567',
            },
            wallet:{
                currencies: ['USD', 'CAD', 'GBP'],
                expenses: [{
                    id: 0,
                    value: 3,
                    description: "Hot Dog",
                    currency: "USD",
                    method: "Dinheiro",
                    tag: "Alimentação",
                    exchangeRates: {
                    USD: {
                        code: "USD",
                        name: "Dólar Comercial",
                        ask: "5.6208",                 
                    },                
                    }
                }]
            }
        };
        const store = createStore(rootReducer, initialStateMock);
        renderWithRouterAndRedux(<Wallet />,
        {
          initialState: initialStateMock,
         })

      
        expect(screen.getByText(/teste@teste.com/i)).toBeInTheDocument();
        expect(screen.getByTestId('tag-input')).toBeInTheDocument();
        expect(screen.getByTestId('method-input')).toBeInTheDocument();
        expect(screen.getByTestId('currency-input')).toBeInTheDocument();
        expect(screen.getByTestId('description-input')).toBeInTheDocument();
        expect(screen.getByTestId('value-input')).toBeInTheDocument();   
        expect(screen.getByTestId('email-field')).toBeInTheDocument();
        expect(screen.getByTestId('total-field')).toBeInTheDocument();
        expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
        expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
        expect(screen.getByText(/Tag/i)).toBeInTheDocument();
        expect(screen.getByText(/Valor convertido/i)).toBeInTheDocument();
        expect(screen.getByText(/Id: 0/i)).toBeInTheDocument();    
        expect(screen.getByText(/BRL/i)).toBeInTheDocument();
        expect(screen.getByText(/Cartão de crédito/i)).toBeInTheDocument();
        expect(screen.getByText(/Real/i)).toBeInTheDocument();

        const input = screen.getByLabelText('Moeda:');
        expect(input).toHaveTextContent('USD');

        const deleteButton = screen.getByTestId('delete-btn');   
        userEvent.click(deleteButton)
        expect(deleteButton).not.toBeInTheDocument();

    });    
})
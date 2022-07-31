import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';
import Wallet from '../pages/Wallet';
import Header from '../components/Header';
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
    it('verifica se é verificado o formato padrão de e-mail:', () => {
        renderWithRouterAndRedux(<App />)

        const loginButton = screen.getByTestId('login-btn');

        const userInputPass = screen.getByTestId('password-input');
        userEvent.type(userInputPass, '123456789');
        const userInputEmail = screen.getByTestId('email-input');
        userEvent.type(userInputEmail, 'some');

        expect(userInputPass.value).toHaveLength(9);
        expect(loginButton).toBeDisabled();
        
        userEvent.type(userInputEmail, 'some@some.com');       
        expect(loginButton).not.toBeDisabled();       
      
        userEvent.type(userInputPass, '12345');
        expect(userInputPass.value).toHaveLength(5);
        expect(loginButton).toBeDisabled();

        userEvent.type(userInputPass, '123456');
        expect(userInputPass.value).toHaveLength(6);
        expect(loginButton).not.toBeDisabled();
    
    })
    it('verifica se é verificado o formato padrão de passwod:', () => {
        renderWithRouterAndRedux(<App />)

        const userInputEmail = screen.getByTestId('email-input');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputPass = screen.getByTestId('password-input');
        userEvent.type(userInputPass, '1234');

        const loginButton = screen.getByTestId('login-btn');     
        
        expect(loginButton).toBeDisabled();
    })
    it('verifica se é verificado o botão de login é habilitado quando e-mail e password atendem aos requisitos:', () => {
        renderWithRouterAndRedux(<App />)

        const userInputEmail = screen.getByTestId('email-input');
        userEvent.type(userInputEmail, 'some@some.com');

        const userInputPass = screen.getByTestId('password-input');
        userEvent.type(userInputPass, '123456');

        const loginButton = screen.getByTestId('login-btn');     
        
        expect(loginButton).not.toBeDisabled();
    })
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
                    value: 1,
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
                }],
                editor: false,
            }
        };
        const store = createStore(rootReducer, initialStateMock);
        renderWithRouterAndRedux(<Wallet />,
        {
          initialState: initialStateMock,
         })

      
        expect(screen.getByText(/teste@teste.com/i)).toBeInTheDocument();
        expect(screen.getByTestId('tag-input')).toBeInTheDocument(); 
        expect(screen.getByTestId('total-field')).toHaveTextContent('5.62');
        expect(screen.getByTestId('rate-value')).toBeInTheDocument();
        expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
        expect(screen.getByText(/Tag/i)).toBeInTheDocument();
        expect(screen.getByText(/Id: 0/i)).toBeInTheDocument();    
        expect(screen.getByText(/BRL/i)).toBeInTheDocument();

        const input = screen.getByLabelText('Moeda:');
        expect(input).toHaveTextContent('USD');

        const deleteButton = screen.getByTestId('delete-btn');   
        userEvent.click(deleteButton)
        expect(deleteButton).not.toBeInTheDocument();
        expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    });
    it('Testa a funcionalidade de adicionar despesa:', async () => {
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
                }],
                editor: false,
            }
        };
        const store = createStore(rootReducer, initialStateMock);
        renderWithRouterAndRedux(<Wallet />,
        {
          initialState: initialStateMock,
         })
        
        const userInputValue = screen.getByTestId('value-input');
        userEvent.type(userInputValue, '11');

        const userInputDescription = screen.getByTestId('description-input');
        userEvent.type(userInputDescription, 'RTX 3090');

        const saveButton = screen.getByTestId('save-btn');       
        userEvent.click(saveButton);
      
        expect(await screen.findByText(/RTX 3090/i)).toBeInTheDocument();

    });
    it('Testa a funcionalidade de editar despesa:', async () => {
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
                }],
                editor: false,
            }
        };
        const store = createStore(rootReducer, initialStateMock);
        renderWithRouterAndRedux(<Wallet />,
        {
          initialState: initialStateMock,
         })        
         
         const EditButton = screen.getByTestId('edit-btn');       
         userEvent.click(EditButton);
         
         const userInputValue = screen.getByAltText('value');
         userEvent.type(userInputValue, '11');
 
         const userInputDescription = screen.getByAltText('description');
         userEvent.type(userInputDescription, 'RTX 3090');

         const SaveChangeButton = screen.getByTestId('save-btn');      
         userEvent.click(SaveChangeButton);

        expect(await screen.findByText(/RTX 3090/i)).toBeInTheDocument();

    });
})

describe('Testa o componente Header ', () => {
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
                    value: 1,
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
        renderWithRouterAndRedux(<Header />,
        {
          initialState: initialStateMock,
         })

        const totalField = screen.getByTestId('total-field');
        expect(totalField).toBeInTheDocument();

    });
})
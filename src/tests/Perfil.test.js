import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Perfil from '../pages/Perfil';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';

const EMAIL_TESTID = 'profile-email';
const BUTTON_TESTID_FEITAS = 'profile-done-btn';
const BUTTON_TESTID_FAVORITAS = 'profile-favorite-btn';
const BUTTON_TESTID_SAIR = 'profile-logout-btn';

const FOOTER = 'footer';
const DRINK_BTN = 'drinks-bottom-btn';
const EXPLORE_BTN = 'explore-bottom-btn';
const MEAL_BTN = 'food-bottom-btn';

describe('Perfil tests', () => {
  test('Deve aparecer na tela; email, botões.', () => {
    renderWithRouterAndRedux(<Perfil />);

    const email = screen.getByTestId(EMAIL_TESTID);
    const buttonFeitas = screen.getByTestId(BUTTON_TESTID_FEITAS);
    const buttonFavoritas = screen.getByTestId(BUTTON_TESTID_FAVORITAS);
    const buttonSair = screen.getByTestId(BUTTON_TESTID_SAIR);

    expect(email).toBeInTheDocument();
    expect(buttonFeitas).toBeInTheDocument();
    expect(buttonFavoritas).toBeInTheDocument();
    expect(buttonSair).toBeInTheDocument();
  });

  test('Se a URL da página é alterada ao clicar em cada botão', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const buttonFeitas = screen.getByTestId(BUTTON_TESTID_FEITAS);
    const buttonFavoritas = screen.getByTestId(BUTTON_TESTID_FAVORITAS);
    const buttonSair = screen.getByTestId(BUTTON_TESTID_SAIR);

    expect(buttonFeitas).toBeInTheDocument();
    expect(buttonFavoritas).toBeInTheDocument();
    expect(buttonSair).toBeInTheDocument();

    userEvent.click(buttonFeitas);
    const feitas = history.location.pathname;
    expect(feitas).toBe('/receitas-feitas');

    userEvent.click(buttonFavoritas);
    const favoritas = history.location.pathname;
    expect(favoritas).toBe('/receitas-favoritas');

    userEvent.click(buttonSair);
    const sair = history.location.pathname;
    expect(sair).toBe('/');
  });

  test('Se o footer foi renderizado com os botões', () => {
    renderWithRouterAndRedux(<Perfil />);

    const footer = screen.getByTestId(FOOTER);
    const drink = screen.getByTestId(DRINK_BTN);
    const explore = screen.getByTestId(EXPLORE_BTN);
    const meal = screen.getByTestId(MEAL_BTN);

    expect(footer).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
  });
});

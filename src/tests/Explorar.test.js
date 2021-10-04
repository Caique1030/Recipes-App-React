import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explorar from '../pages/Explorar';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';

const BUTTON_TESTID_COMIDAS = 'explore-food';
const BUTTON_TESTID_BEBIDAS = 'explore-drinks';

const FOOTER = 'footer';
const DRINK_BTN = 'drinks-bottom-btn';
const EXPLORE_BTN = 'explore-bottom-btn';
const MEAL_BTN = 'food-bottom-btn';

describe('Perfil tests', () => {
  test('Deve aparecer na tela; todos botões.', () => {
    renderWithRouterAndRedux(<Explorar />);

    const buttonComidas = screen.getByTestId(BUTTON_TESTID_COMIDAS);
    const buttonBebidas = screen.getByTestId(BUTTON_TESTID_BEBIDAS);

    expect(buttonComidas).toBeInTheDocument();
    expect(buttonBebidas).toBeInTheDocument();
  });

  test('Se a URL da página é alterada ao clicar em cada botão', () => {
    const { history } = renderWithRouterAndRedux(<Explorar />);

    const buttonComidas = screen.getByTestId(BUTTON_TESTID_COMIDAS);
    const buttonBebidas = screen.getByTestId(BUTTON_TESTID_BEBIDAS);

    expect(buttonComidas).toBeInTheDocument();
    expect(buttonBebidas).toBeInTheDocument();

    userEvent.click(buttonComidas);
    const comidas = history.location.pathname;
    expect(comidas).toBe('/explorar/comidas');

    userEvent.click(buttonBebidas);
    const bebidas = history.location.pathname;
    expect(bebidas).toBe('/explorar/bebidas');
  });

  test('Se o footer foi renderizado com os botões', () => {
    renderWithRouterAndRedux(<Explorar />);

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

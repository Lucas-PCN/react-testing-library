import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do Pikachu.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const averageWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /Pikachu Sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(averageWeigth).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('Testa se o card do Pokémon indicado na Pokédex '
  + 'contém um link de navegação para exibir detalhes '
  + 'deste Pokémon. O link deve possuir a URL /pokemons/<id>'
  + ', onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });

    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it('Testa se ao clicar no link de navegação do Pokémon, '
  + 'é feito o redirecionamento da aplicação para a'
  + ' página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoriteCheckbox = screen.getByRole('checkbox');

    userEvent.click(favoriteCheckbox);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked/i });

    expect(starIcon).toBeDefined();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});

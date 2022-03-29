import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';

describe('teste do componente Pokedex', () => {
  it('Testa se contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByTestId(POKEMON_NAME).textContent;
      expect(pokemonName).toBe(name);
      userEvent.click(button);
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(POKEMON_NAME);
    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const TYPES_QUANTITY = 7;
    expect(filterButtons).toHaveLength(TYPES_QUANTITY);

    pokemons.forEach(({ type }) => {
      const button = screen.getByRole('button', { name: type });
      userEvent.click(button);
      const typeName = screen.getAllByText(type);
      expect(button).toBeInTheDocument();
      expect(typeName).toHaveLength(2);
      expect(allButton).toBeInTheDocument();
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
  });
});

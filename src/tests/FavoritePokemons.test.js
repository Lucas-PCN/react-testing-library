import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const pokemonsQuantity = 9;

describe('teste do componente Favorite Pokémons', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritesPokemons = screen.getAllByTestId('pokemon-name');
    expect(favoritesPokemons).toHaveLength(pokemonsQuantity);
  });
});

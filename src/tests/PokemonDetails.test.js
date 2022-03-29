import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper';
import App from '../App';

const PIKACHU_PATHNAME = '/pokemons/25';

describe('Teste o componente Pokemon Details', () => {
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    const header = screen.getByRole('link', { name: /more details/i });
    history.push(PIKACHU_PATHNAME);

    const pokemonTitle = screen.getByText(/Pikachu details/i);
    const summaryText = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const paragraphText = screen
      .getByText(/This intelligent Pokémon roasts hard berries w/i);

    expect(pokemonTitle).toBeInTheDocument();
    expect(header).not.toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(paragraphText).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as '
  + 'localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_PATHNAME);

    const locationsText = screen
      .getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(locationsText).toBeInTheDocument();

    const firstLocation = screen.getByText(/Kanto Viridian Forest/i);
    const secondLocation = screen.getByText(/Kanto Power Plant/i);
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();

    const locationImage = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(locationImage).toHaveLength(2);
    expect(locationImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImage[0].alt).toBe('Pikachu location');
    expect(locationImage[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImage[1].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PIKACHU_PATHNAME);

    const favoriteCheckbox = screen.getByRole('checkbox');
    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteLabel).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked/i });
    expect(starIcon).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(starIcon).not.toBeInTheDocument();
  });
});

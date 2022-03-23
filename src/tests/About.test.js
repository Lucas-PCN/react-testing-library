import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper';
import { About } from '../components';

describe('teste do componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex (dois parágrafos)', () => {
    renderWithRouter(<About />);

    const infoText1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    const inforText2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');

    expect(infoText1).toBeInTheDocument();
    expect(inforText2).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem correta de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

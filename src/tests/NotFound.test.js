import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper';
import { NotFound } from '../components';

describe('teste do componente NotFound', () => {
  it('Testa se contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const heading = screen
      .getByRole('heading', { level: 2, name: 'Page requested not found Crying emoji' });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem correta', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', { name: /Pikachu/i });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

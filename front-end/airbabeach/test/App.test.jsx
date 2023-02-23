import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
/*
describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
}); */


//import App from './App';
import { Footer } from '../src/Components/Footer'

describe('Footer', () => {
  it('É renderizado corretamente"', () => {
    render(<Footer />);
    //screen.debug();
    expect(screen.getByText(/©2023 AirBnBeach, inc/)).toBeInTheDocument();
    expect(screen.getByText(/©2023 AirBnBeach, inc/)).toMatchSnapshot()
  });
});
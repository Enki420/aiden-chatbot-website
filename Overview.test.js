import { render, screen } from '@testing-library/react';
import Overview from './Overview';

test('renders company overview with correct details', () => {
    render(<Overview />);
    expect(screen.getByText(/Agile Defense Systems, LLC/i)).toBeInTheDocument();
    expect(screen.getByText(/Veteran Owned/i)).toBeInTheDocument();
});

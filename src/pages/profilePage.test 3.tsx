import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}))

jest.mock("service/api", () => ({
    api: {
        put: jest.fn()
    }
}))


jest.mock('react - toastify', () => ({
    toast: {
        succes: jest.fn,
        error: jest.fn
    }
}));

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
};



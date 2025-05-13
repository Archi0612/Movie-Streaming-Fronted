import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProfilePage from './profilePage';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { ReactElement } from 'react';
import { toast } from 'react-toastify';
// import userEvent from '@testing-library/user-event';

vi.mock('../services/api', () => ({
    api: {
        put: vi.fn(),
    },
}));

// Mocking the toast notifications
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

const mockDispatch = vi.fn();
vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux');
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        useNavigate: () => mockNavigate,
    };
});


const renderComponent = () => {
    return render(
        <Provider store={store}>
            <Router>
                <ProfilePage />

            </Router>
        </Provider>
    );
}

describe('ProfilePage', () => {

    let dispatch: AppDispatch;

    beforeEach(() => {
        const mockDispatch = vi.fn();
        dispatch = mockDispatch;
    })

    test('renders ProfilePage with user profile data', () => {
        renderComponent();

        // Check ProfilePage title is rendered or not
        expect(screen.getByText(/Profile Page/i)).toBeInTheDocument();

        // Check if "Personal Information" section is rendered
        expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();

        // Check if the profile data (e.g., Full Name, Date of Birth, etc.) is rendered
        expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Date Of Birth/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByText(/Email/i)).toBeInTheDocument();
    });

    it("User should logout Succesfully", async () => {
        renderComponent()
        const logoutButton = screen.getByTitle('logout');
        fireEvent.click(logoutButton);

        await waitFor(() => {
            // this will ensure that the functionality dipatches
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'user/logout' });

            //this will ensure the user is redirected to login
            expect(mockNavigate).toHaveBeenCalledWith('/login');

            // this will ensure toast was shown
            expect(toast.success).toHaveBeenCalledWith("Logout Success");
        });
    });

    it("should open the edit profile modal when clicking the edit button", async () => {
        renderComponent()

        // Find and click the edit button
        const editButton = screen.getByTitle("edit profile");
        fireEvent.click(editButton);

        // Check if modal is open
        await waitFor(() => {
            expect(screen.getByText("Edit Profile")).toBeInTheDocument();
        });
    });

    it("should close the edit profile modal when clicking the cancel button", async () => {
        renderComponent();

        // Open the modal
        fireEvent.click(screen.getByTitle("edit profile"));

        // Ensure modal opened
        await waitFor(() => {
            expect(screen.getByText("Edit Profile")).toBeInTheDocument();
        });

        // Find and click the cancel button
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        // Check if modal is closed
        await waitFor(() => {
            expect(screen.queryByText("Edit Profile")).not.toBeInTheDocument();
        });
    });

    // it("should allow typing into name, phone number, and date of birth fields, but not email", async () => {
    //     renderComponent();

    //     // Open the modal
    //     fireEvent.click(screen.getByTitle("edit profile"));

    //     // Ensure modal opened
    //     await waitFor(() => {
    //         expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    //     });

    //     // Find input fields
    //     const nameInput = screen.getByRole('textbox', { name: /name/i });
    //     const emailInput = screen.getByRole('textbox', { name: /email/i });
    //     const phoneInput = screen.getByRole('textbox', { name: /phone number/i });
    //     const dobInput = screen.getByLabelText(/date of birth/i);


    //     // Type into inputs
    //     await userEvent.type(nameInput, "Priyanshu Choduhary");
    //     await userEvent.type(phoneInput, "9875050087");
    //     await userEvent.type(dobInput, "2001-08-22");

    //     // Ensure values are updated
    //     expect(nameInput).toHaveValue(" Priyanshu Choudhary");
    //     expect(phoneInput).toHaveValue("9875050087");
    //     expect(dobInput).toHaveValue("2001-08-22");

    //     // email field is disabled and not editable
    //     expect(emailInput).toBeDisabled();
    // });


});

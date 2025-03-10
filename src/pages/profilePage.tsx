import React, { useState } from 'react';
import Likedlist from '../components/LikedList';
import WatchList from '../components/WatchList';
import userIcon from '../assets/user_logo.png';
import './profilePage.css';
import { getNames } from "country-list";
import SubscriptionModal from '../components/subscription/Subscription';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaEdit } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { AppDispatch } from '../redux/store';
import {api} from '../services/api';

ReactModal.setAppElement('#root'); // Ensure accessibility compliance

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        country: "",
        dateOfBirth: "",
        gender: ""
    });

    const countries = getNames().sort();

    const loggedUser = useSelector((state: RootState) => state.user.currentUser);
    // Handle input changes for Edit Profile form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
        // to update the profile info we need to setup an api call here 

    };

    const logoutUser = async () => {
        try {
            dispatch({ type: 'user/logout' });
            navigate("/login");
            toast.success("Logout Success");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const updateInfo = async () => {

        const response = await api.put('/user/editProfile', formData);
        const data = response.data();
        console.log(data);

    }

    return (
        <>
            <div className='profilepagecontainer'>
                <div className='internalProfilePage'>
                    <div className='profilepage-heading'>
                        <h1 className='ProfileHeading'>Profile Page</h1>
                    </div>
                    <div className='profileCard-information'>
                        <div className='primaryContainer'>
                            <img className="userLogo" src={userIcon} alt="User Icon" />
                        </div>

                        <div className='profile-section'>
                            <div className='heading'>
                                <h3 className='heading-personalinfo'>Personal Information</h3>
                                <div className='edit-subscribe'>
                                    {/* <button onClick={() => setIsOpen(true)} className="editProfile-btn">Edit</button> */}
                                    <button type="button" onClick={() => setIsOpen(true)} className="editProfile-btn">
                                        <FaEdit onClick={() => setIsOpen(true)} size={20} />
                                    </button>
                                    <button className='subscribeProfile-btn' onClick={() => setIsSubscribeOpen(true)} >
                                        Subscribe
                                    </button>
                                    <button className='subscribeProfile-btn' onClick={() => logoutUser()} >
                                        <FiLogOut />
                                    </button>
                                </div>
                            </div>
                            <div className="profileInfo-container">
                                <table className="profile-table">
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <td>{loggedUser.name.toUpperCase()}</td>
                                        </tr>
                                        <tr>
                                            <th>Date Of Birth</th>
                                            <td>22 August 2001</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{loggedUser.gender || "NA"}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td>{loggedUser?.contactNo}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{loggedUser?.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Country</th>
                                            <td>india</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className='profilepage-content'>
                        <div className='profilepage-watchlist'>
                            {/* <div className='watchlist-component'> */}
                            <WatchList />
                            {/* </div> */}
                        </div>
                        <div className='profilepage-liked'>
                            <div className='profilepage-likedContent'>
                                <Likedlist />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="modal1"
                overlayClassName="modal-overlay"
            >
                <h2 style={{ color: 'white' }}>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete='off' required />

                    <label>Email:</label>
                    <input type="email" placeholder={loggedUser?.email} name="email" value={formData.email} onChange={handleChange} autoComplete='off' disabled />

                    <label>Phone Number:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete='off' required />
                    <div className="country">
                        <label className="country-label">Country:</label>
                        <select name="country" value={formData.country} onChange={handleChange} required className="country-select">
                            <option value="">Select a country</option>
                            {countries.map((country: string) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label>Date of Birth:</label>
                    <input type="date" name="dob" value={formData.dateOfBirth} onChange={handleChange} autoComplete='off' required />

                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Other">other</option>
                    </select>

                    <div className="modal-buttons">

                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button type="submit" onClick={updateInfo}>Save</button>
                    </div>
                </form>
            </ReactModal>



            {/* Subscription Component */}

            {isSubscribeOpen && (
                < SubscriptionModal user={loggedUser} isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
            )}


        </>
    );
}

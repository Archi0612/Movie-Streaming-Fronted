import  { useEffect, useState } from 'react';
import * as React from "react";
import Likedlist from '../components/LikedList/LikedList';
import WatchList from '../components/WatchList/WatchList';
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
import { api } from '../services/api';
import { fetchProfile } from '../redux/slices/Profile/Profile';
import { fetchWatchList } from '../redux/slices/WatchList/WatchList';
import { fetchLikedList } from '../redux/slices/LikedList/LikedList';

ReactModal.setAppElement('#root'); // Ensure accessibility compliance

export default function ProfilePage() {
    const todayDate = new Date().toISOString().split("T")[0];
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchWatchList());
        dispatch(fetchLikedList());
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(false);
    const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
    const [userFormData, setUserFormData] = useState({
        name: "",
        contactNo: "",
        country: "",
        dateOfBirth: "",
        gender: "",
        email:"",
    });

    const countries = getNames().sort();
    const profile = useSelector((state: RootState) => state.profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
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
        try {
            const response = await api.put('/user/editProfile', userFormData);
            
            // Check if response itself has status 200
            if (response.status === 200) {
               dispatch(fetchProfile());
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    

    return (
        <>
            <div className='profilepagecontainer'>
                <div className='internalProfilePage'>
                    <div className='profilepage-heading'>
                        <h1 className='ProfileHeading'>Profile Page</h1>
                    </div>
                    <div className='profileCard-information'>
                        <div className='primaryContainer'>
                            <img className="userLogo" src={profile.data?.profilePicture} alt="User Icon" />
                        </div>

                        <div className='profile-section'>
                            <div className='heading'>
                                <h3 className='heading-personalinfo'>Personal Information</h3>
                                <div className='edit-subscribe'>
                                    {/* <button onClick={() => setIsOpen(true)} className="editProfile-btn">Edit</button> */}
                                    <button type="button" onClick={() => setIsOpen(true)} className="editProfile-btn">
                                        <FaEdit onClick={() => setIsOpen(true)} size={20} title='edit profile' />
                                    </button>
                                    <button className='subscribeProfile-btn' onClick={() => setIsSubscribeOpen(true)} >
                                        Subscribe
                                    </button>
                                    <button className='subscribeProfile-btn' onClick={() => logoutUser()} title="logout" >
                                        <FiLogOut />
                                    </button>
                                </div>
                            </div>
                            <div className="profileInfo-container">
                                <table className="profile-table">
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <td>{profile?.data?.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Date Of Birth</th>
                                            <td>{profile?.data?.dateOfBirth || "N/A"} m</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{profile?.data?.gender || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td>{profile?.data?.contactNo || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{profile?.data?.email || "N/A"}</td>
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
                    <input type="text" name="name" value={userFormData.name} onChange={handleChange} autoComplete='off'  />

                    <label>Email:</label>
                    <input type="email" placeholder="" name="email" value={profile?.data?.email} onChange={handleChange} autoComplete='off' disabled />

                    <label>Phone Number:</label>
                    <input type="tel" name="contactNo" value={userFormData.contactNo} onChange={handleChange} autoComplete='off'  />
                    {/* <div className="country">
                        <label className="country-label">Country:</label>
                        <select name="country" value={userFormData.country} onChange={handleChange} required className="country-select">
                            <option value="">Select a country</option>
                            {countries.map((country: string) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={userFormData.dateOfBirth} onChange={handleChange} autoComplete='off'  max={todayDate}/>

                    <label>Gender:</label>
                    <select name="gender" value={userFormData.gender} onChange={handleChange}>
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
                < SubscriptionModal  isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
            )}


        </>
    );
}
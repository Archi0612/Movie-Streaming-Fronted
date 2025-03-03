import React, { useState } from 'react';
import Likedlist from '../components/LikedList';
import WatchList from '../components/WatchList';
import userIcon from '../assets/userIcon.png';
import './profilePage.css';
import Checkout from '../components/Checkout';
import { getNames } from "country-list";
import SubscriptionSelection from '../components/subscription/Subscription';
import ReactModal from 'react-modal';
// import { useSelector } from 'react-redux';

ReactModal.setAppElement('#root'); // Ensure accessibility compliance

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        dob: "",
        gender: ""
    });
    const countries = getNames().sort();

    // const user = useSelector(getState(user));

    // Handle input changes for Edit Profile form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
        // to update the profile info we need to setup an api call here 

    };

    // // Handle subscription selection
    // const handleSubscribeSelection = (subscriptionType: string, total: number) => {
    //     console.log("Selected subscription and its price:", subscriptionType, total);
    //     Checkout(subscriptionType, total);
    //     setSubscribeOpen(false);
    // };


    return (
        <>
            <div className='profilepagecontainer'>
                <div className='internalProfilePage'>
                    <div className='profilepage-heading'>
                        <h1>Profile Page</h1>
                    </div>
                    <div className='profileCard-information'>
                        <div className='profile-card'>
                            <div className='primaryContainer'>
                                <div className='img-username'>
                                    <img src={userIcon} alt="User Icon" />
                                </div>
                            </div>
                            <div className='sec-profilecard'>
                                <label>User Id 2343</label>
                                <label>22 Aug 2001</label>
                                <label>India</label>
                            </div>
                        </div>

                        <div className='profile-section'>
                            <div className='heading'>
                                <h3>Personal Information</h3>
                                <button onClick={() => setIsOpen(true)} className="edit-btn">Edit</button>
                                <button className='subscribe-btn' onClick={() => setIsSubscribeOpen(true)} >
                                    Subscribe
                                </button>
                            </div>
                            <div className='profile-info'>
                                <div className='profile-titles'>
                                    <label htmlFor="name">Full Name</label>
                                    <label htmlFor="DOB">Date Of Birth</label>
                                    <label htmlFor="gender">Gender</label>
                                    <label htmlFor="phoneno">Phone Number</label>
                                    <label htmlFor="email">Email</label>
                                    <label htmlFor="country">Country</label>
                                </div>
                                <div className='profile-details'>
                                    <span id='name'>Priyanshu</span>
                                    <span id='DOB'>22 August 2001</span>
                                    <span id='gender'>Male</span>
                                    <span id='phoneno'>123123123</span>
                                    <span id='email'>Priyanshu@gmail.com</span>
                                    <span id='country'>India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='profilepage-content'>
                        <div className='profilepage-watchlist'>
                            <div className='watchlist-component'>
                                <WatchList />
                            </div>
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
                    <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete='off' required />

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
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} autoComplete='off' required />

                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}  required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <div className="modal-buttons">
                        
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </ReactModal>



            {/* Subscription Component */}

            {isSubscribeOpen && (
                < SubscriptionSelection isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
            )}


        </>
    );
}

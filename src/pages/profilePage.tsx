import Likedlist from '../components/LikedList';
import WatchList from '../components/WatchList';
import { useState } from 'react';
import './profilePage.css';

export default function ProfilePage() {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        dob: "",
        gender: ""
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setIsOpen(false); // Close modal after submission
    };

    return (
        <>
            <div className='profilepagecontainer'>
                <div className='profilepage-heading'>
                    <h1>Profile</h1>
                </div>
                <div className='profileCard-information'>
                    <div className='profile-card'>
                        <div className='primaryContainer'>
                            <div className='img-username'>
                                <img src="https://via.placeholder.com/100"></img>
                            </div>
                        </div>
                        <div className='sec-profilecard'>
                            <h3>user Id 2343</h3>
                            <h4>22 Aug 2001</h4>
                            <h4>India </h4>
                        </div>
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className='profile-section'>
                        <div className='heading'>
                            <h3>Personal Information</h3>
                            <button onClick={() => setIsOpen(true)} className="edit-btn">Edit</button>
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
                            < WatchList />
                        </div>
                    </div>
                    <div className='profilepage-liked'>
                        <div className='profilepage-likedContent'>
                            <Likedlist />
                        </div>
                    </div>
                </div>
            </div >
            {/* Modal Overlay */}
            {
                isOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2 style={{ color: 'black' }}>Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <label>Name:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                                <label>Phone Number:</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                                <label>Country:</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} required />

                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

                                <label>Gender:</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                <div className="modal-buttons">
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
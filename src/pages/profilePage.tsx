import './profilePage.css';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Profile } from '../interfaces/movie.interface';
export default function ProfilePage() {
    const [showEmailInput, setShowEmailInput] = useState<boolean>(false);

    const [profile, setProfile] = useState<Profile>({
        name: '',
        gender: '',
        dob: '',
        country: '',
        email: '',
    });

    const user = {
        firstName: "Priyanshu",
        lastName: "Choudhary",
        email: "Priyanshuchoudhary0104@gmail.com",
    };

    const getFormattedDate = (): string => new Date().toISOString().split("T")[0];

    const handleSave = () => {
        console.log("Profile saved:", profile);
        // API call logic
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mainContainer">
            {/* Navbar */}
            <div className='primaryContainer'>
                <div className="navbar">
                    <h1>Welcome, {user.firstName}</h1>
                </div>
                <h2>{getFormattedDate()}</h2>
            </div>

            <div className='secondaryContainer'>
                <div className='sec-primaryContainer'>
                    <div className='sec-secondaryContainer'>
                        <div className='profileSection'>
                            <div className='profilePic-Img'>
                                <FaUserCircle size={60} className="profilePic" />
                                <div className='details'>
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <h4>{user.email}</h4>
                                </div>
                            </div>
                            <button className='saveBtn' onClick={handleSave}>Save</button>
                        </div>

                        <div className='formMain'>
                            <div className='primaryformContainer'>
                                <div>
                                    <label>Name</label>
                                    <input type='text' name="name" value={profile.name} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select name="gender" value={profile.gender} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className='secondaryformContainer'>
                                <div>
                                    <label>Date of Birth</label>
                                    <input type='date' name="dob" value={profile.dob} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type='text' name="country" value={profile.country} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className='emailSection'>
                            <h3>My Email Address</h3>
                            {showEmailInput && (
                                <input type="email" name="email" placeholder="Enter your email" value={profile.email} onChange={handleChange} />
                            )}
                            <button onClick={() => setShowEmailInput((prev) => !prev)}>
                                {showEmailInput ? "Cancel" : "+ Add New Email Address"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
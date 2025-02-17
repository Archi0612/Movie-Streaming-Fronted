import './profilePage.css';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // For profile icon
import { IoIosArrowDown } from 'react-icons/io'; // For dropdown arrow

export default function ProfilePage() {
    const [firstname, setFirstname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState('');

    const getFormattedDate = (): string => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="mainContainer">
            {/* Navbar */}
            <div className='primaryContainer'>
                <div className="navbar">
                    <h1>Welcome, Priyanshu</h1>
                    <div className="profileDropdown">
                        <FaUserCircle size={40} className="profileIcon" />
                        <IoIosArrowDown size={20} className="dropdownArrow" />
                    </div>
                </div>
                <h2>{getFormattedDate()}</h2>
            </div>

            {/* Profile Section */}
            <div className='secondaryContainer'>
                <div className='sec-primaryContainer'>
                    <div className='sec-secondaryContainer'>
                        <div className='profileSection'>
                            <div className='profilePic-Img'>
                                <FaUserCircle size={60} className="profilePic" />
                                <div className='details'>
                                    <h3>Priyanshu Choudhary</h3>
                                    <h4>Priyanshuchoudhary0104@gmail.com</h4>
                                </div>
                            </div>
                            <button className='saveBtn'>Save</button>
                        </div>

                        {/* Form Section */}
                        <div className='formMain'>
                            <div className='primaryformContainer'>
                                <div>
                                    <label>First Name</label>
                                    <input type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div>
                                    <label>Gender</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Date of Birth</label>
                                    <input type='date' value={dob} onChange={(e) => setDob(e.target.value)} />
                                </div>
                            </div>

                            <div className='secondaryformContainer'>
                                <div>
                                    <label>Last Name</label>
                                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className='emailSection'>
                            <h3>My Email Address</h3>
                            {showEmailInput ? (
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : null}
                            <button onClick={() => setShowEmailInput(true)}> + Add Email Address</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
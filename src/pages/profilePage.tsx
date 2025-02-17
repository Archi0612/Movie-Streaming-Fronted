import './profilePage.css';
import { useState } from 'react';

export default function ProfilePage() {
    const [firstname, setFirstname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');

    const getFormattedDate = (): string => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = today.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="mainContainer">
                <div className='primaryContainer'>
                    <h1>Welcome, Priyanshu </h1>
                    <h1>{getFormattedDate()}</h1>
                    {/* In this i have to add profile logo on top right its a navbar so 
                    welcome user, and profile icon with drop down maybe
                    */}
                </div>
                <div className='secondaryContainer'>
                    <div className='sec-primaryContainer'>
                        <div className='sec-secondaryContainer'>
                            <div className='profileSection'>
                                <div className='profilePic-Img'>
                                    <div className='img'>
                                    </div>
                                    <div className='details'>
                                        <h3>Priyanshu Choudhary</h3>
                                        <h4>Priyanshuchoudhary0104@gmail.com</h4>
                                    </div>
                                </div>
                                <div>
                                    <button className='saveBtn'>Save</button>
                                </div>
                            </div>


                            <div className='formMain'>
                                <div className='primaryformContainer'>
                                    <div>
                                        <label>FirstName</label>
                                        <input type='text' value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label>Gender</label>
                                        <input type='text' value={gender} onChange={(e) => setGender(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label>Date Of Birth</label>
                                        <input type='text' value={dob} onChange={(e) => setDob(e.target.value)} ></input>
                                    </div>
                                </div>

                                <div className='secondaryformContainer'>
                                    <div>
                                        <label>LastName</label>
                                        <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label>Country</label>
                                        <input type='text' value={country} onChange={(e) => setCountry(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>
                            <div className='emailSection'>
                                <h3>My Email Address</h3>
                                <div className='emailIcon'>

                                </div>
                                <button> + Add Email Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

 
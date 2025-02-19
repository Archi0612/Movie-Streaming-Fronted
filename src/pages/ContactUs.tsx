import React, { useState } from 'react';
import './ContactUs.css';
import { FaFacebook, FaXTwitter, FaSquareInstagram, FaYoutube } from "react-icons/fa6";
const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent successfully!');
    };

    const toggleQuestion = (index: number) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-side-container">
                        <div className="contact-info">
                            <div className="contact-info-content">
                                <h2>Get in touch</h2>
                                <p className='contact-info-text'>Have questions or need assistance? We're here to help! Reach out to us and our team will respond as quickly as possible. Your feedback is important to us!</p>
                                <p><strong>Email:</strong> support@example.com</p>
                                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                                <p><strong>Address:</strong> 123 Business St, City, Country</p>
                                <div className="social-links">
                                    <div className="social-links">
                                        <a href="#" className="social-link"><FaFacebook size={24} /></a>
                                        <a href="#" className="social-link"><FaXTwitter size={24} /></a>
                                        <a href="#" className="social-link"><FaYoutube size={24} /></a>
                                        <a href="#" className="social-link"><FaSquareInstagram size={24} /></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-side-container">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="form-input"
                                />
                            </div>
                            <div className='btn-submit'>
                                <button type="submit" className="submit-button">
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    <div className="faq-item">
                        <div className="faq-question" onClick={() => toggleQuestion(0)}>
                            <p>How can I contact support?</p>
                            <svg
                                className={`faq-icon ${activeQuestion === 0 ? 'rotate-up' : 'rotate-down'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M12 15.88l-4.59-4.59L7 9l5 5 5-5 1.41 1.41z" />
                            </svg>
                        </div>
                        {activeQuestion === 0 && (
                            <div className="faq-answer">
                                <p>If you have any issues, you can contact us via the form above or email us at support@example.com.</p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" onClick={() => toggleQuestion(1)}>
                            <p>What are your business hours?</p>
                            <svg
                                className={`faq-icon ${activeQuestion === 1 ? 'rotate-up' : 'rotate-down'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M12 15.88l-4.59-4.59L7 9l5 5 5-5 1.41 1.41z" />
                            </svg>
                        </div>
                        {activeQuestion === 1 && (
                            <div className="faq-answer">
                                <p>Our support team is available Monday to Friday from 9 AM to 6 PM.</p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" onClick={() => toggleQuestion(2)}>
                            <p>How long does it take to get a response?</p>
                            <svg
                                className={`faq-icon ${activeQuestion === 2 ? 'rotate-up' : 'rotate-down'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M12 15.88l-4.59-4.59L7 9l5 5 5-5 1.41 1.41z" />
                            </svg>
                        </div>
                        {activeQuestion === 2 && (
                            <div className="faq-answer">
                                <p>We typically respond within 1-2 business days. Please be patient while we assist you.</p>
                            </div>
                        )}
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" onClick={() => toggleQuestion(3)}>
                            <p>Do you offer international support?</p>
                            <svg
                                className={`faq-icon ${activeQuestion === 3 ? 'rotate-up' : 'rotate-down'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path d="M12 15.88l-4.59-4.59L7 9l5 5 5-5 1.41 1.41z" />
                            </svg>
                        </div>
                        {activeQuestion === 3 && (
                            <div className="faq-answer">
                                <p>Yes, we offer support worldwide. Feel free to contact us from any location.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

import React, { useState } from 'react';
import './ContactUs.css';
import { FaFacebook, FaXTwitter, FaSquareInstagram, FaYoutube } from "react-icons/fa6";

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

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

    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    const faqs = [
        { question: "How can I contact support?", answer: "If you have any issues, you can contact us via the form above or email us at support@example.com." },
        { question: "What are your business hours?", answer: "Our support team is available Monday to Friday from 9 AM to 6 PM." },
        { question: "How long does it take to get a response?", answer: "We typically respond within 1-2 business days. Please be patient while we assist you." },
        { question: "Do you offer international support?", answer: "Yes, we offer support worldwide. Feel free to contact us from any location." },
        { question: "How do I sign up?", answer: "Click on 'Sign Up,' enter your name, email, and create a password." },
        { question: "What devices are supported?", answer: "You can stream on mobile, web, and streaming devices." },
        { question: "Do you offer different subscription plans?", answer: "Yes, we have multiple plans to suit your needs. Check our pricing page for details." }
    ];

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-side-container">
                        <div className="contact-info">
                            <div className="contact-info-content">
                                <h2>Get in touch</h2>
                                <p className='contact-info-text'>
                                    Have questions or need assistance? We're here to help! Reach out to us and our team will respond as quickly as possible. Your feedback is important to us!
                                </p>
                                <p><strong>Email:</strong> support@example.com</p>
                                <p><strong>Phone:</strong> +1 (234) 567-890</p>
                                <p><strong>Address:</strong> 123 Business St, City, Country</p>
                                <div className="social-links">
                                    <a href="#" className="social-link"><FaFacebook size={24} /></a>
                                    <a href="#" className="social-link"><FaXTwitter size={24} /></a>
                                    <a href="#" className="social-link"><FaYoutube size={24} /></a>
                                    <a href="#" className="social-link"><FaSquareInstagram size={24} /></a>
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
                                    // className="form-input"
                                    className="form-textarea"

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

                {/* FAQ Section */}
                <div className="faq-section">
                    <h3>Frequently Asked Questions</h3>
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => toggleQuestion(index)}>
                                <p>{faq.question}</p>
                                <svg
                                    className={`faq-icon ${activeQuestion === index ? 'rotate-up' : 'rotate-down'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path d="M12 15.88l-4.59-4.59L7 9l5 5 5-5 1.41 1.41z" />
                                </svg>
                            </div>
                            {activeQuestion === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

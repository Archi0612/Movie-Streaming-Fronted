import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <motion.div
                className="loading-ring"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <div className="dots">
                <motion.span
                    className="dot"
                    animate={{ y: [0, -10, 0], backgroundColor: ["#0073e6", "#0059b3", "#2a2a72"] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                />
                <motion.span
                    className="dot"
                    animate={{ y: [0, -10, 0], backgroundColor: ["#0059b3", "#2a2a72", "#0073e6"] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                    className="dot"
                    animate={{ y: [0, -10, 0], backgroundColor: ["#2a2a72", "#0073e6", "#0059b3"] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

export default Loader;
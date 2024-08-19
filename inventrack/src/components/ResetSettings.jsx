import React, { useState } from 'react';
import Modal from 'react-modal';
import './ResetSettings.css'; // Import your CSS file

Modal.setAppElement('#root'); // For accessibility

const ResetSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleReset = () => {
        // Add functionality to reset settings to default
        // Here you would normally call an API or update the context/state
        // For demonstration, we just log to the console and alert
        console.log('Settings have been reset to default.');
        alert('Settings have been reset to default.');

        // Reset appearance settings to default
        // You might want to reset context or local state here
        // For example, if using context:
        // const { resetAppearance } = useContext(ThemeContext);
        // resetAppearance();

        closeModal();
    };

    return (
        <div className="reset-settings-container">
            <h2>Reset Settings</h2>
            <p>Reset all settings to their default values. This action cannot be undone.</p>
            <button onClick={openModal} className="reset-button">Reset Settings</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Confirm Reset</h2>
                <p>Are you sure you want to reset all settings to their default values? This action cannot be undone.</p>
                <div className="modal-buttons">
                    <button onClick={handleReset} className="confirm-button">Yes, Reset</button>
                    <button onClick={closeModal} className="cancel-button">Cancel</button>
                </div>
            </Modal>
        </div>
    );
};

export default ResetSettings;

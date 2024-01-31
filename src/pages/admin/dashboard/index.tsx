import { useState } from "react";
import Modal from "../../components/Modal";

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(!isOpen);
    }

    return (
        // <h1>Admin Dashboard</h1>
        <>
        <button onClick={() => setIsOpen(true)}>Show</button>
        <Modal isOpen={isOpen} onClose={handleClose} title="Admin">
            <h1>Hi there</h1>
        </Modal>
        </>
    );
};

export default AdminDashboard;
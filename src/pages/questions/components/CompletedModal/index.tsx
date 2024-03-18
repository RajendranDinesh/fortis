import styles from './finished.module.css';
import Modal from "../../../components/Modal"

export default function CompletedModal({
    isFinished
}: {isFinished: boolean}) {
    
    return (
        <Modal isOpen={isFinished} onClose={() => { }} >
            <div className={styles.modal_top_div}>
                <div className={styles.modal_header}>
                    <h1>Assessment has been submitted</h1>
                    <h4>Thank you for attending the assessment 🫶</h4>
                </div>

                <h3 style={{ alignSelf: 'flex-start' }}>Here are your stats</h3>
                <div className={styles.stats}>
                    <div>
                        <h5>Total questions</h5>
                        <p>10</p>
                    </div>
                    <div>
                        <h5>Questions attempted</h5>
                        <p>5</p>
                    </div>
                    <div>
                        <h5>Questions not attempted</h5>
                        <p>5</p>
                    </div>
                    <div>
                        <h5>Questions with errors</h5>
                        <p>1</p>
                    </div>
                    <div>
                        <h5>Questions not viewed</h5>
                        <p>3</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
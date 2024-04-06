import React from 'react';
import QuestionAccordion from './questionAccordion';

// Importing CSS
import styles from '../test.module.css';

export default function Test() {
    return(
        <div className={styles.test_mainContainer}>
            <div className ={styles.test_headingContainer}>
                    <h2>
                        Formative Assessment 1
                    </h2>
            </div>

            <div className={styles.QuestionContainer}>
                <QuestionAccordion />
            </div>
        </div>
    )
}
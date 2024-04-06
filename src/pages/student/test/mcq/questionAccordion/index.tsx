import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Importing CSS
import styles from '../../test.module.css';

export default function QuestionAccordion() {

    const [questions, setQuestions] = React.useState([
        "Who is the prime Minister of India?",
        "Who is the best cricketer in the world?",
        "who is the protagonist of the movie 'The Dark Knight'?",
        "Who is the prime Minister of India?",

    ]);

    const [options, setOptions] = React.useState([
        ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Yogi Adityanath","Manmohan Singh"],
        ["Sachin Tendulkar", "Virat Kohli", "Adam Gilchirst", "Jacques Kallis"],
        ["Heath Ledger", "Christian Bale", "Tom Hardy", "Morgan Freeman"],
        ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Yogi Adityanath"],
    ]);

    const [selectedAnswers, setSelectedAnswers] = React.useState([
        "Narendra Modi",
        "Sachin Tendulkar",
        "Heath Ledger",
        "Narendra Modi"
    ]);

    const [correctAnswers, setCorrectAnswers] = React.useState([
        "Narendra Modi",
        "Sachin Tendulkar",
        "Christian Bale",
        "Narendra Modi"
    ]);

    
    return (

        <div>
            {questions.map((question, index) => (
                <Accordion key={index} style={{backgroundColor :"#212121", color : "#b3b3b3" , borderRadius :"1rem", width:"50vw", marginBottom:"2rem"}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: selectedAnswers[index] !== correctAnswers[index] ? '#E60000' : '#b3b3b3' }} />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                       <h2> {question}</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ol className ={styles.options}>
                            {options[index].map((option, i) => (
                                       <li key={i}  style={{ 
                                       color : option === selectedAnswers[index] ?
                                        (selectedAnswers[index] === correctAnswers[index] ? '#1db954' : '#E60000') 
                                        :"#b3b3b3"
                                    }}>
                                        {option}
                                        </li>
                            ))}
                        </ol>
                        {selectedAnswers[index] === correctAnswers[index] ? (
                            <p className={styles.correctOption}>
                                Yes, your answer is correct. 
                            </p>
                        ) : (
                            <p className={styles.incorrectOption}>
                                No, your answer is incorrect.
                            </p>
                        )}
                        <p className={styles.correctAnswer}> Correct Answer : {correctAnswers[index]}</p>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )}
import React,{ useState } from 'react';

// Importing the styles
import styles from '../test.module.css';

//Assests Import
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

//Component Import
import AnswerEditor from '../Editor';


export default function ProgrammingAnswer(){
    const [questions, setQuestions] = useState([
        `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

        Symbol       Value
        I             1
        V             5
        X             10
        L             50
        C             100
        D             500
        M             1000
        For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.
        
        Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
        
        I can be placed before V (5) and X (10) to make 4 and 9. 
        X can be placed before L (50) and C (100) to make 40 and 90. 
        C can be placed before D (500) and M (1000) to make 400 and 900.
        Given a roman numeral, convert it to an integer.
        
         
        
        Example 1:
        
        Input: s = "III"
        Output: 3
        Explanation: III = 3.
        Example 2:
        
        Input: s = "LVIII"
        Output: 58
        Explanation: L = 50, V= 5, III = 3.
        Example 3:
        
        Input: s = "MCMXCIV"
        Output: 1994
        Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
         
        
        Constraints:
        
        1 <= s.length <= 15
        s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
        It is guaranteed that s is a valid roman numeral in the range [1, 3999].
        `,
        "2.What is the capital of France?",
        "3.Calculate the area of a circle with radius 5.",
        "4.Write a function to check if a given number is prime."
    ]);
    
    const [answers, setAnswers] = useState([
        `class Solution:
        def romanToInt(self, s: str) -> int:
            roman_values = {
                'I': 1,
                'V': 5,
                'X': 10,
                'L': 50,
                'C': 100,
                'D': 500,
                'M': 1000
            }
        
            total = 0
            prev_value = 0
        
            for char in s:  
                value = roman_values[char]
                if value > prev_value:
                    total += value - 2 * prev_value
                else:
                    total += value
                prev_value = value
        
            return total`,

        `// Answer: The capital of France is Paris.
    const capital = 'Paris';
    console.log("Capital:", capital);`,

        `// Answer: The area of a circle with radius 5 is approximately 78.54 square units.
    const radius = 5;
    const area = Math.PI * radius * radius;
    console.log("Area:", area);`,
    
        `// Answer: A prime number is a number that is only divisible by 1 and itself.
    // You can check each number from 2 to the square root of the given number
    // to see if it is divisible by any other number.
    function isPrime(num) {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    const num = 7; // Example number
    console.log(num, "is prime:", isPrime(num));`
    ]);
    
    const [submittedCodes, setSubmittedCodes] = useState([
        `class Solution:
        def romanToInt(self, s: str) -> int:
            roman_values = {
                'I': 1,
                'V': 5,
                'X': 10,
                'L': 50,
                'C': 100,
                'D': 500,
                'M': 1000
            }
        
            total = 0
            prev_value = 0
        
            for char in s:  
                value = roman_values[char]
                if value > prev_value:
                    total += value - 2 * prev_value
                else:
                    total += value
                prev_value = value
        
            return total`,

            `// Answer: The capital of France is Paris.
            const capital = 'Paris';
            console.log("Capital:", capital);`,
        
                `// Answer: The area of a circle with radius 5 is approximately 78.54 square units.
            const radius = 5;
            const area = Math.PI * radius * radius;
            console.log("Area:", area);`,


                `#include <iostream>
            #include <cmath>
            using namespace std;
            
            bool isPrime(int n) {
                if (n <= 1) return false;
                for (int i = 2; i <= sqrt(n); ++i) {
                    if (n % i == 0) return false;
                }
                return true;
            }
            
            int main() {
                int num;
                cout << "Enter a number: ";
                cin >> num;
                if (isPrime(num)) {
                    cout << num << " is a prime number." << endl;
                } else {
                    cout << num << " is not a prime number." << endl;
                }
                return 0;
            }`
            ]);
    
    const [submittedCodeLanguages, setSubmittedCodeLanguages] = useState([
        "python",
        "javascript",
        "java",
        "cpp"
    ]);
    
    const [activeTab , setActiveTab] = useState('question') ;
    // const [submittedcode , setSubmittedCode] = useState("From Backend");
    // const [submittedCodeLang , setSubmittedCodeLang] = useState('javascript');
    const [currentQuestionIndex , setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className ={styles.test_mainContainer}>
            <div className={styles.programHeading}>
                <h1>Programming Test</h1>
            </div>

            <div className={styles.programmingContainer}>
            <div className={styles.programLeftContainer}>
                <div className ={styles.programSwitch}>
                    <button onClick ={()=>setActiveTab('question')}>Question</button>
                    <button onClick={()=>setActiveTab('answers')}>Answer</button>
                    <div className={styles.programNav}>
                    {(currentQuestionIndex !== 0)&&(
                        <button onClick={handlePreviousQuestion}>
                            <GrPrevious />
                        </button>
                    )}
                    {(currentQuestionIndex !== questions.length - 1)&&(
                        <button onClick={handleNextQuestion}>
                            <GrNext />
                        </button>
                    )}
                </div>
                </div>
                
                {activeTab === 'question' && (
                    <div className={styles.programQuestionContainer}>
                         <h2>{questions[currentQuestionIndex].split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h2>
                    </div>
                )}
                {activeTab === 'answers' && (
                    <div className={styles.programAnswerContainer}>
                        <AnswerEditor value={answers[currentQuestionIndex]} lang={submittedCodeLanguages[currentQuestionIndex]} />
                    </div>
                )}
            </div>
            <div className={styles.programRightContainer}>
                <h2>Submitted Code:</h2>
                <div className={styles.submittedCodeContainer}>
               <AnswerEditor value={submittedCodes[currentQuestionIndex]} lang={submittedCodeLanguages[currentQuestionIndex]} />
               </div>
            </div>
            </div>
        </div>
    )
}

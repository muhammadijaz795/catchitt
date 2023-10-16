import { useState } from 'react';
import './styles.css';

interface Faq {
    question: any;
    answer: any;
    open: boolean;
    toggleOpen: any
}

const FaqItem = ({ question, answer, open, toggleOpen }: Faq) => {
    const details = document.querySelectorAll("details");

    // Add the onclick listeners.
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            // Close all the details that are not targetDetail.
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
    return (
        <details open={open} onClick={toggleOpen}>
            <summary>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p>{question}</p>
                </div>
            </summary>
            <div>
                <p>{answer}</p>
            </div>
        </details>
    );
};

const FaqContainer = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenFaq(index); // Open the clicked FAQ
        if (index !== openFaq) {
            setOpenFaq(null)
        }
    };

    const faqData = [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
        { question: 'Question 3', answer: 'Answer 3' },
        { question: 'Question 4', answer: 'Answer 4' },
    ];

    return (
        <div className="faqsContainer">
            {faqData.map((faq, index) => (
                <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    open={index === openFaq}
                    toggleOpen={() => toggleOpen(index)}
                />
            ))}
        </div>
    );
};

export default FaqContainer;
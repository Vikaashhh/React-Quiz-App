import React, { useState, useEffect } from "react";


const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare" },
  { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], answer: "H2O" },
  { question: "What is the tallest mountain in the world?", options: ["K2", "Everest", "Kilimanjaro", "Denali"], answer: "Everest" },
  { question: "What is the capital of Japan?", options: ["Tokyo", "Beijing", "Seoul", "Bangkok"], answer: "Tokyo" },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "What is the freezing point of water in Celsius?", options: ["0", "32", "-10", "100"], answer: "0" }
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function QuizApp() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]).slice(0, 10));
  }, []);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowNext(true);
    if (option === shuffledQuestions[currentIndex].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowNext(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative bg-gray-700 border-2 border-gray-600 p-10 shadow-xl w-full max-w-2xl text-center">
        {finished ? (
          <div>
            <h2 className="text-3xl font-bold text-white">Quiz Completed!</h2>
            <p className="mt-4 text-lg text-gray-300">Your Score: {score} / {shuffledQuestions.length}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {shuffledQuestions[currentIndex]?.question}
            </h2>
            <div className="space-y-4">
              {shuffledQuestions[currentIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                  className={`block w-full text-lg p-4 border transition-all duration-300 
                    ${selectedOption === option && option === shuffledQuestions[currentIndex].answer ? "bg-green-600 text-white border-green-700" : ""} 
                    ${selectedOption === option && option !== shuffledQuestions[currentIndex].answer ? "bg-red-600 text-white border-red-700" : "bg-gray-600 hover:bg-gray-500 text-gray-200 border-gray-500"} 
                    ${option === shuffledQuestions[currentIndex].answer && selectedOption !== null ? "bg-green-600 text-white border-green-700" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showNext && (
              <button 
                onClick={nextQuestion} 
                className="mt-6 bg-blue-500 text-white px-8 py-3 border border-blue-700 hover:bg-blue-600 transition-all text-lg">
                Proceed to Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
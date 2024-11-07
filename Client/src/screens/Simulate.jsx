import { useState } from "react";
import BgCourt from "../assets/BackgroundCourt.jpeg";
import LadyLawyer from "../assets/LadyLawyer.png";
import MaleLawyer from "../assets/MaleLawyer.png";

const conversation = [
  { speaker: "man", text: "Hi" },
  { speaker: "woman", text: "Hello" },
  { speaker: "man", text: "How are you?" },
  { speaker: "woman", text: "I'm good, thanks! And you?" },
  { speaker: "man", text: "I'm doing well. What have you been up to?" },
  { speaker: "woman", text: "Just working on some projects. You?" },
  { speaker: "man", text: "Same here, busy with work." },
  { speaker: "woman", text: "Have you had any time to relax?" },
  { speaker: "man", text: "A little, I watched a movie last night." },
  { speaker: "woman", text: "Nice! What did you watch?" },
  { speaker: "man", text: "I watched 'Inception'." },
  { speaker: "woman", text: "That's a great movie! Did you like it?" },
  { speaker: "man", text: "Yeah, it was really interesting." },
  { speaker: "woman", text: "I love movies that make you think." },
];

const Simulator = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < conversation.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentSpeaker = conversation[currentStep].speaker;
  const currentText = conversation[currentStep].text;

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BgCourt})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-md shadow-md z-10"
        disabled={currentStep === 0}
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-md shadow-md z-10"
        disabled={currentStep === conversation.length - 1}
      >
        Next
      </button>

      <div className="absolute inset-0 flex flex-col md:flex-row justify-center items-end z-0 p-4">
        {/* Display Only the Current Speaker */}
        {currentSpeaker === "man" ? (
          <div className="flex flex-col md:flex-row items-center space-x-4 space-y-4 md:space-y-0">
            <img
              src={MaleLawyer}
              alt="Male Lawyer"
              className="h-[50vh] md:h-[75vh] w-auto"
            />
            <div className="bg-gray-100 p-4 rounded-xl shadow-md w-48 text-xl ">
              <p>{currentText}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse md:flex-row items-center space-x-4 space-y-4 md:space-y-0">
            <div className="bg-gray-100 p-4 rounded-xl shadow-md w-48 text-xl text-right">
              <p>{currentText}</p>
            </div>
            <img
              src={LadyLawyer}
              alt="Female Lawyer"
              className="h-[50vh] md:h-[75vh] w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;

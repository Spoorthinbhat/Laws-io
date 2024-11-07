import { useEffect, useState } from 'react';
import BgCourt from '../assets/BackgroundCourt.jpeg';
import LadyLawyer from '../assets/LadyLawyer.png';
import MaleLawyer from '../assets/MaleLawyer.png';
import old_man from '../assets/ManOld.png';
import UncleMan from '../assets/ManYoung.png';
import woman from '../assets/woman.png';

const Simulator = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setdata] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [contextVisible, setContextVisible] = useState(true); // State for showing context first
  //  const json= {
  //     "context": "This case, inspired by the landmark case of State of Maharashtra vs. Madhukar N. Nagle, revolves around a man named Rohan who claimed self-defense after fatally stabbing a neighbor during an altercation. Rohan alleges that his neighbor, Raj, was physically assaulting him, forcing him to use the knife in self-preservation. The prosecution argues that Rohan's actions were not justified and that he deliberately killed Raj in a fit of rage.",
  //     "dialogues": [
  //       {
  //         "role": "opposing_lawyer",
  //         "statement": "Your Honor, the prosecution believes that Rohan's claim of self-defense is a blatant fabrication. This was a cold-blooded murder, and the evidence will show that Rohan was the aggressor, not Raj."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Your Honor, the defense will argue that Rohan acted solely in self-defense, his actions driven by a genuine fear for his life. The prosecution will present a distorted narrative, but the truth lies in the evidence.",
  //         "options": [
  //           {
  //             "option": "The defense should focus on proving that Rohan was attacked first and had no choice but to use the knife.",
  //             "correct": true,
  //             "reason": "This aligns with the key element of self-defense: the necessity of the action due to an imminent threat."
  //           },
  //           {
  //             "option": "The defense should argue that Rohan's prior disputes with Raj justify his actions.",
  //             "correct": false,
  //             "reason": "Past disputes, while relevant to motive, do not automatically establish self-defense. The focus should be on the specific event."
  //           },
  //           {
  //             "option": "The defense should challenge the prosecution's witnesses by suggesting they are biased against Rohan.",
  //             "correct": false,
  //             "reason": "While witness credibility is important, it shouldn't be the sole focus. The defense needs to establish a clear narrative of self-defense."
  //           },
  //           {
  //             "option": "The defense should argue that Rohan's actions were proportionate to the threat posed by Raj.",
  //             "correct": true,
  //             "reason": "This addresses a key legal principle in self-defense - the response must be proportional to the threat."
  //           }
  //         ]
  //       },
  //       {
  //         "role": "opposing_lawyer",
  //         "statement": "The prosecution presents witness testimony that Rohan had a history of violent behavior, casting doubt on his claim of acting solely in self-defense."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Your Honor, while the prosecution attempts to portray Rohan as a volatile individual, we urge the court to consider the context of those past events and the specific circumstances of this altercation.",
  //         "options": [
  //           {
  //             "option": "The defense should focus on demonstrating that Rohan's past actions are unrelated to the current incident.",
  //             "correct": true,
  //             "reason": "This separates past behavior from the specific incident, focusing on the immediacy of the threat."
  //           },
  //           {
  //             "option": "The defense should argue that Rohan's past actions were justified and should not be considered against him.",
  //             "correct": false,
  //             "reason": "Past actions, even if justified, can still be used to establish a pattern of behavior, impacting credibility."
  //           },
  //           {
  //             "option": "The defense should emphasize that Rohan had never used violence against Raj before.",
  //             "correct": false,
  //             "reason": "While relevant, it's not a decisive factor. The focus should be on the immediate threat and response."
  //           },
  //           {
  //             "option": "The defense should highlight the prosecution's attempt to paint Rohan as a dangerous individual.",
  //             "correct": false,
  //             "reason": "While true, this doesn't directly address the legal argument of self-defense. The focus should remain on the facts."
  //           }
  //         ]
  //       },
  //       {
  //         "role": "woman",
  //         "statement": "I saw the whole thing! Rohan was yelling and threatening Raj. He had the knife in his hand, and Raj was trying to back away."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Could you please describe the scene, detailing the exact movements of both Rohan and Raj? Did you see Raj physically assault Rohan?",
  //         "options": [
  //           {
  //             "option": "The friendly lawyer should focus on eliciting information about Raj's aggression towards Rohan.",
  //             "correct": true,
  //             "reason": "This helps establish the threat perceived by Rohan, a key element of self-defense."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask if the woman saw Rohan attack Raj first.",
  //             "correct": false,
  //             "reason": "While important, this line of questioning focuses on Rohan's actions, diverting from the immediate threat."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the woman if she felt threatened by Rohan's actions.",
  //             "correct": false,
  //             "reason": "The woman's perception is not legally determinative. The focus should remain on the actions of Rohan and Raj."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the woman if she saw Rohan use the knife.",
  //             "correct": false,
  //             "reason": "This acknowledges the use of the knife, but doesn't focus on the threat that led to its use."
  //           }
  //         ]
  //       },
  //       {
  //         "role": "old_man",
  //         "statement": "I heard a commotion and came outside. Raj was backing away from Rohan, who was waving the knife in his hand."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Can you please describe what happened immediately before you arrived on the scene? Did you see Raj threaten Rohan in any way?",
  //         "options": [
  //           {
  //             "option": "The friendly lawyer should ask the old man if he saw Raj attack Rohan.",
  //             "correct": true,
  //             "reason": "This focuses on Raj's actions leading up to the altercation, establishing the threat."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the old man if he knew Rohan and Raj previously.",
  //             "correct": false,
  //             "reason": "While relevant for context, this line of questioning doesn't focus on the immediate events."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the old man if he saw Rohan stab Raj.",
  //             "correct": false,
  //             "reason": "This acknowledges the stabbing but doesn't establish the necessary threat."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the old man if he saw Rohan attempt to run away.",
  //             "correct": false,
  //             "reason": "This focuses on Rohan's actions, diverting from the threat posed by Raj."
  //           }
  //         ]
  //       },
  //       {
  //         "role": "opposing_lawyer",
  //         "statement": "Your Honor, the prosecution argues that Rohan's actions were disproportionate. The evidence will show that he could have easily walked away from the situation."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Your Honor, the defense contends that in the heat of the moment, Rohan's perception of the threat was genuine and his actions were the only way to ensure his safety.",
  //         "options": [
  //           {
  //             "option": "The friendly lawyer should argue that Rohan's perception of the threat was subjective and should be considered.",
  //             "correct": true,
  //             "reason": "This acknowledges the subjective nature of self-defense, emphasizing Rohan's perception of the threat."
  //           },
  //           {
  //             "option": "The friendly lawyer should argue that Rohan had no other choice but to use the knife.",
  //             "correct": false,
  //             "reason": "While true, this doesn't address the proportionality of his actions to the threat."
  //           },
  //           {
  //             "option": "The friendly lawyer should argue that Raj was a dangerous individual, justifying Rohan's actions.",
  //             "correct": false,
  //             "reason": "While relevant, this doesn't directly address the proportionality of Rohan's actions."
  //           },
  //           {
  //             "option": "The friendly lawyer should argue that the prosecution is attempting to mislead the court by exaggerating the situation.",
  //             "correct": false,
  //             "reason": "This doesn't directly address the legal argument of self-defense and focuses on the prosecution's actions."
  //           }
  //         ]
  //       },
  //       {
  //         "role": "person",
  //         "statement": "I saw Rohan run away after the incident. He looked scared and panicked."
  //       },
  //       {
  //         "role": "friendly_lawyer",
  //         "statement": "Did you see Rohan attempt to contact the authorities or seek help after the incident?",
  //         "options": [
  //           {
  //             "option": "The friendly lawyer should ask the witness if Rohan showed signs of distress after the incident.",
  //             "correct": true,
  //             "reason": "This aligns with the concept of a person acting in self-defense showing signs of fear and distress after the event."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the witness if Rohan appeared to be calm after the incident.",
  //             "correct": false,
  //             "reason": "This would contradict the typical reaction of someone who has acted in self-defense."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the witness if Rohan was trying to hide his actions.",
  //             "correct": false,
  //             "reason": "This line of questioning could be interpreted as implying guilt and undermines the claim of self-defense."
  //           },
  //           {
  //             "option": "The friendly lawyer should ask the witness if Rohan was seen talking to anyone after the incident.",
  //             "correct": false,
  //             "reason": "This line of questioning is irrelevant to the central issue of self-defense."
  //           }
  //         ]
  //       }
  //     ]
  //     }
  //     const conversation= json.dialogues;

  //   const context = "This case involves Self-Defense under Section 96 to 106 of the Indian Penal Code, 1860. The following dialogues represent interactions in a simulated court setting.";

  async function simulateCourt() {
    try {
      const response = await fetch(
        `https://laws-api.poseidon0z.com/ai/simulateCourt?law=${encodeURIComponent(
          'Self-Defense (Section 96 to 106 of the Indian Penal Code, 1860)'
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch court simulation: ${response.statusText}`
        );
      }

      // Log the raw response text to check the exact response from the API
      const responseText = await response.json();
      console.log('Raw Response Text:', responseText);

      setdata(responseText);
      setConversation(responseText.dialogues);
      // Set conversation data here
    } catch (error) {
      // This handles any other errors, such as fetch failures
      console.error('Error:', error.message);
    }
  }

  const characters = {
    opposing_lawyer: LadyLawyer,
    friendly_lawyer: MaleLawyer,
    old_man: old_man,
    person: UncleMan,
    woman: woman,
  };

  useEffect(() => {
    // Fetch data only on initial page load (component mount)
    simulateCourt();
  }, []);

  const handleNext = () => {
    if (currentStep < conversation.length - 1) {
      setSelectedOption(null);
      setReason('');
      setOptionsVisible(conversation[currentStep + 1].options !== undefined);
      setCurrentStep(currentStep + 1);
      setPageNumber(pageNumber + 1); // Update the page number
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setSelectedOption(null);
      setReason('');
      setOptionsVisible(conversation[currentStep - 1].options !== undefined);
      setCurrentStep(currentStep - 1);
      setPageNumber(pageNumber - 1); // Update the page number
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setReason(option.reason);
  };

  const startSimulation = () => {
    setContextVisible(false); // Hide context and start simulation
  };

  if (conversation.length === 0) {
    return <div>Loading simulation...</div>;
  }

  const currentSpeaker = conversation[currentStep].role;
  const currentText = conversation[currentStep].statement;
  const options = conversation[currentStep].options || [];

  return (
    <div
      className="relative w-full h-screen flex items-end justify-center bg-gray-900"
      style={{
        backgroundImage: `url(${BgCourt})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {contextVisible ? (
        // Context Section
        <div className="w-3/4 bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Context</h2>
          <p className="text-lg">{data.context}</p>
          <button
            onClick={startSimulation}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Start Simulation
          </button>
        </div>
      ) : (
        // Simulation Section
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded-md shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentStep === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-md shadow-md z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentStep === conversation.length - 1}
          >
            Next
          </button>

          {/* MCQ Section */}
          {optionsVisible && options.length > 0 && (
            <div className="w-full md:w-2/3 flex flex-col items-center justify-end p-4 text-black">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full md:w-3/4">
                <p className="text-xl mb-4">Choose an option:</p>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full p-2 text-lg rounded-md ${
                        selectedOption &&
                        selectedOption.option === option.option
                          ? option.correct
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {option.option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation Section */}
          <div className="md:w-full flex flex-col items-end justify-center p-4">
            <div
              className={`flex ${
                currentSpeaker === 'opposing_lawyer'
                  ? 'flex-col md:flex-row items-end space-x-4'
                  : 'flex-row md:flex-row-reverse items-center space-x-4'
              }`}
            >
              <img
                src={characters[currentSpeaker]}
                alt={currentSpeaker}
                className="h-[50vh] md:h-[75vh] w-auto"
              />
              <div className="bg-gray-100 p-4 rounded-xl shadow-md w-full md:w-7/12 text-xl text-black">
                <p>{currentText}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reason Section */}
      {reason && (
        <div className="fixed bottom-0 w-9/12 bg-gray-800 text-white p-4">
          <p className="text-lg font-bold">Reason:</p>
          <p>{reason}</p>
        </div>
      )}
    </div>
  );
};

export default Simulator;

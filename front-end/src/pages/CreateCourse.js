import React, { useState } from "react";
import Step1 from "../components/createcoursepage/Step1";
import Step2 from "../components/createcoursepage/Step2";
import Step3 from "../components/createcoursepage/Step3";
import Step4 from "../components/createcoursepage/Step4";
import Step5 from "../components/createcoursepage/Step5";

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseInfo, setCourseInfo] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStep1Next = (title) => {
    setCourseTitle(title);
    handleNextStep();
  };

  const handleStep2Next = (info) => {
    setCourseInfo(info);
    handleNextStep();
  };

  const handleStep3Next = (price) => {
    setCoursePrice(price);
    handleNextStep();
  };

  const handleStep4Next = (preview) => {
    setImagePreview(preview);
    handleNextStep();
  };

  return (
    <div>
      {currentStep === 1 && <Step1 onNextStep={handleStep1Next} />}
      {currentStep === 2 && (
        <Step2 onNextStep={handleStep2Next} onPrevStep={handlePrevStep} />
      )}
      {currentStep === 3 && (
        <Step3 onNextStep={handleStep3Next} onPrevStep={handlePrevStep} />
      )}
      {currentStep === 4 && (
        <Step4 onNextStep={handleStep4Next} onPrevStep={handlePrevStep} />
      )}
      {currentStep === 5 && (
        <Step5
          courseTitle={courseTitle}
          courseInfo={courseInfo}
          coursePrice={coursePrice}
          imagePreview={imagePreview}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      )}
    </div>
  );
};

export default CreateCourse;

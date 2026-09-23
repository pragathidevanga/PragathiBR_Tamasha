import Step1PersonalInfo
  from "./components/Step1PersonalInfo";

import Step2Preferences
  from "./components/Step2Preferences";

import Step3TechStack
  from "./components/Step3TechStack";

import Step4Review
  from "./components/Step4Review";

import { useForm }
  from "./context/FormContext";

function App() {

  const {
    currentStep,
    setCurrentStep,
    isDraftSaved
  } = useForm();

  const steps = [
    {
      number: 1,
      label: "Personal Info",
      percentage: 25
    },
    {
      number: 2,
      label: "Preferences",
      percentage: 50
    },
    {
      number: 3,
      label: "Tech Stack",
      percentage: 75
    },
    {
      number: 4,
      label: "Review",
      percentage: 100
    }
  ];

  const currentPercentage =
    steps[currentStep - 1].percentage;

  const renderCurrentStep = () => {

    switch (currentStep) {

      case 1:
        return <Step1PersonalInfo />;

      case 2:
        return <Step2Preferences />;

      case 3:
        return <Step3TechStack />;

      case 4:
        return <Step4Review />;

      default:
        return <Step1PersonalInfo />;
    }
  };

  return (

    <div className="app">

      <div className="app-container">

        {/* COMPLETION */}

        <div className="completion-badge">

          <div className="completion-percent">
            {currentPercentage}%
          </div>

          <div className="completion-text">
            Completed
          </div>

        </div>

        {/* HEADER */}

        <header className="app-header">

          <div className="brand-badge">
            TAMASHA.LIVE
          </div>

          <h1>
            Developer Onboarding
          </h1>

          <p>
            Complete the onboarding form
          </p>

        </header>

        {/* PROGRESS */}

        <div className="progress-container">

          <div className="progress-steps">

            <div className="progress-line">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${currentPercentage}%`
                }}
              />

            </div>

            {steps.map((step) => (

              <button
                key={step.number}
                type="button"
                className={`progress-step ${
                  currentStep === step.number
                    ? "active"
                    : currentStep > step.number
                    ? "completed"
                    : ""
                }`}
                onClick={() => {

                  if (
                    step.number <= currentStep
                  ) {
                    setCurrentStep(
                      step.number
                    );
                  }

                }}
              >

                <div className="progress-circle">

                  {currentStep >
                  step.number
                    ? "✓"
                    : step.number}

                </div>

                <span className="progress-label">
                  {step.label}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* FORM */}

        <main className="form-card">

          {renderCurrentStep()}

        </main>

        {/* DRAFT STATUS */}

        {isDraftSaved && (

          <div className="draft-status">
            ✓ Draft Saved
          </div>

        )}

      </div>

    </div>
  );
}

export default App;
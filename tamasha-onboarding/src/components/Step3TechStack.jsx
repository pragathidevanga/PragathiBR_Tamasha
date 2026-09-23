import { useForm } from "../context/FormContext";

function Step3TechStack() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    setCurrentStep
  } = useForm();

  /*
    Technology options by track.
  */

  const techOptions = {
    Frontend: [
      "React",
      "Vue",
      "TypeScript",
      "CSS Modules"
    ],

    Backend: [
      "Node.js",
      "Python/Django",
      "PostgreSQL",
      "Redis"
    ],

    /*
      Fullstack implementation.
    */

    Fullstack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Docker"
    ],

    "UI/UX Design": [
      "Figma",
      "Storybook",
      "Design Systems"
    ]
  };

  const options =
    techOptions[formData.track] || [];

  const handleTechChange = (tech) => {
    let updatedTechStack;

    if (
      formData.techStack.includes(tech)
    ) {
      updatedTechStack =
        formData.techStack.filter(
          (item) => item !== tech
        );
    } else {
      updatedTechStack = [
        ...formData.techStack,
        tech
      ];
    }

    setFormData((previousData) => ({
      ...previousData,
      techStack: updatedTechStack
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      techStack: ""
    }));
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.track) {
      newErrors.techStack =
        "Please select a primary track first.";
    } else if (
      formData.techStack.length === 0
    ) {
      newErrors.techStack =
        "Please select at least one technology.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(4);
    }
  };

  return (
    <div className="step-form">

      <div className="step-heading">

        <span>STEP 03</span>

        <h2>Tech Stack</h2>

        <p>
          Select the technologies you are
          comfortable working with.
        </p>

      </div>

      {/* SELECTED TRACK */}

      <div className="selected-track">

        <div>

          <span>
            PRIMARY TRACK
          </span>

          <strong>
            {formData.track}
          </strong>

        </div>

        <div className="track-badge">
          {options.length} options
        </div>

      </div>

      {/* TECHNOLOGIES */}

      <div className="form-group">

        <label>

          Technologies

          <span className="optional-label">
            Select one or more
          </span>

        </label>

        <div className="tech-grid">

          {options.map((tech) => {

            const selected =
              formData.techStack.includes(
                tech
              );

            return (

              <button
                type="button"
                key={tech}
                className={
                  selected
                    ? "tech-card selected"
                    : "tech-card"
                }
                onClick={() =>
                  handleTechChange(tech)
                }
              >

                <div className="tech-check">

                  {selected
                    ? "✓"
                    : ""}

                </div>

                <span>
                  {tech}
                </span>

              </button>

            );
          })}

        </div>

        {errors.techStack && (
          <small className="error-message">
            {errors.techStack}
          </small>
        )}

      </div>

      {/* SELECTED COUNT */}

      <div className="selected-count">

        {formData.techStack.length === 0
          ? "No technologies selected"
          : `${formData.techStack.length} ${
              formData.techStack.length === 1
                ? "technology"
                : "technologies"
            } selected`}

      </div>

      {/* BUTTONS */}

      <div className="button-row">

        <button
          type="button"
          className="secondary-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default Step3TechStack;
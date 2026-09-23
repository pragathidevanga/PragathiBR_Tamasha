import { useForm } from "../context/FormContext";

function Step2Preferences() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    setCurrentStep
  } = useForm();

  const tracks = [
    "Frontend",
    "Backend",
    "Fullstack",
    "UI/UX Design"
  ];

  const experienceLevels = [
    "Junior",
    "Mid",
    "Senior"
  ];

  const handleTrackChange = (track) => {
    /*
      When track changes,
      clear previous technology selections.
    */

    setFormData((previousData) => ({
      ...previousData,
      track,
      techStack: []
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      track: "",
      techStack: ""
    }));
  };

  const handleExperienceChange = (
    experience
  ) => {
    setFormData((previousData) => ({
      ...previousData,
      experience
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      experience: ""
    }));
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.track) {
      newErrors.track =
        "Please select a primary track";
    }

    if (!formData.experience) {
      newErrors.experience =
        "Please select an experience level";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="step-form">

      <div className="step-heading">

        <span>STEP 02</span>

        <h2>Preferences</h2>

        <p>
          Select your primary track and
          experience level.
        </p>

      </div>

      {/* TRACK */}

      <div className="form-group">

        <label>
          Primary Track <b>*</b>
        </label>

        <div className="option-grid">

          {tracks.map((track) => (

            <button
              type="button"
              key={track}
              className={
                formData.track === track
                  ? "option-card selected"
                  : "option-card"
              }
              onClick={() =>
                handleTrackChange(track)
              }
            >

              {formData.track === track
                ? "✓ "
                : ""}

              {track}

            </button>

          ))}

        </div>

        {errors.track && (
          <small className="error-message">
            {errors.track}
          </small>
        )}

      </div>

      {/* EXPERIENCE */}

      <div className="form-group">

        <label>
          Experience Level <b>*</b>
        </label>

        <div className="option-grid">

          {experienceLevels.map((level) => (

            <button
              type="button"
              key={level}
              className={
                formData.experience === level
                  ? "option-card selected"
                  : "option-card"
              }
              onClick={() =>
                handleExperienceChange(level)
              }
            >

              {formData.experience === level
                ? "✓ "
                : ""}

              {level}

            </button>

          ))}

        </div>

        {errors.experience && (
          <small className="error-message">
            {errors.experience}
          </small>
        )}

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

export default Step2Preferences;
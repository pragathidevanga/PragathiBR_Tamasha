import { useState } from "react";
import { useForm } from "../context/FormContext";
import LocalStoragePreview from "./LocalStoragePreview";

function Step4Review() {
  const {
    formData,
    setCurrentStep
  } = useForm();

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showStorage, setShowStorage] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Make sure the latest data is stored in Local Storage
      localStorage.setItem(
        "tamashaOnboarding",
        JSON.stringify(formData)
      );

      const response = await fetch(
        "http://localhost:5000/api/onboarding/submit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            portfolio: formData.portfolio,
            track: formData.track,
            experience: formData.experience,
            techStack: formData.techStack
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to submit application"
        );
      }

      console.log(
        "Application submitted:",
        result.data
      );

      setShowStorage(true);
      setShowSuccess(true);
    } catch (error) {
      console.error(
        "Submission error:",
        error
      );

      setSubmitError(
        "Unable to submit application. Please make sure the backend server is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="step-form">

        <div className="step-heading">
          <span>STEP 04</span>

          <h2>Review & Submit</h2>

          <p>
            Review your responses before
            submitting.
          </p>
        </div>

        {/* Personal Information */}

        <div className="review-card">

          <div className="review-card-header">

            <div>
              <span className="review-number">
                01
              </span>

              <h3>
                Personal Information
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentStep(1)
              }
            >
              Edit
            </button>

          </div>

          <div className="review-grid">

            <div className="review-item">
              <span>Full Name</span>

              <strong>
                {formData.name || "—"}
              </strong>
            </div>

            <div className="review-item">
              <span>Email</span>

              <strong>
                {formData.email || "—"}
              </strong>
            </div>

            <div className="review-item">
              <span>GitHub</span>

              <strong>
                {formData.portfolio || "—"}
              </strong>
            </div>

          </div>

        </div>

        {/* Preferences */}

        <div className="review-card">

          <div className="review-card-header">

            <div>
              <span className="review-number">
                02
              </span>

              <h3>
                Preferences
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentStep(2)
              }
            >
              Edit
            </button>

          </div>

          <div className="review-grid">

            <div className="review-item">
              <span>Primary Track</span>

              <strong>
                {formData.track || "—"}
              </strong>
            </div>

            <div className="review-item">
              <span>Experience</span>

              <strong>
                {formData.experience || "—"}
              </strong>
            </div>

          </div>

        </div>

        {/* Tech Stack */}

        <div className="review-card">

          <div className="review-card-header">

            <div>
              <span className="review-number">
                03
              </span>

              <h3>
                Tech Stack
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentStep(3)
              }
            >
              Edit
            </button>

          </div>

          <div className="review-tech-list">

            {formData.techStack.length > 0 ? (
              formData.techStack.map(
                (tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                )
              )
            ) : (
              <strong>
                No technologies selected
              </strong>
            )}

          </div>

        </div>

        {/* Error */}

        {submitError && (
          <div className="submit-error">
            {submitError}
          </div>
        )}

        {/* Buttons */}

        <div className="button-row">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              setCurrentStep(3)
            }
            disabled={isSubmitting}
          >
            ← Back
          </button>

          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}

            {!isSubmitting && (
              <span>✓</span>
            )}
          </button>

        </div>

      </div>

      {/* Success Popup */}

      {showSuccess && (
        <div className="modal-overlay">

          <div className="success-modal">

            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              APPLICATION SUBMITTED
            </span>

            <h2>
              Congratulations! 🎉
            </h2>

            <p>
              Your onboarding application
              has been submitted successfully
              and saved to MongoDB.
            </p>

            <button
              type="button"
              className="success-close-button"
              onClick={() =>
                setShowSuccess(false)
              }
            >
              View Submitted Data
            </button>

          </div>

        </div>
      )}

      {/* Local Storage Data */}

      {showStorage && (
        <LocalStoragePreview />
      )}
    </>
  );
}

export default Step4Review;
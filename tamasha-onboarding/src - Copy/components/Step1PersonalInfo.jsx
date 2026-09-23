import { useForm } from "../context/FormContext";

function Step1PersonalInfo() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    setCurrentStep
  } = useForm();

  const validateField = (name, value) => {
    let error = "";

    /*
      FULL NAME VALIDATION
      - Required
      - Minimum first + last name
      - Letters and spaces only
      - No numbers
      - No special characters
    */

    if (name === "name") {
      const fullName = value.trim();

      if (!fullName) {
        error = "Full name is required";
      } else if (
        !/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(
          fullName
        )
      ) {
        error =
          "Please enter your full name using letters only";
      }
    }

    /*
      EMAIL VALIDATION
    */

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          value.trim()
        )
      ) {
        error = "Enter a valid email address";
      }
    }

    /*
      GITHUB VALIDATION
    */

    if (name === "portfolio") {
      const githubURL = value.trim();

      if (githubURL) {
        const githubPattern =
          /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/;

        if (!githubPattern.test(githubURL)) {
          error =
            "Enter a valid GitHub URL, e.g. https://github.com/username";
        }
      }
    }

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: error
    }));

    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ""
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    validateField(name, value);
  };

  const handleNext = () => {
    const nameError = validateField(
      "name",
      formData.name
    );

    const emailError = validateField(
      "email",
      formData.email
    );

    const githubError = validateField(
      "portfolio",
      formData.portfolio
    );

    if (
      !nameError &&
      !emailError &&
      !githubError
    ) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="step-form">

      <div className="step-heading">
        <span>STEP 01</span>

        <h2>Personal Info</h2>

        <p>
          Tell us about yourself and provide
          your GitHub profile.
        </p>
      </div>

      {/* FULL NAME */}

      <div className="form-group">

        <label>
          Full Name <b>*</b>
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
        />

        {errors.name && (
          <small className="error-message">
            {errors.name}
          </small>
        )}

      </div>

      {/* EMAIL */}

      <div className="form-group">

        <label>
          Email <b>*</b>
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
        />

        {errors.email && (
          <small className="error-message">
            {errors.email}
          </small>
        )}

      </div>

      {/* GITHUB */}

      <div className="form-group">

        <label>
          GitHub Profile
        </label>

        <div className="input-with-icon">

          <span className="input-icon">
            ↗
          </span>

          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://github.com/username"
          />

        </div>

        <p className="input-help">
          Enter your complete GitHub profile URL.
        </p>

        {errors.portfolio && (
          <small className="error-message">
            {errors.portfolio}
          </small>
        )}

      </div>

      {/* BUTTON */}

      <div className="button-row next-row">

        <button
          type="button"
          onClick={handleNext}
        >
          Continue
          <span>→</span>
        </button>

      </div>

    </div>
  );
}

export default Step1PersonalInfo;
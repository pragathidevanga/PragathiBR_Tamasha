import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const FormContext = createContext(null);

const initialFormData = {
  name: "",
  email: "",
  portfolio: "",
  track: "",
  experience: "",
  techStack: []
};

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const savedData =
      localStorage.getItem("tamashaOnboarding");

    if (!savedData) {
      return initialFormData;
    }

    try {
      const parsedData = JSON.parse(savedData);

      return {
        ...initialFormData,
        ...parsedData,
        techStack: Array.isArray(parsedData.techStack)
          ? parsedData.techStack
          : []
      };
    } catch {
      return initialFormData;
    }
  });

  const [errors, setErrors] = useState({});

  const [currentStep, setCurrentStep] =
    useState(1);

  const [isDraftSaved, setIsDraftSaved] =
    useState(false);

  /*
    Debounced auto-save
    Saves after 500ms of inactivity.
  */

  useEffect(() => {
    setIsDraftSaved(false);

    const timer = setTimeout(() => {
      localStorage.setItem(
        "tamashaOnboarding",
        JSON.stringify(formData)
      );

      setIsDraftSaved(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        currentStep,
        setCurrentStep,
        isDraftSaved
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
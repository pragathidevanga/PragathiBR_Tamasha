import { useEffect, useState } from "react";

function LocalStoragePreview({
  refreshKey
}) {
  const [savedData, setSavedData] =
    useState(null);

  useEffect(() => {
    const data =
      localStorage.getItem(
        "tamashaOnboarding"
      );

    if (!data) {
      setSavedData(null);
      return;
    }

    try {
      setSavedData(JSON.parse(data));
    } catch {
      setSavedData(null);
    }
  }, [refreshKey]);

  if (!savedData) {
    return null;
  }

  return (
    <div className="storage-preview">

      <div className="storage-preview-header">

        <div>
          <span className="storage-label">
            LOCAL STORAGE
          </span>

          <h3>
            Saved Application Data
          </h3>
        </div>

        <span className="storage-status saved">
          ✓ Saved Successfully
        </span>

      </div>

      <div className="storage-key">

        <span>
          Storage Key
        </span>

        <strong>
          tamashaOnboarding
        </strong>

      </div>

      <div className="storage-data">

        <div className="storage-item">
          <span>FULL NAME</span>
          <strong>
            {savedData.name || "—"}
          </strong>
        </div>

        <div className="storage-item">
          <span>EMAIL</span>
          <strong>
            {savedData.email || "—"}
          </strong>
        </div>

        <div className="storage-item full-storage-item">

          <span>GITHUB PROFILE</span>

          {savedData.portfolio ? (
            <a
              href={savedData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              {savedData.portfolio}
            </a>
          ) : (
            <strong>—</strong>
          )}

        </div>

        <div className="storage-item">
          <span>PRIMARY TRACK</span>

          <strong>
            {savedData.track || "—"}
          </strong>
        </div>

        <div className="storage-item">
          <span>EXPERIENCE LEVEL</span>

          <strong>
            {savedData.experience || "—"}
          </strong>
        </div>

        <div className="storage-item full-storage-item">

          <span>TECH STACK</span>

          <div className="storage-tech-list">

            {savedData.techStack?.length > 0
              ? savedData.techStack.map(
                  (tech) => (
                    <span key={tech}>
                      {tech}
                    </span>
                  )
                )
              : (
                <strong>—</strong>
              )}

          </div>

        </div>

      </div>

      <div className="storage-footer">

        <span>●</span>

        Data displayed from browser Local Storage

      </div>

    </div>
  );
}

export default LocalStoragePreview;
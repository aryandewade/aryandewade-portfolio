import { useEffect, useState } from "react";

type DaylightToggleProps = {
  large?: boolean;
};

export default function DaylightToggle({ large = false }: DaylightToggleProps) {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "daylight-toggle") return;
      setNight(Boolean(event.data.night));
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      className={`daylight-toggle-container ${large ? "daylight-toggle-container-large" : ""} ${night ? "is-night" : ""}`}
    >
      <iframe
        src="/daylight-toggle/index.html"
        title="Daylight Toggle"
      />
    </div>
  );
}

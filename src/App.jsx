import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';

const App = () => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [focusedElement, setFocusedElement] = useState(null);

  useEffect(() => {
    const handleFocus = () => {
      setFocusedElement(document.activeElement);
    };

    const handleBlur = () => {
      setFocusedElement(null);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleInsertClick = () => {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      activeElement.value += transcript;
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Microphone is not available.</span>;
  }

  return (
    <div className="floating-widget">
      <h1>Voice Input Everywhere</h1>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Recording'}
      </button>
      <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop Recording
      </button>
      <button onClick={handleInsertClick} disabled={!transcript}>
        Insert Transcript
      </button>
      <textarea
        id="transcriptionTextArea"
        rows="5"
        cols="30"
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default App;

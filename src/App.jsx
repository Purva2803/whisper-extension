import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Microphone is not available.</span>;
  }

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Recording'}
      </button>
      <button onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop Recording
      </button>
      {console.log(transcript)}
      <textarea
        id="transcriptionTextArea"
        rows="10"
        cols="50"
        value={transcript}
        readOnly
      />
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();
    setRecording(true);

    mediaRecorder.addEventListener('dataavailable', event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = [];
      const formData = new FormData();
      formData.append('file', audioBlob);

      const response = await fetch('http://localhost:5000/transcribe', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setTranscription(data.transcription);
      setRecording(false);
    });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  return (
    <div style={{ width: '200px', padding: '10px' }}>
      <h1>Transcribe Audio</h1>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <textarea value={transcription} readOnly style={{ width: '100%', height: '100px', marginTop: '10px' }} />
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));

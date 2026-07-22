import { useRef } from "react";

const UploadOptions = ({ setAudioFile, setShowOptions }) => {
  const audioRef = useRef();
  return (
    <div className="absolute bottom-12 left-0 bg-zinc-700 rounded-lg shadow-lg p-2 w-48">
      <button
        onClick={() => audioRef.current.click()}
        className="w-full text-left p-2 hover:bg-zinc-600 rounded"
      >
        Upload audio
      </button>
      <input
        ref={audioRef}
        type="file"
        accept="audio/*"
        hidden
        onChange={(e) => {
          if (e.target.files.length) {
            setAudioFile(e.target.files[0]);
            setShowOptions(false);
          }
        }}
      />
    </div>
  );
};

export default UploadOptions;

import { useRef } from "react";

const UploadOptions = ({ setAudioFile, setImageFile, setShowOptions }) => {
  const audioRef = useRef();
  const imageRef = useRef();
  return (
    <div className="absolute bottom-12 left-0 bg-zinc-700 rounded-lg shadow-lg p-2 w-48">
      <button
        onClick={() => audioRef.current.click()}
        className="w-full text-left p-2 hover:bg-zinc-600 rounded"
      >
        Upload audio
      </button>
      <button
        onClick={() => imageRef.current.click()}
        className="w-full text-left p-2 hover:bg-zinc-600 rounded"
      >
        Upload image
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
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files.length) {
            setImageFile(e.target.files[0]);
            setShowOptions(false);
          }
        }}
      />
    </div>
  );
};

export default UploadOptions;

const UploadOptions = ({ setAudioFile }) => {
  return (
    <div>
      <button>Upload audio</button>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudioFile(e.target.files[0])}
      />
    </div>
  );
};

export default UploadOptions;

function Loader({ className = "" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <i className="text-primary fa-2x fa-spin fa-solid fa-spinner"></i>
    </div>
  );
}

export default Loader;

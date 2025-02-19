function FormLabel({ label, error, htmlFor, children }) {
  return (
    <div>
      {error ? (
        <p className="mb-2 font-semibold text-red-500">{error.message}</p>
      ) : (
        <label
          className="mb-2 block font-semibold text-gray-700"
          htmlFor={htmlFor ? htmlFor : ''}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export default FormLabel;

export default function MessagePage({ title, message, onConfirm }) {
    return (
      <div className="mx-auto p-4 bg-black-50  rounded">
        <h2 className="mb-5 text-lg font-lg text-gray-900 dark:text-gray-400">{title}</h2>
        <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">{message}</p>
        {onConfirm && (
          <div className="mt-4 flex justify-end gap-4">
            <button onClick={onConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
              Okay
            </button>
          </div>
        )}
      </div>
    );
}
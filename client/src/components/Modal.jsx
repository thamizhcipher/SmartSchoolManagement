import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Modal Title */}
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {/* Modal Body */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black">
          ✕
        </button>
      </div>
    </div>
  )
}

export default Modal
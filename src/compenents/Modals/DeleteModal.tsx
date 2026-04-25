import React from "react";

interface DeleteModalProps {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void | Promise<void>,
  userName: string
}

const DeleteModal = ({isOpen, onClose, onConfirm, userName }:DeleteModalProps) => {
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl scale-100 transition-all border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <span className="text-red-600 dark:text-red-500 text-xl">⚠️</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete User?</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Are you sure you want to remove <span className="font-semibold text-slate-700 dark:text-slate-200">{userName}</span>? This action cannot be undone.
          </p>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal
import { LoaderCircle } from 'lucide-react';

type CommentFormActionButtonsProps = {
  onClose: () => void;
  submitText?: string;
  isSubmitting: boolean;
};

export default function CommentFormActionButtons({
  onClose,
  submitText = 'Comment',
  isSubmitting,
}: CommentFormActionButtonsProps) {
  return (
    <div className="flex gap-1 justify-end mt-3">
      <button
        type="button"
        className="px-4 py-1 text-gray-700 dark:text-gray-400 rounded-lg hover:cursor-pointer hover:underline"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Close
      </button>
      <button
        type="submit"
        className="relative px-4 py-1 text-gray-700 dark:text-white bg-sky-300 dark:bg-sky-600 rounded-lg hover:cursor-pointer"
        disabled={isSubmitting}
      >
        {submitText}
        {isSubmitting && (
          <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-sky-300 dark:bg-sky-600 rounded-lg ">
            <LoaderCircle size={20} className="spin" />
          </div>
        )}
      </button>
    </div>
  );
}

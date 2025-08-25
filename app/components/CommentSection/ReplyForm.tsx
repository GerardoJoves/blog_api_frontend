import { useEffect, useContext } from 'react';
import { Reply } from 'lucide-react';
import { useFetcher } from 'react-router';

import UserContext from '../UserContext';
import ProfilePicture from './ProfilePicture';
import CommentFormActionButtons from './CommentFormActionButtons';

type ReplyFormProps = {
  onClose: () => void;
  action: string;
  targetUserId: number;
  parentId: number;
};

export default function ReplyForm({
  onClose,
  action,
  targetUserId,
  parentId,
}: ReplyFormProps) {
  const user = useContext(UserContext);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && 'success' in fetcher.data) {
      onClose();
    }
  }, [fetcher.data, onClose]);

  if (!user) return <></>;

  return (
    <div className="flex gap-3 mt-4">
      <ProfilePicture username={user.username} />
      <div className="grow">
        <fetcher.Form method="post" action={action}>
          <input type="hidden" name="parentId" value={parentId} />
          <input type="hidden" name="targetUserId" value={targetUserId} />
          <textarea
            name="content"
            placeholder="Post a reply"
            className="input bg-gray-200 dark:bg-gray-900"
            required
            disabled={fetcher.state !== 'idle'}
          ></textarea>
          {fetcher.data && 'error' in fetcher.data && (
            <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
              {fetcher.data.detail.content.msg}
            </em>
          )}
          <CommentFormActionButtons
            onClose={onClose}
            submitText="Reply"
            isSubmitting={false}
          />
        </fetcher.Form>
      </div>
    </div>
  );
}

export function ReplyButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex hover:cursor-pointer"
    >
      <Reply size={15} />
      <span className="ml-1 font-semibold text-sm">Reply</span>
    </button>
  );
}

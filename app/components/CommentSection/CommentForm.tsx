import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useFetcher } from 'react-router';
import { CircleUser } from 'lucide-react';

import ProfilePicture from './ProfilePicture';
import UserContext from '../UserContext';
import CommentFormActionButtons from './CommentFormActionButtons';
import type { CreateCommentResponse } from '~/types/Comment';
import type { User } from '~/types/User';

type CommentFormProps = {
  action: string;
  postId: number;
};

export default function CommentForm({ action, postId }: CommentFormProps) {
  const user = useContext(UserContext);
  const fetcher = useFetcher<CreateCommentResponse>();
  const [showActionButtons, setShowActionButtons] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.data && 'success' in fetcher.data) {
      handleClose();
    }
  }, [fetcher.data]);

  const handleClose = () => {
    setShowActionButtons(false);
    if (formRef.current) {
      formRef.current.blur();
      formRef.current.reset();
    }
  };

  return (
    <div className="flex gap-3 mb-10">
      {user ? (
        <ProfilePicture username={user.username} />
      ) : (
        <CircleUser className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
      )}
      <div className="grow">
        <FormAuthPrompt user={user} />
        <fetcher.Form method="post" action={action} ref={formRef}>
          <input type="hidden" name="postId" value={postId} />
          <textarea
            name="content"
            rows={3}
            placeholder="Leave a comment"
            className="input bg-gray-200 dark:bg-gray-900"
            disabled={user && fetcher.state != 'submitting' ? false : true}
            required
            onFocus={() => setShowActionButtons(true)}
          ></textarea>
          {fetcher.data && 'error' in fetcher.data && (
            <em className="mt-1 text-red-700 dark:text-red-500 text-xs">
              {fetcher.data.detail.content.msg}
            </em>
          )}
          {showActionButtons && (
            <CommentFormActionButtons
              onClose={handleClose}
              isSubmitting={fetcher.state === 'submitting'}
            />
          )}
        </fetcher.Form>
      </div>
    </div>
  );
}

function FormAuthPrompt({ user }: { user: User | null }) {
  return (
    <p className="mb-3">
      {user ? (
        `comment as ${user.username}`
      ) : (
        <>
          You must{' '}
          <Link
            to="/login"
            className="text-sky-700 dark:text-sky-500 hover:underline"
          >
            log in
          </Link>{' '}
          to post a comment
        </>
      )}
    </p>
  );
}

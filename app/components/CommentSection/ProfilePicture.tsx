export default function ProfilePicture({ username }: { username: string }) {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${username}&rounded=true&length=1`}
      alt="Profile picture"
      className="h-8 w-8 sm:h-10 sm:w-10"
    />
  );
}

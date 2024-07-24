import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SignIn />
    </div>
  );
}

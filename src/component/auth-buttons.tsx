import { signIn, signOut } from "@/auth";

type AuthButtonsProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export function AuthButtons({ isLoggedIn, userName }: AuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <div className="auth-panel">
        <span className="user-pill">สวัสดี {userName ?? "ผู้ใช้งาน"}</span>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="auth-button logout-button" type="submit">
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      className="auth-form"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button className="auth-button login-button" type="submit">
        Login with Google
      </button>
    </form>
  );
}

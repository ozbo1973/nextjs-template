import AuthForm from "../components/ui/authForm";

const signup = () => {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <AuthForm authType="signup"></AuthForm>
        </div>
      </div>
    </section>
  );
};

export default signup;

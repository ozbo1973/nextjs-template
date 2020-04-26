import AuthForm from "../components/ui/authForm";

const login = () => {
  return (
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <AuthForm authType="login"></AuthForm>
        </div>
      </div>
    </section>
  );
};

export default login;

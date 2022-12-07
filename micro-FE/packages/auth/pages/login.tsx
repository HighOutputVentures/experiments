import { useAuthContext, withAuthContext } from "common";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, Fragment, useEffect, useState } from "react";
import formStyles from "../styles/forms.module.css";
import styles from "../styles/login.module.css";

async function dummyLogin() {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

function Login() {
  const router = useRouter();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    login({
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "johndoe@dummy.bla",
    });

    await dummyLogin();
    setLoading(false);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.heading}>Login</h2>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input type="email" placeholder="Email" className={formStyles.input} />
            <button type="submit" disabled={loading} className={formStyles.button}>
              Login
            </button>
          </form>

          <div className={styles.helper}>
            <p>
              No account yet? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default withAuthContext(Login);

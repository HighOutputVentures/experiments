import { withAuthContext } from "common";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import formStyles from "../styles/forms.module.css";
import styles from "../styles/signup.module.css";

function Signup() {
  return (
    <Fragment>
      <Head>
        <title>Sign up</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.heading}>Sign up</h2>

          <form
            className={styles.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input type="email" placeholder="Email" className={formStyles.input} />
            <button type="submit" className={formStyles.button}>
              Submit
            </button>
          </form>

          <div className={styles.helper}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default withAuthContext(Signup);

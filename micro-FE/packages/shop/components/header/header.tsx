import { useAuthContext, useCartContext } from "common";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  const { user, logout, isAuthorized } = useAuthContext();
  const cart = useCartContext();

  return (
    <header className={styles.header}>
      <Link href="/">
        <h2 className={styles.heading}>Logo</h2>
      </Link>

      <div className={styles.spacer} />

      <nav className={styles.nav}>
        {!!isAuthorized && (
          <ul className={styles.links}>
            <li>
              <p className={styles.avatar}>{user?.name ?? "Logged in as John Doe"}</p>
            </li>
            <li>
              <Link href="/cart">
                Cart ({cart.items.reduce((n, { quantity }) => n + quantity, 0)})
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  cart.clear();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {!isAuthorized && (
          <ul className={styles.links}>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

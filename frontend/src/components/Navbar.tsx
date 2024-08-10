import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            marginRight: 10,
          }}
        >
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "left",
            marginLeft: 10,
          }}
        >
          <li className={styles.navItem}>
            <Link href="/sleep-chart">Sleep Chart</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

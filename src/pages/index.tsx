import styles from "@styles/index.module.css";
import MyComponent from "@components/MyComponent";
import Layout from "@components/Layout";
import { companyName } from "@constants/company";

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>{companyName}</h1>

      <MyComponent />
    </Layout>
  );
}

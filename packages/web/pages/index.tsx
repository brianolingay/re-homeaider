import Link from "next/link";
import Layout from "../components/Layout";

export default () => (
  <Layout title="/" showMenu={true}>
    Click{" "}
    <Link href="/register?role=admin" as="/register/admin">
      <a>here</a>
    </Link>{" "}
    to read more
  </Layout>
);

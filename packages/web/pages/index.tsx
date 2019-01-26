import Link from "next/link";

export default () => (
  <div>
    Click{" "}
    <Link href="/register?role=admin" as="/register/admin">
      <a>here</a>
    </Link>{" "}
    to read more
  </div>
);

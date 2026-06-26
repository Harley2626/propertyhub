import Link from "next/link";

export function TrustCentreLinks() {
  return (
    <p className="text-sm text-muted">
      <Link href="/methodology" className="text-accent hover:text-accent-hover">
        Methodology
      </Link>
      {" · "}
      <Link href="/sources" className="text-accent hover:text-accent-hover">
        Sources
      </Link>
    </p>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href={"#"}>
      <div className="flex items-center gap-1.5 text-background">
        <Image src={"/logo.svg"} alt="Logo" width={28} height={28} />
        <p>Finance</p>
      </div>
    </Link>
  );
}

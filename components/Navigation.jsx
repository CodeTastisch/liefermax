import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { Badge } from "react-bootstrap";

export default function Navigation() {
  const wAmount = useSelector((state) => state.warenkorb.wAmount);

  return (
    <div className="shadow sticky-top p-2 mb-2 bg-danger">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image src={"/images/logo.png"} alt="logo" width={180} height={75} />
        </Link>
        <Link href="/warenkorb">
          <Image
            src={"/images/warenkorb.png"}
            priorty="true"
            alt="warenkorb"
            width={30}
            height={30}
          />
          {wAmount > 0 && (
            <Badge
              pill
              bg="success"
              style={{ position: "absolute", top: "25px", right: "25px" }}
            >
              {wAmount}
            </Badge>
          )}
        </Link>
      </div>
    </div>
  );
}

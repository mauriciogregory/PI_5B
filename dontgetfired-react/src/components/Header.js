import { Link } from "react-router-dom";
import dontgetfired from "../images/DGF.png";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="logo" className="h-14 w-200" src={dontgetfired} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-green-600 hover:text-green-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}

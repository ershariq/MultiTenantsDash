import { Link } from "react-router-dom";

export default function Breadcrumb({ title, paths }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="text-sm text-gray-500 mt-1 flex items-center flex-wrap gap-1">
        {paths.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            {item.link ? (
              <Link to={item.link} className="hover:text-black">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}

            {index !== paths.length - 1 && <span className="text-gray-400">›</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

import {Link} from "react-router-dom";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-lg">
      <nav>
        <ul className="flex gap-4">
          {plugins.map(({name, url}) => (
            <li key={name}>
              <Link
                to={url}
                className="rounded-md border border-zinc-600 p-4 outline-none"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const plugins = [
  {
    url: "/plugins/video",
    name: "@remotion/video",
  },
  {
    url: "/plugins/three",
    name: "@remotion/three",
  },
];

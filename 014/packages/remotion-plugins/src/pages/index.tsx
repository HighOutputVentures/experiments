import {Link} from "react-router-dom";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-lg">
      <nav>
        <ul>
          <li>
            <Link
              to="/plugins/video"
              className="rounded-md border border-zinc-600 p-4 outline-none"
            >
              @remotion/video
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

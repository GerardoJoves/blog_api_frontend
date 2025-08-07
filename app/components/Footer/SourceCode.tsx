import { Braces, CodeXml } from 'lucide-react';

export default function SourceCode() {
  return (
    <div className="mr-8 lg:mr-20">
      <h4 className="mb-6 font-bold text-lg">Source code:</h4>
      <ul>
        <li className="flex items-center gap-2 mb-2">
          <CodeXml size={20} />
          <a
            href="https://github.com/GerardoJoves/blog_api_frontend"
            target="_blank"
            className="hover:underline"
          >
            Front-end
          </a>
        </li>
        <li className="flex items-center gap-2 mb-2">
          <Braces size={20} />
          <a
            href="https://github.com/GerardoJoves/blog_api_backend"
            target="_blank"
            className="hover:underline"
          >
            Back-end
          </a>
        </li>
      </ul>
    </div>
  );
}

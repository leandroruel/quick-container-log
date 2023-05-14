import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";
import CommandLine from "../icons/CommandLine";
import { createChatCompletion } from "../helpers/utils";
import { EXPLAIN_LOG } from "../helpers/prompts";

interface Container {
  logs: string;
  name: string;
}

const Container = async () => {
  const response = await fetch(
    "http://localhost:3000/api/containers/85decbe1b343",
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const container: Container = JSON.parse(await response.text());

  const highlightedLog = Prism.highlight(
    container.logs,
    Prism.languages.javascript,
    "javascript"
  );

  const logExplanation = async () => {
    const response = await createChatCompletion(
      `${EXPLAIN_LOG} ${container.logs.slice(1974)}`,
      "gpt-3.5-turbo-0301"
    );
    console.log(response);
  };

  console.log(await logExplanation());
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="mb-5 pt-5 flex items-center justify-start">
          <CommandLine /> {container.name}
        </h1>
        <button className="py-2 px-8 border border-indigo-900 bg-indigo-800 hover:bg-indigo-700 text-white rounded-md">
          Explain
        </button>
      </div>

      <div className="flex items-center border dark:border-slate-500 p-5 rounded-lg w-full">
        <code className="max-h-[70vh] overflow-y-auto scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50">
          <div dangerouslySetInnerHTML={{ __html: highlightedLog }} />
        </code>
      </div>
    </div>
  );
};

export default Container;

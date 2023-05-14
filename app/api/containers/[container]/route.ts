import util from "util";
const exec = util.promisify(require("child_process").exec);
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const containerId = context.params?.container;

  try {
    const { stdout: logs, stderr } = await exec(`docker logs ${containerId}`);
    const { stdout: name } = await exec(
      `docker inspect -f '{{.Name}}' ${containerId}`
    );

    if (logs) return NextResponse.json({ logs, name });
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

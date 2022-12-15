import * as vscode from "vscode";
import { Configuration, OpenAIApi } from "openai";

function getHighlightedText() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;
  if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );
    const highlighted = editor.document.getText(selectionRange);

    return highlighted;
  }
}

function getWebviewContent(text: string) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
	  <title>Code Optimizer</title>
  </head>
  <body>
      <div class="w-screen">${text}</div>
  </body>
  </html>`;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "codeoptimizer.optimize",
    async () => {
      const config = vscode.workspace.getConfiguration("codeoptimizer.views");
      const apiKey = config.get("openaiApiKey") as string;
      console.log(apiKey);
      const configuration = new Configuration({
        apiKey: apiKey,
      });

      const openai = new OpenAIApi(configuration);

      const code = getHighlightedText() || "";
      const prompt = `${code}\n"""\nthis code can be optimized as follows:\n1.`;

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
        },
        async (progress) => {
          progress.report({
            message: `Loading code suggestions ...`,
          });

          try {
            const completion = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: prompt,
              max_tokens: 2048,
            });

            if (completion) {
              const raw = completion.data.choices[0]?.text;

              const panel = vscode.window.createWebviewPanel(
                "codeoptimizer",
                "Optimized Code",
                vscode.ViewColumn.One,
                {}
              );

              panel.webview.html = getWebviewContent(
                `<pre><code style="font-size: 14px;">1.${
                  raw || ""
                }</code></pre>`
              );
            }
          } catch (error) {
            vscode.window.showErrorMessage(
              "Open AI API Key is not valid please add in codeoptimizer extension settings."
            );
          }
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

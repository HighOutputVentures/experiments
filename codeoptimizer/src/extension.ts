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

    <style>
      .lds-facebook {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #fff;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      }
      .lds-facebook div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
      }
      .lds-facebook div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
      }
      .lds-facebook div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
      }
      @keyframes lds-facebook {
        0% {
          top: 8px;
          height: 64px;
        }
        50%, 100% {
          top: 24px;
          height: 32px;
        }
      }
    </style>
  </head>
  <body>
      <div class="w-screen">${text}</div>
  </body>
  </html>`;
}

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("codeoptimizer");
  const apiKey = config.get("apiKey") as string;

  let disposable = vscode.commands.registerCommand(
    "codeoptimizer.optimize",
    async () => {
      const configuration = new Configuration({
        apiKey: apiKey || "",
      });

      const openai = new OpenAIApi(configuration);

      const code = getHighlightedText() || "";
      const prompt = `${code}\n"""\nthis code can be optimized as follows:\n1.`;

      const panel = vscode.window.createWebviewPanel(
        "codeoptimizer",
        "Optimized Code",
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getWebviewContent(
        `<div class="lds-facebook flex-1"><div></div><div></div><div></div></div>`
      );

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 2048,
      });

      const raw = completion.data.choices[0]?.text;
      const lines = `1.${raw}`.split("\n");

      panel.webview.html = getWebviewContent(
        `<pre><code style="font-size: 14px;">1.${raw}</code></pre>` || ""
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

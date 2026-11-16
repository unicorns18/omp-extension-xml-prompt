# XML Prompt for omp

An ephemeral `/xml` panel that turns rough tasks into structured XML prompts for coding agents. It uses a separate `@xml` model role, asks clarifying questions when needed, and supports native buttons in Tern—including phone-sized layouts.

## Install

Requires a current [omp](https://github.com/can1357/oh-my-pi) installation. Tested with **omp 18.20.2** and **Tern 0.9.21**.

```sh
omp plugin install https://github.com/unicorns18/omp-extension-xml-prompt.git
```

For a project-only installation, run this from that project's directory:

```sh
omp plugin install --local https://github.com/unicorns18/omp-extension-xml-prompt.git
```

Start a new omp session after installing. The repository's `omp.extensions` manifest loads `src/index.ts` directly; no build step is needed. The package is marked `private` to prevent accidental npm publication, not to restrict Git installation.

## Choose a model

Use `/model` → **Roles** to assign a model to **XML Prompt** (`@xml`), including its thinking level. Without an `@xml` assignment, the extension uses the current session model. A medium thinking level is a useful starting point for models that support it.

The model uses your existing omp provider credentials; the repository contains no model configuration or credentials.

## Usage

```text
/xml fix the typo recieve -> receive in README.md
```

Or run `/xml` without arguments to enter the task in a dialog.

For an ambiguous task:

```text
/xml add profile avatars for users. not sure yet whether to store the images in S3 or on local disk, max upload size maybe 2MB or 5MB, and we haven't decided if we crop them to a square or keep the original aspect ratio
```

When decisions materially affect the work, the model can ask up to four clarifying questions before drafting. Answers are incorporated into the XML. Skipping the dialog proceeds to a draft; unanswered questions remain open with recommended defaults. Clear tasks go straight to a draft without an extra model call.

After drafting, use **Refine** to request changes or **Answer N questions** to resolve remaining open questions. Refinements retain the same conversation. The latest XML can be copied, placed in the main editor, or sent to the main agent.

### Controls

| Tern button | Keyboard | Action |
| --- | --- | --- |
| Send to agent | `i` or `Alt+I` | Send the latest XML as a user message; steer the agent if it is already working |
| Paste to editor | `e` | Place the XML in the main editor without sending it |
| Copy XML | `c` | Copy through omp's clipboard integration |
| Refine | `f` | Open a refinement input |
| Answer N questions | `a` | Open the draft's remaining questions |
| Stop | `Esc` during generation | Cancel generation |
| Close | `Esc` while idle | Close the panel |
| Send / Cancel in the refinement input | `Enter` / `Esc` | Submit or leave refinement mode |

Arrow keys, `j`/`k`, and Page Up/Page Down scroll the text-mode panel. In Tern, the draft scrolls independently of the action buttons. Desktop shortcuts remain available alongside native buttons.

### Non-interactive use

```sh
omp -p "/xml fix the typo recieve -> receive in README.md"
```

Print mode writes a prompt wrapped in `<current_task>...</current_task>` and never opens a clarification dialog.

## Context and privacy

The XML model receives your task, refinement messages, and up to four recent user/assistant messages from the current session, each truncated to 500 characters. These snippets help resolve references such as “the file we just changed”; the extension does not read repository files itself.

Drafting stays separate from the main agent conversation. Nothing is sent to the main agent unless you choose **Send to agent**. Closing the panel discards its in-memory drafting conversation.

## Local development

```sh
git clone https://github.com/unicorns18/omp-extension-xml-prompt.git
cd omp-extension-xml-prompt
omp plugin link .
```

Start a new omp session after changing the extension. Do not install and link two copies of the same plugin at the same time.

## Verification

The initial implementation was checked with TypeScript and ESLint, live model calls, a text-mode omp session, and an isolated Tern session at a 390 × 844 viewport. The Tern checks covered clarification choices, submission, refinement, remaining-question cancellation, and pasting into the editor.

The published Git URL was installed in a fresh omp profile: `omp plugin doctor` reported four healthy checks with no warnings or errors, and `/xml` registered successfully. Model-role settings are initialized at session startup so the extension also passes install-time validation.

Physical phone keyboard behavior and remote clipboard delivery were not tested.

🚓 commit-police 🚓

Lightweight CLI tool to validate commit messages using customizable rules.
No heavy frameworks. No overengineering. Just clean commit enforcement.

✨ Why commit-police?

Maintaining consistent commit messages across teams can be painful.

commit-police helps you enforce clean, structured commit conventions without:

❌ Heavy dependencies

❌ Complex setup

❌ Opinionated frameworks

Just simple validation with sensible defaults.

🚀 Installation
Global Installation
npm install -g @bejojeffrin/commit-police
As a Dev Dependency (Recommended)
pnpm add -D @bejojeffrin/commit-police

Or using npm:

npm install --save-dev @bejojeffrin/commit-police
✅ Usage
Validate a Commit Message Directly
commit-police "feat(auth): add login support"
Validate from Git Commit File (for hooks)
commit-police --file .git/COMMIT_EDITMSG
📌 Expected Commit Format
type(scope?): message
✅ Valid Examples
feat(auth): add login validation
fix: resolve crash on startup
docs: update README
feat(api): add user endpoint JIRA-123
❌ Invalid Example
added new stuff
⚙️ Configuration

Create a configuration file in your project root:

commit-police.config.json
Example Configuration
{
  "types": ["feat", "fix", "docs"],
  "maxLength": 72,
  "requireScope": true,
  "requireTicket": true,
  "ticketPattern": "JIRA-[0-9]+"
}
🔧 Configuration Options
Option	Type	Default	Description
types	string[]	Conventional commit types	Allowed commit types
maxLength	number	100	Maximum header length
requireScope	boolean	false	Require (scope)
requireTicket	boolean	false	Enforce ticket pattern
ticketPattern	string	""	Regex pattern for ticket validation
🔁 Git Hook Integration

To automatically validate every commit:

1️⃣ Add a commit-msg Hook

Create a file:

.git/hooks/commit-msg

Add:

#!/bin/sh
npx @bejojeffrin/commit-police --file "$1"
2️⃣ Make It Executable
chmod +x .git/hooks/commit-msg

Now every commit will be validated automatically 🚀

🎯 Key Features

✅ Minimal dependency footprint

✅ Sensible defaults (works out of the box)

✅ Per-project configuration

✅ Lightweight alternative to heavier commit tooling

✅ CLI-based and git-hook friendly

🛠 Development

Clone the repository:

pnpm install

Test locally:

pnpm link --global
🤝 Contributing

Contributions, suggestions, and improvements are welcome.
Open an issue or submit a PR.
alias.co checkout
alias.br branch -v
alias.ci commit
alias.st status
alias.addm !git-ls-files -m -z | xargs -0 git-add && git status
alias.addu !git-ls-files -o --exclude-standard -z | xargs -0 git-add && git status
alias.rename branch -m
alias.conflicts diff --name-only --diff-filter=U
alias.dad !git show-branch -a | ack '\*' | ack -v "`git rev-parse --abbrev-ref HEAD`" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
alias.rev remote -v
alias.si submodule init
alias.su submodule update

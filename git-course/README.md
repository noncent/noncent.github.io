# git-course
Git tutorial command and test, personal use.

### Start
```git
// clone the repo
git clone https://github.com/neerajsinghsonu/git-course.git
// go to the folder
cd git-course
// retrieve the latest meta-data info from the original 
// (yet doesn't do any file transferring. It's more like 
// just checking to see if there are any changes available)
git fetch
// fetch and download content from a remote repository and immediately
// update the local repository to match that content
git pull
// state of the working directory and the staging area.
// It lets you see which changes have been staged, 
// which haven't, and which files aren't being tracked by Git
git status
```

### Add
this line added by following commands
```git
// add change file in git
git add README.md
// commit your change into got
git commit -m "first commit from local"
// push your changes onto git
git push
```
### Update
this line updated by following commands
```git
// add change file in git
git add README.md
// commit your change into got
git commit -m "first update from local"
// push your changes onto git
git push
```
### Create Push Tags
this line added post create a tag in git
```git
// create a new tag
git tag v1.0
// check created tag in local
git tag
// create tag with message/label
git tag -a v1.1 -m "this tag has a label"
// push created tag to remote
git push origin v1.0
// push all tags
git push origin --tags
```

### Branching
```git
// create a new branch
git branch new-feature
// switch to a branch
git checkout new-feature
// create a new branch and switch to it
git checkout -b new-feature
// delete a branch
git branch -d branch_name
// merge a branch into the current branch
git merge branch_name
```

### History
```git
// show commit history
git log
// show changes between commits, commit and working tree, etc.
git diff
// show changes between the working directory and the index (staging area)
git diff --staged
// show changes in a specific file
git diff file_name
```

### Remote
```git
// show remote repositories
git remote -v
// add a new remote repository
git remote add remote_name remote_URL
// remove a remote repository
git remote rm remote_name
// fetch changes from a remote repository
git fetch remote_name
```

### Undoing Changes
```git
// discard changes in the working directory
git checkout -- file_name
// unstage changes from the staging area
git reset HEAD file_name
// undo the last commit (moves changes back to staging)
git reset HEAD^
// reset to a specific commit and remove changes
git reset --hard commit_hash
```

### Collaboration
```git
// create a pull request (assuming you're using a service like GitHub or Bitbucket)
// after pushing a branch to the remote repository
// (Note: This is not a Git command but commonly used in collaboration workflows)
// merge changes from a pull request into the main branch
git pull origin main
```

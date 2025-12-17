# GitHub Pages 404 Error - Troubleshooting Guide

## ✅ Files are correctly placed in root directory

Your files are now in the root directory, which is correct for GitHub Pages.

## Common Causes of 404 Error:

### 1. **GitHub Pages Not Enabled**
   - Go to: `https://github.com/yourusername/your-repo-name/settings/pages`
   - Under **Source**, make sure:
     - Branch: `main` (or `master` - whichever branch has your files)
     - Folder: `/ (root)`
   - Click **Save**

### 2. **Repository is Private**
   - Free GitHub accounts require **public repositories** for GitHub Pages
   - Go to Settings → General → Danger Zone → Change repository visibility to **Public**

### 3. **Wrong Branch Selected**
   - Make sure you select the branch where your files are located
   - Usually `main` or `master`

### 4. **Deployment Not Complete**
   - After enabling GitHub Pages, wait 1-2 minutes
   - Check the **Actions** tab in your repository
   - Look for a green checkmark indicating successful deployment

### 5. **Wrong URL**
   - Correct URL format: `https://yourusername.github.io/repository-name/`
   - Make sure you're using the correct repository name (case-sensitive)
   - If your repo is named "Hotel-Booking-Website", the URL should be:
     `https://yourusername.github.io/Hotel-Booking-Website/`

### 6. **Files Not Pushed to GitHub**
   - Make sure all files are committed and pushed:
     ```bash
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```

## Quick Checklist:

- [ ] All HTML files are in root directory (not in subfolder)
- [ ] `index.html` exists in root
- [ ] `assets/` folder is in root
- [ ] `.nojekyll` file exists in root
- [ ] Repository is **public**
- [ ] GitHub Pages is enabled in Settings → Pages
- [ ] Branch is set to `main` (or `master`)
- [ ] Folder is set to `/ (root)`
- [ ] Files are committed and pushed to GitHub
- [ ] Waited 1-2 minutes after enabling Pages

## Verify Your Setup:

1. Check if files are on GitHub:
   - Go to your repository on GitHub
   - You should see `index.html` in the root (not in a folder)

2. Check GitHub Pages status:
   - Go to Settings → Pages
   - You should see: "Your site is published at https://..."

3. Check deployment:
   - Go to the **Actions** tab
   - You should see a successful deployment

## Still Getting 404?

If you're still getting 404 after checking all above:

1. **Clear browser cache** and try again
2. **Try incognito/private browsing mode**
3. **Check the exact URL** - make sure there are no typos
4. **Wait a few more minutes** - sometimes deployment takes longer

## Alternative: Use Custom Domain or Different Branch

If the above doesn't work, you can also:
- Use a `gh-pages` branch (create it and push files there)
- Or use a `docs` folder (move files to `docs/` folder and set Pages source to `/docs`)


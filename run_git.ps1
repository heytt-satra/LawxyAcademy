$git = "C:\Users\VPPL-200325\git\cmd\git.exe"

Write-Host "--- Git Init ---"
& $git init

Write-Host "--- Git Config ---"
& $git config user.name "heytt-satra"
& $git config user.email "heytt.satra@gmail.com"

Write-Host "--- Git Add ---"
& $git add .

Write-Host "--- Git Commit ---"
& $git commit -m "first commit"

Write-Host "--- Git Branch ---"
& $git branch -M main

Write-Host "--- Git Remote Add ---"
& $git remote remove origin 2>$null
& $git remote add origin https://github.com/heytt-satra/LawxyAcademy.git

Write-Host "--- Git Remote -v ---"
& $git remote -v

Write-Host "--- Git Push ---"
& $git push -u origin main

@echo off
REM Di chuyển đến thư mục chứa repository
cd /d "C:\Users\Admin\id.github.io"

REM Kiểm tra trạng thái Git
git status

REM Thêm tất cả thay đổi vào staging area
git add .

REM Commit các thay đổi với thông điệp
git commit -m "Tự động commit từ script .bat"

REM Đảm bảo rằng không có thay đổi chưa commit
git stash

REM Pull các thay đổi từ GitLab để đảm bảo không có xung đột
git pull origin main

REM Khôi phục thay đổi đã stash nếu có
git stash pop

REM Đẩy mã nguồn lên GitLab
git push origin main

echo Đẩy mã nguồn lên GitLab thành công!
exit

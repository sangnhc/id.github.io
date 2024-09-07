@echo off
REM Di chuyển đến thư mục chứa repository
cd /d "C:\Users\Admin\id.github.io"

REM Kiểm tra trạng thái Git
git status

REM Thêm tất cả thay đổi vào staging area
git add .

REM Commit các thay đổi với thông điệp
git commit -m "Tự động commit từ script .bat"

REM Pull các thay đổi từ GitLab để đảm bảo không có xung đột
git pull gitlab main --allow-unrelated-histories

REM Đẩy mã nguồn lên GitLab
git push gitlab main

echo Đẩy mã nguồn lên GitLab thành công!
exit

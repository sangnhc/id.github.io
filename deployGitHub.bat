@echo off
REM Di chuyển đến thư mục chứa repository
cd /d "C:\Users\Admin\id.github.io"

REM Kiểm tra trạng thái Git
git status

REM Thêm tất cả thay đổi vào staging area
git add .

REM Commit các thay đổi với thông điệp
git commit -m "Tự động commit từ script .bat"

REM Pull các thay đổi từ GitHub để đảm bảo không có xung đột
git pull https://github.com/sangnhc/id.github.io main --allow-unrelated-histories

REM Đẩy mã nguồn lên GitHub
git push https://github.com/sangnhc/id.github.io main

echo Đẩy mã nguồn lên GitHub thành công!
pause
exit

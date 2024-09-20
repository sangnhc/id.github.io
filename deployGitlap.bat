@echo off
REM Di chuyển đến thư mục chứa repository
cd /d "C:\Users\Admin\id.github.io"

REM Kiểm tra trạng thái Git
git status

REM Thêm tất cả thay đổi vào staging area
git add .

REM Commit các thay đổi với thông điệp
git commit -m "Tự động commit từ script .bat"

REM Kiểm tra xem có commit mới không
if %errorlevel% neq 0 (
    echo Không có thay đổi nào để commit!
    goto end
)

REM Đảm bảo rằng không có thay đổi chưa commit
git stash

REM Pull các thay đổi từ GitLab để đảm bảo không có xung đột
git pull --rebase origin main

REM Kiểm tra xem có lỗi gì trong quá trình pull không
if %errorlevel% neq 0 (
    echo Có lỗi khi pull mã nguồn từ GitLab!
    exit /b %errorlevel%
)

REM Khôi phục thay đổi đã stash nếu có
git stash pop

REM Kiểm tra xem có xung đột khi pop stash không
if %errorlevel% neq 0 (
    echo Có xung đột khi khôi phục thay đổi từ stash!
    exit /b %errorlevel%
)

REM Đẩy mã nguồn lên GitLab
git push origin main

REM Kiểm tra xem có lỗi gì trong quá trình push không
if %errorlevel% neq 0 (
    echo Đẩy mã nguồn lên GitLab thất bại!
    exit /b %errorlevel%
)

echo Đẩy mã nguồn lên GitLab thành công!

:end
exit

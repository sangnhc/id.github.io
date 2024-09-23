import { convertNumberToMathMode,thay_haicham_colon, themdolachoso,xoa_khoangtrong_trong_ngoac, them_dola_cho_so } from './numberUtils.js';
import { replaceTextWithJson, convertArrayToHeva, convertArrayToHoac,removeSpacesInMathMode } from './replaceUtils.js';
import { them_dola_cho_so_new} from './numberUtils.js';
export function cleanLatexContent(content) {
    // Xóa bỏ tất cả các dòng bắt đầu bằng dấu % (comment trong LaTeX)
    content = content.replace(/^%.*$/gm, '');

    // Giữ lại các phần tử giữa \begin{ex|vd|bt}...\end{ex|vd|bt}
    content = content.match(/\\begin\{(ex|vd|bt)\}[\s\S]*?\\end\{\1\}/g)?.join('\n') || '';

    // Xóa bỏ các dòng trống hoặc chỉ chứa khoảng trắng
    content = content.replace(/^\s*$/gm, '');

    return content.trim();
}
export function addSectionTitles(content) {
    // Bước 1: Lọc các đoạn nội dung giữa \begin{ex|vd|bt}...\end{ex|vd|bt}
    const blocks = content.match(/\\begin\{(ex|vd|bt)\}[\s\S]*?\\end\{\1\}/g) || [];

    // Bước 2: Khởi tạo biến đếm cho từng nhóm
    let choiceCount = 0;
    let choiceTFCount = 0;
    let shortAnsCount = 0;

    // Bước 3: Khởi tạo nội dung cho từng phần
    let choiceContent = "";
    let choiceTFContent = "";
    let shortAnsContent = "";

    // Bước 4: Duyệt qua từng khối để phân loại và đếm số lượng theo nhóm
    blocks.forEach(block => {
        if (/\\choice(?!TF)/.test(block)) { // Nhóm 1: chỉ đếm \choice nhưng không đếm \choiceTF
            choiceCount++;
            choiceContent += block + "\n"; // Thêm vào nội dung nhóm choice
        }
        if (/\\choiceTF/.test(block)) { // Nhóm 2: đếm \choiceTF
            choiceTFCount++;
            choiceTFContent += block + "\n"; // Thêm vào nội dung nhóm choiceTF
        }
        if (/shortans/.test(block)) { // Nhóm 3: đếm các khối chứa từ khóa shortans
            shortAnsCount++;
            shortAnsContent += block + "\n"; // Thêm vào nội dung nhóm shortans
        }
    });

    // Bước 5: Tạo tiêu đề cho từng nhóm với kết quả đếm
    const choiceHeader = `
    <!-- PHẦN I -->
    <div class="section-title">
        <h2>PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (${choiceCount} câu)</h2>
        <p>Thí sinh trả lời từ câu 1 đến câu ${choiceCount}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</p>
    </div>
    `;

    const choiceTFHeader = `
    <!-- PHẦN II -->
    <div class="section-title section-two">
        <h2>PHẦN II. Câu trắc nghiệm đúng sai (${choiceTFCount} câu)</h2>
        <p>Thí sinh trả lời từ câu 1 đến câu ${choiceTFCount}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</p>
    </div>
    `;

    const shortAnsHeader = `
    <!-- PHẦN III -->
    <div class="section-title section-three">
        <h2>PHẦN III. Câu trắc nghiệm trả lời ngắn (${shortAnsCount} câu)</h2>
        <p>Thí sinh trả lời từ câu 1 đến câu ${shortAnsCount}.</p>
    </div>
    `;

    // Bước 6: Ghép các phần với tiêu đề tương ứng
    const finalContent = `
    ${choiceHeader}
    ${choiceContent}

    ${choiceTFHeader}
    ${choiceTFContent}

    ${shortAnsHeader}
    ${shortAnsContent}
    `;

    return finalContent.trim(); // Trả về nội dung đã được thêm tiêu đề
}
export function convertHoacToArray(content) {
    const hoacRegex = /\\hoac\s*\{/g;
    let match;
    while ((match = hoacRegex.exec(content)) !== null) {
        const startIndex = match.index;
        const ngoacLon = layCacNgoacLon(content.slice(startIndex));

        if (ngoacLon.length > 0) {
            const [batDau, ketThuc] = ngoacLon[0];
            const innerContent = content.slice(startIndex + batDau + 1, startIndex + ketThuc);

            // Xóa bỏ các dòng trống và khoảng trắng dư thừa
            const lines = innerContent.replace(/^\s*$/gm, '').trim().split(/\\\\/).map(line => line.trim().replace(/^&\s*/, ''));

            // Chuyển thành \left[ \begin{array}{l} ... \end{array} \right.
            const replacedMatch = `\\left[\\begin{array}{l} ${lines.join(' \\\\\n')} \\end{array}\\right.`;
            const fullMatch = content.slice(startIndex, startIndex + ketThuc + 1);
            content = content.replace(fullMatch, replacedMatch);
        }
    }
    return content;
}
export function convertHevaToCases(content) {
    const hevaRegex = /\\heva\s*\{/g;
    let match;
    while ((match = hevaRegex.exec(content)) !== null) {
        const startIndex = match.index;
        const ngoacLon = layCacNgoacLon(content.slice(startIndex));

        if (ngoacLon.length > 0) {
            const [batDau, ketThuc] = ngoacLon[0];
            const innerContent = content.slice(startIndex + batDau + 1, startIndex + ketThuc);

            // Xóa bỏ các dòng trống và khoảng trắng dư thừa
            const lines = innerContent.replace(/^\s*$/gm, '').trim().split(/\\\\/).map(line => line.trim().replace(/^&\s*/, ''));

            // Chuyển thành \begin{cases} ... \end{cases}
            const replacedMatch = `\\begin{cases}\n${lines.join(' \\\\\n')}\n\\end{cases}`;
            const fullMatch = content.slice(startIndex, startIndex + ketThuc + 1);
            content = content.replace(fullMatch, replacedMatch);
        }
    }
    return content;
}
export function layCacNgoacLon(text) {
    let ngoacLon = [];
    let demNgoac = 0;
    let batDau = null;

    for (let i = 0; i < text.length; i++) {
        let kyTu = text[i];
        if (kyTu === "{") {
            if (demNgoac === 0) {
                batDau = i;
            }
            demNgoac += 1;
        } else if (kyTu === "}") {
            demNgoac -= 1;
            if (demNgoac === 0 && batDau !== null) {
                let ketThuc = i;
                ngoacLon.push([batDau, ketThuc]);
                batDau = null;
            }
        }
    }
    return ngoacLon;
}
export function cleanExWithImmini(inputCode) {
    // Tìm tất cả các đoạn từ \begin{ex} đến \end{ex}
    return inputCode.replace(/\\begin\{ex\}([\s\S]*?)\\end\{ex\}/g, (match, content) => {
        // Kiểm tra xem đoạn đó có chứa từ khóa \immini không
        if (content.includes('\\immini')) {
            // Thực hiện việc thay thế các ký tự thừa trong cấu trúc \begin{tikzpicture} ... \end{tikzpicture}
            const modifiedContent = content.replace(/}\s*\{\s*(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})\s*\}/g, '$1');
            return `\\begin{ex}${modifiedContent}\\end{ex}`;
        }
        return match;
    });
}
export function fixCodeTool() {
    let inputCode = document.getElementById('inputCode').value;
    inputCode = cleanLatexContent(inputCode)
    inputCode = addSectionTitles(inputCode)
    // Các thay thế hiện tại
    inputCode = inputCode.replace('Lò̀i giải','Lời giải');
    // Sử dụng biểu thức chính quy để xóa tất cả các ký tự giữa "shortans" và "{"
    inputCode = inputCode.replace(/shortans.*?\{/g, 'shortans{');
    inputCode = cleanExWithImmini(inputCode)
    // inputCode = them_dola_cho_so_new(inputCode);
    inputCode = inputCode.replace(/Câu\s+\$(\d+)\$\s*([.:])/g, 'Câu $1$2');
    inputCode = inputCode.replace(/\\mathrm{R}/g, '\\mathbb{R}');
    inputCode = inputCode.replace(/\\immini.*?\{/g, '');
    inputCode = inputCode.replace(/\\immini{/g, '');
    inputCode = inputCode.replace(/\[thm\]/g, '');
    inputCode = convertNumberToMathMode(inputCode);
    inputCode = inputCode.replace(/}\s*{/g, '}{');
    inputCode = convertHoacToArray(inputCode);
    inputCode = convertHevaToCases(inputCode);

    
    // Thêm đoạn mã để thay thế môi trường TikZ
    inputCode = replaceTikzEnvironment(inputCode);
    inputCode = replacePlaceholdersWithLinks(inputCode);
    fetch('replace.json')
        .then(response => response.json())
        .then(data => {
            inputCode = replaceTextWithJson(data, inputCode);
            document.getElementById('outputCode').value = inputCode;
        })
        .catch(error => console.error('Error:', error));
}

// Mảng để lưu trữ các khối TikZ
let tikzBlocks = [];

// Hàm thay thế các khối TikZ bằng placeholder
export function replaceTikzEnvironment(inputCode) {
    let tikzCounter = 1;
    const tikzRegex = /\\begin{tikzpicture}[\s\S]*?\\end{tikzpicture}/g;

    // Đặt lại mảng tikzBlocks để bắt đầu lại từ đầu
    tikzBlocks = [];

    // Thay thế từng khối với HINH1, HINH2, ... và lưu trữ khối TikZ vào mảng
    inputCode = inputCode.replace(tikzRegex, (match) => {
        // Lưu khối TikZ vào mảng tikzBlocks
        tikzBlocks.push(`Hình ${tikzCounter}\n` + match + '\n');

        // Thay thế bằng placeholder với chỉ số hình ảnh
        const replacement = `<span class="highlight-hinh">HINH SỐ ${tikzCounter} Ở ĐÂY</span>`;
        tikzCounter++;
        return replacement;
    });

    return inputCode;
}

// Hàm để thay thế các placeholder bằng các đường dẫn ảnh từ khung linkInput
function replacePlaceholdersWithLinks(inputCode) {
    // Lấy nội dung từ khung linkInput và chuyển nó thành một mảng các đường dẫn
    let linkInput = document.getElementById('linkInput').value.trim();
    if (!linkInput) {
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu link ảnh',
            text: 'Vui lòng nhập các đường dẫn ảnh vào khung linkInput!'
        });
        return inputCode;
    }

    // Thay thế "thaysangnhc" trong mỗi đường dẫn thành "gitlab.com/nguyensangnhc/hinh4web/-/raw/main/K12Hchuong2"
    let links = linkInput.split('\n').map(link => {
        // Thay thế chuỗi "thaysangnhc" bằng chuỗi mới
        return link.replace("thaysangnhc", "gitlab.com/nguyensangnhc/hinh4web/-/raw/main/K12Hchuong2").trim();
    }).filter(link => link !== '');

    // Kiểm tra nếu số lượng khối TikZ và số lượng link không bằng nhau
    if (links.length !== tikzBlocks.length) {
        Swal.fire({
            icon: 'error',
            title: 'Không khớp số lượng',
            text: `Số lượng hình (${tikzBlocks.length}) và số lượng link ảnh (${links.length}) không khớp! Vui lòng kiểm tra lại.`
        });
        return inputCode;
    }

    // Thay thế các placeholder bằng các đường dẫn ảnh tương ứng
    inputCode = inputCode.replace(/<span class="highlight-hinh">HINH SỐ (\d+) Ở ĐÂY<\/span>/g, (match, number) => {
        const index = parseInt(number, 10) - 1;
        if (index >= 0 && index < links.length) {
            return `<img src="${links[index]}" class="center-img small-size">`;
        } else {
            return match; // Nếu không có đủ link, giữ nguyên placeholder
        }
    });
    // Thay thế đoạn }{<img src="https: thành }<img src="https: với mọi khoảng trắng
    inputCode = inputCode.replace(/\}\s*\}\s*\{\s*<img\s+src="https:/g, '}\n<img src="https:');
    // Tìm đoạn `small-size">` } `\loigiai{` và loại bỏ dấu `}`
    inputCode = inputCode.replace(/small-size">\s*\}\s*\\loigiai\{/g, 'small-size">\n\\loigiai{');
     // Xóa các ký tự giữa \choiceTF và {, giữ lại \choiceTF{
    inputCode = inputCode.replace(/\\choiceTF[^{]*\{/g, '\\choiceTF{');
    // Thay thế \motcot và \haicot thành \choice
    inputCode = inputCode.replace(/\\(motcot|haicot)\b/g, '\\choice');
    // Xóa các ký tự giữa \choice và {, trừ \choiceTF
    inputCode = inputCode.replace(/\\choice(?!TF)[^{]*\{/g, '\\choice{');
     // Tìm và cắt các thẻ <img ... class="center-img small-size"> trước \loigiai và di chuyển trước \choice
    inputCode = inputCode.replace(/\\begin\{ex\}([\s\S]*?)\\end\{ex\}/g, (match, content) => {
        let modifiedContent = content;

        // Kiểm tra xem có thẻ ảnh và \loigiai không
        const imgRegex = /<img[^>]+class="center-img small-size"[^>]*>/g;
        const loigiaiIndex = content.indexOf('\\loigiai');
        const choiceIndex = content.indexOf('\\choice');
        let imgTags = [];

        // Tìm và loại bỏ tất cả các thẻ <img ... class="center-img small-size">
        if (loigiaiIndex > -1 && choiceIndex > -1 && choiceIndex < loigiaiIndex) {
            modifiedContent = modifiedContent.replace(imgRegex, (imgTag) => {
                // Nếu thẻ ảnh nằm trước \loigiai, lưu trữ lại và loại bỏ nó
                if (content.indexOf(imgTag) < loigiaiIndex) {
                    imgTags.push(imgTag);
                    return ''; // Xóa thẻ ảnh khỏi vị trí cũ
                }
                return imgTag;
            });

            // Di chuyển các thẻ ảnh lên trước \choice
            if (imgTags.length > 0) {
                modifiedContent = modifiedContent.replace('\\choice', imgTags.join('\n') + '\n\\choice');
            }
        }

        // Trả về đoạn đã sửa đổi trong \begin{ex} ... \end{ex}
        return `\\begin{ex}${modifiedContent}\\end{ex}`;
    });
    
    return inputCode;
}

// Hàm tạo và tải file .tex chứa các khối TikZ đã tách ra
export function downloadTikzFile() {
    if (tikzBlocks.length === 0) {
        alert('Không có hình TikZ nào để tải xuống!');
        return;
    }

    // Tạo nội dung file .tex
    let tikzFileContent = ``;

    tikzBlocks.forEach((block, index) => {
        tikzFileContent += `
% ---------------------------
% Hình ${index + 1}
% ---------------------------
${block}

`;
    });

    tikzFileContent += '';

    // Tạo file blob và link để tải xuống
    const blob = new Blob([tikzFileContent], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);

    // Tạo link download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FileHinh.tex';
    document.body.appendChild(a);
    a.click();

    // Xóa link download sau khi tải xuống
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Gắn hàm vào đối tượng window để có thể gọi từ HTML
window.downloadTikzFile = downloadTikzFile;


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

export function fixCodeTool() {
    let inputCode = document.getElementById('inputCode').value;
    inputCode = cleanLatexContent(inputCode)
    inputCode = addSectionTitles(inputCode)
    // Các thay thế hiện tại
    inputCode = inputCode.replace('Lò̀i giải','Lời giải');
    // Sử dụng biểu thức chính quy để xóa tất cả các ký tự giữa "shortans" và "{"
    inputCode = inputCode.replace(/shortans.*?\{/g, 'shortans{');
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

    fetch('replace.json')
        .then(response => response.json())
        .then(data => {
            inputCode = replaceTextWithJson(data, inputCode);
            document.getElementById('outputCode').value = inputCode;
        })
        .catch(error => console.error('Error:', error));
}

// Mảng toàn cục để lưu trữ các khối TikZ đã tách ra
let tikzBlocks = [];

export function replaceTikzEnvironment(inputCode) {
    let tikzCounter = 1;
    const tikzRegex = /\\begin{tikzpicture}[\s\S]*?\\end{tikzpicture}/g;

    // Đặt lại mảng tikzBlocks để bắt đầu lại từ đầu
    tikzBlocks = [];

    // Thay thế từng khối với HINH1, HINH2, ... và lưu trữ khối TikZ vào mảng
    inputCode = inputCode.replace(tikzRegex, (match) => {
        // Lưu khối TikZ vào mảng tikzBlocks
        tikzBlocks.push(`Hình ${tikzCounter}\n` + match +'\n');

        // Thay thế bằng placeholder với chỉ số hình ảnh
        const replacement = `<span class="highlight-hinh">HINH SỐ ${tikzCounter} Ở ĐÂY</span>`;
        tikzCounter++;
        return replacement;
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


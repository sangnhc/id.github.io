export function replaceTextWithJson(data, text) {
    data.forEach(item => {
        const findText = item.find;
        const replaceText = item.replace;
        const regex = new RegExp(findText, 'g');
        text = text.replace(regex, replaceText);
    });
    return text;
}

export function applyResubFromJson(filePath, text) {
    return fetch(filePath)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const findText = item.find;
                const replaceText = item.replace;
                const regex = new RegExp(findText, 'gm');
                text = text.replace(regex, replaceText);
            });
            return text;
        })
        .catch(error => console.error('Error:', error));
}
export function convertArrayToHeva(text) {
    const arrayRegex = /\\left\\\{\\begin\{array\}\s*\{\s*[clr]\s*\}([\s\S]*?)\\end\{array\}\\right\./g;

    return text.replace(arrayRegex, (match, content) => {
        const lines = content.trim().split(/\\\\/).map(line => '&' + line.trim());
        return '\\heva{\n' + lines.join(' \\\\\n') + '\n}';
    });
}
export function convertArrayToHoac(text) {
    const arrayRegex = /\\left\[\\begin\{array\}\s*\{\s*[clr]\s*\}([\s\S]*?)\\end\{array\}\\right\./g;

    return text.replace(arrayRegex, (match, content) => {
        const lines = content.trim().split(/\\\\/).map(line => '&' + line.trim());
        return '\\hoac{\n' + lines.join(' \\\\\n') + '\n}';
    });
}
function convertHoacToArray(content) {
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
function convertHevaToCases(content) {
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

// yourFileName.js
export function removeSpacesInMathMode(text) {
    text = text.replace(/\^\{\prime\}/g, "'");
    // Xử lý các trường hợp có dấu $...$
    const regexDollar = /\$([A-Za-z\\.\s]+)\$/g;
    text = text.replace(regexDollar, match => {
        // Thay thế \cdot bằng .
        let cleaned = match.replace(/\\cdot/g, '.');
        // Loại bỏ các khoảng trắng nhưng giữ lại dấu .
        cleaned = cleaned.replace(/(?<=\S)\s+(?=\S)/g, '');
        return cleaned;
    });

    // Xử lý các trường hợp có dấu \(...\)
    const regexParen = /\((\s*[A-Za-z\\.\s]*\s*)+\)/g;
    text = text.replace(regexParen, match => {
        // Thay thế \cdot bằng .
        let cleaned = match.replace(/\\cdot/g, '.');
        // Loại bỏ các khoảng trắng nhưng giữ lại dấu .
        cleaned = cleaned.replace(/(?<=\S)\s+(?=\S)/g, '');
        return cleaned;
    });
    // Xử lý các trường hợp có dấu \(...\)
    const regexA = /\{(\s*[A-Za-z\\.\s]*\s*)+\}/g;
    text = text.replace(regexA, match => {
        // Thay thế \cdot bằng .
        let cleaned = match.replace(/\\cdot/g, '.');
        // Loại bỏ các khoảng trắng nhưng giữ lại dấu .
        cleaned = cleaned.replace(/(?<=\S)\s+(?=\S)/g, '');
        return cleaned;
    });

    // Xử lý các trường hợp không có dấu ngoặc đơn
    const regexNoParen = /\$(\s*[A-Za-z\\.\s]*\s*)+\$/g;
    text = text.replace(regexNoParen, match => {
        // Thay thế \cdot bằng .
        let cleaned = match.replace(/\\cdot/g, '.');
        // Loại bỏ các khoảng trắng nhưng giữ lại dấu .
        cleaned = cleaned.replace(/(?<=\S)\s+(?=\S)/g, '');
        return cleaned;
    });
    // Sử dụng biểu thức chính quy để tìm và thay thế các \item không nằm ở đầu dòng
    text = text.replace(/([^\n])\\item/g, '$1\n\\item ');
    //replace '' thành \lq\lq
    let isEven = true; // Biến cờ để kiểm tra thứ tự xuất hiện
    // Hàm thay thế cho các ký tự phù hợp
    text = text.replace(/"/g, match => {
        if (isEven) {
            isEven = false;
            return '``'; // Thay thế dấu nháy kép đầu tiên trong cặp bằng ``
        } else {
            isEven = true;
            return "''"; // Thay thế dấu nháy kép thứ hai trong cặp bằng ''
        }
    });
    
    text = text.replace(/\$,\$,/g,'')
    // Sử dụng biểu thức chính quy để tìm các số có đúng 4 ký tự trước và sau nó không chứa các ký tự đặc biệt và không có từ "Câu" trước số
    const regex = /(?<!Câu\s)(?<=([^\\${}()\-_=+]{4}))(\d+)(?=([^\\${}()\-_=+]{4}))/g;
    text = text.replace(regex, match => `$${match}$`);
    return text;
}
export function processText(input) {
    // Biểu thức chính quy để tìm các cụm $\left[...\right]$
    const regexMathBrackets = /\$\left\[.*?\right\]\$/gs;
    
    // Tìm và tạm thời thay thế các cụm $\left[...\right]$ bằng các mã giữ chỗ
    let placeholders = [];
    let placeholderIndex = 0;
    input = input.replace(regexMathBrackets, match => {
        placeholders.push(match);
        return `__PLACEHOLDER_${placeholderIndex++}__`;
    });

    // Biểu thức chính quy để tìm các cụm từ trong dấu $
    const regexDollarC = /\$([^$]+)\$/g;
    
    // Thay thế các cụm từ tìm thấy
    input = input.replace(regexDollarC, (match, content) => {
        // Sử dụng biểu thức chính quy để tách nội dung, ngoại trừ trường hợp giữa các số
        let parts = content.split(/(,\s*(?=\D)|(?<=\D),)/).filter(Boolean);

        // Xử lý từng phần tử
        parts = parts.map(part => {
            // Loại bỏ khoảng trắng thừa
            return part.replace(/\s+/g, '');
        });

        // Nối lại các phần tử với dấu $, $
        content = parts.join('$, $');

        // Thêm lại dấu $
        return `$${content}$`;
    });

    // Khôi phục các cụm $\left[...\right]$ về lại vị trí ban đầu
    placeholders.forEach((placeholder, index) => {
        input = input.replace(`__PLACEHOLDER_${index}__`, placeholder);
    });
    input = input.replace(/\$,\$,/g, '');
    return input;
}
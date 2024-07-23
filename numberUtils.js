export function convertNumberToMathMode(text) {
    
    const mathrmPattern = /\\mathrm{([^dACP\s~][a-zA-Z]*)}/g;
    const mathrmTildePattern = /\\mathrm{~([^dACP\s~][a-zA-Z]*)}/g;

    
    // Thay thế \mathrm{[a-zA-Z]} thành [a-zA-Z], ngoại trừ d, A, C, P
    text = text.replace(mathrmPattern, (match, char) => {
        return `${char}`;
    });

    // Thay thế \mathrm{~[a-zA-Z]} thành [a-zA-Z], ngoại trừ d, A, C, P
    text = text.replace(mathrmTildePattern, (match, char) => {
        return `${char}`;
    });
    return text;
}

export function themdolachoso(text) {
    // Biểu thức chính quy để tìm các dòng chỉ chứa {số.} hoặc {số}, có thể có khoảng trắng trước dấu chấm
    const numberLinePattern = /^\s*\{(\d+)\s*\.?\s*\}\s*$/gm;
    // Biểu thức chính quy để tìm các dòng kết thúc bằng dấu . trước } có thể có khoảng trắng
    const removeDotPattern = /\s*\.}/gm;
    // Biểu thức chính quy để thay thế 'Lò̀i giải' thành 'Lời giải'
    const loiGiaiPattern = /Lò̀i giải/g;
    
    // Thay thế 'Lò̀i giải' thành 'Lời giải'
    text = text.replace(loiGiaiPattern, 'Lời giải');

    // Thay thế {số.} hoặc {số} thành {$số$}
    text = text.replace(numberLinePattern, (match, number) => {
        return `{$${number}$}`;
    });

    // Thay thế .} hoặc . } bằng }
    text = text.replace(removeDotPattern, ' }');

    return text;
}

export function them_dola_cho_so(text) {
    // Biểu thức chính quy để tìm các số đứng giữa hai từ, nhưng không nằm trong đoạn $...$
    const pattern = /(\b\w+\b\s)(\d+)(\s\b\w+\b)/g;
    const mathModePattern = /\$.*?\$/g;
    
    // Chuyển đổi các số không nằm trong đoạn $...$
    let segments = text.split(mathModePattern);
    let matches = text.match(mathModePattern) || [];
    
    segments = segments.map(segment => 
        segment.replace(pattern, (match, before, number, after) => {
            if (/[a-zA-Z]/.test(before) && /[a-zA-Z]/.test(after)) {
                return `${before} $${number}$ ${after}`;
            }
            return match;
        })
    );
    
    // Ghép các đoạn đã xử lý và các đoạn $...$ lại với nhau
    let result = segments.reduce((acc, segment, index) => {
        return acc + segment + (matches[index] || '');
    }, '');
    
    return result;
}
export function removeLoiGiaiInEx(text) {
    // Biểu thức chính quy để tìm các đoạn từ \begin{ex} đến \end{ex}
    const exPattern = /\\begin{ex}([\s\S]*?)\\end{ex}/g;

    // Thay thế các đoạn \begin{ex} ... \end{ex}
    text = text.replace(exPattern, (match, content) => {
        // Nếu có \loigiai trong đoạn này
        if (/\\loigiai/.test(content)) {
            // Xóa từ "Lời giải"
            content = content.replace(/Lời giải/g, '');
        }
        return `\\begin{ex}${content}\\end{ex}`;
    });

    return text;
}
export function xoa_khoangtrong_trong_ngoac(text) {
    // Biểu thức chính quy để tìm các nội dung trong dấu (...)
    const parenthesesPattern = /\(([^(){}]*)\)/g;
    // Biểu thức chính quy để tìm các nội dung trong dấu {...}
    const bracesPattern = /\{([^(){}]*)\}/g;

    // Hàm thay thế để xóa khoảng trống nếu nội dung chỉ chứa [a-zA-Z] và dấu chấm
    const removeSpaces = (match, content) => {
        if (/^[a-zA-Z\s.]+$/.test(content)) {
            return `(${content.replace(/\s+/g, '')})`;
        }
        return match;
    };

    // Xử lý nội dung trong dấu (...)
    text = text.replace(parenthesesPattern, removeSpaces);
    
    // Hàm thay thế để xóa khoảng trống nếu nội dung chỉ chứa [a-zA-Z] và dấu chấm
    const removeSpacesBraces = (match, content) => {
        if (/^[a-zA-Z\s.]+$/.test(content)) {
            return `{${content.replace(/\s+/g, '')}}`;
        }
        return match;
    };

    // Xử lý nội dung trong dấu {...}
    text = text.replace(bracesPattern, removeSpacesBraces);

    return text;
}
export function thay_haicham_colon(text) {
    // Biểu thức chính quy để tìm các đoạn nằm trong dấu $...$
    const mathModePattern = /\$([^$]+)\$/g;
    
    // Thay thế dấu : bằng \colon và thêm một khoảng trống trong các đoạn tìm được
    text = text.replace(mathModePattern, (match, content) => {
        return `$${content.replace(/:/g, '\\colon ')}$`;
    });

    return text;
}
export function xoa_2cham_sau_thila(text) {
    // Biểu thức chính quy để tìm các từ khóa "ta có" hoặc "thì" theo sau bởi dấu :
    const keywordPattern = /\b(ta có|thì|là)\s*:/g;
    
    // Thay thế dấu : sau các từ khóa bằng khoảng trống
    text = text.replace(keywordPattern, (match, keyword) => {
        return `${keyword} `;
    });

    // Biểu thức chính quy để tìm đoạn văn bản bên trong dấu $...$
    const dollarPattern = /\$([^$]+)\$/g;

    // Thay thế đoạn văn bản bên trong dấu $...$
    text = text.replace(dollarPattern, (match, innerText) => {
        // Loại bỏ tất cả khoảng trắng giữa các ký tự A-Z, dấu phẩy, dấu ngoặc vuông, và dấu chấm
        innerText = innerText.replace(/\s*([A-Z,\[\]\.,])\s*/g, '$1');
        return `$${innerText}$`;
    });

    return text;
}

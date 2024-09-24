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
    text = text.replace(/\\int_/g, '\\displaystyle\\int_');
    text = text.replace(/\\left\.(.*?)\\right\|/g, '$1\\bigg|');
    text = text.replace(/\\left\\cdot(.*?)\\right\|/g, '$1\\bigg|');
    text = text.replace(/\\\\mathrm/g, '\\mathrm');

    return text;
}

export function them_dola_cho_so(text) {
    // Biểu thức chính quy để tìm các đoạn $...$ và $$...$$
    const mathModePattern = /\$\$[\s\S]*?\$\$|\$[^$]*?\$/g;
    // Biểu thức để tìm các số không nằm trong đoạn toán học (chỉ số không đứng cạnh $)
    const pattern = /(?<!\$)(\d+)(?!\$)/g;

    // Tách văn bản thành các đoạn không phải toán học (bên ngoài $...$ hoặc $$...$$)
    let segments = text.split(mathModePattern);
    // Lưu lại các đoạn toán học $...$ hoặc $$...$$
    let matches = text.match(mathModePattern) || [];

    // Xử lý các đoạn không phải toán học: Thêm dấu $ vào các số
    segments = segments.map(segment => 
        segment.replace(pattern, (match, number) => {
            // Thêm dấu $ vào các con số không nằm trong toán học
            return `$${number}$`;
        })
    );

    // Ghép các đoạn đã xử lý và các đoạn toán học lại với nhau
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
    
    // Chỉ thay thế các ký tự trong đoạn $...$
    text = text.replace(mathModePattern, (match, content) => {
        // Thay thế dấu : bằng \colon, dấu . thành \cdot, và dấu , thành {,} nếu trước và sau là số
        let processedContent = content.replace(/:/g, '\\colon ')
                                      .replace(/(\d),(\d)/g, '$1{,}$2');
        // Loại bỏ khoảng trắng trước dấu } ở cuối dòng nếu có trong đoạn $
        processedContent = processedContent.replace(/ \}$/gm, '}');
        
        // Trả về nội dung đã xử lý kèm theo dấu $
        return `$${processedContent}$`;
    });

    // Trả về text đã được xử lý chỉ trong đoạn $
    return text;
}


export function thay_haicham_colonG(text) {
    // Biểu thức chính quy để tìm các đoạn nằm trong dấu $...$
    const mathModePattern = /\$([^$]+)\$/g;
    
    // Thay thế dấu : bằng \colon và thêm một khoảng trống trong các đoạn tìm được
    text = text.replace(mathModePattern, (match, content) => {
        return `$${content.replace(/:/g, '\\colon ')}$`;
    });

    return text;
}
export function processDoubleDollar(content) {
    return content.replace(/\$\$\s*([^\$]+?)\s*\$\$/g, function (match, p1) {
        // Loại bỏ khoảng trắng không cần thiết sau $$ mở và trước $$ đóng
        return `$$${p1}$$`;
    });
}
export function replaceEInMath(content) {
    // Thay thế e có dấu mũ ^ phía sau
    content = content.replace(/e\^/g, '\\mathrm{e}\^');
    // Tìm tất cả các nội dung trong dấu $...$ hoặc $$...$$
    return content.replace(/(\$+)([^$]+)\1/g, function(match, delimiter, mathContent) {
        // Thay thế ký tự e thành \mathrm{e} chỉ khi trước e là số, +, -, =, ^ hoặc có khoảng trắng
        return delimiter + mathContent.replace(/\\text\{.*?\}|([0-9+\-=^]\s*)e(\^?)/g, function(innerMatch, before, after) {
            // Nếu khớp với \text{...} thì giữ nguyên
            if (innerMatch.startsWith('\\text{')) {
                return innerMatch;
            }
            // Thay thế e bằng \mathrm{e}, nếu có ^ sau e thì giữ lại
            return before + '\\mathrm{e}' + after;
        }) + delimiter;
    });
}


export function xoa_2cham_sau_thila(text) {
    text= processDoubleDollar(text)
    text=replaceEInMath(text)
    
    // Biểu thức chính quy để tìm các từ khóa "ta có" hoặc "thì" theo sau bởi dấu :
    const keywordPattern = /\b(ta có|thì|là)\s*:/g;
    
    // Thay thế dấu : sau các từ khóa bằng khoảng trống
    text = text.replace(keywordPattern, (match, keyword) => {
        return `${keyword} `;
    });

    return text;
}
export function them_dola_cho_so_newG(text) {
    // Step 1: Escape math environments
    const mathEnvironments = /(\$[^$]*\$|\\begin\{[^}]*\}[\s\S]*?\\end\{[^}]*\})/g;
    let escapedText = [];
    let lastIndex = 0;
    let match;

    while ((match = mathEnvironments.exec(text)) !== null) {
        escapedText.push({ text: text.slice(lastIndex, match.index), isMath: false });
        escapedText.push({ text: match[0], isMath: true });
        lastIndex = match.index + match[0].length;
    }
    escapedText.push({ text: text.slice(lastIndex), isMath: false });

    // Step 2: Replace numbers in non-math environments
    const numberPattern = /\b\d+\b/g;
    escapedText = escapedText.map(part => {
        if (!part.isMath) {
            part.text = part.text.replace(numberPattern, match => `$${match}$`);
        }
        return part;
    });

    // Step 3: Reassemble the text
    return escapedText.map(part => part.text).join('');
}
export function convertSolutionWithItems(inputCode) {
    // Tìm phần giữa \loigiai{ và \end{ex}
    const solutionPattern = /\\loigiai\s*\{([\s\S]*?)\}\s*\\end{ex}/g;
    
    return inputCode.replace(solutionPattern, (match, solutionContent) => {
        // Tách phần nội dung lời giải chính và các mục a., b., c., d. hoặc 1., 2., 3.
        const parts = solutionContent.split(/\n(?=[a-z]\.|[a-z]\)|\d+\.\s|\d+\)\s)/i);
        let formattedSolution = parts.shift().trim(); // Nội dung chính trước các mục a., b., c., d.

        // Nếu có các mục a., b., c., d., chuyển đổi chúng thành \item và loại bỏ ký tự a., b., c., d. sau \item
        if (parts.length > 0) {
            formattedSolution += "\n\\begin{enumerate}";
            parts.forEach(part => {
                // Loại bỏ ký tự đánh số như a., b., c., d. hoặc 1., 2., 3.
                const cleanPart = part.replace(/^[a-z]\.|[a-z]\)|\d+\.\s|\d+\)\s/, '').trim();
                formattedSolution += `\n\\item ${cleanPart}`;
            });
            formattedSolution += "\n\\end{enumerate}";
        }

        // Loại bỏ các dòng trống trong phần nội dung
        formattedSolution = formattedSolution.replace(/^\s*[\r\n]/gm, '');

        // Trả lại phần \loigiai với nội dung đã được chuyển đổi
        return `\\loigiai{\n${formattedSolution}\n}\\end{ex}`;
    });
}


export function them_dola_cho_so_new(text) {
    text=convertSolutionWithItems(text)
    // Step 1: Escape math environments
    const mathEnvironments = /(\${1,2}[^$]*\${1,2}|\\begin\{[^}]*\}[\s\S]*?\\end\{[^}]*\})/g;
    let escapedText = [];
    let lastIndex = 0;
    let match;

    while ((match = mathEnvironments.exec(text)) !== null) {
        escapedText.push({ text: text.slice(lastIndex, match.index), isMath: false });
        escapedText.push({ text: match[0], isMath: true });
        lastIndex = match.index + match[0].length;
    }
    escapedText.push({ text: text.slice(lastIndex), isMath: false });

    // Step 2: Replace numbers in non-math environments
    const numberPattern = /\b\d+\b/g;
    escapedText = escapedText.map(part => {
        if (!part.isMath) {
            part.text = part.text.replace(numberPattern, match => `$${match}$`);
        }
        return part;
    });

    // Step 3: Reassemble the text
    //return escapedText.map(part => part.text).join('');
    // Reassemble the text
    let resultText = escapedText.map(part => part.text).join('');

   // Replace \section*{Lời giải} with Lời giải
    resultText = resultText.replace(/\\section\*\{Lời giải\}/g, 'Lời giải');
    resultText = resultText.replace(/\\section\*\{Lò̀i giải\}/g, 'Lời giải'); // Thiếu dấu chấm phẩy đã được thêm
    resultText = resultText.replace(/\\lim\*\{Lò̀i giải\}/g, 'Lời giải'); // Đã thêm chấm phẩy
    // Replace \lim _ with \lim \limits_
    resultText = resultText.replace(/\\lim\s*_/g, '\\lim\\limits_');
    resultText = resultText.replace(/\s+}$/gm, '}');
    resultText = resultText.replace(/\\int\s*_/g, '\\int\\limits_');
    resultText = resultText.replace(/(?<!\\displaystyle\s*)\\int/g, '\\displaystyle\\int');
    return resultText;
}

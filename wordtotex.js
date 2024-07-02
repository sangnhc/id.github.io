import { convertNumberToMathMode,xoa_2cham_sau_thila,thay_haicham_colon, themdolachoso, them_dola_cho_so,xoa_khoangtrong_trong_ngoac, removeLoiGiaiInEx } from './numberUtils.js';
import { replaceTextWithJson } from './replaceUtils.js';
import { convertArrayToHeva, convertArrayToHoac,removeSpacesInMathMode } from './replaceUtils.js';

export function wordtotex() {
    let inputCode = document.getElementById('inputCode').value;
    let outputCode = "";
    let errors = [];

    // Chuyển đổi cấu trúc câu hỏi tự luận
    const questionPattern = /Câu (\d+)[.:\s]+([\s\S]*?)(?=\nCâu \d|$)/g;
    inputCode = inputCode.replace('Lò̀i giải','Lời giải')
    outputCode = inputCode.replace(questionPattern, (match, num, questionContent) => {
        // Tách nội dung câu hỏi và lời giải
        const solutionPattern = /Lời giải([\s\S]*)/i;
        let solutionText = "";
        let questionText = questionContent;

        const solutionMatch = questionContent.match(solutionPattern);
        if (solutionMatch) {
            solutionText = solutionMatch[1].trim();
            questionText = questionContent.replace(solutionPattern, '').trim();
        }

        // Tách nội dung câu hỏi chính và các mục a., b., c., d. hoặc 1., 2., 3., 1), 2), 3)
        const parts = questionText.split(/\n(?=[a-z]\.|[a-z]\)|\d+\.\s|\d+\)\s)/i);
        let formattedContent = parts.shift().trim();

        // Nếu có các mục a., b., c., d., chuyển đổi chúng thành \item và loại bỏ ký tự a., b., c., d. sau \item
        if (parts.length > 0) {
            formattedContent += "\n\\begin{enumerate}";
            parts.forEach(part => {
                const cleanPart = part.replace(/^[a-z]\.|[a-z]\)|\d+\.\s|\d+\)\s/, '').trim();
                formattedContent += `\n\\item ${cleanPart}`;
            });
            formattedContent += "\n\\end{enumerate}";
        }

        let result = `%% Câu ${num}:\n\\begin{ex}\n${formattedContent}\n\\loigiai{\n${solutionText}\n}\n\\end{ex}\n`;
        return result;
    });

    // Thay thế ký hiệu toán học
    outputCode = outputCode.replace(/\\mathrm{R}/g, '\\mathbb{R}');
    outputCode = convertNumberToMathMode(outputCode);
    outputCode = outputCode.replace(/}\s*{/g, '}{');
    //
    outputCode = convertArrayToHeva(outputCode);
    outputCode = convertArrayToHoac(outputCode);
    //outputCode = removeSpacesInMathMode(outputCode);
    outputCode = themdolachoso(outputCode);
    outputCode = them_dola_cho_so(outputCode)
    outputCode =  removeLoiGiaiInEx(outputCode)
    outputCode = xoa_khoangtrong_trong_ngoac(outputCode)
    outputCode = thay_haicham_colon(outputCode)
    outputCode = xoa_2cham_sau_thila(outputCode)
    //thêm hàm mới
    fetch('replace.json')
        .then(response => response.json())
        .then(data => {
            outputCode = replaceTextWithJson(data, outputCode);
            document.getElementById('outputCode').value = outputCode;
            if (errors.length > 0) {
                alert("Các lỗi sau cần được sửa:\n" + errors.join("\n"));
            }
        })
        .catch(error => console.error('Error:', error));
}

import { convertNumberToMathMode,xoa_2cham_sau_thila,thay_haicham_colon, themdolachoso, them_dola_cho_so,xoa_khoangtrong_trong_ngoac, removeLoiGiaiInEx} from './numberUtils.js';
import { replaceTextWithJson } from './replaceUtils.js';
import { convertArrayToHeva,convertArrayToHoac, removeSpacesInMathMode } from './replaceUtils.js';

export function word2tex() {
    let inputCode = document.getElementById('inputCode').value;
    let outputCode = "";
    let errors = [];
    // Xóa tất cả các dòng trống
    inputCode = inputCode.replace(/^\s*[\r\n]/gm, '');
    // Tìm tất cả các câu hỏi và thêm từ khóa "Lời giải" nếu không có
    inputCode = inputCode.replace(/(Câu \d+:.*?)(?=(\nCâu \d+:.*?|$))/gs, (match, p1, p2) => {
        if (!/Lời giải/.test(match)) {
            return match + '\nLời giải\n';
        }
        return match;
    });

    // Chuyển đổi cấu trúc câu hỏi và đáp án
    //const questionPattern = /Câu (\d+)[:.]([\s\S]*?)(?:\nA\.\s*(.*?)\nB\.\s*(.*?)\nC\.\s*(.*?)\nD\.\s*(.*?))?(?:\nLời giải([\s\S]*?))?(?=\nCâu \d|$)/g;
    const questionPattern = /Câu (\d+)[:.]([\s\S]*?)\nA\.\s*(.*?)\nB\.\s*(.*?)\nC\.\s*(.*?)\nD\.\s*(.*?)(?:\nLời giải([\s\S]*?))?(?=\nCâu \d|$)/g;
    inputCode = inputCode.replace('Lò̀i giải','Lời giải')
    outputCode = inputCode.replace(questionPattern, (match, num, questionContent, choiceA, choiceB, choiceC, choiceD, solution) => {
        let errorHighlight = "";
        let errorFlag = false;

        if (!choiceA) {
            errorFlag = true;
            errorHighlight += `A (missing) `;
        } else {
            errorHighlight += `A. ${choiceA.trim()} `;
        }
        if (!choiceB) {
            errorFlag = true;
            errorHighlight += `B (missing) `;
        } else {
            errorHighlight += `B. ${choiceB.trim()} `;
        }
        if (!choiceC) {
            errorFlag = true;
            errorHighlight += `C (missing) `;
        } else {
            errorHighlight += `C. ${choiceC.trim()} `;
        }
        if (!choiceD) {
            errorFlag = true;
            errorHighlight += `D (missing) `;
        } else {
            errorHighlight += `D. ${choiceD.trim()} `;
        }

        if (errorFlag) {
            errors.push(`Câu ${num} lỗi sau: ${errorHighlight}`);
            return match;
        }

        let result = `%% Câu ${num}:\n\\begin{ex}\n${questionContent.trim()}\n\\choice\n{${choiceA.trim()}}\n{${choiceB.trim()}}\n{${choiceC.trim()}}\n{${choiceD.trim()}}\n\\loigiai{\n${solution ? solution.trim() : ''}\n}\n\\end{ex}\n`;
        return result;
    });

    // Thay thế ký hiệu toán học
    outputCode = outputCode.replace(/\\mathrm{R}/g, '\\mathbb{R}');
    outputCode = convertNumberToMathMode(outputCode);
    //outputCode = outputCode.replace(/}\s*{/g, '}{');
     outputCode = convertArrayToHeva(outputCode);
     outputCode = convertArrayToHoac(outputCode);
     //outputCode = removeSpacesInMathMode(outputCode);
     outputCode = themdolachoso(outputCode);
     outputCode = them_dola_cho_so(outputCode)
     outputCode =  removeLoiGiaiInEx(outputCode)
     outputCode = xoa_khoangtrong_trong_ngoac(outputCode)
     outputCode = thay_haicham_colon(outputCode)
     outputCode = xoa_2cham_sau_thila(outputCode)
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

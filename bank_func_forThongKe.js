// Hàm xử lý dấu + -, - - và - +
function cleanUpOutput(output) {
    return output
        .replace(/=\s*\+\s*/g, ' = ') // Remove "+ " right after "="
        .replace(/\+\s*-/g, '-') // Change "+ -" to "-"
        .replace(/-\s*-/g, '+') // Change "- -" to "+"
        .replace(/-\s*\+/g, '-') // Change "- +" to "-"
        .replace(/\+\s*\+/g, '+') // Change "+ +" to "+"
        .replace(/\{\s*\+\s*/g, '{') // Remove "+" right after "{"
        .replace(/^\+\s*/g, ''); // Remove leading "+"
}
function lamdeppm(expression) {
    // Xóa các hệ số 1 và 0 cho bất kỳ biến nào
    expression = expression.replace(/\b1([a-zA-Z])/g, '$1'); // 1x, 1m -> x, m
    expression = expression.replace(/\b0[a-zA-Z]\^?\d*/g, ''); // 0x, 0x^n, 0m -> ''
    
    // Xử lý các dấu ++, --, +-, -+
    expression = expression.replace(/\+\+/g, '+'); // ++ -> +
    expression = expression.replace(/--/g, '+'); // -- -> +
    expression = expression.replace(/\+-/g, '-'); // +- -> -
    expression = expression.replace(/-\+/g, '-'); // -+ -> -
    
    // Xóa các dấu + ở đầu biểu thức nếu có
    expression = expression.replace(/^\+/, '');
    
    return expression;
}

function thongke_tim_deltaQ(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo","bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 2 hoặc 3
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 2 && totalFruits % 4 !== 3) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Math.round(Q3 - Q1);
    
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{$${IQR}$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\nTứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;

    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFreq >= positionQ3) break;
    }

    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;

    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_tim_deltaQ_R(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo", "bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 1
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 1) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q1GroupB = weightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q3GroupB = weightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Math.round(Q3 - Q1);
    
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{$${IQR}$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA[0]};${Q1GroupA[1]})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB[0]};${Q1GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFrequency >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA[0]};${Q3GroupA[1]})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB[0]};${Q3GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_tim_ngoai_lai(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo", "bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 1
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 1) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q1GroupB = weightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q3GroupB = weightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Q3 - Q1;
    
    // Tính các ngưỡng ngoại lai
    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị và các giá trị ngoại lai của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{Khoảng tứ phân vị: $${Math.round(IQR)}$, giá trị ngoại lai: $[${Math.round(lowerBound)}, ${Math.round(upperBound)}]$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA[0]};${Q1GroupA[1]})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB[0]};${Q1GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFrequency >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA[0]};${Q3GroupA[1]})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB[0]};${Q3GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${Math.round(IQR)}$.\\\\\n`;
    result += `Các giá trị ngoại lai thấp hơn ngưỡng dưới là $<${Math.round(lowerBound)}$ và cao hơn ngưỡng trên là $>${Math.round(upperBound)}$.}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_phuong_sai_do_lech_chuan(e) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 6) + 150;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < 5; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                Q3GroupB = heightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính phương sai, độ lệch chuẩn, trung vị, mốt và khoảng biến thiên của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm chiều cao của $${totalStudents}$ học sinh được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ hai
    if (Q2BoundaryUsed) {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}} \\in [${Q2GroupA.split(";")[0].replace("[", "")};${Q2GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ2)}}} \\in [${Q2GroupB.split(";")[0].replace("[", "")};${Q2GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_2=${Q2GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}}, x_{{${Math.ceil(positionQ2)}}} \\in [${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFreq >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_phuong_sai_do_lech_chuanN(e) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 6) + 150;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < 5; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1 && totalStudents % 4 !== 2 && totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 1) {
                if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
            } else if (totalStudents % 4 === 2 || totalStudents % 4 === 3) {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 2) {
                if (Math.ceil(positionQ2) - 1 <= cumulativeFrequency - frequencies[i] && Math.ceil(positionQ2) <= cumulativeFrequency) {
                    Q2 = (u_m + u_m1) / 2;
                } else {
                    Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else if (totalStudents % 4 === 1 || totalStudents % 4 === 3) {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 1) {
                if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
            } else if (totalStudents % 4 === 2 || totalStudents % 4 === 3) {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Kiểm tra và gán giá trị mặc định nếu Q1, Q2, Q3 không được gán giá trị
    Q1 = Q1 !== undefined ? Q1 : 0;
    Q2 = Q2 !== undefined ? Q2 : 0;
    Q3 = Q3 !== undefined ? Q3 : 0;

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm chiều cao của $${totalStudents}$ học sinh được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}$ nằm trong nhóm có khoảng [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    if (totalStudents % 4 === 2 && Q2BoundaryUsed) {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}}$ nằm trong nhóm có khoảng [${Q2GroupA.split(";")[0].replace("[", "")};${Q2GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng [${Q2GroupB.split(";")[0].replace("[", "")};${Q2GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=\\dfrac{${Q2GroupA.split(";")[1].replace(")", "")}+${Q2GroupB.split(";")[0].replace("[", "")}}{2}\\approx ${(Q2).toFixed(2)}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng [${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}$ nằm trong nhóm có khoảng [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_4k_1() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) - 1 <= previousCumulative || Math.ceil(positionQ3) > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                Q3GroupB = heightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_4k_2() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 2) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range1, Q2Range2, Q2Frequency1, Q2Frequency2, Q2PreviousCumulative;
    let Q2Value1, Q2Value2;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2Value1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value1 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range1 = heightRanges[i];
            Q2Frequency1 = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
        if (cumulativeFrequency >= positionQ2 + 1 && !Q2Value2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value2 = u_m + ((positionQ2 + 1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range2 = heightRanges[i];
            Q2Frequency2 = frequencies[i];
            break;
        }
    }

    if (Q2Range1 === Q2Range2) {
        Q2 = Q2Value1; // Nếu cả hai giá trị nằm trong cùng một nhóm, sử dụng giá trị tính toán
    } else {
        Q2 = (Q2Value1 + Q2Value2) / 2; // Nếu giá trị nằm trong hai nhóm khác nhau, lấy trung bình của hai giá trị
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    if (Q2Range1 === Q2Range2) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range1.split(";")[0].replace("[", "")};${Q2Range1.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency1}} \\cdot(${Q2Range1.split(";")[1].replace(")", "")}-${Q2Range1.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong hai nhóm khác nhau.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=\\dfrac{${Q2Range1.split(";")[1].replace(")", "")}+${Q2Range2.split(";")[0].replace("[", "")}}{2}\\approx ${(Q2).toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_3() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}




 
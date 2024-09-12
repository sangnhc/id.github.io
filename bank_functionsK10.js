function calculateMeetingProbability(timeRange, waitTime) {
    // Tổng số khả năng (diện tích hình vuông)
    const totalPossibilities = timeRange * timeRange;

    // Diện tích phần giao giữa các đường thẳng và hình vuông
    const intersectionArea = (timeRange - 2 * waitTime) * timeRange + 2 * (waitTime * waitTime);

    // Xác suất gặp nhau
    const probability = intersectionArea / totalPossibilities;

    return {
        probability: Math.round(probability * 10) / 10, // Làm tròn đến hàng phần chục
        intersectionArea: intersectionArea
    };
}

function xs_hai_nguoi_gap_nhau(e) {
  // Lựa chọn giờ bắt đầu ngẫu nhiên từ 7 đến 10
    const startHour = Math.floor(Math.random() * 5) + 7; // 7, 8, 9, hoặc 10
    const endHour = startHour + 1; // Giờ kết thúc là giờ bắt đầu + 1
    const timeRange = 60; // 8 giờ đến 9 giờ
    const waitTime = Math.floor(Math.random() * 26) + 5; // Lựa chọn thời gian chờ ngẫu nhiên trong khoảng 5-30 phút

    const result = calculateMeetingProbability(timeRange, waitTime);

    const totalArea = timeRange * timeRange;
    const shadedArea = totalArea - 2 * (0.5 * (timeRange -  waitTime) * (timeRange - waitTime));

    const latexOutput = `
        \\begin{ex}%[0D0C2-9]
            Hai bạn Việt và Nam hẹn nhau tại thư viện từ $${startHour}$ giờ đến $${endHour}$ giờ. Người đến trước đợi quá $${waitTime}$ phút mà không gặp thì rời đi. Tính xác suất để hai người đi đến nơi hẹn theo quy định mà gặp nhau (kết quả làm tròn đến hàng phần chục).
            \\\\\\shortans{$${result.probability}$}
            \\loigiai{
                \\immini{
                    Gọi $x$ (phút) là thời gian mà bạn Việt đến chờ ở thư viện.\\\\
                    Gọi $y$ (phút) là thời gian mà bạn Nam đến chờ ở thư viện.\\\\
                    Gọi $A$ là biến cố hai người gặp nhau.\\\\
                    Điều kiện $0 \\leq x \\leq 60, 0 \\leq y \\leq 60$.\\\\
                    Suy ra $n(\\Omega) = 60^2 = 3600$ (diện tích hình vuông cạnh $60$).\\\\
                    Điều kiện gặp nhau là
                    \\begin{eqnarray*}
                        &&|x - y| \\leq ${waitTime} \\\\
                        &\\Leftrightarrow &-${waitTime} \\leq x - y \\leq ${waitTime} \\\\
                        &\\Leftrightarrow& \\heva{& y \\leq x + ${waitTime} \\\\ &y \\geq x - ${waitTime}.}\\qquad(*)
                    \\end{eqnarray*}
                }
                {
                    \\begin{tikzpicture}[scale=.65, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                        \\draw[->] (-1,0) -- (7,0) node[below] {$x$};
                        \\draw[->] (0,-1) -- (0,7) node[left] {$y$};
                        \\fill (0,0) circle (1pt) node[below left]{$O$};
                        \\draw (0,0) rectangle (6,6);
                        \\draw[thick,samples=150,smooth,domain=0:${(60 - waitTime) / 10}] plot(\\x,{1*\\x+(${waitTime / 10})});
                        \\draw (2.5,3.75)node[above,rotate=45]{$y=x+${waitTime}$};
                        \\draw (3.5,2)node[below,rotate=45]{$y=x-${waitTime}$};
                        \\draw[thick,samples=150,smooth,domain=${waitTime / 10}:6] plot(\\x,{1*\\x-(${waitTime / 10})});
                        \\fill[draw = none, blue,pattern=dots] (0,0)--(${waitTime / 10},0)--(6,${(60 - waitTime) / 10})--(6,6)--(${(60 - waitTime) / 10},6)--(0,${waitTime / 10})--cycle;
                        \\fill (6,0) circle (1pt) node[below]{$60$};
                        \\fill (0,6) circle (1pt) node[left]{$60$};
                        \\fill (${waitTime / 10},0) circle (1pt) node[below]{${waitTime}};
                        \\fill (0,${waitTime / 10}) circle (1pt) node[left]{${waitTime}};
                        \\fill (6,${(60 - waitTime) / 10}) circle (1pt);
                        \\fill (${(60 - waitTime) / 10},6) circle (1pt);
                    \\end{tikzpicture}
                }\\noindent
                Do điểm $M(x, y)$ thỏa điều kiện $(*)$ thuộc lục giác chấm chấm giới hạn bởi $2$ đường thẳng $y = x + ${waitTime}, y = x - ${waitTime}$ là hình vuông của không gian mẫu.\\\\
                Lục giác có diện tích $S'$ là diện tích phần giao của lục giác và hình vuông.\\\\
                Ta được $S' = 60 \\cdot 60 - 2 \\cdot \\dfrac{1}{2} \\cdot (60 -  ${waitTime}) \\cdot (60 -  ${waitTime}) = ${shadedArea}.\\\\
                Vậy xác suất hai người gặp nhau là $P(A) = \\dfrac{S'}{S} = \\dfrac{${shadedArea}}{3600} \\approx ${result.probability}$.
            }
        \\end{ex}
    `;

    return latexOutput;
}
function tinhdodaicungtheorad(e) {
    // Random đường kính từ 6 đến 12 cm
    let diameter = Math.floor(Math.random() * 7) + 6;

    // Random số đo cung từ 1 đến 10 rad (làm tròn đến 1 chữ số thập phân)
    let angle = (Math.random() * 9 + 1).toFixed(1);

    // Tính bán kính
    let radius = diameter / 2;

    // Tính độ dài cung tròn
    let correctAnswer = (angle * radius).toFixed(2);

    // Tạo các phương án nhiễu (mô phỏng các lỗi học sinh thường mắc)
    let wrongAnswer1 = (angle * diameter).toFixed(2); // Sai do dùng đường kính thay vì bán kính
    let wrongAnswer2 = (correctAnswer * 1.5).toFixed(2); // Sai do nhân quá lên (nhầm lẫn giá trị rad)
    let wrongAnswer3 = (correctAnswer * 0.7).toFixed(2); // Sai do tính thiếu giá trị

    // Đáp án đúng
    let correctAnswerFormatted = `${parseFloat(correctAnswer)}$ cm`;

    // Các đáp án nhiễu
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,
        `{$${parseFloat(wrongAnswer1)}$ cm}`, // Lỗi do dùng đường kính
        `{$${parseFloat(wrongAnswer2)}$ cm}`, // Lỗi do nhân nhầm hằng số
        `{$${parseFloat(wrongAnswer3)}$ cm}`  // Lỗi do tính thiếu
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Trên đường tròn đường kính $${diameter}$ cm, tính độ dài cung tròn có số đo bằng $${angle}$ rad.
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Tính được $\ell=\\alpha \\cdot R=${angle} \\cdot \\dfrac{${diameter}}{2}=${correctAnswerFormatted}$.
    }
    \\end{ex}
    `;

    return exercise;
} 
function gcd(a, b) {
    // Hàm tính ước chung lớn nhất (Greatest Common Divisor)
    if (!b) return a;
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    // Hàm rút gọn phân số
    let divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}

function formatFraction(numerator, denominator) {
    // Nếu mẫu số là 1, chỉ trả về tử số
    if (denominator === 1) return `${numerator} \\pi`;
    // Nếu tử số là 1, chỉ trả về π
    if (numerator === 1) return `\\pi`;
    return `\\dfrac{${numerator}}{${denominator}} \\pi`;
}

function tinhdodaicungtheodo(e){
    // Random bán kính từ 5 đến 10
    let radius = Math.floor(Math.random() * 6) + 5;

    // Random số đo cung từ 30 đến 90 độ
    let angle = Math.floor(Math.random() * 61) + 30;

    // Tử số và mẫu số để tính độ dài cung tròn (trước khi chia)
    let numerator = radius * angle;
    let denominator = 180;

    // Rút gọn phân số
    let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numerator, denominator);

    // Tạo các phương án sai (giá trị xấp xỉ)
    let wrongAnswer1 = simplifyFraction(simplifiedNumerator * 9, simplifiedDenominator * 10);
    let wrongAnswer2 = simplifyFraction(simplifiedNumerator * 11, simplifiedDenominator * 10);
    let wrongAnswer3 = simplifyFraction(simplifiedNumerator * 8, simplifiedDenominator * 10);

    // Đáp án đúng
    let correctAnswer = formatFraction(simplifiedNumerator, simplifiedDenominator);

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswer}$}`,
        `{$${formatFraction(wrongAnswer1[0], wrongAnswer1[1])}$}`,
        `{$${formatFraction(wrongAnswer2[0], wrongAnswer2[1])}$}`,
        `{$${formatFraction(wrongAnswer3[0], wrongAnswer3[1])}$}`
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Trên đường tròn bán kính $${radius}$, lấy cung có số đo $${angle}^{\\circ}$. Độ dài $\ell$ của cung tròn bằng
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $\ell=${radius} \\cdot \\left(\\dfrac{${angle}^{\\circ}}{180^{\\circ}} \\cdot \\pi\\right) = ${formatFraction(simplifiedNumerator, simplifiedDenominator)}.
    }
    \\end{ex}
    `;

    return exercise;
}
function tinhdodaicungtheokimgio(e) {
    // Random số giờ từ 1 đến 12
    let hour = Math.floor(Math.random() * 12) + 1;

    // Random số phút từ 0 đến 59
    let minutes = Math.floor(Math.random() * 60);

    // Random bán kính kim giờ từ 5 đến 15 cm
    let radius = (Math.random() * 10 + 5).toFixed(2); // Bán kính từ 5 đến 15 cm

    // Tính góc quét dựa trên số giờ và phút
    let angle = (2 * Math.PI * (hour + minutes / 60)) / 12;

    // Tính độ dài cung tròn chính xác
    let correctAnswer = (angle * radius).toFixed(2);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = (correctAnswer * 0.95).toFixed(2);  // Lỗi nhỏ, lệch nhẹ
    let wrongAnswer2 = (correctAnswer * 1.05).toFixed(2);  // Lỗi lớn hơn chút
    let wrongAnswer3 = (correctAnswer * 0.9).toFixed(2);   // Lỗi lớn hơn nhiều

    // Đáp án đúng
    let correctAnswerFormatted = `${parseFloat(correctAnswer)}$ cm`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{$${parseFloat(wrongAnswer1)}$ cm}`,    // Lỗi nhỏ
        `{$${parseFloat(wrongAnswer2)}$ cm}`,    // Lỗi lớn hơn chút
        `{$${parseFloat(wrongAnswer3)}$ cm}`     // Lỗi lớn hơn nhiều
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đồng hồ treo tường, kim giờ dài $${radius}$ cm. Trong $${hour}$ giờ và $${minutes}$ phút, mũi kim giờ vạch lên cung tròn có độ dài là:
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Trong $${hour}$ giờ và $${minutes}$ phút, mũi kim giờ quét được một góc là $\\dfrac{2 \\pi \\cdot (${hour} + \\dfrac{${minutes}}{60})}{12} \\Rightarrow l=\\alpha \\cdot R = ${correctAnswerFormatted}$.
    }
    \\end{ex}
    `;

    return exercise;
}
function tinhdodaicungtheoquaybanhxe(e) {
    // Random bán kính bánh xe từ 30 đến 70 cm
    let radius = Math.floor(Math.random() * 41) + 30; // Bán kính từ 30 đến 70 cm

    // Random số vòng quay từ 1 đến 10
    let rotations = Math.floor(Math.random() * 10) + 1;

    // Tính quãng đường đi được (chu vi * số vòng quay)
    let correctAnswer = Math.round(2 * radius * rotations);

    // Tạo các phương án sai khác nhau ngay từ đầu
    let wrongAnswer1 = Math.round(radius * rotations);  // Lỗi quên nhân 2 vào chu vi
    let wrongAnswer2 = Math.round(2 * (radius / 2) * rotations);  // Lỗi nhầm bán kính thành đường kính
    let wrongAnswer3 = Math.round(2 * radius * (rotations + 1));  // Lỗi tăng sai số vòng quay

    // Kiểm tra và sửa đổi nếu có phương án trùng lặp
    if (wrongAnswer1 === correctAnswer) {
        wrongAnswer1 = wrongAnswer1 + 5; // Thay đổi 1 chút nếu trùng
    }
    if (wrongAnswer2 === correctAnswer || wrongAnswer2 === wrongAnswer1) {
        wrongAnswer2 = wrongAnswer2 + 10; // Thay đổi 1 chút nếu trùng
    }
    if (wrongAnswer3 === correctAnswer || wrongAnswer3 === wrongAnswer1 || wrongAnswer3 === wrongAnswer2) {
        wrongAnswer3 = wrongAnswer3 + 15; // Thay đổi 1 chút nếu trùng
    }

    // Đáp án đúng
    let correctAnswerFormatted = `${correctAnswer} \\pi$ cm`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{$${wrongAnswer1} \\pi$ cm}`,  // Lỗi quên nhân 2 vào chu vi
        `{$${wrongAnswer2} \\pi$ cm}`,  // Lỗi nhầm bán kính thành đường kính
        `{$${wrongAnswer3} \\pi$ cm}`   // Lỗi tăng sai số vòng quay
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Bánh xe đạp có bán kính $${radius}$ cm. Một người quay bánh xe $${rotations}$ vòng quanh trục thì quãng đường đi được là:
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $r=${radius}$ cm suy ra quãng đường $l=2 \\pi r \\cdot ${rotations} = ${correctAnswerFormatted}$ cm.
    }
    \\end{ex}
    `;

    return exercise;
}
        

function tinhthoigianduquay(e) {
    // Random bán kính từ 5 đến 15 m
    let radius = Math.floor(Math.random() * 11) + 5; // Bán kính từ 5 đến 15 m

    // Random tốc độ quay từ 1 đến 5 vòng/phút
    let speed = Math.floor(Math.random() * 5) + 1;

    // Random góc quay từ 90 đến 360 độ
    let angle = Math.floor(Math.random() * 271) + 90; // Góc từ 90 đến 360 độ

    // Tính số vòng quay tương ứng với góc
    let roundsNumerator = angle;
    let roundsDenominator = 360;

    // Rút gọn phân số số vòng quay
    let [simplifiedRoundsNumerator, simplifiedRoundsDenominator] = simplifyFraction(roundsNumerator, roundsDenominator);

    // Tính thời gian cần thiết (phân số)
    let timeNumerator = simplifiedRoundsNumerator;
    let timeDenominator = simplifiedRoundsDenominator * speed;

    // Rút gọn phân số thời gian
    let [simplifiedTimeNumerator, simplifiedTimeDenominator] = simplifyFraction(timeNumerator, timeDenominator);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = `\\dfrac{${simplifiedTimeNumerator + 1}}{${simplifiedTimeDenominator}}`;  // Thay đổi tử số
    let wrongAnswer2 = `\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator + 1}}`;  // Thay đổi mẫu số
    let wrongAnswer3 = `\\dfrac{${simplifiedTimeNumerator + 2}}{${simplifiedTimeDenominator}}`;  // Thay đổi tử số nhiều hơn

    // Đáp án đúng
    let correctAnswerFormatted = `\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator}}$ phút`;

    // Các đáp án sai
    let answers = [
        `{\\True ${correctAnswerFormatted}}`,  // Đáp án đúng
        `{${wrongAnswer1} phút}`,               // Phương án sai 1
        `{${wrongAnswer2} phút}`,               // Phương án sai 2
        `{${wrongAnswer3} phút}`                // Phương án sai 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đu quay ở công viên có bán kính $${radius}$ m. Tốc độ của đu quay là $${speed}$ vòng/phút. Hỏi mất bao lâu để đu quay quay được góc $${angle}^{\\circ}$?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Tính được: $${angle}^{\\circ} = \\dfrac{${roundsNumerator}}{180} \\pi = \\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}} \\cdot 2 \\pi$.
    Vậy đu quay quay được góc $${angle}^{\\circ}$ khi nó quay được $\\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}}$ vòng.
    Ta có đu quay quay được $1$ vòng trong $\\dfrac{1}{${speed}}$ phút. Đu quay quay được $\\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}}$ vòng trong $\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator}}$ phút.
    }
    \\end{ex}
    `;

    return exercise;
}

function tinhdodaicungkimdongho(e) {
    // Random bán kính từ 5 đến 15 cm (đổi thành số nguyên)
    let radius = Math.floor(Math.random() * 11) + 5; // Bán kính từ 5 đến 15 cm

    // Random số phút từ 10 đến 60 phút
    let minutes = Math.floor(Math.random() * 51) + 10; // Số phút từ 10 đến 60 phút

    // Tính góc quay dựa trên số phút: mỗi 60 phút là 2π, nên mỗi phút là π/30
    let angleNumerator = minutes;   // Tử số của góc quay
    let angleDenominator = 30;      // Mẫu số của π/30

    // Tính độ dài cung tròn: l = R * α (R là bán kính, α là góc quét)
    let lengthNumerator = radius * angleNumerator; // Tử số của độ dài cung
    let lengthDenominator = angleDenominator;      // Mẫu số của độ dài cung

    // Rút gọn phân số
    let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(lengthNumerator, lengthDenominator);

    // Format kết quả: nếu mẫu số là 1, chỉ hiển thị tử số
    let correctAnswerFormatted = `${formatFraction(simplifiedNumerator, simplifiedDenominator)} \\pi$ cm`;

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator * 2}} \\pi$ cm`;  // Lỗi nhầm mẫu số lớn hơn
    let wrongAnswer2 = `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator / 2}} \\pi$ cm`;  // Lỗi nhầm mẫu số nhỏ hơn
    let wrongAnswer3 = `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator * 4}} \\pi$ cm`;  // Lỗi tăng gấp 4 lần mẫu số

    // Các đáp án sai
    let answers = [
        `{\\True ${correctAnswerFormatted}}`,  // Đáp án đúng
        `{${wrongAnswer1}}`,                   // Sai phương án 1
        `{${wrongAnswer2}}`,                   // Sai phương án 2
        `{${wrongAnswer3}}`                    // Sai phương án 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đồng hồ treo tường có kim giờ dài $${radius}$ cm. Trong $${minutes}$ phút, mũi kim giờ vạch lên cung tròn có độ dài bằng bao nhiêu?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Trong $60$ phút, mũi kim giờ vạch lên $1$ cung có số đo là $\\dfrac{2 \\pi}{12} = \\dfrac{\\pi}{6}$, nên trong $${minutes}$ phút kim giờ vạch lên $1$ cung có số đo là $\\dfrac{${minutes}}{30} \\pi$.
    Vậy độ dài cung tròn mà mũi kim giờ vạch lên là $l = R \\cdot \\alpha = ${radius} \\times \\dfrac{${minutes}}{30} \\pi = ${formatFraction(simplifiedNumerator, simplifiedDenominator)} \\pi$ cm.
    }
    \\end{ex}
    `;

    return exercise;
}

function tinhovongquaybanhxe(e) {
    // Random đường kính bánh xe từ 40 đến 70 cm
    let diameter = Math.floor(Math.random() * 31) + 40; // Đường kính từ 40 đến 70 cm

    // Random vận tốc từ 10 đến 50 km/h
    let speed = Math.floor(Math.random() * 41) + 10; // Vận tốc từ 10 đến 50 km/h

    // Random thời gian từ 10 đến 60 giây
    let time = Math.floor(Math.random() * 51) + 10; // Thời gian từ 10 đến 60 giây

    // Tính bán kính (r = đường kính / 2)
    let radius = diameter / 2; // cm
    let radiusMeters = radius / 100; // chuyển đổi sang mét

    // Tính tốc độ m/s từ km/h
    let speedMetersPerSecond = (speed * 1000) / 3600;

    // Tính quãng đường đi được trong khoảng thời gian cho trước
    let distance = speedMetersPerSecond * time; // m

    // Tính số vòng quay của bánh xe (x = quãng đường / chu vi bánh xe)
    let circumference = 2 * Math.PI * radiusMeters; // Chu vi bánh xe (m)
    let rotations = distance / circumference;

    // Làm tròn số vòng quay
    let roundedRotations = Math.round(rotations);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = Math.round(roundedRotations * 0.5); // Lỗi tính thiếu
    let wrongAnswer2 = Math.round(roundedRotations * 2);   // Lỗi tính gấp đôi
    let wrongAnswer3 = Math.round(roundedRotations * 1.25); // Lỗi tính thừa

    // Đáp án đúng
    let correctAnswerFormatted = `${roundedRotations}`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}$}`,  // Đáp án đúng
        `{$${wrongAnswer1}$}`,                   // Sai phương án 1
        `{$${wrongAnswer2}$}`,                   // Sai phương án 2
        `{$${wrongAnswer3}$}`                    // Sai phương án 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Bánh xe đạp có đường kính $${diameter}$ cm (kể cả lốp). Nếu chạy với vận tốc $${speed}$ km/h thì trong $${time}$ giây, bánh xe quay được số vòng gần bằng với kết quả nào dưới đây?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $r=\\dfrac{${diameter}}{2}$ cm = $\\dfrac{${diameter / 100}}{2}$ m ; $${speed}$ km/h = $\\dfrac{${speed * 1000}}{3600}$ m/s.
    Gọi $l$ là quãng đường đi được trong $${time}$ giây.
    Gọi $x$ là số vòng bánh xe quay được trong $${time}$ giây.
    Khi đó $l=2 \\pi \\cdot r \\cdot x$.
    Mà $l=\\dfrac{${time} \\cdot ${speed * 1000}}{3600}$ m, suy ra $x=\\dfrac{l}{2 \\pi \\cdot r} \\approx ${roundedRotations}$ vòng.
    }
    \\end{ex}
    `;

    return exercise;
}


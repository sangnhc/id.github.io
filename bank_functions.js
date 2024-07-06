// Hàm tính ước chung lớn nhất (GCD) bằng thuật toán Euclid
function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}
// Hàm xử lý dấu + -, - - và - +
function cleanUpOutput(output) {
    return output.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
}

// Hàm chuyển phân số ra LaTeX và tối giản phân số
function formatFraction(numerator, denominator) {
    const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    let simplifiedNumerator = numerator / gcdValue;
    let simplifiedDenominator = denominator / gcdValue;

    // Nếu mẫu số là âm, đổi dấu cả tử và mẫu để giữ mẫu số luôn dương
    if (simplifiedDenominator < 0) {
        simplifiedNumerator = -simplifiedNumerator;
        simplifiedDenominator = -simplifiedDenominator;
    }

    // Nếu mẫu số là 1 hoặc -1, trả về số nguyên
    if (simplifiedDenominator === 1 || simplifiedDenominator === -1) {
        return simplifiedNumerator.toString();
    }

    return `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator}}`;
}
//HH OXYZ
function tinh_vecto_AB(OAx, OAy, OAz, OBx, OBy, OBz) {
    // Define vectors
    const vectorOA = [OAx, OAy, OAz];
    const vectorOB = [OBx, OBy, OBz];

    // Calculate vector AB
    const vectorAB = [
        OBx - OAx,
        OBy - OAy,
        OBz - OAz
    ];

    // Helper function to format vectors properly
    function formatVectorComponent(value, component) {
        if (value < 0) {
            return `${value}\\vec{${component}}`;
        } else {
            return `+ ${value}\\vec{${component}}`;
        }
    }

  

    // Create the problem statement
    const problemStatement = `
        Cho $ \\overrightarrow{OA} = ${formatVectorComponent(OAx, 'i')} ${formatVectorComponent(OAy, 'j')} ${formatVectorComponent(OAz, 'k')} $, 
        $ \\overrightarrow{OB} = ${formatVectorComponent(OBx, 'i')} ${formatVectorComponent(OBy, 'j')} ${formatVectorComponent(OBz, 'k')} $. 
        Tìm vecto $\\overrightarrow{AB}$.`;

    // Create the answer statement
    const answerStatement = `
        (${vectorAB[0]}; ${vectorAB[1]}; ${vectorAB[2]})
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có $ \\overrightarrow{AB} = (${OBx} - ${OAx})\\vec{i} + (${OBy} - ${OAy})\\vec{j} + (${OBz} - ${OAz})\\vec{k} = ${formatVectorComponent(vectorAB[0], 'i')} ${formatVectorComponent(vectorAB[1], 'j')} ${formatVectorComponent(vectorAB[2], 'k')}$.
    }
\\end{ex}
    `;

    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_trongtam(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    
    // Calculate the centroid G
    const Gx = formatFraction(Ax + Bx + Cx, 3);
    const Gy = formatFraction(Ay + By + Cy, 3);
    const Gz = formatFraction(Az + Bz + Cz, 3);

    // Helper function to clean up the final output
    function cleanUpOutput(output) {
        return output.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    }

    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Khi đó tọa độ trọng tâm $G$ của tam giác $ABC$ là gì?
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ trọng tâm $G$ của tam giác $ABC$ là \\(G\\left(${Gx}; ${Gy}; ${Gz}\\right)\\).
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$G\\left(${Gx}; ${Gy}; ${Gz}\\right)$}
    \\loigiai{
        Ta có tọa độ trọng tâm $G$ của tam giác $ABC$ được tính bằng trung bình cộng tọa độ các đỉnh: \\\\
        $G\\left(\\dfrac{${Ax} + ${Bx} + ${Cx}}{3}; \\dfrac{${Ay} + ${By} + ${Cy}}{3}; \\dfrac{${Az} + ${Bz} + ${Cz}}{3}\\right) = G\\left(${Gx}; ${Gy}; ${Gz}\\right)$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_trongtam_tudien(Ox, Oy, Oz, Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Calculate the centroid G
    const Gx = formatFraction(Ox + Ax + Bx + Cx, 4);
    const Gy = formatFraction(Oy + Ay + By + Cy, 4);
    const Gz = formatFraction(Oz + Az + Bz + Cz, 4);
    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Khi đó tọa độ trọng tâm $G$ của tứ diện $OABC$ là gì?
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ trọng tâm $G$ của tứ diện $OABC$ là \\(G\\left(${Gx}; ${Gy}; ${Gz}\\right)\\).
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$G\\left(${Gx}; ${Gy}; ${Gz}\\right)$}
    \\loigiai{
        Ta có tọa độ trọng tâm $G$ của tứ diện $OABC$ được tính bằng trung bình cộng tọa độ các đỉnh: \\\\
        $G\\left(\\dfrac{${Ox} + ${Ax} + ${Bx} + ${Cx}}{4}; \\dfrac{${Oy} + ${Ay} + ${By} + ${Cy}}{4}; \\dfrac{${Oz} + ${Az} + ${Bz} + ${Cz}}{4}\\right) = G\\left(${Gx}; ${Gy}; ${Gz}\\right)$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_toado_D(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Calculate vector BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;

    // Calculate the coordinates of point D
    const Dx = Ax + BCx;
    const Dy = Ay + BCy;
    const Dz = Az + BCz;
    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Tìm tọa độ điểm $D$ sao cho $ABCD$ là hình bình hành.
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ điểm $D$ là $D(${Dx}; ${Dy}; ${Dz})$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$D(${Dx}; ${Dy}; ${Dz})$}
    \\loigiai{
        Ta có $\overrightarrow{BC} = (${Cx} - ${Bx})\\vec{i} + (${Cy} - ${By})\\vec{j} + (${Cz} - ${Bz})\\vec{k} = (${BCx}\\vec{i} + ${BCy}\\vec{j} + ${BCz}\\vec{k})$. \\\\
        Điểm $D$ có tọa độ $D$ sao cho $\overrightarrow{AD} = \overrightarrow{BC}$ là: \\\\
        $D(${Ax} + ${BCx}; ${Ay} + ${BCy}; ${Az} + ${BCz}) = D(${Dx}; ${Dy}; ${Dz})$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function phan_tich_vector(dx, dy, dz, ax, ay, az, bx, by, bz, cx, cy, cz) {
    // Solve the system of equations using matrix algebra
    const A = [
        [ax, bx, cx],
        [ay, by, cy],
        [az, bz, cz]
    ];
    const D = [dx, dy, dz];

    // Solve the linear system
    const coefficients = math.lusolve(A, D);
    const [x, y, z] = coefficients.map(coef => coef[0]);

    // Helper function to format fractions for LaTeX
    function formatFraction(value) {
        const fraction = math.fraction(value);
        if (fraction.d === 1) {
            return `${fraction.n}`;
        } else {
            return `\\dfrac{${fraction.n}}{${fraction.d}}`;
        }
    }

    // Create the problem statement
    const problemStatement = `
        Phân tích $\\vec{d}=(${dx}; ${dy}; ${dz})$ theo các vecto $\\vec{a}=(${ax}; ${ay}; ${az}), \\vec{b}=(${bx}; ${by}; ${bz}), \\vec{c}=(${cx}; ${cy}; ${cz})$.
    `;

    // Create the answer statement
    const answerStatement = `
        $\\vec{d} = ${formatFraction(x)} \\vec{a} + ${formatFraction(y)} \\vec{b} + ${formatFraction(z)} \\vec{c}$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{${answerStatement.trim()}}
    \\loigiai{
        Ta có hệ phương trình: \\\\
        \\heva{
        &${ax}x + ${bx}y + ${cx}z = ${dx} \\\\
        &${ay}x + ${by}y + ${cy}z = ${dy} \\\\
        &${az}x + ${bz}y + ${cz}z = ${dz}}\\\\
        Giải hệ phương trình này ta được: \\\\
        $x = ${formatFraction(x)}, y = ${formatFraction(y)}, z = ${formatFraction(z)}$\\\\
        Vậy $\\vec{d} = ${formatFraction(x)} \\vec{a} + ${formatFraction(y)} \\vec{b} + ${formatFraction(z)} \\vec{c}$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = latexOutput.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    
    return latexOutput;
}
function tinh_xy_ABCthanghang(Ax, Ay, Az, Bx, By, Bz, Cx_expr, Cy_expr, Cz) {
    // Parse expressions for Cx and Cy
    const Cx = math.parse(`x + ${Cx_expr}`).compile();
    const Cy = math.parse(`y + ${Cy_expr}`).compile();

    // Calculate vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;

    // Ensure the points are collinear by solving for k
    const k = (Cz - Bz) / ABz;

    // Evaluate Cx and Cy using k
    const x = Cx.evaluate({ x: k });
    const y = Cy.evaluate({ y: k });

    // Calculate the sum of x + y
    const sum = x + y;

    // Create the problem statement
    const problemStatement = `
        Cho ba điểm $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(x + ${Cx_expr}; y + ${Cy_expr}; ${Cz})$ thẳng hàng. Tổng $x + y$ bằng bao nhiêu?
    `;

    // Create the answer statement
    const answerStatement = `
        Tổng $x + y$ bằng $${sum}$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sum}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và vector $\\overrightarrow{BC} = (x + ${Cx_expr} - ${Bx}; y + ${Cy_expr} - ${By}; ${Cz} - ${Bz})$.\\\\
        Để các điểm thẳng hàng, tồn tại $k$ sao cho $\\overrightarrow{BC} = k \\cdot \\overrightarrow{AB}$.\\\\
        Từ đó, $k = \\dfrac{${Cz} - ${Bz}}{${ABz}} = ${k}$.\\\\
        Tọa độ $x$ và $y$ của điểm $C$ là $x = k \\cdot ${ABx} + ${Bx} = ${x}$ và $y = k \\cdot ${ABy} + ${By} = ${y}$.\\\\
        Vậy tổng $x + y$ bằng $${sum}$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = latexOutput.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    
    return latexOutput;
}
function tinh_M_cachdeu_AB(Ax, Ay, Az, Bx, By, Bz) {
    // Tính toán khoảng cách bình phương từ A và B tới trục hoành
    const dA2 = Math.abs(Ay * Ay + Az * Az);
    const dB2 = Math.abs(By * By + Bz * Bz);

    // Rút gọn phương trình
    const a = 2 * (Bx - Ax);
    const b = Ax * Ax + dA2 - Bx * Bx - dB2;

    // Tọa độ Mx
    const Mx = b / a;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$. Biết $M$ thuộc trục hoành và cách đều $A$ và $B$. Khi đó tọa độ điểm $M$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $M$ là $(${formatFraction(b, a)}; 0; 0)$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có khoảng cách từ $M$ đến $A$ và $B$ là bằng nhau, nghĩa là $AM = MB$.\\\\
        Giải phương trình $(Mx - ${Ax})^2 + ${Math.abs(Ay)}^2 + ${Math.abs(Az)}^2 = (Mx - ${Bx})^2 + ${Math.abs(By)}^2 + ${Math.abs(Bz)}^2$, ta có:\\\\
        $2Mx(${Bx} - ${Ax}) = ${Ax * Ax} + ${dA2} - ${Bx * Bx} - ${dB2}$\\\\
        Tọa độ điểm $M$ là $(${formatFraction(b, a)}; 0; 0)$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính toán tọa độ điểm B
function tinh_toa_do_B(Ax, Ay, Az, Cx, Cy, Cz, Bx_prime, By_prime, Bz_prime, Dx_prime, Dy_prime, Dz_prime) {
    // Tính vector AD'
    const AD_prime_x = Dx_prime - Ax;
    const AD_prime_y = Dy_prime - Ay;
    const AD_prime_z = Dz_prime - Az;

    // Tính vector B'C
    const B_prime_C_x = Cx - Bx_prime;
    const B_prime_C_y = Cy - By_prime;
    const B_prime_C_z = Cz - Bz_prime;

    // Tọa độ điểm B là A + vector AD'
    const Bx = Ax + AD_prime_x;
    const By = Ay + AD_prime_y;
    const Bz = Az + AD_prime_z;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình hộp $A B C D \\cdot A' B' C' D'$ biết $A(${Ax}; ${Ay}; ${Az})$, $C(${Cx}; ${Cy}; ${Cz})$, $B'(${Bx_prime}; ${By_prime}; ${Bz_prime})$, $D'(${Dx_prime}; ${Dy_prime}; ${Dz_prime})$. Khi đó tọa độ điểm $B$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $B$ là $(${Bx}; ${By}; ${Bz})$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AD'} = (${AD_prime_x}; ${AD_prime_y}; ${AD_prime_z})$.\\\\
        Tọa độ điểm $B$ là $A + \\overrightarrow{AD'} = (${Ax} + ${AD_prime_x}; ${Ay} + ${AD_prime_y}; ${Az} + ${AD_prime_z}) = (${Bx}; ${By}; ${Bz})$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính toán tọa độ điểm B
function tinh_B_trongHHCN(Ax, Ay, Az, Cx, Cy, Cz, Bx_prime, By_prime, Bz_prime, Dx_prime, Dy_prime, Dz_prime) {
    // Tính trung điểm I của A và C
    const Ix = (Ax + Cx) / 2;
    const Iy = (Ay + Cy) / 2;
    const Iz = (Az + Cz) / 2;

    // Tính trung điểm J của B' và D'
    const Jx = (Bx_prime + Dx_prime) / 2;
    const Jy = (By_prime + Dy_prime) / 2;
    const Jz = (Bz_prime + Dz_prime) / 2;

    // Tính vector JI
    const JI_x = Ix - Jx;
    const JI_y = Iy - Jy;
    const JI_z = Iz - Jz;

    // Tọa độ điểm B
    const Bx = Bx_prime + JI_x;
    const By = By_prime + JI_y;
    const Bz = Bz_prime + JI_z;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình hộp $ABCD.A'B'C'D'$ biết $A(${Ax}; ${Ay}; ${Az})$, $C(${Cx}; ${Cy}; ${Cz})$, $B'(${Bx_prime}; ${By_prime}; ${Bz_prime})$, $D'(${Dx_prime}; ${Dy_prime}; ${Dz_prime})$. Khi đó tọa độ điểm $B$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $B$ là $(${formatFraction(Bx, 1)}; ${formatFraction(By, 1)}; ${formatFraction(Bz, 1)})$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${answerStatement.trim()}$}
\\loigiai{
Ta có trung điểm $I$ của $A$ và $C$ là $I(${formatFraction(Ix, 1)}; ${formatFraction(Iy, 1)}; ${formatFraction(Iz, 1)})$ và trung điểm $J$ của $B'$ và $D'$ là $J(${formatFraction(Jx, 1)}; ${formatFraction(Jy, 1)}; ${formatFraction(Jz, 1)})$.\\\\
Vector $\\overrightarrow{JI} = (${formatFraction(JI_x, 1)}; ${formatFraction(JI_y, 1)}; ${formatFraction(JI_z, 1)})$.\\\\
Tọa độ điểm $B = B' + \\overrightarrow{JI} = (${Bx_prime} + ${formatFraction(JI_x, 1)}; ${By_prime} + ${formatFraction(JI_y, 1)}; ${Bz_prime} + ${formatFraction(JI_z, 1)}) = (${formatFraction(Bx, 1)}; ${formatFraction(By, 1)}; ${formatFraction(Bz, 1)})$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_m_vec_ab_vuong(ax, az, bx, by, bz) {
    // Tính tích vô hướng của hai vector
    // ax * bx + ay * by + az * bz = 0
    // Giải phương trình
    const numerator = ax * bx + az * bz;
    const denominator = -by;
    const m = formatFraction(numerator, denominator);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hai vector $\\vec{a} = (${ax}; m; ${az})$, $\\vec{b} = (${bx}; ${by}; ${bz})$. Để $\\vec{a} \\perp \\vec{b}$ thì giá trị của $m$ bằng bao nhiêu?
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${m}$}
\\loigiai{
Để hai vector vuông góc, tích vô hướng của chúng phải bằng $0$.\\\\
$\\vec{a} \\cdot \\vec{b} = ${ax} \\cdot ${bx} + m \\cdot ${by} + ${az} \\cdot ${bz} = 0$\\\\
$${ax} \\cdot ${bx} + m \\cdot ${by} + ${az} \\cdot ${bz} = 0$\\\\
$${ax * bx} + m \\cdot (${by}) + ${az * bz} = 0$\\\\
$${numerator} + m \\cdot (${by}) = 0$\\\\
$m = \\dfrac{${numerator}}{${denominator}} = ${m}$\\\\
Vậy giá trị của $m$ là $${m}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm chuyển đổi góc từ độ sang radian
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
// Hàm tính giá trị cosine đặc biệt cho các góc đặc biệt
function specialCosine(degrees) {
    switch(degrees) {
        case 30:
            return 0.5;
        case 45:
            return Math.sqrt(2) / 2;
        case 60:
            return Math.sqrt(3) / 2;
        case 90:
            return 0;
        case 120:
            return -0.5;
        case 135:
            return -Math.sqrt(2) / 2;
        case 150:
            return -Math.sqrt(3) / 2;
        case 180:
            return -1;
        default:
            return Math.cos(degreesToRadians(degrees));
    }
}

// Hàm tính giá trị cosine đặc biệt cho các góc đặc biệt trong định dạng LaTeX
function specialCosineLatex(degrees) {
    switch(degrees) {
        case 30:
            return `\\dfrac{3}{2}`;
        case 45:
            return `\\dfrac{\\sqrt{2}}{2}`;
        case 60:
            return `\\dfrac{1}{2}`;
        case 90:
            return `0`;
        case 120:
            return `-\\dfrac{1}{2}`;
        case 135:
            return `-\\dfrac{\\sqrt{2}}{2}`;
        case 150:
            return `-\\dfrac{\\sqrt{3}}{2}`;
        case 180:
            return `-1`;
        default:
            return Math.cos(degreesToRadians(degrees)).toString();
    }
}
// Hàm tính độ dài của vector |a - b| và làm tròn kết quả đến hai chữ số thập phân
function tinh_do_dai_a_tru_b(a_magnitude, b_magnitude, angle_degrees) {
    // Sử dụng giá trị cosine đặc biệt cho các góc đặc biệt
    const cosTheta = specialCosine(angle_degrees);
    const cosThetaLatex = specialCosineLatex(angle_degrees);

    // Tính toán độ dài của vector a - b
    const magnitude_a_minus_b = Math.sqrt(
        Math.pow(a_magnitude, 2) + Math.pow(b_magnitude, 2) - 2 * a_magnitude * b_magnitude * cosTheta
    );

    // Làm tròn kết quả đến hai chữ số thập phân
    const roundedMagnitude = magnitude_a_minus_b.toFixed(2);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\widehat(\\vec{a}, \\vec{b}) = ${angle_degrees}^{\\circ}$ và $|\\vec{a}| = ${a_magnitude}; |\\vec{b}| = ${b_magnitude}$. Khi đó $|\\vec{a} - \\vec{b}|$ có giá trị bằng bao nhiêu? (Làm tròn $2$ chữ số thập phân)
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Giá trị của $|\\vec{a} - \\vec{b}|$ là $${roundedMagnitude}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${roundedMagnitude}$}
    \\loigiai{
        Sử dụng định lý cosine để tính độ dài của vector $\\vec{a} - \\vec{b}$:\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{|\\vec{a}|^2 + |\\vec{b}|^2 - 2|\\vec{a}||\\vec{b}|\\cos(\\theta)}$\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{${a_magnitude}^2 + ${b_magnitude}^2 - 2 \\cdot ${a_magnitude} \\cdot ${b_magnitude} \\cdot ${cosThetaLatex}}$\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{${Math.pow(a_magnitude, 2)} + ${Math.pow(b_magnitude, 2)} - 2 \\cdot ${a_magnitude} \\cdot ${b_magnitude} \\cdot ${cosThetaLatex}}$\\\\
        $|\\vec{a} - \\vec{b}| = ${roundedMagnitude}$\\\\
        Vậy giá trị của $|\\vec{a} - \\vec{b}|$ là $${roundedMagnitude}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_vecB_bang_k_vecA(ax, ay, az, scaleFactor) {
    // Tính toán các thành phần của vector b
    const bx = scaleFactor * ax;
    const by = scaleFactor * ay;
    const bz = scaleFactor * az;

    // Tính tổng ba tọa độ của vector b
    const sumOfCoordinates = bx + by + bz;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\vec{a} = (${ax}; ${ay}; ${az})$. Biết hai vector $\\vec{a}$ và $\\vec{b}$ cùng hướng và $|\\vec{b}| = ${scaleFactor}|\\vec{a}|$. Khi đó tọa độ vector $\\vec{b}$ là gì và tổng các tọa độ của nó bằng bao nhiêu?
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ vector $\\vec{b}$ là $(${bx}; ${by}; ${bz})$ và tổng các tọa độ là $${sumOfCoordinates}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sumOfCoordinates}$}
    \\loigiai{
        Ta có $\\vec{b} = k\\vec{a}$ với $k = ${scaleFactor}$.\\\\
        $\\vec{b} = ${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx}; ${by}; ${bz})$.\\\\
        Vậy tọa độ vectơ $\\vec{b}$ là $(${bx}; ${by}; ${bz})$.\\\\
        Tổng các tọa độ của vectơ $\\vec{b}$ là $${bx} + ${by} + ${bz} = ${sumOfCoordinates}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_vecB_cungphuong_vecA(ax, ay, az, scaleFactor) {
    // Tính toán các thành phần của vector b khi k > 0
    const bx1 = scaleFactor * ax;
    const by1 = scaleFactor * ay;
    const bz1 = scaleFactor * az;

    // Tính toán các thành phần của vector b khi k < 0
    const bx2 = -scaleFactor * ax;
    const by2 = -scaleFactor * ay;
    const bz2 = -scaleFactor * az;

    // Tính tổng bình phương của các tọa độ của vector b trong cả hai trường hợp
    const sumOfSquares1 = bx1 * bx1 + by1 * by1 + bz1 * bz1;
    const sumOfSquares2 = bx2 * bx2 + by2 * by2 + bz2 * bz2;
    const kq = sumOfSquares1 +sumOfSquares2
    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\vec{a} = (${ax}; ${ay}; ${az})$. Biết hai vector $\\vec{a}$ và $\\vec{b}$ cùng phương và $|\\vec{b}| = ${scaleFactor}|\\vec{a}|$. Khi đó tổng bình phương các tọa độ của vector $\\vec{b}$ bằng bao nhiêu?
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Trong trường hợp $k > 0$: tổng bình phương các tọa độ của vector $\\vec{b}$ là $${sumOfSquares1}$.\\
        Trong trường hợp $k < 0$: tổng bình phương các tọa độ của vector $\\vec{b}$ là $${sumOfSquares2}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${kq}$}
    \\loigiai{
        Ta có $\\vec{b} = k\\vec{a}$ với $k = \\pm ${scaleFactor}$.\\\\
        Trong trường hợp $k > 0$:\\\\
        $\\vec{b} = ${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx1}; ${by1}; ${bz1})$.\\\\
        Tổng bình phương các tọa độ của vector $\\vec{b}$ là $${bx1}^2 + ${by1}^2 + ${bz1}^2 = ${sumOfSquares1}$.\\\\
        Trong trường hợp $k < 0$:\\\\
        $\\vec{b} = -${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx2}; ${by2}; ${bz2})$.\\\\
        Tổng bình phương các tọa độ của vector $\\vec{b}$ là $${bx2}^2 + ${by2}^2 + ${bz2}^2 = ${sumOfSquares2}$.\\\\
        Suy ra tổng bình phương các tọa độ của vector $\\vec{b}$ trong từng trường hợp là:\\\\
        \\begin{itemize}
            \\item Trường hợp $k > 0$: $${sumOfSquares1}$
            \\item Trường hợp $k < 0$: $${sumOfSquares2}$
        \\end{itemize}
        Vậy tổng bình phương các tọa độ của vector $\\vec{b}=${kq}$. 
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
 // Hàm tính giá trị m để tam giác vuông tại N
 function tim_m_tamgiacvuong(Mx, My, Mz, Nx, Ny, Nz, Px,a, Pz) {
    // Tính các vector NM và NP
    const NMx = Mx - Nx;
    const NMy = My - Ny;
    const NMz = Mz - Nz;
    const NPx = Px - Nx;
    const NPz = Pz - Nz;
    const Nya = a-Ny;

    // Biểu thức của Py - Ny
    const NPy_expr = `m + ${Nya}`;

    // Tính tích vô hướng của NM và NP
    const dotProduct_expr = `${NMx} * ${NPx} + ${NMy} * (${NPy_expr}) + ${NMz} * ${NPz}`;
    
    // Chuyển vế để tìm m
    const leftSideSimplified = math.simplify(`${NMx} * ${NPx} + ${NMz} * ${NPz}`).toString();
    const rightSideSimplified = math.simplify(`-${NMy}`).toString();
    
    // Giải phương trình cho m
    let mValue = math.evaluate(`${leftSideSimplified} / ${rightSideSimplified} + ${Nya}`);
    // Giải phương trình cho m
    //let mValue = math.evaluate(`${leftSideSimplified} / ${rightSideSimplified} + ${Ny} - ${a}`);
    mValue = parseFloat(mValue.toFixed(2)); // Làm tròn đến 2 chữ số thập phân
    if (mValue % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        mValue = Math.round(mValue);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; m+${a}; ${Pz})$. 
        Tìm $m$ để tam giác $MNP$ vuông tại $N$, làm tròn $2$ chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Giá trị của $m$ để tam giác $MNP$ vuông tại $N$ là $${mValue}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${mValue}$}
\\loigiai{
    Ta có vector $\\overrightarrow{NM} = (${NMx}; ${NMy}; ${NMz})$ và $\\overrightarrow{NP} = (${NPx}; m + ${a}- ${Ny}; ${NPz})$.\\\\
    Tích vô hướng của $\\overrightarrow{NM}$ và $\\overrightarrow{NP}$ là:
    \\[
        (${NMx})(${NPx}) + (${NMy})(m + ${Nya}) + (${NMz})(${NPz}) = 0
    \\]
    Giải phương trình này, ta được:
    \\[
        m = \\dfrac{${leftSideSimplified}}{${rightSideSimplified}} + ${Nya}
    \\]
    Vậy giá trị của $m$ để tam giác $MNP$ vuông tại $N$ là $${mValue}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tim_M_trenOX_tgvuong(Ax, Ay, Az, Bx, By, Bz) {
    // Tính các tọa độ của vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;

    // Biểu thức của tọa độ Mx
    const AMx_expr = `Mx - ${Ax}`;
    const AMy = -Ay;
    const AMz = -Az;

    // Tích vô hướng của vector AM và AB
    const dotProduct_expr = `${AMx_expr} * ${ABx} + ${AMy} * ${ABy} + ${AMz} * ${ABz}`;

    // Chuyển đổi biểu thức thành phương trình đại số
    const equation = math.parse(dotProduct_expr);
    const solvedEquation = math.simplify(equation).toString();
    
    // Tách vế trái và vế phải
    const parts = solvedEquation.split('=');
    const leftSide = parts[0].trim();
    const rightSide = parts.length > 1 ? parts[1].trim() : '0';

    // Chuyển vế để tìm Mx
    const leftSideSimplified = math.simplify(`${ABx}`);
    const rightSideSimplified = math.simplify(`-${ABy} * ${AMy} - ${ABz} * ${AMz}`);
    let MxValue = math.evaluate(`${rightSideSimplified} / ${leftSideSimplified} + ${Ax}`);
    MxValue = parseFloat(MxValue.toFixed(1)); // Làm tròn đến 1 chữ số thập phân
    if (MxValue % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        MxValue = Math.round(MxValue);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm hoành độ của điểm $M$ trên $Ox$ sao cho tam giác $ABM$ vuông tại $A$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$ làm tròn một chữu số thập phân (nếu có).
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${MxValue}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AM} = (Mx - ${Ax}; -${Ay}; -${Az})$.\\\\
        Tích vô hướng của $\\overrightarrow{AM}$ và $\\overrightarrow{AB}$ là:
        \\[
            (Mx - ${Ax})(${ABx}) + (-${Ay})(${ABy}) + (-${Az})(${ABz}) = 0
        \\]
        Giải phương trình này, ta được:
        \\[
            Mx = \\frac{${rightSideSimplified}}{${leftSideSimplified}} + ${Ax} = ${MxValue}
        \\]
        Vậy tọa độ điểm $M$ trên $Ox$ sao cho tam giác $ABM$ vuông tại $A$ là $(${MxValue}; 0; 0)$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhDienTichTamGiac(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;

    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính diện tích tam giác $ABC$, làm tròn một chữu số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $ABC$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${area}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AC} = (${ACx}; ${ACy}; ${ACz})$.\\\\
        Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
        \\[
            [\\overrightarrow{AB},\\overrightarrow{AC}] = (${crossProductX}; ${crossProductY}; ${crossProductZ})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{${crossProductX}^2 + ${crossProductY}^2 + ${crossProductZ}^2} = ${crossProductLength}
        \\]
        Diện tích tam giác $ABC$ là:
        \\[
            \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
        \\]
        Vậy diện tích tam giác $ABC$ là $${area}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính đường cao AH từ đỉnh A đến cạnh BC
function tinhDuongCaoAH(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;
    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );
    // Tính độ dài cạnh BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;
    const BC_length = Math.sqrt(BCx * BCx + BCy * BCy + BCz * BCz).toFixed(3);;
    if (BC_length % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        BC_length = Math.round(BC_length);
    }

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(3); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tính đường cao AH
    let AH = (2 * area / BC_length).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (AH % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        AH = Math.round(AH);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính đường cao $AH$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Đường cao $AH$ là $${AH}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${AH}$}
\\loigiai{
    Ta có các vector $\\overrightarrow{AB} = (${Bx - Ax}; ${By - Ay}; ${Bz - Az})$ và $\\overrightarrow{AC} = (${Cx - Ax}; ${Cy - Ay}; ${Cz - Az})$.\\\\
    Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
    \\[
        [\\overrightarrow{AB},\\overrightarrow{AC}] = (${ABx * ACy - ABy * ACx}; ${ABz * ACx - ABx * ACz}; ${ABx * ACz - ABz * ACx})
    \\]
    Độ dài của tích có hướng là:
    \\[
        |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{(${ABx * ACy - ABy * ACx})^2 + (${ABz * ACx - ABx * ACz})^2 + (${ABx * ACz - ABz * ACx})^2} = ${crossProductLength}
    \\]
    Diện tích tam giác $ABC$ là:
    \\[
        \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
    \\]
    Độ dài cạnh $BC$ là:
    \\[
        BC = \\sqrt{(${BCx})^2 + (${BCy})^2 + (${BCz})^2} = ${BC_length}
    \\]
    Đường cao $AH$ từ đỉnh $A$ xuống cạnh $BC$ là:
    \\[
        AH = \\dfrac{2 \\times ${area}}{BC} = ${AH}
    \\]
    Vậy đường cao $AH$ là $${AH}$.
}
\\end{ex}
    `;
    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhDienTichHBH(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;

    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(3); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }
    const areahbh = (crossProductLength).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (areahbh % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        areahbh = Math.round(areahbh);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình bình hành $ABCD$ biết $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính diện tích hình bình hành $ABCD$, làm tròn một chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $ABC$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${area}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AC} = (${ACx}; ${ACy}; ${ACz})$.\\\\
        Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
        \\[
            [\\overrightarrow{AB},\\overrightarrow{AC}] = (${crossProductX}; ${crossProductY}; ${crossProductZ})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{${crossProductX}^2 + ${crossProductY}^2 + ${crossProductZ}^2} = ${crossProductLength}
        \\]
        Diện tích tam giác $ABC$ là:
        \\[
            \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
        \\]
        Ta được diện tích tam giác $ABC$ là $${area}$.\\\\
        Vậy diện tích hình bình hành $ABCD$ là $S_{ABCD}=2S_{ABC}=${areahbh}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhTheTichTuDien(Ox, Oy, Oz, Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector từ gốc tọa độ đến các điểm
    const vectorOA = [Ax - Ox, Ay - Oy, Az - Oz];
    const vectorOB = [Bx - Ox, By - Oy, Bz - Oz];
    const vectorOC = [Cx - Ox, Cy - Oy, Cz - Oz];

    // Tính tích chéo của vector OB và OC
    const crossProductX = vectorOB[1] * vectorOC[2] - vectorOB[2] * vectorOC[1];
    const crossProductY = vectorOB[2] * vectorOC[0] - vectorOB[0] * vectorOC[2];
    const crossProductZ = vectorOB[0] * vectorOC[1] - vectorOB[1] * vectorOC[0];

    // Tính tích vô hướng của vector OA và tích chéo
    const dotProduct = vectorOA[0] * crossProductX + vectorOA[1] * crossProductY + vectorOA[2] * crossProductZ;

    // Tính thể tích của tứ diện
    const volume = Math.abs(dotProduct) / 6;

    // Làm tròn thể tích đến 1 chữ số thập phân
    let roundedVolume = parseFloat(volume.toFixed(1));

    // Nếu là số nguyên, bỏ phần thập phân
    if (roundedVolume % 1 === 0) {
        roundedVolume = Math.round(roundedVolume);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tứ diện $O.ABC$ biết $O(${Ox}, ${Oy}, ${Oz})$, $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. 
        Tính thể tích của tứ diện $O.ABC$, làm tròn đến một chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Thể tích của tứ diện $O.ABC$ là $${roundedVolume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${roundedVolume}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{OA} = (${vectorOA[0]}, ${vectorOA[1]}, ${vectorOA[2]})$, $\\overrightarrow{OB} = (${vectorOB[0]}, ${vectorOB[1]}, ${vectorOB[2]})$ và $\\overrightarrow{OC} = (${vectorOC[0]}, ${vectorOC[1]}, ${vectorOC[2]}).\\\\
        Tích có hướng của $\\overrightarrow{OB}$ và $\\overrightarrow{OC}$ là:
        \\[
            \\overrightarrow{OB} \\times \\overrightarrow{OC} = (${crossProductX}, ${crossProductY}, ${crossProductZ})
        \\]
        Tích vô hướng của $\\overrightarrow{OA}$ và tích có hướng là:
        \\[
            \\overrightarrow{OA} \\cdot (\\overrightarrow{OB} \\times \\overrightarrow{OC}) = ${dotProduct}
        \\]
        Thể tích của tứ diện $O.ABC$ là:
        \\[
            V = \\dfrac{1}{6} \\left| \\overrightarrow{OA} \\cdot (\\overrightarrow{OB} \\times \\overrightarrow{OC}) \\right| = ${volume.toFixed(3)}
        \\]
        Làm tròn đến một chữ số thập phân, ta được:
        \\[
            V = ${roundedVolume}
        \\]
    }
\\end{ex}
    `;

    return latexOutput;
}
function tinhDuongCaoTuDien(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) {
    const vectorAB = [Bx - Ax, By - Ay, Bz - Az];
    const vectorAC = [Cx - Ax, Cy - Ay, Cz - Az];
    const vectorAD = [Dx - Ax, Dy - Ay, Dz - Az];
    const vectorBC = [Cx - Bx, Cy - By, Cz - Bz];
    const vectorBD = [Dx - Bx, Dy - By, Dz - Bz];

    // Tính tích có hướng của vector BC và BD
    const crossProduct = math.cross(vectorBC, vectorBD);
    const crossProductLength = Math.sqrt(
        crossProduct[0] * crossProduct[0] +
        crossProduct[1] * crossProduct[1] +
        crossProduct[2] * crossProduct[2]
    );

    // Tính tích hỗn tạp [AB, AC, AD]
    const dotProduct = math.dot(vectorAB, math.cross(vectorAC, vectorAD));
    const volume = (Math.abs(dotProduct) / 6).toFixed(2);;

    // Tính diện tích tam giác BCD
    const areaBCD = (crossProductLength / 2).toFixed(2);;

    // Tính đường cao từ đỉnh A đến mặt phẳng BCD
    const height = (6 * volume / crossProductLength).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tứ diện $ABCD$ với các tọa độ $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$, $D(${Dx}, ${Dy}, ${Dz})$. 
        Tính độ dài đường cao từ đỉnh $A$ đến mặt phẳng $BCD$, làm tròn đến một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Đường cao từ đỉnh $A$ đến mặt phẳng $BCD$ là $${height}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{${height}}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${Bx - Ax}, ${By - Ay}, ${Bz - Az})$, $\\overrightarrow{AC} = (${Cx - Ax}, ${Cy - Ay}, ${Cz - Az})$ và $\\overrightarrow{AD} = (${Dx - Ax}, ${Dy - Ay}, ${Dz - Az})$.\\\\
        Vector $\\overrightarrow{BC} = (${Cx - Bx}, ${Cy - By}, ${Cz - Bz})$ và $\\overrightarrow{BD} = (${Dx - Bx}, ${Dy - By}, ${Dz - Bz})$.\\\\
        Tích có hướng của $\\overrightarrow{BC}$ và $\\overrightarrow{BD}$ là:
        \\[
            [\\overrightarrow{BC},\\overrightarrow{BD}] = (${crossProduct[0]}, ${crossProduct[1]}, ${crossProduct[2]})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{BC},\\overrightarrow{BD}]| = \\sqrt{${Math.pow(crossProduct[0], 2)} + ${Math.pow(crossProduct[1], 2)} + ${Math.pow(crossProduct[2], 2)}} = ${crossProductLength}
        \\]
        Tích hỗn tạp $[\\overrightarrow{AB}, \\overrightarrow{AC}]\\overrightarrow{AD}$ là:
        \\[
            [\\overrightarrow{BC},\\overrightarrow{BD}]\\overrightarrow{BA} = ${dotProduct}
        \\]
        Thể tích của tứ diện $ABCD$ là:
        \\[
            V = \\dfrac{1}{6} |[\\overrightarrow{BC},\\overrightarrow{BD}]\\overrightarrow{BA}| = ${volume}
        \\]
        Diện tích tam giác $BCD$ là:
        \\[
            S_{BCD} = \\dfrac{1}{2} |[\\overrightarrow{BC}, \\overrightarrow{BD}]| = ${areaBCD}
        \\]
        Đường cao từ đỉnh $A$ đến mặt phẳng $BCD$ là:
        \\[
            h = \\dfrac{3V_{ABCD}}{S_{BCD}} = ${height}
        \\]
    }
\\end{ex}
    `;

    return latexOutput;
}
function tim_m_3vecto_dphang(a1, a2, a3, b1, b2, b3, thamso, c2, c3) {
    // Tính hệ số của m
    const coefficient = -(a2 * (-b3) - a3 * b2);

    // Tính các hằng số còn lại
    const constantTerm = a1 * (b2 * c3 - b3 * c2) + a2 * (b1 * c3) - a3 * (b1 * c2);

    // Giải phương trình bậc nhất để tìm m
    const m_goc = (-constantTerm / coefficient);
    const m = (m_goc-thamso).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm $m$ để ba vector $\\vec{a} = (${a1}, ${a2}, ${a3})$, $\\vec{b} = (${b1}, ${b2}, ${b3})$, $\\vec{c} = (m+${thamso}, ${c2}, ${c3})$ đồng phẳng.
    `;
    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${m}$}
    \\loigiai{
    }
\\end{ex}
    `;

    return latexOutput;
}
function tim_m_4_diem_dphang(xA, yA, zA, xB, yB, zB, xC, yC, zC, thamso, yD, zD) {
    // Tạo các vector AB, AC
    const AB = [xB - xA, yB - yA, zB - zA];
    const AC = [xC - xA, yC - yA, zC - zA];
    
    // Tính tích có hướng của AB và AC
    const crossProduct = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];
    
    // Tính giá trị vô hướng với vector AD
    const VP = (yD - yA) * crossProduct[1] + (zD - zA) * crossProduct[2]; 
    
    // Giải phương trình bậc nhất để tìm m
    const m_goc = (-VP / crossProduct[0]) + xA;
    const m = (m_goc - thamso).toFixed(1);
    if (m % 1 === 0) {
        m = Math.round(m);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm $m$ để bốn điểm $A(${xA},${yA},${zA})$, $B(${xB}, ${yB}, ${zB})$, $C(${xC}, ${yC}, ${zC})$, $D(m + ${thamso}, ${yD}, ${zD})$ đồng phẳng, làm tròn một chữ số thập phân.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${m}$}
    \\loigiai{
    }
\\end{ex}
    `;

    return latexOutput;
}
function timTrucTam(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector AB, AC
    const AB = [Bx - Ax, By - Ay, Bz - Az];
    const AC = [Cx - Ax, Cy - Ay, Cz - Az];
    const BC = [Cx - Bx, Cy - By, Cz - Bz];

    // Tính tích có hướng của AB và AC để tìm vector pháp tuyến của mặt phẳng chứa tam giác ABC
    const normalABC = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    // Phương trình mặt phẳng ABC: normalABC[0] * x + normalABC[1] * y + normalABC[2] * z = dABC
    const dABC = normalABC[0] * Ax + normalABC[1] * Ay + normalABC[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng qua A vuông góc với BC
    const normalA = BC;

    // Phương trình mặt phẳng qua A vuông góc với BC: normalA[0] * x + normalA[1] * y + normalA[2] * z = dA
    const dA = normalA[0] * Ax + normalA[1] * Ay + normalA[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng qua B vuông góc với AC
    const normalB = AC;

    // Phương trình mặt phẳng qua B vuông góc với AC: normalB[0] * x + normalB[1] * y + normalB[2] * z = dB
    const dB = normalB[0] * Bx + normalB[1] * By + normalB[2] * Bz;

    // Giải hệ phương trình để tìm tọa độ trực tâm H
    const A = [
        [normalABC[0], normalABC[1], normalABC[2]],
        [normalA[0], normalA[1], normalA[2]],
        [normalB[0], normalB[1], normalB[2]]
    ];
    const B = [dABC, dA, dB];

    // Sử dụng phương pháp Gauss để giải hệ phương trình tuyến tính
    const H = gaussJordanElimination(A, B);
    let sum_H=(H[0]+H[1]+H[2]).toFixed(1);
    if (sum_H % 1 === 0) {
        sum_H = Math.round(sum_H);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của trực tâm $H$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tính vector pháp tuyến của mặt phẳng chứa tam giác $\\triangle ABC$:
        \\[
            \\overrightarrow{n_{ABC}} = \\overrightarrow{AB} \\times \\overrightarrow{AC} = (${normalABC[0]}, ${normalABC[1]}, ${normalABC[2]})
        \\]
        Phương trình mặt phẳng $ABC$ là:
        \\[
            ${normalABC[0]}x + ${normalABC[1]}y + ${normalABC[2]}z = ${dABC}.
        \\]
        Phương trình mặt phẳng qua $A$ vuông góc với $BC$ là:
        \\[
            ${normalA[0]}x + ${normalA[1]}y + ${normalA[2]}z = ${dA}.
        \\]
        Phương trình mặt phẳng qua $B$ vuông góc với $AC$ là:
        \\[
            ${normalB[0]}x + ${normalB[1]}y + ${normalB[2]}z = ${dB}.
        \\]
        Giải hệ phương trình ta được tọa độ trực tâm $H$ là:
        \\[
            H(${H[0].toFixed(2)}, ${H[1].toFixed(2)}, ${H[2].toFixed(2)})
        \\]
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sum_H}$}
    \\loigiai{
        ${answerStatement.trim()}
    }
\\end{ex}
    `;

    return latexOutput;
}

function gaussJordanElimination(A, B) {
    const n = A.length;
    const augmentedMatrix = A.map((row, i) => [...row, B[i]]);

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
                maxRow = k;
            }
        }

        [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];

        for (let k = i + 1; k < n; k++) {
            const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
            for (let j = i; j < n + 1; j++) {
                if (i === j) {
                    augmentedMatrix[k][j] = 0;
                } else {
                    augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
                }
            }
        }
    }

    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        x[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
        for (let k = i - 1; k >= 0; k--) {
            augmentedMatrix[k][n] -= augmentedMatrix[k][i] * x[i];
        }
    }

    return x;
}
// Hàm tính chân đường cao từ đỉnh A đến cạnh BC
function tinhChanDuongCao(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính vector BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;

    // Tọa độ điểm H theo phương trình parametric
    const t = ((Ax - Bx) * BCx + (Ay - By) * BCy + (Az - Bz) * BCz) / (BCx * BCx + BCy * BCy + BCz * BCz);

    const Hx = Bx + t * BCx;
    const Hy = By + t * BCy;
    const Hz = Bz + t * BCz;

    // Tính tổng các tọa độ của điểm H
    const totalH = (Hx + Hy + Hz).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Tính tổng các toạ độ của chân đường cao từ đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Chân đường cao từ đỉnh $A$ là $H(${Hx.toFixed(1)}; ${Hy.toFixed(1)}; ${Hz.toFixed(1)})$. Tổng các tọa độ của điểm H là $${totalH}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${totalH}$}
\\loigiai{
    Ta có vector $\\overrightarrow{BC} = (${BCx}; ${BCy}; ${BCz})$.\\\\
    Gọi $H(x; y; z)$ là chân đường cao từ $A$ kẻ đến $BC$, ta có: \\\\
    $\\overrightarrow{AH} = (x - ${Ax}; y - ${Ay}; z - ${Az})$.\\\\
    Cách này dùng công thức tính nhanh.\\\\
    Tọa độ $H$ thỏa mãn:
    \\[
        t = \\dfrac{(${Ax} - ${Bx}) \\cdot ${BCx} + (${Ay} - ${By}) \\cdot ${BCy} + (${Az} - ${Bz}) \\cdot ${BCz}}{${BCx}^2 + ${BCy}^2 + ${BCz}^2}
    \\]
    Từ đó tọa độ của $H$ là:
    \\[
        H(${Hx.toFixed(1)}; ${Hy.toFixed(1)}; ${Hz.toFixed(1)})
    \\]
    Tổng các tọa độ của điểm $H$ là:
    \\[
        ${Hx.toFixed(2)} + ${Hy.toFixed(2)} + ${Hz.toFixed(2)} = ${totalH}
    \\]
    Vậy chân đường cao từ đỉnh $A$ là $H(${Hx.toFixed(2)}; ${Hy.toFixed(2)}; ${Hz.toFixed(2)})$ và tổng các tọa độ là $${totalH}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính tổng các tọa độ của tâm đường tròn ngoại tiếp tam giác ABC
function tinhTamDuongTronNgoaiTiep(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector AB, AC
    const AB = [Bx - Ax, By - Ay, Bz - Az];
    const AC = [Cx - Ax, Cy - Ay, Cz - Az];
    const BC = [Cx - Bx, Cy - By, Cz - Bz];

    // Tính trung điểm của các cạnh AB và AC
    const midAB = [(Ax + Bx) / 2, (Ay + By) / 2, (Az + Bz) / 2];
    const midAC = [(Ax + Cx) / 2, (Ay + Cy) / 2, (Az + Cz) / 2];

    // Tính vector pháp tuyến của mặt phẳng chứa tam giác ABC
    const normalABC = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    // Phương trình mặt phẳng ABC: normalABC[0] * x + normalABC[1] * y + normalABC[2] * z = dABC
    const dABC = normalABC[0] * Ax + normalABC[1] * Ay + normalABC[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng vuông góc với AB tại trung điểm của AB
    const normalA = BC;

    // Phương trình mặt phẳng qua trung điểm AB vuông góc với BC: normalA[0] * x + normalA[1] * y + normalA[2] * z = dA
    const dA = normalA[0] * midAB[0] + normalA[1] * midAB[1] + normalA[2] * midAB[2];

    // Tính vector pháp tuyến của mặt phẳng vuông góc với AC tại trung điểm của AC
    const normalB = AB;

    // Phương trình mặt phẳng qua trung điểm AC vuông góc với AB: normalB[0] * x + normalB[1] * y + normalB[2] * z = dB
    const dB = normalB[0] * midAC[0] + normalB[1] * midAC[1] + normalB[2] * midAC[2];

    // Giải hệ phương trình để tìm tọa độ tâm đường tròn ngoại tiếp
    const A = [
        [normalABC[0], normalABC[1], normalABC[2]],
        [normalA[0], normalA[1], normalA[2]],
        [normalB[0], normalB[1], normalB[2]]
    ];
    const B = [dABC, dA, dB];

    // Sử dụng phương pháp Gauss để giải hệ phương trình tuyến tính
    const O = gaussJordanElimination(A, B);

    if (!O) {
        throw new Error("Error solving the system of equations: Matrix is singular or no solution found");
    }

    let sum_O = (O[0] + O[1] + O[2]).toFixed(1);
    if (sum_O % 1 === 0) {
        sum_O = Math.round(sum_O);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tính tổng các toạ độ của tâm đường tròn ngoại tiếp tam giác $ABC$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tính trung điểm của các cạnh $AB$ và $AC$: \\\\
        Trung điểm của $AB$: $M_{AB}(${midAB[0]}, ${midAB[1]}, ${midAB[2]})$ \\\\
        Trung điểm của $AC$: $M_{AC}(${midAC[0]}, ${midAC[1]}, ${midAC[2]})$ \\\\
        Tính vector pháp tuyến của mặt phẳng chứa tam giác $\\triangle ABC$: \\\\
        \\[
            \\overrightarrow{n_{ABC}} = \\overrightarrow{AB} \\times \\overrightarrow{AC} = (${normalABC[0]}, ${normalABC[1]}, ${normalABC[2]})
        \\] \\\\
        Phương trình mặt phẳng $ABC$ là: \\\\
        \\[
            ${normalABC[0]}x + ${normalABC[1]}y + ${normalABC[2]}z = ${dABC}
        \\] \\\\
        Phương trình mặt phẳng qua trung điểm $AB$ vuông góc với $BC$ là: \\\\
        \\[
            ${normalA[0]}x + ${normalA[1]}y + ${normalA[2]}z = ${dA}
        \\] \\\\
        Phương trình mặt phẳng qua trung điểm $AC$ vuông góc với $AB$ là: \\\\
        \\[
            ${normalB[0]}x + ${normalB[1]}y + ${normalB[2]}z = ${dB}
        \\] \\\\
        Giải hệ phương trình ta được tọa độ tâm đường tròn ngoại tiếp tam giác $ABC$ là: \\\\
        \\[
            O(${O[0].toFixed(2)}, ${O[1].toFixed(2)}, ${O[2].toFixed(2)})
        \\] \\\\
        Tổng các toạ độ của tâm đường tròn ngoại tiếp tam giác $ABC$ là $${sum_O}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_O}$}
\\loigiai{
    ${answerStatement.trim()}
}
\\end{ex}
    `;

    return latexOutput;
}
// Hàm tính chân đường phân giác trong đỉnh A
function tinhChanDuongPhanGiac(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);

    // Tính tọa độ chân đường phân giác
    const Px = (AC * Bx + AB * Cx) / (AB + AC);
    const Py = (AC * By + AB * Cy) / (AB + AC);
    const Pz = (AC * Bz + AB * Cz) / (AB + AC);

    // Tính tổng tọa độ của chân đường phân giác
    let sum_P = (Px + Py + Pz).toFixed(1);
    if (sum_P % 1 === 0) {
        sum_P = Math.round(sum_P);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của chân đường phân giác trong đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ chân đường phân giác trong đỉnh $A$ là $P(${Px.toFixed(1)}, ${Py.toFixed(1)}, ${Pz.toFixed(1)}).$ Tổng các toạ độ là $${sum_P}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_P}$}
\\loigiai{
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính chân đường phân giác ngoài từ đỉnh A
function tinhChanDuongPhanGiacNgoai(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);

    // Tính tọa độ chân đường phân giác ngoài
    const Px = (-AC * Bx + AB * Cx) / (AB - AC);
    const Py = (-AC * By + AB * Cy) / (AB - AC);
    const Pz = (-AC * Bz + AB * Cz) / (AB - AC);

    // Tính tổng tọa độ của chân đường phân giác
    let sum_P = (Px + Py + Pz).toFixed(1);
    if (sum_P % 1 === 0) {
        sum_P = Math.round(sum_P);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của chân đường phân giác ngoài từ đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ chân đường phân giác ngoài từ đỉnh $A$ là $P(${Px.toFixed(1)}, ${Py.toFixed(1)}, ${Pz.toFixed(1)}).$ Tổng các toạ độ là $${sum_P}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_P}$}
\\loigiai{
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính tâm đường tròn nội tiếp tam giác ABC
function tinhTamDuongTronNoiTiep(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC, BC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);
    const BC = Math.sqrt((Cx - Bx) ** 2 + (Cy - By) ** 2 + (Cz - Bz) ** 2);

    // Tính tọa độ tâm đường tròn nội tiếp
    const Ix = (BC * Ax + AC * Bx + AB * Cx) / (AB + AC + BC);
    const Iy = (BC * Ay + AC * By + AB * Cy) / (AB + AC + BC);
    const Iz = (BC * Az + AC * Bz + AB * Cz) / (AB + AC + BC);

    // Tính tổng tọa độ của tâm đường tròn nội tiếp
    let sum_I = (Ix + Iy + Iz).toFixed(1);
    if (sum_I % 1 === 0) {
        sum_I = Math.round(sum_I);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tính tổng các toạ độ của tâm đường tròn nội tiếp tam giác $ABC$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ tâm đường tròn nội tiếp tam giác $ABC$ là $I(${Ix.toFixed(1)}, ${Iy.toFixed(1)}, ${Iz.toFixed(1)}).$ Tổng các toạ độ là $${sum_I}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_I}$}
\\loigiai{
    Ta có độ dài các cạnh $AB$, $AC$, $BC$ lần lượt là:
    \\[
        AB = \\sqrt{(${Bx} - ${Ax})^2 + (${By} - ${Ay})^2 + (${Bz} - ${Az})^2} = ${AB.toFixed(2)}
    \\]
    \\[
        AC = \\sqrt{(${Cx} - ${Ax})^2 + (${Cy} - ${Ay})^2 + (${Cz} - ${Az})^2} = ${AC.toFixed(2)}
    \\]
    \\[
        BC = \\sqrt{(${Cx} - ${Bx})^2 + (${Cy} - ${By})^2 + (${Cz} - ${Bz})^2} = ${BC.toFixed(2)}
    \\]
    Tọa độ tâm đường tròn nội tiếp tam giác $ABC$ là:
    \\[
        I(${Ix.toFixed(2)}, ${Iy.toFixed(2)}, ${Iz.toFixed(2)})
    \\]
    Vậy tổng các toạ độ của tâm đường tròn nội tiếp tam giác $ABC$ là $${sum_I}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
///NHÓM MIN MAX
// Hàm tính tọa độ điểm M sao cho k * AM^2 + BM^2 + MC^2 đạt giá trị nhỏ nhất
function Tim_M_min(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, k) {
    // Tạo các biến cần thiết
    const A = [
        [2 * (1 + k + 1), 0, 0],
        [0, 2 * (1 + k + 1), 0],
        [0, 0, 2 * (1 + k + 1)]
    ];
    const B = [
        -2 * (Ax + k * Bx + Cx),
        -2 * (Ay + k * By + Cy),
        -2 * (Az + k * Bz + Cz)
    ];

    // Giải hệ phương trình bằng phương pháp Gauss
    const M = gaussJordanElimination(A, B);

    const Mx = M[0];
    const My = M[1];
    const Mz = M[2];

    // Tính tổng các tọa độ của điểm M
    let sum_M = (Mx + My + Mz).toFixed(1);
    if (sum_M % 1 === 0) {
        sum_M = Math.round(sum_M);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho các điểm $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. 
        Tìm tọa độ điểm $M$ sao cho $${k}AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất. Tính tổng các tọa độ của $M$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $M$ sao cho $k \\cdot AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất là $M(${Mx.toFixed(1)}, ${My.toFixed(1)}, ${Mz.toFixed(1)}).$ 
        Tổng các tọa độ là $${sum_M}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_M}$}
\\loigiai{
    Tọa độ điểm $M$ sao cho $k \\cdot AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất là $M(${Mx.toFixed(1)}, ${My.toFixed(1)}, ${Mz.toFixed(1)}).$ 
    Tổng các tọa độ là $${sum_M}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}


///PTMP
// Hàm tính diện tích tam giác ABC
function mp_diem_vtpt(Ax, Ay, Az, nx, ny, nz) {
    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với các trục tọa độ
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;
    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;
    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị có hợp lệ không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính độ dài các cạnh MN, NP, PM
    const MN = Math.sqrt(Mx ** 2 + Ny ** 2 + 0 ** 2);
    const NP = Math.sqrt(Ny ** 2 + Pz ** 2 + 0 ** 2);
    const PM = Math.sqrt(Pz ** 2 + Mx ** 2 + 0 ** 2);

    // Tính diện tích tam giác bằng công thức Heron
    const p = (MN + NP + PM) / 2;
    let area = Math.sqrt(p * (p - MN) * (p - NP) * (p - PM));
    area = area.toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và có $\\vec{n}=(${nx}; ${ny}; ${nz})$. 
        Biết $(P)$ cắt $3$ trục tọa độ tại $3$ điểm $M$, $N$, $P$, diện tích tam giác $MNP$ bằng bao nhiêu? 
        Làm tròn $1$ chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $MNP$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${area}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng: $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của $(P)$ với các trục tọa độ là: \\\\
    $M = \\left( \\dfrac{-${D}}{${nx}}, 0, 0 \\right)$, $N = \\left( 0, \\dfrac{-${D}}{${ny}}, 0 \\right)$, $P = \\left( 0, 0, \\dfrac{-${D}}{${nz}} \\right)$.\\\\
    Độ dài các cạnh của tam giác: \\\\
    $MN = \\sqrt{\\left(\\dfrac{-${D}}{${nx}}\\right)^2 + \\left(\\dfrac{-${D}}{${ny}}\\right)^2} = ${MN.toFixed(2)}$,\\\\
    $NP = \\sqrt{\\left(\\dfrac{-${D}}{${ny}}\\right)^2 + \\left(\\dfrac{-${D}}{${nz}}\\right)^2} = ${NP.toFixed(2)}$,\\\\
    $PM = \\sqrt{\\left(\\dfrac{-${D}}{${nz}}\\right)^2 + \\left(\\dfrac{-${D}}{${nx}}\\right)^2} = ${PM.toFixed(2)}$.\\\\
    Diện tích tam giác $MNP$ được tính theo công thức Heron: \\\\
    $S = \\sqrt{p(p - MN)(p - NP)(p - PM)} = ${area}$.\\\\
    Vậy diện tích tam giác $MNP$ là $${area}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quadiem_songsong(Ax, Ay, Az, nx, ny, nz, axis) {
    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);
    const tudo = nx * Ax + ny * Az
    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và song song mặt phẳng $(P)\colon ${nx}x+${ny}+${nz}+${tudo}=0$. Biết $(P)$ cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng $(P)$ với trục $${axisLabel}$ là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quaA_vuonggocmn(Ax, Ay, Az, Mx, My, Mz, Nx, Ny, Nz, axis) {
    // Tính vector pháp tuyến bằng tích có hướng của vector MN
    const nx = Mx - Nx;
    const ny = My - Ny;
    const nz = Mz - Nz;

    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và vuông góc với đoạn thẳng $MN$ với $M(${Mx}; ${My}; ${Mz})$ và $N(${Nx}; ${Ny}; ${Nz})$. Biết $(P)$ cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_trungtruc(Ax, Ay, Az, Bx, By, Bz, axis) {
    // Tính trung điểm của đoạn thẳng AB
    const Mx = (Ax + Bx) / 2;
    const My = (Ay + By) / 2;
    const Mz = (Az + Bz) / 2;

    // Vector pháp tuyến của trung trực là vector AB
    const nx = Bx - Ax;
    const ny = By - Ay;
    const nz = Bz - Az;

    // Phương trình mặt phẳng trung trực (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng trung trực của đoạn thẳng $AB$ với $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$. Biết trung trực cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của trung trực với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng trung trực của đoạn thẳng $AB$ với $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của trung trực với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_vuonggoc_AB_taiA(Ax, Ay, Az, Bx, By, Bz, axis) {
    // Vector pháp tuyến của mặt phẳng là vector AB
    const nx = Bx - Ax;
    const ny = By - Ay;
    const nz = Bz - Az;

    // Phương trình mặt phẳng vuông góc với AB tại A: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng vuông góc với đoạn thẳng $AB$ tại $A(${Ax}; ${Ay}; ${Az})$ với $B(${Bx}; ${By}; ${Bz})$. Biết mặt phẳng này cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng vuông góc với đoạn thẳng $AB$ tại điểm $A$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng vuông góc với đoạn thẳng $AB$ tại điểm $A(${Ax}; ${Ay}; ${Az})$ với $B(${Bx}; ${By}; ${Bz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
///Nhóm dùng tích có hướng
function mp_quaMNP(Mx, My, Mz, Nx, Ny, Nz, Px, Py, Pz) {
    // Vector MN và MP
    const MNx = Nx - Mx;
    const MNy = Ny - My;
    const MNz = Nz - Mz;
    
    const MPx = Px - Mx;
    const MPy = Py - My;
    const MPz = Pz - Mz;

    // Vector pháp tuyến của mặt phẳng (tích có hướng của MN và MP)
    const nx = MNy * MPz - MNz * MPy;
    const ny = MNz * MPx - MNx * MPz;
    const nz = MNx * MPy - MNy * MPx;

    // Phương trình mặt phẳng (P): nx * x + ny * y + nz * z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Ax = nx !== 0 ? -D / nx : NaN;
    const Ay = 0;
    const Az = 0;

    const Bx = 0;
    const By = ny !== 0 ? -D / ny : NaN;
    const Bz = 0;

    const Cx = 0;
    const Cy = 0;
    const Cz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Ax) || isNaN(By) || isNaN(Cz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện OABC
    let volume = Math.abs(Ax * By * Cz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }
    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; ${Py}; ${Pz})$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $A$, $B$, $C$. Tính thể tích tứ diện $OABC$ bằng bao nhiêu? 
        Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $OABC$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; ${Py}; ${Pz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $A(${Ax.toFixed(2)}; 0; 0)$, $B(0; ${By.toFixed(2)}; 0)$, $C(0; 0; ${Cz.toFixed(2)})$.\\\\
    Thể tích tứ diện $OABC$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_A \cdot y_B \cdot z_C| = ${volume}$.\\\\
    Vậy thể tích tứ diện $OABC$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_vuonggoc_2mp(Mx, My, Mz, nx1, ny1, nz1, nx2, ny2, nz2) {
    // Tính vector pháp tuyến của mặt phẳng mới (tích có hướng của vector pháp tuyến của (P) và (Q))
    const nx = ny1 * nz2 - nz1 * ny2;
    const ny = nz1 * nx2 - nx1 * nz2;
    const nz = nx1 * ny2 - ny1 * nx2;

    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Ax = nx !== 0 ? -D / nx : NaN;
    const Ay = 0;
    const Az = 0;

    const Bx = 0;
    const By = ny !== 0 ? -D / ny : NaN;
    const Bz = 0;

    const Cx = 0;
    const Cy = 0;
    const Cz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Ax) || isNaN(By) || isNaN(Cz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện OABC
    let volume = Math.abs(Ax * By * Cz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và vuông góc với hai mặt phẳng $(P)\colon ${nx1}x + ${ny1}y + ${nz1}z = 0$ và $(Q)\colon ${nx2}x + ${ny2}y + ${nz2}z + 1 = 0$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $A$, $B$, $C$. Tính thể tích tứ diện $OABC$ bằng bao nhiêu? Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $OABC$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và vuông góc với hai mặt phẳng $(P): ${nx1}x + ${ny1}y + ${nz1}z +${nx}= 0$ và $(Q): ${nx2}x + ${ny2}y + ${nz2}z + +${nz} = 0$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $A(${Ax.toFixed(2)}; 0; 0)$, $B(0; ${By.toFixed(2)}; 0)$, $C(0; 0; ${Cz.toFixed(2)})$.\\\\
    Thể tích tứ diện $OABC$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_A \cdot y_B \cdot z_C| = ${volume}$.\\\\
    Vậy thể tích tứ diện $OABC$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_qua_2_diem_song_song(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) {
    // Vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    
    // Vector CD
    const CDx = Dx - Cx;
    const CDy = Dy - Cy;
    const CDz = Dz - Cz;
    
    // Tính vector pháp tuyến của mặt phẳng (tích có hướng của vector AB và vector CD)
    const nx = ABy * CDz - ABz * CDy;
    const ny = ABz * CDx - ABx * CDz;
    const nz = ABx * CDy - ABy * CDx;

    // Phương trình mặt phẳng (P): nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;

    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;

    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện O.MNP
    let volume = Math.abs(Mx * Ny * Pz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và song song với đường thẳng đi qua hai điểm $C(${Cx}; ${Cy}; ${Cz})$ và $D(${Dx}; ${Dy}; ${Dz})$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $M$, $N$, $P$. Tính thể tích tứ diện $O.MNP$ bằng bao nhiêu? Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $O.MNP$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và song song với đường thẳng đi qua hai điểm $C(${Cx}; ${Cy}; ${Cz})$ và $D(${Dx}; ${Dy}; ${Dz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $M(${Mx.toFixed(2)}; 0; 0)$, $N(0; ${Ny.toFixed(2)}; 0)$, $P(0; 0; ${Pz.toFixed(2)})$.\\\\
    Thể tích tứ diện $O.MNP$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_M \cdot y_N \cdot z_P| = ${volume}$.\\\\
    Vậy thể tích tứ diện $O.MNP$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_qua_2_diem_vuonggoc_mp(Ax, Ay, Az, Bx, By, Bz, px, py, pz, Dp) {
    // Vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    
    // Vector pháp tuyến của mặt phẳng P
    const nx = px;
    const ny = py;
    const nz = pz;

    // Phương trình mặt phẳng mới (P'): nx*x + ny*y + nz*z + D = 0
    // Mặt phẳng mới (P') đi qua điểm A và vuông góc với mặt phẳng P
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;

    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;

    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính tọa độ trọng tâm G của tam giác MNP
    const Gx = (Mx + Nx + Px) / 3;
    const Gy = (My + Ny + Py) / 3;
    const Gz = (Mz + Nz + Pz) / 3;

    // Tính tổng tọa độ của trọng tâm G
    let sumG = (Gx + Gy + Gz).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (sumG % 1 === 0) {
        sumG = Math.round(sumG);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và vuông góc với mặt phẳng $(P)\\colon ${px}x + ${py}y + ${pz}z + ${Dp} = 0$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $M$, $N$, $P$. Tính tổng tọa độ của trọng tâm của tam giác $MNP$, (làm tròn $1$ chữ số thập phân.)
    `;
    const answerStatement = `
        Tổng tọa độ của trọng tâm của tam giác $MNP$ là $${sumG}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sumG}$}
\\loigiai{
    Phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và vuông góc với mặt phẳng $(P)\\colon ${px}x + ${py}y + ${pz}z + ${Dp} = 0$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $M(${Mx.toFixed(2)}; 0; 0)$, $N(0; ${Ny.toFixed(2)}; 0)$, $P(0; 0; ${Pz.toFixed(2)})$.\\\\
    Tọa độ trọng tâm $G$ của tam giác $MNP$ là:\\\\
    $G\\left(\\dfrac{${Mx.toFixed(2)}}{3}; \\dfrac{${Ny.toFixed(2)}}{3}; \\dfrac{${Pz.toFixed(2)}}{3}\\right)$.\\\\
    Tổng tọa độ của trọng tâm $G$ là $${sumG}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quaM_chua_truc(Mx, My, Mz, axis) {
    let nx = 0, ny = 0, nz = 0;
    if (axis === 1) { // Chứa trục Ox
        ny = 1; // Phương trình y = 0
        nz = 1; // Phương trình z = 0
    } else if (axis === 2) { // Chứa trục Oy
        nx = 1; // Phương trình x = 0
        nz = 1; // Phương trình z = 0
    } else if (axis === 3) { // Chứa trục Oz
        nx = 1; // Phương trình x = 0
        ny = 1; // Phương trình y = 0
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }

    // Phương trình mặt phẳng chứa trục và đi qua điểm M
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với hai trục còn lại
    let Qx, Qy, Qz, Py, Pz;
    if (axis === 1) { // Chứa trục Ox
        Qx = 0;
        Qy = ny !== 0 ? -D / ny : NaN;
        Qz = 0;

        Py = 0;
        Pz = nz !== 0 ? -D / nz : NaN;
    } else if (axis === 2) { // Chứa trục Oy
        Qx = nx !== 0 ? -D / nx : NaN;
        Qy = 0;
        Qz = 0;

        Py = 0;
        Pz = nz !== 0 ? -D / nz : NaN;
    } else if (axis === 3) { // Chứa trục Oz
        Qx = nx !== 0 ? -D / nx : NaN;
        Qy = 0;
        Qz = 0;

        Py = ny !== 0 ? -D / ny : NaN;
        Pz = 0;
    }

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Qx) || isNaN(Qy) || isNaN(Qz) || isNaN(Py) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính độ dài đoạn thẳng kết nối các điểm giao với hai trục còn lại
    let distance;
    if (axis === 1) {
        distance = Math.sqrt(Qy ** 2 + Pz ** 2);
    } else if (axis === 2) {
        distance = Math.sqrt(Qx ** 2 + Pz ** 2);
    } else if (axis === 3) {
        distance = Math.sqrt(Qx ** 2 + Py ** 2);
    }

    distance = distance.toFixed(1);
    if (distance % 1 === 0) {
        distance = Math.round(distance);
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và chứa trục ${axisLabel}. Biết mặt phẳng này cắt các trục còn lại tại các điểm $P$ và $Q$. Tính độ dài đoạn thẳng kết nối các điểm $P$ và $Q$, (làm tròn $1$ chữ số thập phân).
    `;
    const answerStatement = `
        Độ dài đoạn thẳng $PQ$ là $${distance}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${distance}$}
\\loigiai{
    Phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và chứa trục ${axisLabel} là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với trục ${axis === 1 ? "Oy" : axis === 2 ? "Ox" : "Ox"} là:\\\\
    ${axis === 1 ? `$P(0; ${Qy.toFixed(1)}; 0)$` : axis === 2 ? `$P(${Qx.toFixed(1)}; 0; 0)$` : `$P(${Qx.toFixed(1)}; 0; 0)$`}\\\\
    Giao điểm của mặt phẳng này với trục ${axis === 1 ? "Oz" : axis === 2 ? "Oz" : "Oy"} là:\\\\
    ${axis === 1 ? `$Q(0; 0; ${Pz.toFixed(1)})$` : axis === 2 ? `$Q(0; 0; ${Pz.toFixed(1)})$` : `$Q(0; ${Py.toFixed(1)}; 0)$`}\\\\
    Độ dài đoạn thẳng $PQ$ được tính theo công thức:\\\\
    $PQ = \\sqrt{(${axis === 1 ? Qy.toFixed(1) : Qx.toFixed(1)} - 0)^2 + (0 - ${axis === 1 ? Pz.toFixed(1) : Py.toFixed(1)})^2} = ${distance}$.\\\\
    Vậy độ dài đoạn thẳng $PQ$ là $${distance}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function findPlaneEquation(Qa, Qb, Qc, Ax, Ay, Az, distance) {
    // Tính khoảng cách từ điểm A đến mặt phẳng mới
    const denominator = Math.sqrt(Qa ** 2 + Qb ** 2 + Qc ** 2);
    const D_base = -(Qa * Ax + Qb * Ay + Qc * Az);
    
    // Tính D cho hai mặt phẳng song song với khoảng cách cho trước
    const D1 = D_base - (distance * denominator);
    const D2 = D_base + (distance * denominator);

    // Các phương trình mặt phẳng
    const P1 = { a: Qa, b: Qb, c: Qc, d: D1 };
    const P2 = { a: Qa, b: Qb, c: Qc, d: D2 };

    return { P1, P2 };
}

function calculateVolumeBetweenPlanes(P1, P2) {
    // Tính tọa độ giao điểm với các trục cho P1
    const A1x = P1.a !== 0 ? -P1.d / P1.a : 0;
    const B1y = P1.b !== 0 ? -P1.d / P1.b : 0;
    const C1z = P1.c !== 0 ? -P1.d / P1.c : 0;

    // Tính tọa độ giao điểm với các trục cho P2
    const A2x = P2.a !== 0 ? -P2.d / P2.a : 0;
    const B2y = P2.b !== 0 ? -P2.d / P2.b : 0;
    const C2z = P2.c !== 0 ? -P2.d / P2.c : 0;

    // Tính diện tích đáy của hai chóp
    const baseArea1 = Math.abs(A1x * B1y * C1z);
    const baseArea2 = Math.abs(A2x * B2y * C2z);

    // Tính khoảng cách giữa hai mặt phẳng (chiều cao của lăng trụ)
    const distance = Math.abs(P1.d - P2.d) / Math.sqrt(P1.a ** 2 + P1.b ** 2 + P1.c ** 2);

    let volume;
    if (P1.d * P2.d > 0) {
        // Tính thể tích của chóp cụt nếu hai mặt phẳng nằm cùng một phía
        volume = (1 / 6) * Math.abs(baseArea1 - baseArea2) * distance;
    } else {
        // Tính thể tích của hai chóp cộng lại nếu hai mặt phẳng nằm khác phía
        volume = (1 / 6) * (baseArea1 + baseArea2) * distance;
    }

    volume = Math.round(volume);
    
    return volume;
}

// Tạo nội dung câu hỏi và đáp án
function mp_songsongP_cachA(Qa, Qb, Qc, Ax, Ay, Az, distance) {
    const planes = findPlaneEquation(Qa, Qb, Qc, Ax, Ay, Az, distance);
    const volume = calculateVolumeBetweenPlanes(planes.P1, planes.P2);
    const D_base = Qa * Ax + Qb * Ay + Qc * Az;
    const problemStatement = `
        Mặt phẳng song song với mặt phẳng $(Q)\colon ${Qa}x ${Qb < 0 ? '' : '+'} ${Qb}y ${Qc < 0 ? '' : '+'} ${Qc}z+${D_base}=0$ và cách điểm $A(${Ax}, ${Ay}, ${Az})$ một khoảng bằng $${distance}$. Tính thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ, (làm tròn số đến phần nguyên).
    `;
    const answerStatement = `
        Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng $P1$ song song với mặt phẳng $Q$ và cách điểm $A$ một khoảng bằng ${distance} là:\\\\
    $${planes.P1.a}x ${planes.P1.b < 0 ? '' : '+'} ${planes.P1.b}y ${planes.P1.c < 0 ? '' : '+'} ${planes.P1.c}z + ${planes.P1.d.toFixed(2)} = 0$.\\\\
    Phương trình mặt phẳng $P2$ song song với mặt phẳng $Q$ và cách điểm $A$ một khoảng bằng ${distance} là:\\\\
    $${planes.P2.a}x ${planes.P2.b < 0 ? '' : '+'} ${planes.P2.b}y ${planes.P2.c < 0 ? '' : '+'} ${planes.P2.c}z + ${planes.P2.d.toFixed(2)} = 0$.\\\\
    Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_songsongQ_cachQ(Qa, Qb, Qc, Qd, distance) {
    // Tính khoảng cách từ điểm gốc O(0, 0, 0) đến mặt phẳng Q
    const Ax = 0, Ay = 0, Az = 0; // Điểm gốc O
    const denominator = Math.sqrt(Qa ** 2 + Qb ** 2 + Qc ** 2);
    const D_base = -(Qa * Ax + Qb * Ay + Qc * Az + Qd);

    // Tính D cho hai mặt phẳng song song với khoảng cách cho trước
    const D1 = D_base - (distance * denominator);
    const D2 = D_base + (distance * denominator);

    // Các phương trình mặt phẳng
    const P1 = { a: Qa, b: Qb, c: Qc, d: D1 };
    const P2 = { a: Qa, b: Qb, c: Qc, d: D2 };

    // Tính tọa độ giao điểm với các trục cho P1
    const A1x = P1.a !== 0 ? -P1.d / P1.a : 0;
    const B1y = P1.b !== 0 ? -P1.d / P1.b : 0;
    const C1z = P1.c !== 0 ? -P1.d / P1.c : 0;

    // Tính tọa độ giao điểm với các trục cho P2
    const A2x = P2.a !== 0 ? -P2.d / P2.a : 0;
    const B2y = P2.b !== 0 ? -P2.d / P2.b : 0;
    const C2z = P2.c !== 0 ? -P2.d / P2.c : 0;

    // Tính diện tích đáy của hai chóp
    const baseArea1 = Math.abs(A1x * B1y * C1z);
    const baseArea2 = Math.abs(A2x * B2y * C2z);

    // Tính khoảng cách giữa hai mặt phẳng (chiều cao của lăng trụ)
    const distanceBetweenPlanes = Math.abs(P1.d - P2.d) / Math.sqrt(P1.a ** 2 + P1.b ** 2 + P1.c ** 2);

    let volume;
    if (P1.d * P2.d > 0) {
        // Tính thể tích của chóp cụt nếu hai mặt phẳng nằm cùng một phía
        volume = (1 / 6) * Math.abs(baseArea1 - baseArea2) * distanceBetweenPlanes;
    } else {
        // Tính thể tích của hai chóp cộng lại nếu hai mặt phẳng nằm khác phía
        volume = (1 / 6) * (baseArea1 + baseArea2) * distanceBetweenPlanes;
    }

    volume = Math.round(volume);

    const problemStatement = `
        Lập phương trình mặt phẳng song song với mặt phẳng $(Q)\colon ${Qa}x ${Qb < 0 ? '' : '+'} ${Qb}y ${Qc < 0 ? '' : '+'} ${Qc}z + ${Qd} = 0$ và cách mặt phẳng $(Q)$ một khoảng bằng $${distance}$. 
        Tính thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ, (làm tròn đến phần nguyên).
    `;
    const answerStatement = `
        Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng $P1$ song song với mặt phẳng $Q$ và cách mặt phẳng $(Q)$ một khoảng bằng $${distance}$ là:\\\\
    $${P1.a}x ${P1.b < 0 ? '' : '+'} ${P1.b}y ${P1.c < 0 ? '' : '+'} ${P1.c}z + ${P1.d.toFixed(2)} = 0$.\\\\
    Phương trình mặt phẳng $P2$ song song với mặt phẳng $Q$ và cách mặt phẳng $Q$ một khoảng bằng ${distance} là:\\\\
    $${P2.a}x ${P2.b < 0 ? '' : '+'} ${P2.b}y ${P2.c < 0 ? '' : '+'} ${P2.c}z + ${P2.d.toFixed(2)} = 0$.\\\\
    Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = latexOutput.replace(/^\s+|\s+$/gm, '');

    return latexOutput;
}

// Ví dụ sử dụng hàm
const latexOutput = mp_songsongQ_cachQ(6, -2, 3, 1, 1);
console.log(latexOutput);





function tich_vohuong3D(a, b, c, d, e, f) {
    let result = 0;
    let expression = "";

    function processTerm(term1, term2) {
        if (typeof term1 === 'number' && typeof term2 === 'number') {
            return term1 * term2;
        } else if (typeof term1 === 'number' && typeof term2 === 'string') {
            return `${term1}${term2}`;
        } else if (typeof term1 === 'string' && typeof term2 === 'number') {
            return `${term2}${term1}`;
        } else {
            return `${term1}${term2}`;
        }
    }

    // Tính toán các phần tử
    const term1 = processTerm(a, d);
    const term2 = processTerm(b, e);
    const term3 = processTerm(c, f);

    // Tính toán kết quả số và xây dựng biểu thức chữ cái
    if (typeof term1 === 'number') {
        result += term1;
    } else {
        expression += term1 + " + ";
    }

    if (typeof term2 === 'number') {
        result += term2;
    } else {
        expression += term2 + " + ";
    }

    if (typeof term3 === 'number') {
        result += term3;
    } else {
        expression += term3 + " + ";
    }

    // Loại bỏ dấu " + " cuối cùng nếu có
    if (expression.endsWith(" + ")) {
        expression = expression.slice(0, -3);
    }

    // Trả về kết quả
    if (expression.length > 0) {
        return result + (result !== 0 ? " + " : "") + expression;
    } else {
        return result;
    }
}
function executeFunction(fnName, params) {
    if (typeof window[fnName] === 'function') {
        return window[fnName](...params);
    } else {
        return `Hàm ${fnName} không tồn tại`;
    }
}
const filesContent = {};
let overwriteAll = false;
let skipAll = false;

function addFiles() {
    document.getElementById('fileInput').click();
}

function loadSql() {
    document.getElementById('sqlInput').click();
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('sqlInput').addEventListener('change', handleSqlSelect, false);

function handleFileSelect(event) {
    const files = Array.from(event.target.files).filter(file => {
        if (document.getElementById('skipMacOSX').checked && file.webkitRelativePath.includes('__MACOSX')) {
            return false;
        }
        if (file.name.startsWith('ans')) {
            return false;
        }
        return file.name.endsWith('.tex');
    });

    if (files.length > 0) {
        document.getElementById('loadingMessage').style.display = 'block';
        let filesProcessed = 0;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                if (filesContent[file.webkitRelativePath]) {
                    if (overwriteAll) {
                        filesContent[file.webkitRelativePath] = content;
                    } else if (!skipAll && !confirm(`File ${file.name} đã tồn tại. Bạn có muốn ghi đè không?`)) {
                        if (confirm('Ghi đè tất cả các tệp tiếp theo?')) {
                            overwriteAll = true;
                        } else if (confirm('Bỏ qua tất cả các tệp tiếp theo?')) {
                            skipAll = true;
                        }
                        filesProcessed++;
                        if (filesProcessed === files.length) {
                            document.getElementById('loadingMessage').style.display = 'none';
                            updateFileList();
                        }
                        return;
                    } else {
                        filesContent[file.webkitRelativePath] = content;
                    }
                } else {
                    filesContent[file.webkitRelativePath] = content;
                }
                filesProcessed++;
                if (filesProcessed === files.length) {
                    document.getElementById('loadingMessage').style.display = 'none';
                    updateFileList();
                    updateStatistics();
                }
            };
            reader.readAsText(file);
        });
    }
}

function handleSqlSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const sqlEntries = content.split(';\n');
        sqlEntries.forEach(entry => {
            const match = entry.match(/INSERT INTO latex_files \(fileName, content\) VALUES \('(.+?)', '(.+?)'\);/);
            if (match) {
                const fileName = match[1];
                const fileContent = match[2].replace(/''/g, "'");
                if (filesContent[fileName]) {
                    if (overwriteAll) {
                        filesContent[fileName] = fileContent;
                    } else if (!skipAll && !confirm(`File ${fileName} đã tồn tại. Bạn có muốn ghi đè không?`)) {
                        if (confirm('Ghi đè tất cả các tệp tiếp theo?')) {
                            overwriteAll = true;
                        } else if (confirm('Bỏ qua tất cả các tệp tiếp theo?')) {
                            skipAll = true;
                        }
                        return;
                    } else {
                        filesContent[fileName] = fileContent;
                    }
                } else {
                    filesContent[fileName] = fileContent;
                }
            }
        });
        updateFileList();
        updateStatistics();
    };
    reader.readAsText(file);
}

function updateFileList() {
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = '';

    Object.keys(filesContent).forEach(fileName => {
        const listItem = document.createElement('li');
        listItem.className = 'file-item';
        listItem.innerHTML = `
            <span>${fileName}</span>
            <div>
                <button onclick="openFile('${fileName}')">Mở</button>
                <button onclick="deleteFile('${fileName}')">Xóa</button>
            </div>
        `;
        fileListElement.appendChild(listItem);
    });

    updateDatabaseSize();
}

function updateDatabaseSize() {
    const sizeInBytes = Object.values(filesContent).reduce((total, content) => total + new Blob([content]).size, 0);
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    document.getElementById('databaseSize').textContent = `Dung lượng cơ sở dữ liệu hiện tại: ${sizeInMB} MB`;
}

function downloadAllFiles() {
    const zip = new JSZip();
    Object.keys(filesContent).forEach(fileName => {
        zip.file(fileName, filesContent[fileName]);
    });
    zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, "latex_files.zip");
    });
}

function downloadSearchResults() {
    const searchResults = document.getElementById('searchResults');
    const results = searchResults.getElementsByClassName('search-result');
    if (results.length === 0) {
        alert("Không có kết quả tìm kiếm để tải về.");
        return;
    }

    let allContent = "";
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        allContent += result.textContent + "\n\n";
    }

    const blob = new Blob([allContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "search_results.tex");
}

function updateStatistics() {
    const statistics = {
        ex: {
            '10': { choice: 0, choiceTF: 0, none: 0, total: 0 },
            '11': { choice: 0, choiceTF: 0, none: 0, total: 0 },
            '12': { choice: 0, choiceTF: 0, none: 0, total: 0 }
        },
        dn: { total: 0 },
        dl: { total: 0 },
        tc: { total: 0 },
        luuy: { total: 0 },
        note: { total: 0 }
    };

    Object.values(filesContent).forEach(content => {
        const environments = ['ex', 'dn', 'dl', 'tc', 'luuy', 'note'];
        const keywords = ['choice', 'choiceTF'];
        const idRegex = /\d[A-Z]\d[NHVCYBGKT]\d-\d/g;

        environments.forEach(env => {
            const regex = new RegExp(`\\\\begin{${env}}(.*?)\\\\end{${env}}`, 'gs');
            const matches = content.matchAll(regex);

            for (const match of matches) {
                const matchContent = match[1];
                if (env === 'ex') {
                    const idMatch = matchContent.match(idRegex);
                    if (idMatch) {
                        const classNumber = idMatch[0][0];
                        const classKey = classNumber === '0' ? '10' : classNumber === '1' ? '11' : '12';

                        statistics.ex[classKey].total++;
                        let hasKeyword = false;
                        keywords.forEach(keyword => {
                            if (matchContent.includes(keyword)) {
                                statistics.ex[classKey][keyword]++;
                                hasKeyword = true;
                            }
                        });
                        if (!hasKeyword) {
                            statistics.ex[classKey].none++;
                        }
                    }
                } else {
                    statistics[env].total++;
                }
            }
        });
    });

    console.log('Statistics:', statistics);
    updateExStatistics(statistics.ex);
    updateOtherEnvStatistics(statistics);
}

function updateExStatistics(statistics) {
    const tables = {
        '10': document.getElementById('exTable10').querySelector('tbody'),
        '11': document.getElementById('exTable11').querySelector('tbody'),
        '12': document.getElementById('exTable12').querySelector('tbody')
    };

    Object.keys(tables).forEach(classKey => {
        const tbody = tables[classKey];
        tbody.innerHTML = '';

        let total = 0;
        ['choice', 'choiceTF', 'none'].forEach(keywordType => {
            const count = statistics[classKey][keywordType];
            total += count;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${keywordType}</td>
                <td>${count}</td>
            `;
            tbody.appendChild(row);
        });

        const totalRow = document.createElement('tr');
        totalRow.className = 'total-row';
        totalRow.innerHTML = `
            <td>Tổng</td>
            <td>${total}</td>
        `;
        tbody.appendChild(totalRow);
    });
}

function updateOtherEnvStatistics(statistics) {
    const tbody = document.getElementById('otherEnvTable').querySelector('tbody');
    tbody.innerHTML = '';

    ['dn', 'dl', 'tc', 'luuy', 'note'].forEach(env => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${env}</td>
            <td>${statistics[env].total}</td>
        `;
        tbody.appendChild(row);
    });
}

function searchDatabase() {
    document.getElementById('searchingMessage').style.display = 'block';
    const env = document.getElementById('searchEnv').value;
    const keywords = document.getElementById('searchKeywords').value.split(',').map(keyword => keyword.trim());
    const searchResults = [];

    Object.entries(filesContent).forEach(([fileName, content]) => {
        const regex = new RegExp(`\\\\begin{${env}}(.*?)\\\\end{${env}}`, 'gs');
        const matches = content.matchAll(regex);

        for (const match of matches) {
            const matchContent = match[1];
            let matchKeywords = true;
            keywords.forEach(keyword => {
                if (!matchContent.includes(keyword)) {
                    matchKeywords = false;
                }
            });
            if (matchKeywords) {
                searchResults.push({ fileName: fileName, content: `\\begin{${env}}${matchContent}\\end{${env}}` });
            }
        }
    });

    updateSearchResults(searchResults);
    document.getElementById('searchingMessage').style.display = 'none';
}

function updateSearchResults(results) {
    const searchResultsElement = document.getElementById('searchResults');
    searchResultsElement.innerHTML = '';
    results.forEach(result => {
        const resultContainer = document.createElement('div');
        resultContainer.className = 'search-result';
        resultContainer.innerHTML = `<strong>${result.fileName}</strong><br/><pre>${result.content}</pre>`;
        searchResultsElement.appendChild(resultContainer);
    });
}

function openFile(fileName) {
    const fileContent = filesContent[fileName];
    const container = document.createElement('div');
    container.className = 'textarea-container';
    container.innerHTML = `
        <h3>${fileName}</h3>
        <textarea>${fileContent}</textarea>
        <button onclick="closeFile(this)">Đóng</button>
    `;
    document.body.appendChild(container);
}

function closeFile(button) {
    const container = button.parentNode;
    container.parentNode.removeChild(container);
}

function deleteFile(fileName) {
    if (confirm(`Bạn có chắc chắn muốn xóa tệp ${fileName} không?`)) {
        delete filesContent[fileName];
        updateFileList();
        updateStatistics();
    }
}

window.onload = function() {
    const collapsibles = document.getElementsByClassName('collapsible');
    for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }

    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = '';
    });
};

const dbName = "latexDB";
const storeName = "latexFiles";
let db;

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const files = Array.from(event.target.files).filter(file => file.name.endsWith('.tex'));
    if (files.length > 0) {
        document.getElementById('loadingMessage').style.display = 'block';
        let filesProcessed = 0;

        files.forEach(file => {
            checkAndProcessFile(file, () => {
                filesProcessed++;
                if (filesProcessed === files.length) {
                    document.getElementById('loadingMessage').style.display = 'none';
                    loadAndProcessAllFiles();
                }
            });
        });
    }
}

function checkAndProcessFile(file, callback) {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            console.error(`Object store "${storeName}" not found. Creating object store.`);
            const versionRequest = db.setVersion(2);
            versionRequest.onsuccess = function (event) {
                createObjectStore(db, storeName);
                processFile(file, callback);
            };
        } else {
            processFile(file, callback);
        }
    };

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        createObjectStore(db, storeName);
    };
}

function createObjectStore(db, storeName) {
    if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, { keyPath: "fileName" });
        objectStore.createIndex("content", "content", { unique: false });
    }
}

function processFile(file, callback) {
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const getRequest = objectStore.get(file.webkitRelativePath);

    getRequest.onsuccess = function() {
        if (getRequest.result) {
            const overwrite = confirm(`File ${file.name} đã tồn tại. Bạn có muốn ghi đè không?`);
            if (overwrite) {
                saveFileToIndexedDB(file, callback);
            } else {
                callback();
            }
        } else {
            saveFileToIndexedDB(file, callback);
        }
    };
}

function saveFileToIndexedDB(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const fileRecord = { fileName: file.webkitRelativePath, content: content };
        objectStore.put(fileRecord);
        callback();
    };
    reader.readAsText(file);
}

function processFiles() {
    document.getElementById('loadingMessage').style.display = 'block';
    const files = Array.from(document.getElementById('fileInput').files).filter(file => file.name.endsWith('.tex'));
    let filesProcessed = 0;

    files.forEach(file => {
        saveFileToIndexedDB(file, () => {
            filesProcessed++;
            if (filesProcessed === files.length) {
                document.getElementById('loadingMessage').style.display = 'none';
                loadAndProcessAllFiles();
            }
        });
    });
}

function loadAndProcessAllFiles() {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const files = getAllRequest.result;
            const allContent = files.map(file => file.content).join('\n');
            processContent(allContent);
            updateDatabaseSize();
        };
    };
}

function processContent(content) {
    const environments = ['ex', 'dn', 'dl', 'tc', 'luuy', 'note'];
    const keywords = ['choice', 'choiceTF'];
    const idRegex = /\d[A-Z]\d[NHVCYBGKT]\d-\d/g;

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

    console.log('Statistics:', statistics);

    updateExStatistics(statistics.ex);
    updateOtherEnvStatistics(statistics);
    saveStatisticsToIndexedDB(statistics);
}

function saveStatisticsToIndexedDB(statistics) {
    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
    objectStore.put({ fileName: 'statistics', content: JSON.stringify(statistics) });
}

function loadStatisticsFromIndexedDB() {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const getRequest = objectStore.get('statistics');

        getRequest.onsuccess = function() {
            if (getRequest.result) {
                const statistics = JSON.parse(getRequest.result.content);
                updateExStatistics(statistics.ex);
                updateOtherEnvStatistics(statistics);
            }
        };

        const fileListRequest = objectStore.getAll();

        fileListRequest.onsuccess = function() {
            const fileList = fileListRequest.result.filter(file => file.fileName !== 'statistics');
            fileList.forEach(file => {
                updateFileList(file.fileName);
            });
        };
    };
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

function updateFileList(fileName) {
    const fileList = document.getElementById('fileList');
    const listItem = document.createElement('li');
    listItem.className = 'file-item';
    listItem.innerHTML = `
        <span>${fileName}</span>
        <button onclick="openFile('${fileName}')">Mở</button>
    `;
    fileList.appendChild(listItem);
}

function openFile(fileName) {
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const getRequest = objectStore.get(fileName);

        getRequest.onsuccess = function() {
            if (getRequest.result) {
                const fileContent = getRequest.result.content;
                displayFileContent(fileName, fileContent);
            }
        };
    };
}

function displayFileContent(fileName, content) {
    const container = document.createElement('div');
    container.className = 'textarea-container';
    container.innerHTML = `
        <h3>${fileName}</h3>
        <textarea>${content}</textarea>
    `;
    document.body.appendChild(container);
}

function downloadAllFiles(format) {
    document.getElementById('loadingMessage').style.display = 'block';
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
        document.getElementById('loadingMessage').style.display = 'none';
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const files = getAllRequest.result;
            if (format === 'zip') {
                const zip = new JSZip();
                files.forEach(file => {
                    zip.file(file.fileName, file.content);
                });
                zip.generateAsync({ type: 'blob' }).then(function(content) {
                    saveAs(content, "latex_files.zip");
                    document.getElementById('loadingMessage').style.display = 'none';
                });
            } else if (format === 'sql') {
                let sqlContent = "CREATE TABLE latex_files (fileName TEXT, content TEXT);\n";
                files.forEach(file => {
                    const escapedContent = file.content.replace(/'/g, "''");
                    sqlContent += `INSERT INTO latex_files (fileName, content) VALUES ('${file.fileName}', '${escapedContent}');\n`;
                });
                const blob = new Blob([sqlContent], { type: 'application/sql' });
                saveAs(blob, "latex_files.sql");
                document.getElementById('loadingMessage').style.display = 'none';
            }
        };
    };
}

function clearDatabase() {
    const confirmation = confirm("Bạn có chắc chắn muốn xóa tất cả các tệp?");
    if (confirmation) {
        const request = indexedDB.open(dbName, 1);

        request.onerror = function(event) {
            console.error("Database error: ", event.target.error);
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            const transaction = db.transaction([storeName], "readwrite");
            const objectStore = transaction.objectStore(storeName);
            const clearRequest = objectStore.clear();

            clearRequest.onsuccess = function() {
                alert("Tất cả các tệp đã được xóa.");
                document.getElementById('fileList').innerHTML = '';
                document.getElementById('databaseSize').textContent = 'Dung lượng cơ sở dữ liệu hiện tại: 0 MB';
                loadAndProcessAllFiles();
            };
        };
    }
}

function updateDatabaseSize() {
    if (!db) return;
    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);
    const getAllRequest = objectStore.getAll();

    getAllRequest.onsuccess = function() {
        const files = getAllRequest.result;
        let totalSize = 0;
        files.forEach(file => {
            totalSize += new Blob([file.content]).size;
        });
        const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
        document.getElementById('databaseSize').textContent = `Dung lượng cơ sở dữ liệu hiện tại: ${sizeInMB} MB`;
    };
}

function searchDatabase() {
    document.getElementById('searchingMessage').style.display = 'block';
    const env = document.getElementById('searchEnv').value;
    const keywords = document.getElementById('searchKeywords').value.split(',').map(keyword => keyword.trim());
    const request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        console.error("Database error: ", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function() {
            const files = getAllRequest.result;
            const searchResults = [];

            files.forEach(file => {
                const regex = new RegExp(`\\\\begin{${env}}(.*?)\\\\end{${env}}`, 'gs');
                const matches = file.content.matchAll(regex);

                for (const match of matches) {
                    const matchContent = match[1];
                    let matchKeywords = true;
                    keywords.forEach(keyword => {
                        if (!matchContent.includes(keyword)) {
                            matchKeywords = false;
                        }
                    });
                    if (matchKeywords) {
                        searchResults.push({ fileName: file.fileName, content: `\\begin{${env}}${matchContent}\\end{${env}}` });
                    }
                }
            });

            updateSearchResults(searchResults);
            document.getElementById('searchingMessage').style.display = 'none';
        };
    };
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

window.onload = function() {
    loadStatisticsFromIndexedDB();
    loadAndProcessAllFiles(); // Tải và xử lý tất cả các tệp khi tải lại trang

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
};

// Function to download all search results as a single file
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

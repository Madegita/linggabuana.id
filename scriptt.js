// Simpan berita ke localStorage
function saveNews(title, content, image) {
    let news = JSON.parse(localStorage.getItem('news')) || [];
    news.push({ title, content, image, date: new Date().toLocaleString() });
    localStorage.setItem('news', JSON.stringify(news));
}

// Tampilkan berita di halaman client
function displayNews() {
    const newsList = document.getElementById('news-list');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsList.innerHTML = '';
    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <img src="${item.image}" alt="Image">
            <small>${item.date}</small>
        `;
        newsList.appendChild(newsItem);
    });
}

// Tampilkan berita di dashboard admin
function displayDashboard() {
    const newsDashboard = document.getElementById('news-dashboard');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsDashboard.innerHTML = '';
    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <img src="${item.image}" alt="Image">
            <small>${item.date}</small>
        `;
        newsDashboard.appendChild(newsItem);
    });
}

// Modal password untuk admin
function showPasswordModal() {
    document.getElementById('password-modal').style.display = 'flex';
}

function checkPassword() {
    const password = document.getElementById('admin-password').value;
    const correctPassword = '7676'; // Ganti dengan password yang lebih kuat jika perlu

    if (password === correctPassword) {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('admin-form').style.display = 'block';
    } else {
        alert('Sandi salah!');
    }
}

// Fungsi untuk mengonversi gambar ke Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function() {
        callback(reader.result); // Menyimpan data gambar dalam Base64
    };
    reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
}

// Tambahkan berita dari form admin
document.getElementById('news-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (title && content) {
        if (imageFile) {
            // Jika ada gambar yang dipilih, konversi ke Base64
            convertImageToBase64(imageFile, function(base64Image) {
                saveNews(title, content, base64Image);
                alert('Berita berhasil ditambahkan');
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                imageInput.value = '';  // Clear the file input
            });
        } else {
            // Jika tidak ada gambar, tetap simpan berita tanpa gambar
            saveNews(title, content, '');
            alert('Berita berhasil ditambahkan');
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        }
    }
});

// Panggil fungsi untuk menampilkan berita di halaman client
if (document.getElementById('news-list')) {
    displayNews();
}

// Panggil fungsi untuk menampilkan berita di dashboard admin
if (document.getElementById('news-dashboard')) {
    displayDashboard();
}

// Panggil fungsi untuk menampilkan modal password di halaman admin
if (document.getElementById('password-modal')) {
    showPasswordModal();
}
// Fungsi untuk menyimpan berita ke localStorage
function saveNews(title, content, image, likes = 0) {
    let news = JSON.parse(localStorage.getItem('news')) || [];
    news.push({ title, content, image, likes, date: new Date().toLocaleString() });
    localStorage.setItem('news', JSON.stringify(news));
}

// Fungsi untuk menampilkan berita
function displayNews() {
    const newsList = document.getElementById('news-list');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsList.innerHTML = '';
    news.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <img src="${item.image}" alt="Image">
            <small>${item.date}</small>
            <button onclick="likePost(${index})">Like (${item.likes})</button>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        newsList.appendChild(newsItem);
    });
}

// Fungsi untuk menyimpan like
function likePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news[index].likes += 1; // Increment like
    localStorage.setItem('news', JSON.stringify(news)); // Update localStorage
    displayNews(); // Refresh the page
}

// Fungsi untuk mengedit postingan berita
function editPost(index) {
    const news = JSON.parse(localStorage.getItem('news'));
    const item = news[index];
    document.getElementById('title').value = item.title;
    document.getElementById('content').value = item.content;
    document.getElementById('image').value = ''; // Gambar tidak bisa diubah setelah di-upload

    document.getElementById('news-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';

    // Update button untuk edit
    const editButton = document.createElement('button');
    editButton.textContent = 'Update Berita';
    editButton.onclick = () => updatePost(index);
    document.getElementById('edit-form').appendChild(editButton);
}

// Fungsi untuk membatalkan edit
function cancelEdit() {
    document.getElementById('news-form').style.display = 'block';
    document.getElementById('edit-form').style.display = 'none';
}

// Fungsi untuk update berita
function updatePost(index) {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    let news = JSON.parse(localStorage.getItem('news'));
    news[index] = { ...news[index], title, content, image, date: new Date().toLocaleString() };
    localStorage.setItem('news', JSON.stringify(news));
    cancelEdit();
    displayNews();
}

// Fungsi untuk menghapus postingan
function deletePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news.splice(index, 1); // Hapus berita berdasarkan index
    localStorage.setItem('news', JSON.stringify(news)); // Simpan perubahan ke localStorage
    displayNews(); // Refresh tampilan berita
}

// Fungsi untuk modal password admin
function showPasswordModal() {
    document.getElementById('password-modal').style.display = 'flex';
}

function checkPassword() {
    const password = document.getElementById('admin-password').value;
    const correctPassword = '7676'; // Password admin yang baru

    if (password === correctPassword) {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('admin-form').style.display = 'block';
    } else {
        alert('Sandi salah!');
    }
}


// Fungsi untuk konversi gambar ke Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function() {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

// Fungsi untuk menambah berita baru
document.getElementById('news-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (title && content) {
        if (imageFile) {
            convertImageToBase64(imageFile, function(base64Image) {
                saveNews(title, content, base64Image);
                alert('Berita berhasil ditambahkan');
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                imageInput.value = '';
            });
        } else {
            saveNews(title, content, '');
            alert('Berita berhasil ditambahkan');
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        }
    }
});

// Panggil fungsi untuk menampilkan berita di halaman dashboard admin
if (document.getElementById('news-dashboard')) {
    displayNews();
}
// Fungsi untuk menyimpan berita ke localStorage
function saveNews(title, content, image, likes = 0) {
    let news = JSON.parse(localStorage.getItem('news')) || [];
    news.push({ title, content, image, likes, date: new Date().toLocaleString() });
    localStorage.setItem('news', JSON.stringify(news));
}

// Fungsi untuk menampilkan berita
function displayNews() {
    const newsList = document.getElementById('news-dashboard');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsList.innerHTML = '';
    news.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <img src="${item.image}" alt="Image" style="max-width: 200px; height: auto;">
            <small>${item.date}</small>
            <button onclick="likePost(${index})">Like (${item.likes})</button>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        newsList.appendChild(newsItem);
    });
}

// Fungsi untuk menyimpan like
function likePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news[index].likes += 1; // Increment like
    localStorage.setItem('news', JSON.stringify(news)); // Update localStorage
    displayNews(); // Refresh the page
}

// Fungsi untuk mengedit postingan berita
function editPost(index) {
    const news = JSON.parse(localStorage.getItem('news'));
    const item = news[index];
    document.getElementById('title').value = item.title;
    document.getElementById('content').value = item.content;
    document.getElementById('image').value = ''; // Gambar tidak bisa diubah setelah di-upload

    document.getElementById('news-form').style.display = 'none';
    const editForm = document.createElement('form');
    editForm.innerHTML = `
        <input type="text" id="edit-title" value="${item.title}" required>
        <textarea id="edit-content" required>${item.content}</textarea>
        <input type="file" id="edit-image" accept="image/*">
        <button type="submit">Update Berita</button>
    `;
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePost(index);
    });
    document.body.appendChild(editForm);
}

// Fungsi untuk memperbarui postingan
function updatePost(index) {
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const imageInput = document.getElementById('edit-image');
    const imageFile = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    let news = JSON.parse(localStorage.getItem('news'));
    news[index] = { ...news[index], title, content, image: imageFile, date: new Date().toLocaleString() };
    localStorage.setItem('news', JSON.stringify(news));
    displayNews();
}

// Fungsi untuk menghapus postingan
function deletePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news.splice(index, 1); // Hapus berita berdasarkan index
    localStorage.setItem('news', JSON.stringify(news)); // Simpan perubahan ke localStorage
    displayNews(); // Refresh tampilan berita
}

// Fungsi untuk menambah berita baru
document.getElementById('news-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (title && content) {
        if (imageFile) {
            convertImageToBase64(imageFile, function(base64Image) {
                saveNews(title, content, base64Image);
                alert('Berita berhasil ditambahkan');
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
                imageInput.value = '';
            });
        } else {
            saveNews(title, content, '');
            alert('Berita berhasil ditambahkan');
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        }
    }
});

// Fungsi untuk konversi gambar ke Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function() {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

// Fungsi modal password untuk admin
function showPasswordModal() {
    document.getElementById('password-modal').style.display = 'flex';
}

function checkPassword() {
    const password = document.getElementById('admin-password').value;
    const correctPassword = '7676';

    if (password === correctPassword) {
        document.getElementById('password-modal').style.display = 'none';
        document.getElementById('admin-form').style.display = 'block';
    } else {
        alert('Sandi salah!');
    }
}

// Panggil fungsi untuk menampilkan berita di halaman client
if (document.getElementById('news-dashboard')) {
    displayNews();
}
// Fungsi untuk menampilkan berita di halaman dashboard
function displayNews() {
    const newsList = document.getElementById('news-dashboard');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsList.innerHTML = '';
    news.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <small>${item.date}</small>
                <button onclick="likePost(${index})">Like (${item.likes})</button>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            </div>
            <div class="news-image">
                <img src="${item.image}" alt="Image">
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

// Fungsi untuk menyimpan like
function likePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news[index].likes += 1; // Increment like
    localStorage.setItem('news', JSON.stringify(news)); // Update localStorage
    displayNews(); // Refresh the page
}

// Fungsi untuk menghapus postingan
function deletePost(index) {
    let news = JSON.parse(localStorage.getItem('news'));
    news.splice(index, 1); // Hapus berita berdasarkan index
    localStorage.setItem('news', JSON.stringify(news)); // Simpan perubahan ke localStorage
    displayNews(); // Refresh tampilan berita
}
// script.js - Menampilkan postingan yang disimpan di localStorage

// Menampilkan berita yang sudah diposting oleh admin
function displayNews() {
    const newsList = document.getElementById('news-dashboard');
    const news = JSON.parse(localStorage.getItem('news')) || [];

    newsList.innerHTML = ''; // Mengosongkan konten sebelumnya

    if (news.length === 0) {
        newsList.innerHTML = "<p>Belum ada berita yang diposting.</p>";
    }

    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <small>${item.date}</small>
                <div class="news-image">
                    <img src="${item.image}" alt="Image" />
                </div>
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

// Menampilkan berita saat halaman client dimuat
window.onload = function() {
    displayNews();
};

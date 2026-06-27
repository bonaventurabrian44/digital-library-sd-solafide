// utils/statistics.js

export function getMostBorrowedBooks(peminjamanList, bookList, limit = 5) {
  const freq = {};
  peminjamanList.forEach((p) => {
    p.detail.forEach((d) => {
      const id = d.id_buku;
      freq[id] = (freq[id] || 0) + d.jumlah;
    });
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, total]) => ({
      id: Number(id),
      judul: bookList.find((b) => b.id_buku === Number(id))?.judul || 'Tidak diketahui',
      total,
    }));
}

export function getMostActiveStudents(peminjamanList, studentList, limit = 5) {
  const freq = {};
  peminjamanList.forEach((p) => {
    const id = p.id_siswa;
    freq[id] = (freq[id] || 0) + 1;
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, count]) => ({
      id: Number(id),
      nama: studentList.find((s) => s.id_siswa === Number(id))?.nama_siswa || 'Tidak diketahui',
      totalPinjam: count,
    }));
}

export function getPopularDays(peminjamanList) {
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const freq = Array(7).fill(0);
  peminjamanList.forEach((p) => {
    const date = new Date(p.tanggal_pinjam);
    if (!isNaN(date.getTime())) {
      const day = date.getDay();
      freq[day] += 1;
    }
  });

  return freq.map((count, index) => ({
    hari: dayNames[index],
    total: count,
  }));
}

// Hanya definisikan fungsi ini SATU kali di sini
export function getMostBorrowedCategories(peminjamanList, bookList, categoryList, limit = 5) {
  const freq = {};
  peminjamanList.forEach((p) => {
    p.detail.forEach((d) => {
      const book = bookList.find((b) => b.id_buku === d.id_buku);
      if (book && book.id_kategori) {
        // Handle id_kategori berupa array [1] agar terbaca dengan benar
        book.id_kategori.forEach((catId) => {
          freq[catId] = (freq[catId] || 0) + d.jumlah;
        });
      }
    });
  });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, total]) => ({
      id: Number(id),
      nama: categoryList.find((c) => c.id_kategori === Number(id))?.nama_kategori || 'Tidak diketahui',
      total,
    }));
}
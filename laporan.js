// Ambil data laporan
let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

// Tampilkan laporan
function tampilLaporan() {

    let isi = "";

    laporan.forEach((data, i) => {

        let detailBarang = "";

        data.detail.forEach(item => {
            detailBarang += `
                ${item.nama} (${item.jumlah}) - Rp ${item.subtotal.toLocaleString("id-ID")}<br>
            `;
        });

        isi += `
        <tr>
            <td>${i + 1}</td>
            <td>${data.tanggal}</td>
            <td class="detail">${detailBarang}</td>
            <td>${data.totalBarang}</td>
            <td>Rp ${data.totalBayar.toLocaleString("id-ID")}</td>
        </tr>
        `;
    });

    if (laporan.length === 0) {
        isi = `
        <tr>
            <td colspan="5">Belum ada data laporan.</td>
        </tr>
        `;
    }

    document.getElementById("tabelLaporan").innerHTML = isi;
}

// Hapus semua laporan
function hapusLaporan() {

    if (confirm("Yakin ingin menghapus semua laporan?")) {

        localStorage.removeItem("laporan");

        laporan = [];

        tampilLaporan();

        alert("Semua laporan berhasil dihapus.");

    }

}

// Tampilkan saat halaman dibuka
tampilLaporan();
// ===============================
// AMBIL DATA LAPORAN
// ===============================

let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

// ===============================
// TAMPILKAN LAPORAN
// ===============================

function tampilLaporan() {

    let isi = "";

    if (laporan.length == 0) {

        isi = `
        <tr>
            <td colspan="5">Belum ada data laporan.</td>
        </tr>
        `;

    } else {

        laporan.forEach((data, i) => {

            let detail = "";

            data.detail.forEach(item => {

                detail += `
                    ${item.nama} (${item.jumlah})<br>
                `;

            });

            isi += `
            <tr>
                <td>${i + 1}</td>
                <td>${data.tanggal}</td>
                <td>${detail}</td>
                <td>${data.totalBarang}</td>
                <td>Rp ${Number(data.totalBayar).toLocaleString("id-ID")}</td>
            </tr>
            `;

        });

    }

    document.getElementById("tabelLaporan").innerHTML = isi;

}

// ===============================
// HAPUS SEMUA LAPORAN
// ===============================

function hapusLaporan() {

    if (confirm("Yakin ingin menghapus semua laporan?")) {

        localStorage.removeItem("laporan");

        laporan = [];

        tampilLaporan();

        alert("Laporan berhasil dihapus.");

    }

}

// ===============================
// LOAD HALAMAN
// ===============================

tampilLaporan();
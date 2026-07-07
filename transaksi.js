// =======================
// DATA
// =======================

let barang = JSON.parse(localStorage.getItem("barang")) || [];
let transaksi = [];

// =======================
// LOAD BARANG
// =======================

function loadBarang() {

    let select = document.getElementById("barang");

    select.innerHTML = '<option value="">-- Pilih Barang --</option>';

    barang.forEach((b, i) => {

        if (b.stok > 0) {

            select.innerHTML += `
                <option value="${i}">
                    ${b.nama} (Stok : ${b.stok})
                </option>
            `;

        }

    });

}

// =======================
// AMBIL HARGA
// =======================

function ambilHarga() {

    let index = document.getElementById("barang").value;

    if (index == "") {

        document.getElementById("harga").value = "";

        return;

    }

    document.getElementById("harga").value = barang[index].harga;

}

// =======================
// TAMBAH TRANSAKSI
// =======================

function tambahTransaksi() {

    let index = document.getElementById("barang").value;
    let jumlah = Number(document.getElementById("jumlah").value);

    if (index == "" || jumlah <= 0) {

        alert("Lengkapi data!");

        return;

    }

    if (jumlah > barang[index].stok) {

        alert("Stok tidak mencukupi!");

        return;

    }

    let subtotal = barang[index].harga * jumlah;

    transaksi.push({
        nama: barang[index].nama,
        harga: barang[index].harga,
        jumlah: jumlah,
        subtotal: subtotal
    });

    barang[index].stok -= jumlah;

    localStorage.setItem("barang", JSON.stringify(barang));

    tampilTransaksi();

    loadBarang();

    document.getElementById("barang").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("jumlah").value = "";

}

// =======================
// TAMPIL TRANSAKSI
// =======================

function tampilTransaksi() {

    let isi = "";

    let totalBarang = 0;

    let totalBayar = 0;

    transaksi.forEach((t, i) => {

        isi += `
        <tr>
            <td>${i + 1}</td>
            <td>${t.nama}</td>
            <td>Rp ${t.harga.toLocaleString("id-ID")}</td>
            <td>${t.jumlah}</td>
            <td>Rp ${t.subtotal.toLocaleString("id-ID")}</td>
            <td>
                <button onclick="hapusItem(${i})">
                    Hapus
                </button>
            </td>
        </tr>
        `;

        totalBarang += t.jumlah;

        totalBayar += t.subtotal;

    });

    document.getElementById("tabelTransaksi").innerHTML = isi;

    document.getElementById("totalBarang").innerHTML = totalBarang;

    document.getElementById("totalBayar").innerHTML =
        totalBayar.toLocaleString("id-ID");

}

// =======================
// HAPUS ITEM
// =======================

function hapusItem(i) {

    let item = transaksi[i];

    let index = barang.findIndex(b => b.nama == item.nama);

    if (index != -1) {

        barang[index].stok += item.jumlah;

    }

    transaksi.splice(i, 1);

    localStorage.setItem("barang", JSON.stringify(barang));

    tampilTransaksi();

    loadBarang();

}

// =======================
// SIMPAN TRANSAKSI
// =======================

function simpanTransaksi() {

    if (transaksi.length == 0) {

        alert("Belum ada transaksi.");

        return;

    }

    let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

    let totalBarang = 0;
    let totalBayar = 0;

    transaksi.forEach(item => {

        totalBarang += item.jumlah;

        totalBayar += item.subtotal;

    });

    laporan.push({

        tanggal: new Date().toLocaleString("id-ID"),

        detail: transaksi,

        totalBarang: totalBarang,

        totalBayar: totalBayar

    });

    localStorage.setItem("laporan", JSON.stringify(laporan));

    alert("Transaksi berhasil disimpan.");

    transaksi = [];

    tampilTransaksi();

}

// =======================
// BATAL
// =======================

function batalTransaksi() {

    transaksi = [];

    tampilTransaksi();

}

// =======================
// LOAD
// =======================

loadBarang();
tampilTransaksi();
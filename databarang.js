// =======================
// DATA BARANG
// =======================

let barang = JSON.parse(localStorage.getItem("barang"));

if (barang == null) {

    barang = [
        { nama: "Beras 5 Kg", harga: 75000, stok: 20 },
        { nama: "Minyak Goreng 1 L", harga: 18000, stok: 35 },
        { nama: "Gula Pasir 1 Kg", harga: 17000, stok: 40 },
        { nama: "Mie Instan", harga: 3500, stok: 100 },
        { nama: "Kopi Sachet", harga: 2500, stok: 80 },
        { nama: "Teh Celup", harga: 8000, stok: 50 },
        { nama: "Susu UHT", harga: 7000, stok: 45 },
        { nama: "Air Mineral", harga: 4000, stok: 90 },
        { nama: "Biskuit", harga: 12000, stok: 30 },
        { nama: "Sabun Mandi", harga: 5000, stok: 60 }
    ];

    simpanLocal();
}

// =======================
// SIMPAN LOCAL STORAGE
// =======================

function simpanLocal() {
    localStorage.setItem("barang", JSON.stringify(barang));
}

// =======================
// TAMPIL DATA
// =======================

function tampil() {

    let isi = "";

    barang.forEach((b, i) => {

        isi += `
        <tr>
            <td>${i + 1}</td>
            <td>${b.nama}</td>
            <td>Rp ${Number(b.harga).toLocaleString("id-ID")}</td>
            <td>${b.stok}</td>
            <td>
                <button onclick="edit(${i})">Edit</button>
                <button onclick="hapus(${i})">Hapus</button>
            </td>
        </tr>
        `;

    });

    document.getElementById("tabel").innerHTML = isi;

}

// =======================
// SIMPAN DATA
// =======================

function simpan() {

    let nama = document.getElementById("nama").value.trim();
    let harga = Number(document.getElementById("harga").value);
    let stok = Number(document.getElementById("stok").value);
    let index = document.getElementById("index").value;

    if (nama == "" || harga <= 0 || stok < 0) {

        alert("Lengkapi semua data!");

        return;

    }

    if (index == "") {

        barang.push({

            nama: nama,
            harga: harga,
            stok: stok

        });

    } else {

        barang[index] = {

            nama: nama,
            harga: harga,
            stok: stok

        };

    }

    simpanLocal();

    batal();

    tampil();

}

// =======================
// EDIT
// =======================

function edit(i) {

    document.getElementById("index").value = i;
    document.getElementById("nama").value = barang[i].nama;
    document.getElementById("harga").value = barang[i].harga;
    document.getElementById("stok").value = barang[i].stok;

}

// =======================
// HAPUS
// =======================

function hapus(i) {

    if (confirm("Yakin ingin menghapus data?")) {

        barang.splice(i, 1);

        simpanLocal();

        tampil();

    }

}

// =======================
// BATAL
// =======================

function batal() {

    document.getElementById("index").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("stok").value = "";

}

// =======================
// LOAD
// =======================

tampil();
let barang = [
    {nama:"Beras 5 Kg", harga:75000, stok:20},
    {nama:"Minyak Goreng", harga:18000, stok:35},
    {nama:"Gula Pasir", harga:17000, stok:40},
    {nama:"Mie Instan", harga:3500, stok:100},
    {nama:"Kopi Sachet", harga:2500, stok:80}
];

function tampil() {

    let isi = "";

    barang.forEach((b, i) => {

        isi += `
        <tr>
            <td>${i + 1}</td>
            <td>${b.nama}</td>
            <td>Rp ${b.harga}</td>
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

function simpan() {

    let nama = document.getElementById("nama").value;
    let harga = document.getElementById("harga").value;
    let stok = document.getElementById("stok").value;
    let index = document.getElementById("index").value;

    if (nama === "" || harga === "" || stok === "") {
        alert("Semua data harus diisi!");
        return;
    }

    if (index === "") {
        barang.push({nama, harga, stok});
    } else {
        barang[index] = {nama, harga, stok};
    }

    batal();
    tampil();
}

function edit(i) {
    document.getElementById("index").value = i;
    document.getElementById("nama").value = barang[i].nama;
    document.getElementById("harga").value = barang[i].harga;
    document.getElementById("stok").value = barang[i].stok;
}

function hapus(i) {
    if (confirm("Yakin ingin menghapus data?")) {
        barang.splice(i, 1);
        tampil();
    }
}

function batal() {
    document.getElementById("index").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("stok").value = "";
}

tampil();
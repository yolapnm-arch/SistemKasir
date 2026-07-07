// Ambil data barang
let barang = JSON.parse(localStorage.getItem("barang")) || [];

// Ambil laporan
let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

// Menyimpan transaksi sementara
let transaksi = [];

// Isi dropdown barang
function loadBarang() {

    let pilih = document.getElementById("barang");

    pilih.innerHTML = '<option value="">-- Pilih Barang --</option>';

    barang.forEach((b, i) => {
        pilih.innerHTML += `
            <option value="${i}">
                ${b.nama}
            </option>
        `;
    });

}

// Ambil harga otomatis
function ambilHarga() {

    let index = document.getElementById("barang").value;

    if(index==""){
        document.getElementById("harga").value="";
        return;
    }

    document.getElementById("harga").value = barang[index].harga;

}

// Tambah transaksi
function tambahTransaksi(){

    let index = document.getElementById("barang").value;
    let jumlah = Number(document.getElementById("jumlah").value);

    if(index=="" || jumlah<=0){
        alert("Pilih barang dan isi jumlah.");
        return;
    }

    if(jumlah > barang[index].stok){
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

    document.getElementById("barang").value="";
    document.getElementById("harga").value="";
    document.getElementById("jumlah").value="";

}

// Tampilkan transaksi
function tampilTransaksi(){

    let isi="";
    let totalBarang=0;
    let totalBayar=0;

    transaksi.forEach((t,i)=>{

        isi += `
        <tr>
            <td>${i+1}</td>
            <td>${t.nama}</td>
            <td>Rp ${t.harga.toLocaleString("id-ID")}</td>
            <td>${t.jumlah}</td>
            <td>Rp ${t.subtotal.toLocaleString("id-ID")}</td>
            <td>
                <button onclick="hapusTransaksi(${i})">Hapus</button>
            </td>
        </tr>
        `;

        totalBarang += t.jumlah;
        totalBayar += t.subtotal;

    });

    document.getElementById("tabelTransaksi").innerHTML = isi;
    document.getElementById("totalBarang").innerHTML = totalBarang;
    document.getElementById("totalBayar").innerHTML = totalBayar.toLocaleString("id-ID");

}

// Hapus transaksi
function hapusTransaksi(i){

    let item = transaksi[i];

    let indexBarang = barang.findIndex(b=>b.nama===item.nama);

    if(indexBarang!=-1){
        barang[indexBarang].stok += item.jumlah;
        localStorage.setItem("barang", JSON.stringify(barang));
    }

    transaksi.splice(i,1);

    tampilTransaksi();

}

// Simpan ke laporan
function simpanTransaksi(){

    if(transaksi.length==0){
        alert("Belum ada transaksi.");
        return;
    }

    let totalBarang=0;
    let totalBayar=0;

    transaksi.forEach(t=>{
        totalBarang += t.jumlah;
        totalBayar += t.subtotal;
    });

    laporan.push({
        tanggal:new Date().toLocaleString("id-ID"),
        detail:transaksi,
        totalBarang:totalBarang,
        totalBayar:totalBayar
    });

    localStorage.setItem("laporan",JSON.stringify(laporan));

    alert("Transaksi berhasil disimpan.");

    transaksi=[];

    tampilTransaksi();

}

// Batal transaksi
function batalTransaksi(){

    transaksi.forEach(item=>{

        let indexBarang = barang.findIndex(b=>b.nama===item.nama);

        if(indexBarang!=-1){
            barang[indexBarang].stok += item.jumlah;
        }

    });

    localStorage.setItem("barang",JSON.stringify(barang));

    transaksi=[];

    tampilTransaksi();

}

loadBarang();
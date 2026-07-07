let dataBarang =
JSON.parse(localStorage.getItem("barang")) || [];

let transaksi = [];

const selectBarang =
document.getElementById("barang");

dataBarang.forEach((item,index)=>{

selectBarang.innerHTML += `
<option value="${index}">
${item.nama}
</option>
`;

});

function ambilHarga(){

let index = selectBarang.value;

if(index==="") return;

document.getElementById("harga").value =
dataBarang[index].harga;

}

function tambahTransaksi(){

let index = selectBarang.value;

let jumlah =
parseInt(document.getElementById("jumlah").value);

if(index==="" || !jumlah){
alert("Lengkapi data");
return;
}

let barang = dataBarang[index];

if(jumlah > barang.stok){
alert("Stok tidak cukup");
return;
}

let total = barang.harga * jumlah;

transaksi.push({
nama:barang.nama,
harga:barang.harga,
jumlah:jumlah,
total:total
});

barang.stok -= jumlah;

localStorage.setItem(
"barang",
JSON.stringify(dataBarang)
);

tampilData();

document.getElementById("jumlah").value="";

}

function tampilData(){

let tbody =
document.getElementById("tbody");

let html="";

let totalBarang=0;
let totalBayar=0;

transaksi.forEach(item=>{

html+=`
<tr>
<td>${item.nama}</td>
<td>Rp ${item.harga}</td>
<td>${item.jumlah}</td>
<td>Rp ${item.total}</td>
</tr>
`;

totalBarang += item.jumlah;
totalBayar += item.total;

});

tbody.innerHTML = html;

document.getElementById("totalBarang")
.innerText = totalBarang;

document.getElementById("totalBayar")
.innerText = totalBayar;

}

function simpanTransaksi(){

if(transaksi.length===0){
alert("Belum ada transaksi");
return;
}

let laporan =
JSON.parse(localStorage.getItem("laporan"))
|| [];

laporan.push({

tanggal:new Date().toLocaleString(),

totalBarang:
document.getElementById("totalBarang").innerText,

totalBayar:
document.getElementById("totalBayar").innerText,

detail:[...transaksi]

});

localStorage.setItem(
"laporan",
JSON.stringify(laporan)
);

alert("Transaksi berhasil disimpan");

transaksi=[];

tampilData();

}
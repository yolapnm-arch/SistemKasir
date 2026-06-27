let barang=[];

function tambah(){

let nama=document.getElementById("nama").value;
let harga=document.getElementById("harga").value;

barang.push({
nama:nama,
harga:harga
});

document.getElementById("nama").value="";
document.getElementById("harga").value="";

tampil();

}

function tampil(){

let cari=document.getElementById("cari").value.toLowerCase();

let hasil="";

barang.forEach((b,index)=>{

if(b.nama.toLowerCase().includes(cari)){

hasil+=`
<tr>

<td>${b.nama}</td>

<td>${b.harga}</td>

<td>

<button onclick="hapus(${index})">Hapus</button>

</td>

</tr>
`;

}

});

document.getElementById("data").innerHTML=hasil;

}

function hapus(index){

barang.splice(index,1);

tampil();

}

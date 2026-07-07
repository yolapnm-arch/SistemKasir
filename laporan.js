let laporan = JSON.parse(localStorage.getItem("laporan")) || [];

tampilLaporan();

function tampilLaporan(){

let html="";

laporan.forEach((item,index)=>{

html += `
<tr>
<td>${index+1}</td>
<td>${item.tanggal}</td>
<td>${item.totalBarang}</td>
<td>Rp ${item.totalBayar}</td>
</tr>
`;

});

document.getElementById("isiLaporan").innerHTML = html;

}

function hapusLaporan(){

if(confirm("Yakin ingin menghapus semua laporan?")){

localStorage.removeItem("laporan");

laporan=[];

tampilLaporan();

}

}
import { jsPDF } from "../node_modules/jspdf";


/* ------------------------- Exportar a PDF -------------------------------------------- */
let modal = document.getElementById("modalBuy");
let pdf = document.getElementById("toPDF");

pdf.onclick = function() {
  var doc = new jsPDF('p', 'pt',
  'letter',true);
  var margin = 20;
  var scale = (doc.internal.pageSize.width - margin * 2) / document.body.clientWidth;
  var scale_mobile = (doc. internal.pageSize.width - margin * 2) /
  document.body.getBoundingClientRect();
  // checking
  if(/Android| webOS |iPhone| iPad|iPod|BlackBerry| TEMobile|Opera Mini/i.test(navigator.userAgent)){
  // mobile
  doc.html(modal, {
  x: margin,
  y: margin,
  html2canvas: {
  scale: scale_mobile,
  },
  callback: function (doc){
  doc.output('dataurlneewwindow',{filename:'pdf.pdf'})}
  }); 
} else {
//PC
doc.html(modal, {
  x: margin,
  y: margin,
  html2canvas: {
  scale: scale,
  },
  callback: function (doc){
  doc.output('dataurlneewwindow',{filename:'pdf.pdf'})}
  }); 
} };
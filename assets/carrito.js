// CREO OBTEJO CON SUS CAMPOS Y LO INICIALIZO CON VALORES
class Prods{
    constructor(id,nombre,precio,size,cantidad,img){
    this.id=id;
    this.nombre=nombre;
    this.precio=precio;
    this.size=size;
    this.cantidad=cantidad;
    this.img=img;
    this.quantity= 0;
    };
};
//CREO ARRAY VACIO
let arrProds = [];

let cart = document.getElementById(`cartBody`);
let btnProds = document.getElementById(`btn`);
let payment = document.getElementById(`payment`);

let stockx= 50;




let div1= document.getElementById("div1");
if (!localStorage.getItem(`carrito`)) {

    localStorage.setItem(`carrito`,[])
    
};
// ESTE SCRIPT RENDERIZA CADA UNO DE LOS OBJETOS, LOS TRAE DEL JSON AL HTML
fetch(`../scripts/items.json`)
.then(promise => promise.json())
.then(data => {
    data.forEach(element=> {
      //POR CADA ELEMENTO DEL JSON VA A CREAR UNO DE LOS ARTICULOS
        div1.innerHTML += `<div class="card bg-black" id = ${element.id} style="width: 18rem; margin: 9px;">
        
        <img src="../img/${element.img}" class="card-img-top" alt="imagen">
        <div class="card-body">
        <h5 class= "card-tittle"> ${element.nombre}</h5>
          <p class="card-text"> $${element.precio}</p>
          <button class="btn-remove" id= "botonCompra${element.id}">Agregar al carrito</button>
        </div>
      </div>`
    });

    data.forEach(element=> {
      //addEventListener AGREGA UN EVENTO
        document.getElementById(`botonCompra${element.id}`).addEventListener(`click`, ()=>{
          
          //TIRA UNA NOTIFICACION AL AGREGAR UN ITEM AL CARRITO
          Toastify({

            text: "New item added to cart",
            
            duration: 1000
            
            }).showToast();
            
            
            //VERIFICACION DE STOCK
            if(arrProds.find(producto => producto.id == element.id)){
                let index= arrProds.findIndex(producto => producto.id == element.id)
                arrProds[index].quantity < element.cantidad ? arrProds[index].quantity++ : swal({
                    title: "Error!",
                    text: "No tenemos tantos productos en stock!",
                    icon: "error",
                  });
                
                localStorage.setItem(`carrito`,JSON.stringify(arrProds))
            } else {
              // SI HAY STOCK CREA LA NUEVA INSTANCIA
                let newItem= new Prods(element.id,element.nombre,element.precio,element.size,element.cantidad,element.img)
                arrProds.push(newItem)
                localStorage.setItem(`carrito`,JSON.stringify(arrProds))
            }
        })
    })
    
});

payment.onclick = () => {
    
    swal({
    title: "Succed!",
    text: "Payment submitted correctly!",
    icon: "success",
  });


}

btnProds.onclick = () => {

    let carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    
    cart.innerHTML = ""
    carritoStorage.forEach(element=>{
        cart.innerHTML +=`<div class="card mb-3 bg-dark">
        <img src="../img/${element.img}" class="card-img-top" alt="imagen">
        <div class="card-body">
          <h5 class="card-title"> ${element.nombre}</h5>
          <p> Cantidad: ${element.quantity}</p>
          <p class="card-text">Total= $${element.precio * element.quantity}</p>
    
        </div>`})


};

let payout = document.getElementById("payment")

payout.onclick = ()=>{

    console.log("funciona")
}
class Producto{
    constructor(nombre,categoria,img,stock,precio,codigo,marca,descripcion){
        this.nombre = nombre;
        this.categoria = categoria;
        this.img = img;
        this.stock = stock;
        this.precio = precio;
        this.codigo = codigo;
        this.marca = marca;
        this.descripcion = descripcion;
    }
};


class Carrito{
    constructor(){
        this.productos = [];
    }

    agregarProducto(producto){
        this.productos.push(producto);
        this.actualizarCarrito();
    }
    eliminarProducto(index){
        if(index >= 0 && index < this.productos.length){
            const validar = confirm(`Desea elimiminar ${this.productos[index].nombre} ${this.productos[index].marca}`)
            if(validar){
                this.productos.splice(index,1)
                Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto fue eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                this.actualizarCarrito()
            }
        }else{
            alert('Indice inválido')
        }
    }

    actualizarCarrito() {
        const div_carrito = document.getElementById('carrito');
        div_carrito.innerHTML = '';
        let total = 0;

        this.productos.forEach((prod, index) => {
            total += prod.precio;  
            let item_carrito = document.createElement('div');
            item_carrito.classList = 'col-12 my-2';
            item_carrito.innerHTML = `
                <div class="d-flex justify-content-between align-items-center border p-2">
                    <div class="d-flex align-items-center">
                        <img src="${prod.img}" alt="${prod.nombre}" class="img-fluid me-3" style="width: 50px;">
                        <div>
                            <h5 class="mb-0">${prod.nombre}</h5>
                            <p class="mb-0 text-muted">${prod.marca} - US$ ${prod.precio.toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            `;
            const btnEliminar = item_carrito.querySelector('button');
            btnEliminar.addEventListener('click', this.eliminarProducto.bind(this, index));
    
            div_carrito.appendChild(item_carrito);
        });

        document.getElementById('total').innerText = `Total: US$${total.toFixed(2)}`;
    }

    totalProductos() {
        const total = this.productos.reduce((acum, producto) => {
            return acum + producto.precio;
        }, 0);
        return total;
        }
}
    


export  { Producto,Carrito };
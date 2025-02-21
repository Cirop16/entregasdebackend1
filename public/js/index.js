const socket = io ();

let user;
let productBox = document.getElementById('productBox');

Swal.fire({
    title: "Identifícate",
    input: 'text',
    text: "Ingresa tu usuario para identificarte",
    allowOutsideClick: false,
      inputValidator: (value)  => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar.'
    }
}).then( result  => {
    user = result.value;
    document.getElementById('username-display').textContent = user;
    socket.emit('userAuthenticated', {user:user});
})

productBox.addEventListener('keyup', (evt) => {
    if( evt.key === 'Enter'){
        if(productBox.value.trim().length){
            socket.emit('product', {user: user, product: productBox.value});
            productBox.value = '';
        }
    }
})

socket.on('productLogs', data => {
    let log = document.getElementById('productLogs');
    let productsHtml = "";
    data.forEach(product => {
        productsHtml += `${product.user} dice: ${product.product}<br>`;
    })
    log.innerHTML = productsHtml;
})

socket.on('newUserConnected', newUser => {
    Swal.fire({
        text:"Nuevo usuario conectado",
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        icon: 'info',
        title: `${newUser.user} se ha unido al server`,
        timer: 4000
    })
})
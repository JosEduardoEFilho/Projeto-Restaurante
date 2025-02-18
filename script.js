const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const cancelBtn = document.getElementById("cancel-btn")
const checkModal = document.getElementById("cart-ok")
const cartIcons = document.getElementsByName("cart-icon");

let cart = [];


/*cartIcons.forEach(icon => {
    icon.addEventListener("click", function(){
        //checkModal.style.display = "flex";
        icon.style.background = "green"; // Muda para verde
        
        setTimeout(() => {
            icon.style.background = ""; // Volta para a cor original (ou defina uma cor específica)
        }, 200);

        // Obtém o contêiner correto do produto
        let item = this.closest(".flex"); // Captura o div do produto específico
        let itemName = item.querySelector("p.font-bold").textContent; // Obtém o nome do produto
        let itemImage = item.querySelector("img").src; // Obtém a imagem do produto

        // Exibe o Toastify com a imagem e o nome do produto
        Toastify({
            text: `✅ ${itemName} adicionado ao carrinho!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#22c55e", // Verde
                color: "#fff",
                display: "flex",
                alignItems: "center",
            },
            avatar: itemImage, // Adiciona a imagem do produto na notificação
        }).showToast();

        /*setTimeout(() => {
            checkModal.style.display = "none";
        }, 200);
    });
});*/
document.addEventListener("DOMContentLoaded", function () {
    const cartIcons = document.querySelectorAll(".add-to-cart-btn"); // Captura todos os botões de adicionar

    cartIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            // Muda a cor do botão para verde e volta ao normal depois de 200ms
            icon.style.background = "green";

            setTimeout(() => {
                icon.style.background = "";
            }, 200);

            // Obtém o contêiner correto do produto com ID "prod"
            let item = this.closest("#prod"); // Captura o div com id="prod"

            if (!item) {
                console.error("Erro: Item não encontrado!");
                return;
            }

            let itemName = item.querySelector("p.font-bold")?.textContent.trim(); // Obtém o nome do produto
            let itemImage = item.querySelector("img")?.src; // Obtém a imagem do produto

            // Debug para verificar se os valores foram capturados corretamente
            console.log("Produto:", itemName, "Imagem:", itemImage);

            if (!itemName || !itemImage) {
                console.error("Erro: Nome ou imagem do item não encontrado!");
                return;
            }

            // Exibe o Toastify com a imagem e o nome do produto
            Toastify({
                text: `${itemName} adicionado ao carrinho!`,
                duration: 1000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#22c55e", // Verde
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                },
                avatar: itemImage, // Adiciona a imagem do produto na notificação
            }).showToast();
        });
    });
});


//Abrir o modal do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex"
})

//Fechar o modal do carrinho quando clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

//Fechar o modal Btn Fechar
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

//Adicionar item ao carrinho
menu.addEventListener("click", function (event) {
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")
    //console.log(parentButton);

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //adicionar ao carrinho.
        addToCart(name, price)
    }
})

//função para adicionar ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        //Se o item ja existe aumenta a quantidade +1
        existingItem.quantity += 1;
    }
    else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

//Atualiza carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let totalItens = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <!--<p>Qtd: ${item.quantity}</p>-->
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center justify-between">
                <a type="button" class="remove-from-cart-btn text-center text-gray-600 border-2 p-1 rounded my-1" data-name="${item.name}">
                         <i class="fa fa-minus text-1 text-center text-black remove-from-cart-btn" data-name="${item.name}"></i>
                    </a>
                    <input type="text" value="${item.quantity}" class="w-10 border-2 p-2 rounded my-1 mx-1 text-center font-bold" readonly/>
                    <a type="button" class="add-to-cart-btn text-center text-gray-600 border-2 p-1 rounded my-1" data-name="${item.name}">
                        <i class="fa fa-plus text-1 text-center text-black add-to-cart-btn" data-name="${item.name}"></i>
                    </a>
                </div>
                    
            </div>
        `

        total += item.price * item.quantity;
        totalItens += item.quantity;
        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    //cartCounter.innerHTML = cart.length;
    cartCounter.innerHTML = totalItens;

}

//Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
    if (event.target.classList.contains("add-to-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        NovoItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

//Adicionar ao carrinho modal
function NovoItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index >= 0) {
        const item = cart[index];

        if (item.quantity >= 1) {
            item.quantity += 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
    //
})

//Remover todos os itens do carrinho
cancelBtn.addEventListener("click", function () {
    if(cart != []){
        cart = [];
        Toastify({
            text: "⚠️ Carrinho Vazio!",
            duration: 1500, // Tempo ajustado para melhor visibilidade
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#FF0000", // Vermelho para indicar alerta
                color: "#fff",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "5px",
            },
        }).showToast()
    }else{
        // Exibe o Toastify com a imagem e o nome do produto
        Toastify({
            text: "⚠️ Carrinho Vazio!",
            duration: 1500, // Tempo ajustado para melhor visibilidade
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#FF0000", // Vermelho para indicar alerta
                color: "#fff",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "5px",
            },
        }).showToast()
    }
    updateCartModal();
})

//Finalizar Pedido
checkoutBtn.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen();
    let vlrTotal = 0;
    if (!isOpen) {
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")

        setTimeout(() => {
            addressWarn.classList.add("hidden");
            addressInput.classList.remove("border-red-500")
        }, 2000);
        return;
    }

    //Enviar o pedido para api wapp
    const cartItems = cart.map((item) => {
        vlrTotal += item.price * item.quantity;
        return (
            `${item.name} 
Quantidade: (${item.quantity}) 
Preço: ${item.price} 

`
        )
    }).join("");

    const totalFormatted = vlrTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const message = encodeURIComponent(`Pedido:\n\n${cartItems}\nTotal: ${totalFormatted}\n\nEndereço: ${addressInput.value}`)
    const phone = "19988413788"


    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")

    cart = [];
    updateCartModal();
    

})

//Verificar a hora e manipular o card horario
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 8 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.add("bg-red-500")
    spanItem.classList.remove("bg-green-600")
}
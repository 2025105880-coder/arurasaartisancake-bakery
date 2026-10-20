// Data Produk Toko Kue
const products = [
    {
        id: 1,
        name: "Signature Hazelnut Truffle",
        category: "whole-cake",
        price: 380000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
        badge: "Best Seller",
        description: "Sponge cokelat lembut dilapisi mousse hazelnut impor Italia, balutan ganache cokelat pekat, dan taburan kacang hazelnut panggang renyah."
    },
    {
        id: 2,
        name: "Classic Milk Chocolate Opera",
        category: "whole-cake",
        price: 350000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop",
        badge: "Chef Choice",
        description: "Lapisan lapis legit almond sponge direndam sirup espresso, diselingi krim mentega cokelat susu khas Arurasa."
    },
    {
        id: 3,
        name: "Butter Croissant Package (Box of 4)",
        category: "pastry",
        price: 120000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
        badge: "Fresh Baked",
        description: "Pastry renyah berlapis dengan aroma French butter murni yang harum dan tekstur bagian dalam yang sangat lembut."
    },
    {
        id: 4,
        name: "Creamy Caramel Pecan Tart",
        category: "pastry",
        price: 240000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop",
        badge: "Favorite",
        description: "Kulit tart renyah diisi karamel buatan sendiri yang halus dan kacang pecan panggang melimpah."
    },
    {
        id: 5,
        name: "Hazelnut Sable Cookies Jar",
        category: "cookies",
        price: 145000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
        badge: "Top Cookie",
        description: "Kue kering renyah dengan rasa mentega kaya, potongan kacang hazelnut, dan lelehan cokelat susu."
    },
    {
        id: 6,
        name: "Grand Royal Hampers Box",
        category: "hampers",
        price: 650000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
        badge: "Limited",
        description: "Kombinasi 2 toples cookies premium, 1 loaf cake, dan kemasan box kain emas eksklusif."
    }
];

let cart = [];

// Element Selectors
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalContent = document.getElementById('modal-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const toastContainer = document.getElementById('toast-container');

// Helper Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'bg-hazelnut text-cream text-xs px-4 py-3 rounded-xl shadow-lg border border-milk-dark flex items-center space-x-2 transition-all duration-300 transform translate-y-5 opacity-0';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i> <span>${message}</span>`;
    
    if (toastContainer) toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-y-5', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-5');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Produk
function renderProducts(categoryFilter = 'all') {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    const filteredProducts = categoryFilter === 'all' 
        ? products 
        : products.filter(p => p.category === categoryFilter);

    filteredProducts.forEach((product, idx) => {
        const card = document.createElement('div');
        card.className = "bg-cream rounded-2xl overflow-hidden border border-milk-dark hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 opacity-0 animate-fade-in";
        card.style.animationDelay = `${idx * 0.1}s`;
        
        card.innerHTML = `
            <div>
                <div class="relative overflow-hidden h-56">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    <span class="absolute top-3 left-3 bg-hazelnut text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-milk-dark shadow-md">
                        ${product.badge}
                    </span>
                </div>
                <div class="p-5">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-hazelnut-light uppercase tracking-wider font-semibold">${product.category.replace('-', ' ')}</span>
                        <div class="flex items-center text-amber-600 text-xs font-bold">
                            <i class="fa-solid fa-star mr-1"></i>
                            <span>${product.rating}</span>
                        </div>
                    </div>
                    <h4 class="font-serif font-bold text-lg text-hazelnut mb-2 line-clamp-1 group-hover:text-hazelnut-light transition">${product.name}</h4>
                    <p class="text-hazelnut-light text-xs line-clamp-2 mb-4 leading-relaxed">${product.description}</p>
                </div>
            </div>
            <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-milk-dark/40 mt-auto pt-3">
                <span class="font-serif font-bold text-hazelnut text-base">${formatRupiah(product.price)}</span>
                <div class="flex space-x-2">
                    <button onclick="openProductModal(${product.id})" class="p-2 text-hazelnut hover:bg-milk-dark rounded-full transition transform hover:scale-110">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')" class="bg-hazelnut text-cream hover:bg-hazelnut-dark px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-md hover:scale-105 transform">
                        + Tambah
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Tambah ke Keranjang
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    if (cartToggleBtn) {
        cartToggleBtn.classList.add('scale-110');
        setTimeout(() => cartToggleBtn.classList.remove('scale-110'), 200);
    }

    updateCartUI();
    showToast(`<strong>${name}</strong> berhasil ditambahkan!`);
}

// Update UI Keranjang
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(subtotal);

    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 text-hazelnut-light">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3 opacity-40 animate-bounce"></i>
                <p class="text-sm">Keranjang belanja Anda masih kosong</p>
            </div>
        `;
        return;
    }

    cart.forEach(item => {
        const el = document.createElement('div');
        el.className = "flex items-center space-x-4 bg-milk-base p-3 rounded-xl border border-milk-dark shadow-sm transition hover:shadow-md";
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border border-milk-dark">
            <div class="flex-1">
                <h5 class="font-serif font-bold text-sm text-hazelnut line-clamp-1">${item.name}</h5>
                <p class="text-xs text-hazelnut-light">${formatRupiah(item.price)}</p>
                <div class="flex items-center space-x-2 mt-2">
                    <button onclick="changeQty(${item.id}, -1)" class="w-5 h-5 rounded-full bg-cream border border-milk-dark text-hazelnut text-xs font-bold flex items-center justify-center hover:bg-hazelnut hover:text-cream transition">-</button>
                    <span class="text-xs font-bold text-hazelnut">${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)" class="w-5 h-5 rounded-full bg-cream border border-milk-dark text-hazelnut text-xs font-bold flex items-center justify-center hover:bg-hazelnut hover:text-cream transition">+</button>
                </div>
            </div>
            <button onclick="removeItem(${item.id})" class="text-hazelnut-light hover:text-red-700 p-1 transition transform hover:scale-110">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        `;
        cartItemsContainer.appendChild(el);
    });
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
    showToast("Produk dihapus dari keranjang.");
}

function toggleCart(show) {
    if (!cartDrawer) return;
    if (show) {
        cartDrawer.classList.remove('hidden');
    } else {
        cartDrawer.classList.add('hidden');
    }
}

function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product || !modalContent || !productModal) return;

    modalContent.innerHTML = `
        <div class="space-y-4">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-xl shadow-inner border border-milk-dark">
            <div>
                <span class="text-xs text-hazelnut-light uppercase tracking-wider font-semibold">${product.category}</span>
                <h3 class="font-serif text-2xl font-bold text-hazelnut">${product.name}</h3>
                <p class="font-serif text-lg font-bold text-hazelnut mt-1">${formatRupiah(product.price)}</p>
            </div>
            <p class="text-xs text-hazelnut-light leading-relaxed">${product.description}</p>
            
            <div class="space-y-2 pt-2">
                <label class="block text-xs font-bold text-hazelnut">Pesan Tulisan di Atas Cokelat Cake (Opsional):</label>
                <input type="text" placeholder="Contoh: Happy Birthday Sarah" class="w-full text-xs p-2.5 rounded-lg border border-milk-dark bg-milk-light text-hazelnut focus:outline-none focus:border-hazelnut transition">
            </div>

            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}'); closeModal();" class="w-full bg-hazelnut text-cream hover:bg-hazelnut-dark font-bold py-3 rounded-full text-sm transition shadow-lg hover:scale-[1.02] transform">
                + Tambahkan ke Keranjang
            </button>
        </div>
    `;
    productModal.classList.remove('hidden');
}

function closeModal() {
    if (productModal) productModal.classList.add('hidden');
}

// Checkout WhatsApp
if (whatsappCheckoutBtn) {
    whatsappCheckoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang belanja Anda masih kosong!');
            return;
        }

        let message = "Halo Arurasa Bakery, saya ingin memesan produk berikut:\n\n";
        let total = 0;

        cart.forEach((item, index) => {
            const sub = item.price * item.quantity;
            total += sub;
            message += `${index + 1}. ${item.name} x${item.quantity} = ${formatRupiah(sub)}\n`;
        });

        message += `\n*Total Pesanan: ${formatRupiah(total)}*`;
        message += "\n\nMohon info ketersediaan dan metode pengirimannya. Terima kasih!";

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
    });
}

// Animation Effects Initializer
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initCardTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Load Document & Events
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initScrollReveal();
    initCardTilt();

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', () => toggleCart(true));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.category-card').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderProducts(category);
        });
    });
});
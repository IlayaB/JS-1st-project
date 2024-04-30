class Admin {
    constructor(shopGoods) {
        this.shopGoods = shopGoods;
    }

    //malların oxunması
    read() {
        for (let shop of shopGoods) {
            console.log(`Mağaza adı: ${shop.store_name}, Ünvan: ${shop.store_address}`);
            console.log("Mallar:");
            for (let product of shop.products) {
                console.log(`  Məhsul adı: ${product.product_name}, Təsviri: ${product.product_description}, Qiyməti: ${product.product_price}`);
            }
            console.log("------------------------------------------------------------");
        }
    }

    //malların axtarışı
    search() {
        let productName = prompt("Məhsulun adını yazın:");
        let found = false;
        for (let shop of shopGoods) {
            for (let product of shop.products) {
                if (product.product_name.toLowerCase() === productName.toLowerCase()) {
                    console.log(`Məhsul adı: ${product.product_name}, Təsviri: ${product.product_description}, Qiyməti: ${product.product_price}`);
                    console.log(`Mağaza adı: ${shop.store_name}`);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        if (!found) console.log("Belə bir məhsul tapılmadı.");
    }

    //malların silinməsi
    remove() {
        let productToDelete = prompt("Silmək istədiyiniz məhsulun adını qeyd edin:");
        this.shopGoods.forEach((store) => {
            store.products = store.products.filter((product) => product.product_name !== productToDelete);
        });
    }

    //malın qiymətinin dəyişdirilməsi
    changePrice() {
        let productToChange = prompt("Dəyişdirmək istədiyiniz məhsulun adını daxil edin:");
        let newPrice = +prompt("Yeni qiyməti daxil edin:");
        this.shopGoods.forEach((store) => {
            store.products.forEach((product) => {
                if (product.product_name === productToChange) {
                    product.product_price = newPrice;
                    console.log(`${productName} məhsulunun qiyməti ${newPrice} AZN olaraq dəyişdirildi.`);
                    return;
                }
            });
        });
    }

    //yeni malların əlavə edilməsi
    addProduct() {
        let storeNameToAdd = prompt("Məhsulu əlavə edəcəyiniz mağazanın adını daxil edin:");
        let newProductInfo = prompt("Məhsulun adını, növünü(detal) və qiymətini daxil edin:").split(" ");
        this.shopGoods.forEach((store) => {
            if (store.store_name === storeNameToAdd) {
                store.products.push({
                    "product_name": newProductInfo[0],
                    "product_description": newProductInfo[1],
                    "product_price": +newProductInfo[2]
                });
                console.log(`${newProductInfo[0]} məhsulu ${storeNameToAdd} mağazasına əlavə edildi.`);
            }
            else {
                console.log("Belə bir mağaza tapılmadı.");
            }
        });
    }

    //malları qiymətə və ya əlifbaya görə sıralama
    sort() {
        let sortedProducts = [];
        for (let shop of shopGoods) {
            sortedProducts.push(...shop.products);
        }
        let storeNameToSort = prompt("Sıralamanı etmək istədiyiniz mağazanın adını qeyd edin:");
        let sortBy = prompt("Əlifbaya yoxsa Qiymətə görə (Əlifba ya da Qiymət yazın):");
        let sortOrder = prompt("Azalan yoxsa artan sırada (Azalan ya da Artan yazın):");
        this.shopGoods.forEach((store) => {
            if (store.store_name === storeNameToSort) {
                if (sortBy === "Əlifba") {
                    sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
                } else if (sortBy === "Qiymət") {
                    if (sortOrder === "Azalan") {
                        sortedProducts.sort((a, b) => b.product_price - a.product_price);
                    } else if (sortOrder === "Artan") {
                        sortedProducts.sort((a, b) => a.product_price - b.product_price);
                    }
                }
            }
            else {
                console.log("Mağaza adını səhv qeyd etmisiniz.");
                return;
            }
        });
        console.log("Məhsulların sıralanması:");
        for (let product of sortedProducts) {
            console.log(`Məhsul adı: ${product.product_name}, Qiyməti: ${product.product_price}`);
        }
    }
}

class Alıcı extends Admin {
    constructor(shopGoods) {
        super(shopGoods);
        this.cart = [];
    }

    //bu klass Admin klassından törədiyi üçün Admində olan bütün metodlar burda da işləyəcək, kod təkrarına ehtiyac yoxdur.

    buy() {
        let productName = prompt("Almaq istədiyiniz məhsulun adını qeyd edin:");
        let productFound = false;
        this.shopGoods.forEach((store) => {
            store.products.forEach((product) => {
                if (product.product_name === productName) {
                    this.cart.push(product);
                    productFound = true;
                    console.log(`Məhsul adı: ${product.product_name}, Qiyməti: ${product.product_price}`);
                }
            });
        });
        if (!productFound) {
            console.log("Məhsul tapılmadı");
            return;
        }
        let totalCost = this.cart.reduce((total, product) => total + product.product_price, 0);
        console.log("Ümumi xərc: " + totalCost);
    }
}

let shopGoods = [
    {
        "store_name": "Moda Dünyası",
        "store_address": "Bakı şəhəri, Nizami kuçəsi 5",
        "products": [
            { "product_name": "Kişi köynəyi", "product_description": "Mavi rəngdə, 100% pamuk", "product_price": 50 },
            { "product_name": "Qadın bluzası", "product_description": "Dəri detallı, qara rəngdə", "product_price": 60 },
            { "product_name": "Kişi pantolonu", "product_description": "Qəhvəyi rəng, kənar cebi", "product_price": 75 },
            { "product_name": "Qadın eteyi", "product_description": "Qırmızı rəng, mini", "product_price": 40 },
            { "product_name": "Kişi dəsmalı", "product_description": "Nəqşdar dizayn", "product_price": 20 },
            { "product_name": "Qadın çantası", "product_description": "Əlgötürən, dəri", "product_price": 90 },
            { "product_name": "Kişi botları", "product_description": "Qış üçün, suya davamlı", "product_price": 120 },
            { "product_name": "Qadın ayaqqabıları", "product_description": "Yüksək tapan, lacivərt", "product_price": 85 },
            { "product_name": "Kişi papağı", "product_description": "Qara rəngdə, dəri", "product_price": 45 },
            { "product_name": "Qadın şalvarı", "product_description": "Göy rəngdə, kaşmir", "product_price": 70 }
        ]
    },
    {
        "store_name": "Zərif Moda",
        "store_address": "Bakı şəhəri, 28 May kuçəsi 12",
        "products": [
            { "product_name": "Kişi palto", "product_description": "Süət dəri, qara rəngdə", "product_price": 250 },
            { "product_name": "Qadın jaketi", "product_description": "Uzun, qaşqır", "product_price": 200 },
            { "product_name": "Kişi kəməri", "product_description": "Dəri, metal tokalı", "product_price": 40 },
            { "product_name": "Qadın badlonu", "product_description": "Retro stil, qızıl rəngdə", "product_price": 180 },
            { "product_name": "Kişi şortu", "product_description": "Spor stil, elastik", "product_price": 60 },
            { "product_name": "Qadın maykası", "product_description": "Boyalı nəqş, pamuklu", "product_price": 45 },
            { "product_name": "Kişi saatı", "product_description": "Qara rəngdə, analog", "product_price": 150 },
            { "product_name": "Qadın bəzək", "product_description": "Qızıl, komplekt", "product_price": 220 },
            { "product_name": "Kişi atkısı", "product_description": "Xəzəl rəng, uzun", "product_price": 35 },
            { "product_name": "Qadın bantı", "product_description": "Metal detallı, elastik", "product_price": 50 }
        ]
    },
    {
        "store_name": "Əliyev Moda Mərkəzi",
        "store_address": "Bakı şəhəri, Azadlıq prospekti 89",
        "products": [
            { "product_name": "Kişi kostyumu", "product_description": "İki parçalı, qara rəngdə", "product_price": 320 },
            { "product_name": "Qadın kombinezonu", "product_description": "Yaz üçün, açıq rəng", "product_price": 150 },
            { "product_name": "Kişi sviteri", "product_description": "Düz rəng, yüngül", "product_price": 70 },
            { "product_name": "Qadın ziyafət geyimi", "product_description": "Düzənşən, yaz üçün", "product_price": 95 },
            { "product_name": "Kişi sport formaları", "product_description": "Spandex, idman üçün", "product_price": 55 },
            { "product_name": "Qadın bikini", "product_description": "Tropik nəqş, elastik", "product_price": 45 },
            { "product_name": "Kişi çantası", "product_description": "Dizayner, əsas bölməsi", "product_price": 100 },
            { "product_name": "Qadın ətri", "product_description": "Gül ətri, uzunömürlü", "product_price": 80 },
            { "product_name": "Kişi şalı", "product_description": "Səliqəli, çoxrəngli", "product_price": 25 },
            { "product_name": "Qadın sutyeni", "product_description": "Destəklənmiş, rahat", "product_price": 65 }
        ]
    }
];

let admin = new Admin(shopGoods);
let alıcı = new Alıcı(shopGoods);
let user = prompt("Admin yoxsa Alıcı olaraq daxil olmaq istəyirsiniz (Admin və ya Alıcı yazın):");
if (user === "Admin") {
    while (true) {
        let input = prompt(`
                Məhsulları oxumaq üçün - Read
                Məhsulları adına əsasən axtarmaq üçün - Search
                Məhsulu siyahıdan silmək üçün - Delete
                Məhsulun detallarını dəyişmək üçün - Change
                Yeni məhsul əlavə etmək üçün - Add
                Sıralama prosesi üçün - Sort
                İcra prosesini dayandırmaq üçün - End
                `);

        if (input === "End") break;

        switch (input) {
            case "Read":
                admin.read();
                break;

            case "Search":
                admin.search();
                break;

            case "Delete":
                admin.remove();
                break;

            case "Change":
                admin.changePrice();
                break;

            case "Add":
                admin.addProduct();
                break;

            case "Sort":
                admin.sort();
                break;
        }
    }
} else if (user === "Alıcı") {
    while (true) {
        let input = prompt(`
                Məhsulları oxumaq üçün - Read
                Məhsulları adına əsasən axtarmaq üçün - Search
                Sıralama prosesi üçün - Sort
                Məhsulu almaq üçün - Buy
                İcra prosesini dayandırmaq üçün - End              
                `);
        if (input === "End") break;
        switch (input) {
            case "Read":
                alıcı.read();
                break;

            case "Search":
                alıcı.search();
                break;

            case "Sort":
                alıcı.sort();
                break;

            case "Buy":
                alıcı.buy();
                break;
        }
    }
}


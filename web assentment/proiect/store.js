$(document).ready(function () {
    $('#loading').show();
    $('#productList').hide();
    $('#categoryFilters').empty();
    $('#products').empty();

    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        $('body').css('background-color', savedColor);
    }

    setTimeout(() => {
        $.ajax({
            url: 'https://fakestoreapi.com/products',
            method: 'GET',
            success: function (products) {
                $('#loading').hide();            
                $('#productList').show();        
                $('.search-container').show();  
                displayCategories(products);      
            },
            error: function () {
                $('#loading').hide();
                alert('Error loading products. Please try again.');
            }
        });
    }, 2000); 

    function displayCategories(products) {
        const categories = [
            { name: "men's clothing", image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
            { name: "women's clothing", image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg' },
            { name: 'electronics', image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg' },
            { name: 'jewelery', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' }
        ];

        categories.forEach(category => {
            const categoryHTML = `
                <div class="category">
                    <div>
                        <span>${category.name}</span>
                    </div>
                    <img src="${category.image}" alt="${category.name}">
                    <div>
                        <button class="filterButton" data-category="${category.name}">Filter ${category.name}</button>
                    </div>
                </div>
            `;
            $('#categoryFilters').append(categoryHTML);
        });

        
        $('.filterButton').on('click', function () {
            const selectedCategory = $(this).data('category').toLowerCase();
            const filteredProducts = products.filter(product => product.category.toLowerCase() === selectedCategory);
            displayProducts(filteredProducts); 
        });
    }

    
    function displayProducts(products) {
        $('#products').empty(); 
        products.forEach(product => {
            const productHTML = `
                <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p><strong>ID:</strong> ${product.id}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Rating:</strong> ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
                </div>
            `;
            $('#products').append(productHTML);
        });
    }

   
    $('#productID').on('blur', function () {
        const productID = parseInt($(this).val(), 10); 

        if (productID < 1 || productID > 20 || isNaN(productID)) {
            $(this).addClass('invalid-input').removeClass('valid-input'); 
            $('#errorMessage').text('Invalid product ID. Please enter a number between 1 and 20.');
            $('#productInfo').empty(); 
        } else {
            $(this).addClass('valid-input').removeClass('invalid-input'); 
            $('#errorMessage').empty(); 

        
            $.ajax({
                url: `https://fakestoreapi.com/products/${productID}`,
                method: 'GET',
                success: function (product) {
                    const productInfoHTML = `
                          <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Rating:</strong> ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
                </div>
                    `;
                    $('#productInfo').html(productInfoHTML);
                },
                error: function () {
                    $('#errorMessage').text('Product not found. Please try again.');
                    $('#productInfo').empty(); 
                }
            });
        }
    });
});

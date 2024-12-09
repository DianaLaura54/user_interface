package com.example.kotlin_app

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import com.example.kotlin_app.model.Product

class ProductAdapter(private val context: Context, private val products: List<Product>) : BaseAdapter() {

    override fun getCount(): Int {
        return products.size
    }

    override fun getItem(position: Int): Any {
        return products[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        // Inflate the item_product.xml layout for each row
        val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.product_item, parent, false)

        // Get the current product
        val product = getItem(position) as Product

        // Set the product title
        val productTitle: TextView = view.findViewById(R.id.productTitle)
        productTitle.text = product.title

        // Set the product price
        val productPrice: TextView = view.findViewById(R.id.productPrice)
        productPrice.text = "$${product.price}"

        // Set the product description
        val productDescription: TextView = view.findViewById(R.id.productDescription)
        productDescription.text = product.description

        // Set the product rating
        val productRating: TextView = view.findViewById(R.id.productRating)
        productRating.text = "Rating: ${product.rating}"

        // Load the product image using Glide
        val productImage: ImageView = view.findViewById(R.id.productImage)
        Glide.with(context)
            .load(product.image)
            .into(productImage)


        return view
    }
}

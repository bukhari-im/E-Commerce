import mongoose from "mongoose";
import { Product } from "../models/Product.Model.js";
import {ENV } from "../config/env.js";

const products = [
    {
        name:"Wireless Bluetooth Headphone",
        description:
         "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and premium sound quality. perfect for music lower and travelers",
        
         price: 755000,
         stock: 50,
         category: "Elekctronic",
        zzzzimages: [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
], 
                

         averageRating: 4.6,
         totalReviews: 128,
    },

    {
        name: "Apple Watch Series 5",
        description: 
            "Advanced fitnes tracking, heart rate monitor, GPS, and water-resistance design.Stay connected with notifications and apps on your wrist",
        
        price: 4300000,
        stock: 45,
        category: "Electronic",
        images: [
            "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
            "https://images.unsplash.com/photo-1520895653685-c739b6db8fce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.8,
        totalReviews: 340,
    },

    {
        name: "Running Shoes - Pro Edition",
        description:

            "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for performance and comfort during long runs.",
        
        price: 1299000,
        stock: 55,
        category: "Sports",
        images: [
            
           
        ],

        averageRating: 4.7,
        totalReviews: 341,
    },



];

const seedDatabase = async () => {
    try {
        // connect to MongoDB 
        await mongoose.connect(ENV.DB_URL);
        console.log("✅ Connected to MongoDB");

        // clear existing products
        await Product.deleteMany({});
        console.log("🗑 Cleared existing product")

        //Insert seed products
        await Product.insertMany(products);
        console.log(`✅ Succesfully seeded ${products.length} products`);

        // Display summary 
        const categories = [...new Set(products.map((p) => p.category))];
        console.log("\n📊 Seeded Products summary");
        console.log(`Total Products: ${products.length}`);
        console.log(`Categories : ${categories.join(",")}`);

        // close connection
        await mongoose.connection.close();
        console.log("\n✅ Database seeding completed and connection closed")
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
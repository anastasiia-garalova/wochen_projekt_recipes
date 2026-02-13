import mysql from 'mysql2';
import { createDatabase } from './conection_db.ts';

connection.connect();

const recipes = [
    { name: 'Spaghetti Carbonara', photo_url: 'https://example.com/carbonara.jpg', description: 'Klassische italienische Pasta mit Speck und Ei' },
    { name: 'Margherita Pizza', photo_url: 'https://example.com/margherita.jpg', description: 'Traditionelle Pizza mit Tomaten, Mozzarella und Basilikum' },
    { name: 'Beef Tacos', photo_url: 'https://example.com/tacos.jpg', description: 'Mexikanische Tacos mit gegrilltem Rindfleisch' },
    { name: 'Caesar Salad', photo_url: 'https://example.com/caesar.jpg', description: 'Frischer Salat mit Parmesan und Caesar-Dressing' },
    { name: 'Chocolate Cake', photo_url: 'https://example.com/cake.jpg', description: 'Reichhaltige Schokoladentorte mit flüssigem Kern' }
];

recipes.forEach(recipe => {
    const query = 'INSERT INTO recipes (name, photo_url, description) VALUES (?, ?, ?)';
    connection.query(query, [recipe.name, recipe.photo_url, recipe.description], (err) => {
        if (err) throw err;
        console.log('Recipe inserted');
    });
});

connection.end();
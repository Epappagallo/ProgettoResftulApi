// src/components/Common/ProductGrid/ProductGrid.tsx (Nuovo file)

import React from 'react';
import ProductCard from '../cards/productCard';
import styles from './ProductGrid.module.css';

// Definisco l'interfaccia ProductData (ripresa da ProductCard.tsx)
interface ProductData {
    id: number;
    title: string;
    price: number;
    currency: string;
    conditionDetail: string;
    shippingText: string;
    extraInfo?: string;
    imageUrl: string;
    rating?: number;
}

// ⚠️ API Mock: Questi dati simulano la risposta di un server
const mockProducts: ProductData[] = [
    {
        id: 1,
        title: "LUCEPLAN lampada da parete a LED COUNTERBALANCE D73N bianca o nera",
        price: 941.00,
        currency: "EUR",
        conditionDetail: "Professionale",
        shippingText: "Spedizione gratuita",
        imageUrl: "https://i.imgur.com/e5t9I5Q.png", // Img di una lampada da parete nera (simile a LUCEPLAN)
    },
    {
        id: 2,
        title: "FLOS Parentesi by Achille Castiglioni. Nuova completa+ lampadina LED omaggio.",
        price: 308.00,
        currency: "EUR",
        conditionDetail: "Professionale",
        shippingText: "Spedizione gratuita",
        extraInfo: "73 venduti",
        imageUrl: "https://i.imgur.com/p0T8cWf.png", // Img della FLOS Parentesi (stile simile)
    },
    {
        id: 3,
        title: "FOSCARINI lampada a sospensione CHOUCHIN VERDE design Ionna Vautrin",
        price: 692.96,
        currency: "EUR",
        conditionDetail: "Professionale",
        shippingText: "Spedizione gratuita",
        imageUrl: "https://i.imgur.com/8Qj8nLd.png", // Img di una lampada a sospensione verde
    },
    {
        id: 4,
        title: "HOMCOM Lampada da Terra Design Moderna Salotto in Tessuto Bianco",
        price: 42.95,
        currency: "EUR",
        conditionDetail: "Professionale",
        shippingText: "Spedizione gratuita",
        extraInfo: "Osservato da 43 persone",
        rating: 1, 
        imageUrl: "https://i.imgur.com/1B9kZgH.png", // Img di una lampada da terra alta in tessuto bianco
    },
    {
        id: 5,
        title: "FLOS Lampada da Tavolo Mini Glo-Ball T design Jasper Morrison (LED)",
        price: 189.50,
        currency: "EUR",
        conditionDetail: "Nuovo",
        shippingText: "+ EUR 9,50 sped.",
        imageUrl: "https://i.imgur.com/9vG9T1c.png", // Img di una lampada da tavolo sferica (Mini Glo-Ball)
    },
    {
        id: 6,
        title: "Artemide Tolomeo Tavolo Lampada in alluminio spazzolato LED",
        price: 350.00,
        currency: "EUR",
        conditionDetail: "Usato - Ottime condizioni",
        shippingText: "Spedizione gratuita",
        extraInfo: "Ultimi 2 rimasti!",
        imageUrl: "https://i.imgur.com/8xJ9jVf.png", // Img della Artemide Tolomeo
    },
];

const ProductGrid: React.FC = () => {
    // In un'applicazione reale, useremmo useState e useEffect per fare il fetch dei dati.
    // Esempio: const [products, setProducts] = useState<ProductData[]>([]);
    
    return (
        <div className={styles.gridContainer}>
            <h2 className={styles.sectionTitle}>Risultati di ricerca per "Lampade Design"</h2>
            <div className={styles.grid}>
                {mockProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
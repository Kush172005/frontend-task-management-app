import burger from "../../assests/images/burger.jpg";
import pizza from "../../assests/images/pizza.jpg";
import salad from "../../assests/images/salad.jpg";
import fries from "../../assests/images/fries.jpg";
import coffee from "../../assests/images/coffee.jpg";
import pasta from "../../assests/images/pasta.jpg";

const initialMenuItems = [
    {
        id: 1,
        name: "Gourmet Burger",
        price: 150,
        image: burger,
    },
    {
        id: 2,
        name: "Margherita Pizza",
        price: 560,
        image: pizza,
    },
    {
        id: 3,
        name: "Caesar Salad",
        price: 180,
        image: salad,
    },
    {
        id: 4,
        name: "Truffle Fries",
        price: 140,
        image: fries,
    },
    {
        id: 5,
        name: "Iced Latte",
        price: 220,
        image: coffee,
    },
    {
        id: 6,
        name: "Macroni Pasta",
        price: 310,
        image: pasta,
    },
];

export default initialMenuItems;

const products = [
  {
    id: "1",
    name: "Product 1",
    category: "Apparel & Footware",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 1.",
    description: "This is a detailed description of Product 1.",
    availableColors: ["Red", "Blue", "Green"],
    numberOfReviews: 12,
  },
  {
    id: "2",
    name: "Product 2",
    category: "Beauty & Personal Care",
    price: 20.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: false,
    isBestSeller: true,
    about: "This is about Product 2.",
    description: "This is a detailed description of Product 2.",
    availableColors: ["Black", "White"],
    numberOfReviews: 8,
  },
  {
    id: "3",
    name: "Product 3",
    category: "Kitchen & Dinning",
    price: 15.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: true,
    about: "This is about Product 3.",
    description: "This is a detailed description of Product 3.",
    availableColors: ["Yellow", "Purple"],
    numberOfReviews: 15,
  },
  {
    id: "4",
    name: "Product 4",
    category: "Home Interiors",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 4.",
    description: "This is a detailed description of Product 4.",
    availableColors: ["Pink", "Gray"],
    numberOfReviews: 5,
  },
  {
    id: "5",
    name: "Product 5",
    category: "Phone Accessories",
    price: 20.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: false,
    isBestSeller: true,
    about: "This is about Product 5.",
    description: "This is a detailed description of Product 5.",
    availableColors: ["Brown", "Orange"],
    numberOfReviews: 20,
  },
  {
    id: "6",
    name: "Product 6",
    category: "Phone Accessories",
    price: 15.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: true,
    about: "This is about Product 6.",
    description: "This is a detailed description of Product 6.",
    availableColors: ["Red", "White"],
    numberOfReviews: 10,
  },
  {
    id: "7",
    name: "Product 7",
    category: "Home Interiors",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 7.",
    description: "This is a detailed description of Product 7.",
    availableColors: ["Blue", "Green"],
    numberOfReviews: 7,
  },
  {
    id: "7",
    name: "Product 7",
    category: "Home Interiors",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 7.",
    description: "This is a detailed description of Product 7.",
    availableColors: ["Blue", "Green"],
    numberOfReviews: 7,
  },
  {
    id: "7",
    name: "Product 7",
    category: "Home Interiors",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 7.",
    description: "This is a detailed description of Product 7.",
    availableColors: ["Blue", "Green"],
    numberOfReviews: 7,
  },
  {
    id: "7",
    name: "Product 7",
    category: "Home Interiors",
    price: 10.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: false,
    about: "This is about Product 7.",
    description: "This is a detailed description of Product 7.",
    availableColors: ["Blue", "Green"],
    numberOfReviews: 7,
  },
  {
    id: "8",
    name: "Product 8",
    category: "Kitchen & Dinning",
    price: 20.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: false,
    isBestSeller: true,
    about: "This is about Product 8.",
    description: "This is a detailed description of Product 8.",
    availableColors: ["Black", "Gray"],
    numberOfReviews: 25,
  },
  {
    id: "9",
    name: "Product 9",
    category: "Beauty & Personal Care",
    price: 15.99,
    mainImage: "https://via.placeholder.com/150",
    additionalImages: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    isNewArrival: true,
    isBestSeller: true,
    about: "This is about Product 9.",
    description: "This is a detailed description of Product 9.",
    availableColors: ["Purple", "Yellow"],
    numberOfReviews: 18,
  },
];

export default products;

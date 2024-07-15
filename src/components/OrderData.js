// src/components/OrderDummyData.js
const orders = [
  {
    id: "1",
    status: "pending",
    date: "2024-07-01",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    specialNote: "Leave at the front door.",
    picture: "https://via.placeholder.com/150",
    products: [
      {
        name: "Product 1",
        quantity: 2,
        subPrice: 20.99,
      },
      {
        name: "Product 2",
        quantity: 1,
        subPrice: 10.99,
      },
    ],
    deliveryFee: 5.99,
    subTotal: 41.97,
    discount: 5.0,
    total: 36.97,
  },
  // Add more orders as needed
];

export default orders;

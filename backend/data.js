import bcrypt from 'bcryptjs';

const data = {
  user: [
    //admin user
    {
      name: "TestAdmin1",
      email: "Admin1@gmail.com",
      psw: bcrypt.hashSync("Thisis1securepassword!", 8),
      admin: true,
    },
    //normal user
    {
      name: "TestUser1",
      email: "TestUser1@gmail.com",
      psw: bcrypt.hashSync("Thisisalso1securepassword!", 8),
      admin: false,
    },
    {
      name: "TestUser2",
      email: "TestUser2@gmail.com",
      psw: bcrypt.hashSync("Thisisalso1securepassword!", 8),
      admin: false,
    },
  ],

  products: [
    {
      //_id: '1',
      name: "NorthFace Snow coat",
      tag: "northface-snow-coat-1", //this is a special id slug
      category: "Coat",
      image: "/images/NFSC1.jpg", // 600px × 800px
      price: 100,
      numLeft: 0,
      brand: "NorthFace",
      grade: 4.5,
      peopleReviews: 10,
      description: "waterproof",
    },
    {
      //_id: '2',
      name: "Nike Snow Pant",
      tag: "nike-snow-pant-1",
      category: "Pants",
      image: "/images/NSP1.jpg", // 600px × 800px
      price: 100,
      numLeft: 15,
      brand: "Nike",
      grade: 4.3,
      peopleReviews: 14,
      description: "Sell the best",
    },
    {
      //_id: '3',
      name: "Snowboard Shoes",
      tag: "adidas-snowboard-shoe-1",
      category: "Shoes",
      image: "/images/ASS1.jpg",
      price: 200,
      numLeft: 15,
      brand: "Adidas",
      grade: 4.4,
      peopleReviews: 50,
      description: "New design",
    },
    {
      //_id: '4',
      name: "Snowboard",
      tag: "snowboard-1",
      category: "Snowboard",
      image: "/images/Snowboard1.jpg",
      price: 200,
      numLeft: 3,
      brand: "One Boardshop",
      grade: 4.9,
      peopleReviews: 500,
      description: "Feelgood; Wood-color",
    },

    {
      //_id: '5',
      name: "Volcom Snow Pants1",
      tag: "volcom-snow-pant-1",
      category: "Pants",
      image: "/images/snow-pants1.png", // 600px × 800px
      price: 258,
      numLeft: 15,
      brand: "Volcom",
      grade: 4.3,
      peopleReviews: 14,
      description: "Sell the best",
    },
    {
      //_id: '6',
      name: "Volcom Snow Pants2",
      tag: "volcom-snow-pant-2",
      category: "Pants",
      image: "/images/snow-pants2.png", // 600px × 800px
      price: 260,
      numLeft: 15,
      brand: "Volcom",
      grade: 4.3,
      peopleReviews: 15,
      description: "Sell the best",
    },
    {
      //_id: '7',
      name: "Volcom Snow Pants3",
      tag: "volcom-snow-pant-3",
      category: "Pants",
      image: "/images/snow-pants3.png", // 600px × 800px
      price: 458,
      numLeft: 15,
      brand: "Volcom",
      grade: 4.3,
      peopleReviews: 16,
      description: "Sell the best",
    },
    {
      //_id: '8',
      name: "Helly Hansen Snow Pants",
      tag: "helly-hansan-snow-pant-1",
      category: "Pants",
      image: "/images/snow-pants4.png", // 600px × 800px
      price: 468,
      numLeft: 15,
      brand: "Helly Hansen",
      grade: 4.3,
      peopleReviews: 17,
      description: "Sell the best",
    },
    {
      //_id: '9',
      name: "Head Alpine Skis1",
      tag: "head-alpine-skis-1",
      category: "alpine skis",
      image: "/images/alpine-ski1.png",
      price: 210,
      numLeft: 15,
      brand: "Head",
      grade: 4.4,
      peopleReviews: 50,
      description: "New design",
    },
    {
      //_id: '10',
      name: "Head Alpine Skis2",
      tag: "head-alpine-skis-2",
      category: "alpine skis",
      image: "/images/alpine-ski2.png",
      price: 220,
      numLeft: 15,
      brand: "Head",
      grade: 4.4,
      peopleReviews: 50,
      description: "New design",
    },
    {
      //_id: '11',
      name: "Head Alpine Skis3",
      tag: "head-alpine-skis-3",
      category: "alpine skis",
      image: "/images/alpine-ski3.png",
      price: 230,
      numLeft: 15,
      brand: "Head",
      grade: 4.4,
      peopleReviews: 50,
      description: "New design",
    },
    {
      //_id: '12',
      name: "Head Alpine Skis4",
      tag: "head-alpine-skis-4",
      category: "alpine skis",
      image: "/images/alpine-ski4.png",
      price: 240,
      numLeft: 15,
      brand: "Head",
      grade: 4.4,
      peopleReviews: 50,
      description: "New design",
    },
    {
      //_id: '13',
      name: "Volkl Ski Poles",
      tag: "volkl-ski-poles-1",
      category: "Ski Poles",
      image: "/images/ski-pole1.png",
      price: 50,
      numLeft: 3,
      brand: "Volkl",
      grade: 4.9,
      peopleReviews: 500,
      description: "Feelgood",
    },
    {
      //_id: '14',
      name: "Ski Poles-14",
      tag: "volkl-ski-poles-2",
      category: "Ski Poles",
      image: "/images/ski-pole2.png",
      price: 60,
      numLeft: 3,
      brand: "Volkl",
      grade: 4.9,
      peopleReviews: 500,
      description: "Feelgood",
    },

    {
      //_id: '15',
      name: "Ski Poles-15",
      tag: "volkl-ski-poles-3",
      category: "Ski Poles",
      image: "/images/ski-pole3.png",
      price: 70,
      numLeft: 3,
      brand: "Volkl",
      grade: 4.9,
      peopleReviews: 500,
      description: "Feelgood",
    },

    {
      //_id: '16',
      name: "Ski Poles-16",
      tag: "volkl-ski-poles-4",
      category: "Ski Poles",
      image: "/images/ski-pole4.png",
      price: 80,
      numLeft: 3,
      brand: "Volkl",
      grade: 4.9,
      peopleReviews: 500,
      description: "Feelgood",
    },

    {
      //_id: '17',
      name: "Roxy Snow jacket1",
      tag: "roxy-snow-jacket-1", //this is a special id slug
      category: "Jacket",
      image: "/images/snow-jacket1.png", // 600px × 800px
      price: 200,
      numLeft: 1,
      brand: "Roxy",
      grade: 4.5,
      peopleReviews: 10,
      description: "waterproof",
    },
    {
      //_id: '18',
      name: "Roxy Snow jacket2",
      tag: "roxy-snow-jacket-2", //this is a special id slug
      category: "Jacket",
      image: "/images/snow-jacket2.png", // 600px × 800px
      price: 300,
      numLeft: 2,
      brand: "Roxy",
      grade: 4.5,
      peopleReviews: 11,
      description: "waterproof",
    },
    {
      //_id: '19',
      name: "Roxy Snow jacket3",
      tag: "roxy-snow-jacket-3", //this is a special id slug
      category: "Jacket",
      image: "/images/snow-jacket3.png", // 600px × 800px
      price: 350,
      numLeft: 3,
      brand: "Roxy",
      grade: 4.5,
      peopleReviews: 12,
      description: "waterproof",
    },
    {
      //_id: '20',
      name: "Roxy Snow jacket4",
      tag: "roxy-snow-jacket-4", //this is a special id slug
      category: "Jacket",
      image: "/images/snow-jacket4.png", // 600px × 800px
      price: 250,
      numLeft: 4,
      brand: "Roxy",
      grade: 4.5,
      peopleReviews: 13,
      description: "waterproof",
    },
  ],
  order: [
    {
      orderId: 1,
      orderEmail:"" ,
      orderDetail: [
        { product: "NorthFace Snow coat", price: "100", num: 2 },
        { product: "Nike Snow Pant", price: "100", num: 1 },
      ],
      itemsPrice: 300,
      taxPrice: 39,
      shippingPrice: 0,
      totalPrice: 339,
      orderYear: 2022,
      orderMonth: 3,
      orderDay: 18,
      addressInfo: {
        fullName: "TestUser1",
        address: "",
        province: "",
        postalCode: "",
        phoneNumber: "",
      },
      paymentResult: {
        id: "",
        status: "",
        update_time: "",
        email_address: "TestUser1@gmail.com",
      },
    },
    {
      orderId: "2",
      orderName: "TestUser2",
      orderEmail: "TestUser2@gmail.com",
      orderDetail: [
        { product: "Snowboard", price: "200", num: 1 },
        { product: "Volcom Snow Pants3", price: "458", num: 1 },
      ],
      itemsPrice: 658,
      taxPrice: 85.54,
      shippingPrice: 0,
      totalPrice: 743.54,
      orderYear: 2022,
      orderMonth: 7,
      orderDay: 18,
      addressInfo: {
        fullName: "TestUser2",
        address: "",
        province: "",
        postalCode: "",
        phoneNumber: "",
      },
      paymentResult: {
        id: "",
        status: "",
        update_time: "",
        email_address: "TestUser2@gmail.com",
      },
    },
    {
      orderId: "3",
      orderName: "TestUser2",
      orderEmail: "TestUser2@gmail.com",
      orderDetail: [{ product: "volcom-snow-pant-2", price: "260", num: 2 }],
      itemsPrice: 520,
      taxPrice: 67.6,
      shippingPrice: 0,
      totalPrice: 587.6,
      orderYear: 2022,
      orderMonth: 7,
      orderDay: 18,
      addressInfo: {
        fullName: "TestUser2",
        address: "",
        province: "",
        postalCode: "",
        phoneNumber: "",
      },
      paymentResult: {
        id: "",
        status: "",
        update_time: "",
        email_address: "TestUser2@gmail.com",
      },
    },
    {
      orderId: "4",
      orderName: "TestUser1",
      orderEmail: "TestUser1@gmail.com",
      orderDetail: [
        { product: "Helly Hansen Snow Pants", price: "468", num: 1 },
      ],
      itemsPrice: 468,
      taxPrice: 60.84,
      shippingPrice: 0,
      totalPrice: 528.84,
      orderYear: 2021,
      orderMonth: 3,
      orderDay: 18,
      addressInfo: {
        fullName: "TestUser1",
        address: "",
        province: "",
        postalCode: "",
        phoneNumber: "",
      },
      paymentResult: {
        id: "",
        status: "",
        update_time: "",
        email_address: "TestUser1@gmail.com",
      },
    },
  ],
  usage: [
    {
      IPAddress: "163.38.185.173",
      visitDate: "2020-05-11T20:14:14.796Z",
      eventType: "View",
      productTag: "head-alpine-skis-3",
    },
    {
      IPAddress: "163.38.185.173",
      visitDate: "2020-05-12T20:14:14.796Z",
      eventType: "View",
      productTag: "helly-hansan-snow-pant-1",
    },
    {
      IPAddress: "163.38.185.173",
      visitDate: "2021-05-12T20:14:14.796Z",
      eventType: "View",
      productTag: "volkl-ski-poles-3",
    },
    {
      IPAddress: "163.38.185.173",
      visitDate: "2022-05-12T20:14:14.796Z",
      eventType: "View",
      productTag: "adidas-snowboard-shoe-1",
    },
    {
      IPAddress: "163.38.185.173",
      visitDate: "2022-05-12T20:20:14.796Z",
      eventType: "Cart",
      productTag: "adidas-snowboard-shoe-1",
    },
    {
      IPAddress: "163.38.185.173",
      visitDate: "2022-05-12T20:30:14.796Z",
      eventType: "Purchase",
      productTag: "adidas-snowboard-shoe-1",
    },
  ],
};
export default data;

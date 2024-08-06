export function generateRandomProductName() {
  const adjectives = [
    "Amazing",
    "Incredible",
    "Fantastic",
    "Gorgeous",
    "Elegant",
    "Stylish",
    "Modern",
    "Classic",
    "Premium",
    "Luxurious",
  ];
  const nouns = [
    "Gadget",
    "Device",
    "Accessory",
    "Item",
    "Product",
    "Tool",
    "Equipment",
    "Instrument",
    "Object",
    "Thing",
  ];
  const descriptors = [
    "High-Quality",
    "Low-Quantity",
    "Top-Tier",
    "Limited-Edition",
    "Budget-Friendly",
    "Exclusive",
    "Rare",
    "Common",
    "Durable",
    "Fragile",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomDescriptor =
    descriptors[Math.floor(Math.random() * descriptors.length)];
  const randomNumber = Math.floor(Math.random() * 1000); // Adding a random number for uniqueness

  return `${randomAdjective} ${randomDescriptor} ${randomNoun} ${randomNumber}`;
}

export function generateDummyPrice(min = 1000, max = 100000) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

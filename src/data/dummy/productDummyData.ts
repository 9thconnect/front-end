import { IProduct } from "@/components/cards/productCard";
import { WorkersData } from "@/components/tables/vendors/workers/columns";
import {
  generateDummyPrice,
  generateRandomProductName,
} from "@/utils/dummyDataGenerator";
import { generateRandomAlphanumeric } from "@/utils/generateAlphanumeric";

export const productDummyList: IProduct[] = [
  {
    id: generateRandomAlphanumeric(),
    category: "Electrical",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Electrical",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Electrical",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Electrical",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Roofing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Roofing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Roofing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Roofing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Plumbing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Plumbing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Plumbing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e-BNxh9EET2XVnCWTeI429jz2vSRLlUMnHevLnOHYY981qxitawMN34BUIQ2QemwCMiD6fbvNIFnyThPSkgOm6devPMbaRdf2uDp5tnFovLTb80kwhCsauNOBxaYE5Hfpp64A-pbHQhfkxN65ylZ1OKvHYKVMRaGj2lhWHF1Oslr6yMUd9HN3VQ3mzmn11RAojBpjTwW-cN8TkPXgFMn8jsf40cAcPCrXZ8D1OCVdh0QxHRlTGW2kbBlk~2JfTa2ttWkck9pRuQ~B56AY7CILjrHcQo8xZ1NitAQhOvvE4RpxR9a~N4kryiwjWOKPuDgA~Cov7-Jx3-QZUkZahMXiA__",
  },
  {
    id: generateRandomAlphanumeric(),
    category: "Plumbing",
    name: generateRandomProductName(),
    price: generateDummyPrice(),
    vendor: "Vendor name",
    discount: "-35%",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/1997/e1ee/d05cba93ca1bc7af9da1a5d44888c4c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PO8CBSIicpc9Z2yeO63ebC0EIIpRikKWJzDSgQu0dqtohK8P5TjGgDWlXqe6hTpZmra7mUqfuJgZIOeAFGUoq6M02t0wcvl9OggtHM6HAqqxreGcKxx8bHkAsvuezlLmzX~z9IgTFBqEiIgJstKxFDZ6meD6qb93xZB6CR~wZ0gbid3IFHSP36mVdXESQiO9jh0zfJE3JTlrZvAiJH5WR2mZlZjmNgVMHYcic1B6fQOROufrwmU0KTnOte1sYJKYb-C1zjWU9vkua5tXhxoK1QW2Re4oTivfw0XU3n-xhGDSYqkk-rN4niYam50z90jo3yb8CHMdBC0YIIOg2jc0ww__",
  },
];

export const workersDummy: WorkersData[] = [
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
  {
    id: generateRandomAlphanumeric(),
    status: ["enabled", "disabled"][Math.floor(Math.random() * 4)] as
      | "enabled"
      | "disabled",

    name: "Artisan Name",
    earning: 20000,
    tasks: 200,
    rating: 3,
  },
];

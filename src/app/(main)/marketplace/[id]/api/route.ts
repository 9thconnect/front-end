import { IProduct } from "@/components/cards/productCard";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product: IProduct = {
    id: params.id,
    name: "Dangote 3X, cement type CEMII 42.5R (A-L)",
    vendor: "7central Nigeria LTD",
    location: "Abuja, NG",
    price: 40000,
    reviews: "42",
    quantity: 23,
    unitsLeft: 400,
    sizes: ["25KG", "50KG", "100KG"],
    category: "Cement & Sand",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/19b0/bb3a/49dcb39747a04b018dc3dad5b69cc9c7?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qq-9ChUnYQSfljFjz0EQSkzSo51~gn8QSJQEH1nXfiNmQYq5Nio8PlJq8MH48Qor4UzWSL8YpkCuMUrT~jb-GnqJ8SaMXHErk-iin2tZg9~3zb-Clf-aHFaDg8WmA72dXu3hwEdGFC6fAxwxvYBhi3Q7iKlGwe3dDdXgAcgY9mFvBGddDH9PBa96~-iZ8WNnrLyGyvwoHazK8-7kyJTUiDWBgxidksKxmwvXkRVJmzcgdf2nBDKCSnsREvDroVu5E69jHnmjFAjGTT0NDOZyW2cU4AqsyejUlfHOdtnQcOzahvFrgoX2pZW9XXTSTB30gUFYM1jsI2mdA9zm01B6gA__",
  };
  return Response.json(product);
}

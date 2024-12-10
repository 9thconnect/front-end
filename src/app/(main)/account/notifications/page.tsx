import { NotificationsList } from "@/components/common/notification";
import NotificationPage from "@/components/pages/hire/notificationPage";
import React from "react";

const page = () => {
  const nots = [
    {
      _id: "674613a45b943b035764cfa5",
      customerTo: {
        _id: "66c4d700bdb4cd1259f1dd84",
        fullName: "Praise Amadi",
        phoneNumber: "08188693232",
        email: "o.ayomikun@gmail.com",
        avatar:
          "https://res.cloudinary.com/dd3skpojo/image/upload/v1724174175/Nav_Component_q3n6kk.png",
      },
      vendorFrom: {
        _id: "66f7fb0d9a9dfe149fbad1e0",
        fullName: "Kelly Frnak",
        vendorID: "MCD-004FNAN95",
        email: "o.emmanuel0512530@gmail.com",
        phoneNumber: "09033693246",
        vendorType: "professional",
        avatar:
          "https://res.cloudinary.com/dddofgfei/image/upload/v1721951829/b7qkzrk58st2i4buggkx.jpg",
      },
      isRead: false,
      message:
        "Vendor has REJECTED your offer for the reason been The price of things have increased, proposed price too small",
      notificationType: "offer",
      ownerType: "customer",
      offer: {
        _id: "67421886a353558662139df1",
        projectDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
        proposedPrice: 18000,
        status: "rejected",
      },
      profession: {
        _id: "66f7fb0d9a9dfe149fbad1e1",
        profession: "Contractors & Mange",
        professionName: "Engineer",
        professionID: "MCD-001DNJH81",
        price: 5000,
      },
      createdAt: "2024-11-26T18:29:56.866Z",
      updatedAt: "2024-11-26T18:29:56.866Z",
      __v: 0,
    },
    {
      _id: "67461503aee84dacd04e4f61",
      customerTo: {
        _id: "66c4d700bdb4cd1259f1dd84",
        fullName: "Praise Amadi",
        phoneNumber: "08188693232",
        email: "o.ayomikun@gmail.com",
        avatar:
          "https://res.cloudinary.com/dd3skpojo/image/upload/v1724174175/Nav_Component_q3n6kk.png",
      },
      vendorFrom: null,
      isRead: false,
      message:
        "Your offer has been ACCEPTED. Kindly make payment between now and Tuesday, December  3rd 2024 before it expires",
      notificationType: "offer",
      ownerType: "vendor",
      offer: {
        _id: "67421934a353558662139e02",
        projectDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
        proposedPrice: 18000,
        status: "accepted",
      },
      profession: {
        _id: "66f7fb0d9a9dfe149fbad1e1",
        profession: "Contractors & Mange",
        professionName: "Engineer",
        professionID: "MCD-001DNJH81",
        price: 5000,
      },
      createdAt: "2024-11-26T18:35:47.796Z",
      updatedAt: "2024-11-26T18:35:47.796Z",
      __v: 0,
    },
    {
      _id: "6746154caee84dacd04e4f73",
      customerTo: {
        _id: "66c4d700bdb4cd1259f1dd84",
        fullName: "Praise Amadi",
        phoneNumber: "08188693232",
        email: "o.ayomikun@gmail.com",
        avatar:
          "https://res.cloudinary.com/dd3skpojo/image/upload/v1724174175/Nav_Component_q3n6kk.png",
      },
      vendorFrom: null,
      isRead: false,
      message:
        "Your offer has been ACCEPTED. Kindly make payment between now and Tuesday, December  3rd 2024 before it expires",
      notificationType: "offer",
      ownerType: "vendor",
      offer: {
        _id: "67421947a353558662139e13",
        projectDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
        proposedPrice: 18000,
        status: "accepted",
      },
      profession: {
        _id: "66f7fb0d9a9dfe149fbad1e1",
        profession: "Contractors & Mange",
        professionName: "Engineer",
        professionID: "MCD-001DNJH81",
        price: 5000,
      },
      createdAt: "2024-11-26T18:37:00.502Z",
      updatedAt: "2024-11-26T18:37:00.502Z",
      __v: 0,
    },
    {
      _id: "674745e09a20c767e465d197",
      customerTo: {
        _id: "66c4d700bdb4cd1259f1dd84",
        fullName: "Praise Amadi",
        phoneNumber: "08188693232",
        email: "o.ayomikun@gmail.com",
        avatar:
          "https://res.cloudinary.com/dd3skpojo/image/upload/v1724174175/Nav_Component_q3n6kk.png",
      },
      vendorFrom: {
        _id: "66f7fb0d9a9dfe149fbad1e0",
        fullName: "Kelly Frnak",
        vendorID: "MCD-004FNAN95",
        email: "o.emmanuel0512530@gmail.com",
        phoneNumber: "09033693246",
        vendorType: "professional",
        avatar:
          "https://res.cloudinary.com/dddofgfei/image/upload/v1721951829/b7qkzrk58st2i4buggkx.jpg",
      },
      isRead: false,
      message:
        "One of your PROJECT / GIG has just been submitted and marked completed, kindly go the your projects on your dashboard for more details",
      notificationType: "project",
      ownerType: "customer",
      project: {
        _id: "6746dbd50e33490cc9d24017",
        projectDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
        projectID: "GMPK16012",
        status: "completed",
        approvedPrice: 18000,
      },
      profession: {
        _id: "66f7fb0d9a9dfe149fbad1e1",
        profession: "Contractors & Mange",
        professionName: "Engineer",
        professionID: "MCD-001DNJH81",
        price: 5000,
      },
      createdAt: "2024-11-27T16:16:32.899Z",
      updatedAt: "2024-11-27T16:16:32.899Z",
      __v: 0,
    },
  ];

  return (
    <div>
      <NotificationPage />
    </div>
  );
};

export default page;

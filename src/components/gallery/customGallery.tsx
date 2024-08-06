import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item, GalleryProps } from "react-photoswipe-gallery";

type ImageProps = {
  original: string;
  thumbnail: string;
  alt: string;
};

type CustomGalleryProps = {
  images: ImageProps[];
};

const CustomGallery: React.FC<CustomGalleryProps> = ({ images }) => {
  const mainImage = images[0];
  const thumbnails = images.slice(1);

  const smallItemStyles: React.CSSProperties = {
    cursor: "pointer",
    objectFit: "cover",
    width: "100%",
    maxHeight: "100%",
  };

  const uiElements: GalleryProps["uiElements"] = [
    {
      name: "custom-rotate-button",
      ariaLabel: "Rotate",
      order: 9,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner:
          '<path d="M13.887 6.078C14.258 6.234 14.5 6.598 14.5 7V8.517C18.332 8.657 21.258 10.055 23.15 12.367 24.519 14.041 25.289 16.13 25.496 18.409A1 1 0 0123.504 18.591C23.327 16.645 22.68 14.952 21.601 13.633 20.156 11.867 17.831 10.653 14.5 10.517V12A1.002 1.002 0 0112.779 12.693L10.304 10.121A1.002 1.002 0 0110.324 8.713L12.8 6.286A1 1 0 0113.887 6.078ZM7.5 16A1.5 1.5 0 006 17.5V24.5A1.5 1.5 0 007.5 26H17.5A1.5 1.5 0 0019 24.5V17.5A1.5 1.5 0 0017.5 16H7.5Z" id="pswp__icn-rotate"/>',
        outlineID: "pswp__icn-rotate",
      },
      appendTo: "bar",
      onClick: (e: any, el: any, pswpInstance: any) => {
        if (!pswpInstance.currSlide?.content.element) {
          return;
        }

        const item = pswpInstance.currSlide.content.element;

        const prevRotateAngle = Number(item.dataset.rotateAngle) || 0;
        const rotateAngle = prevRotateAngle === 270 ? 0 : prevRotateAngle + 90;

        // add slide rotation
        item.style.transform = `${item.style.transform.replace(
          `rotate(-${prevRotateAngle}deg)`,
          ""
        )} rotate(-${rotateAngle}deg)`;
        item.dataset.rotateAngle = String(rotateAngle);
      },
      onInit: (el: any, pswpInstance: any) => {
        // remove applied rotation on slide change
        // https://photoswipe.com/events/#slide-content-events
        pswpInstance.on("contentRemove", () => {
          if (!pswpInstance.currSlide?.content.element) {
            return;
          }

          const item = pswpInstance.currSlide.content.element;
          item.style.transform = `${item.style.transform.replace(
            `rotate(-${item.dataset.rotateAngle}deg)`,
            ""
          )}`;
          delete item.dataset.rotateAngle;
        });
      },
    },
  ];

  return (
    <Gallery uiElements={uiElements}>
      <div className="grid gap-4">
        <div>
          <Item<HTMLImageElement>
            original={mainImage.original}
            thumbnail={mainImage.thumbnail}
            width="1600"
            height="1066"
            alt={mainImage.alt}
          >
            {({ ref, open }) => (
              <img
                className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px] cursor-pointer"
                src={mainImage.thumbnail}
                ref={ref}
                onClick={open}
              />
            )}
          </Item>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((image, index) => (
            <Item<HTMLImageElement>
              key={index}
              original={image.original}
              thumbnail={image.thumbnail}
              width="1600"
              height="1066"
              alt={image.alt}
            >
              {({ ref, open }) => (
                <img
                  className="object-cover object-center rounded-lg cursor-pointer"
                  src={image.thumbnail}
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          ))}
        </div>
      </div>
    </Gallery>
  );
};

export default CustomGallery;

import MainBadge from "@/components/badges/mainBadge";
import { Payment } from "@/type/common";

export const renderPaymentStatus = (status: Payment["status"]) => {
  let el;
  switch (status) {
    case "pending":
      el = <MainBadge text={status} type="grey" />;
      break;
    case "approved":
      el = <MainBadge text={status} type="green" />;
      break;
    case "failed":
      el = <MainBadge text={status} type="red" />;
      break;
    default:
      el = <MainBadge text="Unknown" type="grey" />;
      break;
  }
  return el;
};

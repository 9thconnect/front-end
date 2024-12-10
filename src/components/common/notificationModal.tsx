// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import io, { Socket } from "socket.io-client";
// import { Button } from "../ui/button";
// import { BellDot, X } from "lucide-react";
// import { useRouter } from "next/router";
// import Link from "next/link";

// interface NotificationData {
//   id: string;
//   message: string;
//   notificationType?:
//     | "offer"
//     | "project"
//     | "product"
//     | "profession"
//     | "business"
//     | "wallet"
//     | "transaction";
//   ownerType: "vendor" | "customer";
//   vendorTo: string,
//   customerTo:string
// }

// interface NotificationModalProps {
//   notification: NotificationData;
//   onClose: () => void;
// }

// const NotificationModal: React.FC<NotificationModalProps> = ({
//   notification,
//   onClose,
// }) => {
//   //   const router = useRouter();
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <Button variant="outline" className="rounded-full">
//         <X />
//       </Button>

//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full flex flex-col justify-center items-center">
//         <BellDot size={100} color="red" className="animate-pulse" />
//         <h2 className="text-2xl font-bold mb-4 capitalize ">
//           {notification.notificationType ?? "Notification"}
//         </h2>
//         <p>{notification.message}</p>
//         <Link
//           href="/account/notifications"
//           className="mt-4 bg-black py-3 px-3 rounded-lg text-white cursor-pointer"
//         >
//           Go to Notifications
//         </Link>
//       </div>
//     </div>
//   );
// };

// const SocketNotificationListener: React.FC = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [notifications, setNotifications] = useState<NotificationData[]>([]);

//   // Create socket connection
//   useEffect(() => {
//     const newSocket = io("https://mcdonald-server.onrender.com", {
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//       transports: ["websocket", "polling"],
//       forceNew: true,
//       timeout: 5000,
//     });

//     // Connection event handlers
//     newSocket.on("connect", () => {
//       console.log("Socket connected successfully");
//     });

//     newSocket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//     });

//     // Listen for notifications
//     newSocket.on("in-app-notification", (data: NotificationData) => {
//       console.log("Received in-app notification:", data);

//       // Add new notification to the list
//       setNotifications((prev) => [
//         ...prev,
//         {
//           ...data,
//           id: data.id || Math.random().toString(36).substr(2, 9),
//         },
//       ]);
//     });

//     setSocket(newSocket);

//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Remove a specific notification
//   const handleCloseNotification = useCallback((id: string) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   }, []);

//   // If no notifications, render nothing
//   if (notifications.length === 0) return null;

//   return (
//     <>
//       {notifications.map((notification) => (
//         <NotificationModal
//           key={notification.id}
//           notification={notification}
//           onClose={() => handleCloseNotification(notification.id)}
//         />
//       ))}
//     </>
//   );
// };

// export default SocketNotificationListener;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  BellDot,
  X,
  Award,
  Briefcase,
  Package,
  TrendingUp,
  Wallet,
  CreditCard,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";

// Type mapping for icons
const notificationIcons = {
  offer: Award,
  project: Briefcase,
  product: Package,
  profession: TrendingUp,
  business: Briefcase,
  wallet: Wallet,
  transaction: CreditCard,
  default: UserCheck,
};

interface NotificationData {
  id: string;
  message: string;
  notificationType?:
    | "offer"
    | "project"
    | "product"
    | "profession"
    | "business"
    | "wallet"
    | "transaction";
  ownerType: "vendor" | "customer";
  vendorTo: string;
  customerTo: string;
}

const SocketNotificationListener: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);

  // Get the logged-in user's ID
  const user = useAppSelector((state) => state.auth.data);

  // Create socket connection
  useEffect(() => {
    const newSocket = io("https://mcdonald-server.onrender.com", {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
      forceNew: true,
      timeout: 5000,
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Listen for notifications
    newSocket.on("in-app-notification", (data: NotificationData) => {
      console.log("Received in-app notification:", data);

      // Filter notifications based on user type and ID
      const shouldShowNotification =
        (user && data.ownerType === "vendor" && data.vendorTo === user._id) ||
        (user && data.ownerType === "customer" && data.customerTo === user._id);

      if (shouldShowNotification) {
        // If no current notification, show immediately
        if (!currentNotification) {
          setCurrentNotification(data);
        } else {
          // Otherwise, add to queue
          setNotifications((prev) => [
            ...prev,
            {
              ...data,
              id: data.id || Math.random().toString(36).substr(2, 9),
            },
          ]);
        }
      }
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [user, currentNotification]);

  // Dismiss current notification and show next in queue
  const handleDismissNotification = useCallback(() => {
    // If there are more notifications in the queue, show the next one
    if (notifications.length > 0) {
      const [nextNotification, ...remainingNotifications] = notifications;
      setCurrentNotification(nextNotification);
      setNotifications(remainingNotifications);
    } else {
      // If no more notifications, clear current
      setCurrentNotification(null);
    }
  }, [notifications]);

  // If no current notification, render nothing
  if (!currentNotification) return null;

  // Dynamically select icon based on notification type
  const NotificationIcon =
    notificationIcons[currentNotification.notificationType || "default"];

  return (
    <Dialog
      open={!!currentNotification}
      onOpenChange={() => handleDismissNotification()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="capitalize flex items-center">
              <NotificationIcon
                size={24}
                className={`mr-2 ${
                  currentNotification.notificationType === "transaction"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              />
              {currentNotification.notificationType ?? "Notification"}
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismissNotification}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="mt-2">
            {currentNotification.message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4 space-x-4">
          <Link
            href="/account/notifications"
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Notifications
          </Link>
          <Button variant="outline" onClick={handleDismissNotification}>
            Dismiss
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocketNotificationListener;

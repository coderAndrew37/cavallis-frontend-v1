import { useEffect, useState } from "react";

const ExitIntentPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // ✅ Check if the user has completed an order
    const orderCompleted = localStorage.getItem("order_completed");
    if (orderCompleted) return; // 🚫 Don't show popup if order is completed

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY < 50) setShowPopup(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const closePopup = () => setShowPopup(false);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg">
        <h3 className="text-xl font-bold">Wait! Get 10% Off Now! 🎉</h3>
        <p>
          Use code <strong>CAVALLIS10</strong> at checkout!
        </p>
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
          onClick={closePopup}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;

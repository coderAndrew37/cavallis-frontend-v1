const ProductSkeleton = () => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded mt-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded mt-4"></div>
    </div>
  );
};

export default ProductSkeleton;

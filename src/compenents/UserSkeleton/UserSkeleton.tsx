const UserSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-16 bg-gray-100 rounded"></div>
      </div>
    </div>
    <div className="h-8 w-20 bg-gray-100 rounded-lg"></div>
  </div>
);

export default UserSkeleton;
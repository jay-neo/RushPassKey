
export default () => {
    return <>
        <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Search"
        className="w-1/2 p-2 rounded border border-gray-300"
      />
      <div className="flex space-x-2">
        <span className="p-2 bg-orange-100 rounded-full">Account</span>
        <span className="p-2 bg-gray-100 rounded-full">URL</span>
        <span className="p-2 bg-gray-100 rounded-full">Email</span>
        <span className="p-2 bg-gray-100 rounded-full">Username</span>
        <span className="p-2 bg-gray-100 rounded-full">Phone</span>
        <span className="p-2 bg-gray-100 rounded-full">SSH</span>
      </div>
      <button className="p-2 bg-green-100 rounded-full">+</button>
    </div>
    </>
}
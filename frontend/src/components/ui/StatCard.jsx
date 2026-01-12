const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-red-500 mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;

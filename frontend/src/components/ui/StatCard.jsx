const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:scale-105 transition">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;

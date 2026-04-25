interface statProps {
  total: number,
  online: number,
  offline: number
}

const statStyles = {
  container: "flex gap-4 mb-6",
  card: "flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100",
  label: "text-xs text-gray-500 uppercase font-bold tracking-wider",
  value: "text-2xl font-bold text-gray-800"
};

const StatBar = ({total, online, offline}: statProps) => {
  return (
    <div className={statStyles.container}>
    <div className={statStyles.card}>
      <p className={statStyles.label}>Total</p>
      <p className={statStyles.value}>{total}</p>
    </div>
    <div className={statStyles.card}>
      <p className={statStyles.label}>Online</p>
      <p className={statStyles.value + " text-green-600"}>{online}</p>
    </div>
    <div className={statStyles.card}>
      <p className={statStyles.label}>Offline</p>
      <p className={statStyles.value + " text-gray-400"}>{offline}</p>
    </div>
  </div>
  )
}

export default StatBar;
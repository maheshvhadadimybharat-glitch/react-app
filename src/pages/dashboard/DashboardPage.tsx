import { useUsers } from "../../features/user/hooks/useUsers";
import Sidebar from "../../widgets/sidebar/Sidebar";

const DashboardPage = () => {
  const { data, isLoading } = useUsers();

  if (isLoading) return <p>Loading...</p>;

  return(
    <div>
      <Sidebar/>
      <main>
        {data?.map((user: any) => (
          <div key={user.id}> {user.name} </div>
        ))}
      </main>
    </div>
  )
}

export default DashboardPage;
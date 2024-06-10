import Search from "src/components/search";
import PasswordCard from "src/components/ui/PasswordPreview";

export default () => {
  return (
    <div className={`flex-1 lg:mt-2xl transition-all duration-300 mt-3`}>
      <Search />
      <div className="mt-4 p-4 max-w-[80rem] relactive w-full md:mx-auto">
        <PasswordCard
          title="Googasdfasfasfsasdfsadfsadfsaddafle"
          url="googlasdfasdfasdfasdfsade.com"
          lastUpdated="20:32 05/08/2024"
          lastUsed="20:32 05/08/2024"
          username="usernaaaasdfasdasdasdfasdfasdfasdffasdfsdfasdfasdfasdfsdfsadfme"
          email="youremailasdfsadfasdfsadfsadf@gmail.com"
          password="asdfaasfasasdasasdfsadfdfadsffasfsadfsadfsdfdfasdfasdfasdfsdf"
        />
        <PasswordCard
          title="Faasdfadafebook"
          url="facebook.com"
          lastUpdated="20:32 05/08/2024"
          lastUsed="20:32 05/08/2024"
          username="myuserasddfname"
          phone="312423434334"
          email="youremaiasdfl2@gmail.com"
          password="asdfasdf"
        />
      </div>
    </div>
  );
};

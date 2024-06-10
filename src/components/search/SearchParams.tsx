
import { useLocation, useNavigate } from 'react-router-dom';


export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const topics = ["All", "Account", "URL", "Email", "Username", "Phone", "SSH"];

  const searchParams = new URLSearchParams(location.search);
  const currentTopic = searchParams.get("topic") || "All";

  const handleTopicChange = (topic: string) => {
    const params = new URLSearchParams(location.search);
    if (topic === "All") {
      params.delete("topic");
    } else {
      params.set("topic", topic);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="mt-1 mx-auto max-w-2xl">
      <div className="flex items-center w-full space-x-4 mr-4 py-2 overflow-x-auto scrollbar-hide">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicChange(topic)}
            className={`px-4 py-1 rounded-full whitespace-nowrap text-sm
              ${currentTopic === topic
                ? "bg-fuchsia-600 text-white font-bold"
                : "border-2 border-purple-700 text-indigo-700 font-bold"}
            `}
          >
            <span>{topic}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
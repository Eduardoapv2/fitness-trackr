import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function List(){
    const { 
        data: activities,
        loading,
        error,
    } = useQuery("/activities", "activities");
    
    if (loading || !activities) return <p>Loading...</p>;
    if (error) return <p>Sorry! {error}</p>;

    return (
        <ul>
            {activities.map((activity)=>(
                <ListItem key = {activity.id} activity={activity}/>
            ))}
        </ul>
    );
}

function ListItem({activity}){
    const {token} = useAuth();
    const {
        mutate: deleteActivity,
        loading,
        error,
    } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

    return (
        <li>
            <p>{activity.name}</p>
            {token && (
                <button onClick={()=> deleteActivity()}>
                    {loading ? "Deleting" : error ? error : "Delete"}
                </button>
            )}
        </li>
    );
}
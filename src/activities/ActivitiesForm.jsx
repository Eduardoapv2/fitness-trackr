import useMutation from "../api/useMutation";

export default function ActivitiesForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/activities", ["activities"]);

  const addActivity = (formData) => {
    const name = formData.get("name");
 const description = formData.get("description");
 add({name, description});
    
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error adding activity</p>;
  return (
    <div>
      <h2>Add a new activity. </h2>
      <form action={addActivity}>
        <label>Name</label>
        <input type="text" placeholder="Name" required />

        <label>Description</label>
        <input type="text" placeholder="Description" required />

        <button type="submit">Add activity</button>
      </form>
    </div>
  );
}

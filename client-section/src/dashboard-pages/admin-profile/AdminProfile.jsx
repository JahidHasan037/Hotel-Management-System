import useMeal from "../../Hooks/useMeal";
import useUser from "../../Hooks/useUser";

const AdminProfile = () => {

    const { users } = useUser('single'); //console.log(users);
    const { meals } = useMeal(undefined, undefined, undefined, undefined, undefined, undefined, 'countAddedMeal'); //console.log(meals);

    if (!users.length) return <span className="loading loading-bars loading-lg"></span>

    const { name, email, photoUrl, membership, meal_added } = users[0];

    return (
        <div className="flex flex-col items-center mt-10 p-6 bg-base-200 dark:bg-slate-600  rounded-lg shadow-lg max-w-md mx-auto">
            {/* User Image */}
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={photoUrl} alt={`${name}'s avatar`} />
                </div>
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-semibold text-primary dark:text-blue-300">Name:{name}</h2>

            {/* User Email */}
            <p className="text-sm text-neutral dark:text-white mt-2">Email: {email}</p>
            {/* meal added count  */}
            <p className="text-sm text-neutral dark:text-white mt-2">MealAdded: {meals?.length || 0}</p>

            {/* Badges */}
            <div className="mt-6 flex justify-center gap-2">
                <div className="badge badge-warning">{membership}</div>
            </div>
        </div>
    );
};

export default AdminProfile;
import useUser from "../../Hooks/useUser";


const UserProfile = () => {

    const { users } = useUser('single'); console.log(users);

    if (!users.length) return <span className="loading loading-bars loading-lg"></span>

    const { name, email, photoUrl, membership } = users[0];

    return (
        <div className="flex flex-col items-center mt-10 p-6  rounded-lg shadow-lg max-w-md mx-auto dark:bg-slate-600">
            {/* User Image */}
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={photoUrl} alt={`${name}'s avatar`} />
                </div>
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-semibold text-primary dark:text-blue-400">{name}</h2>

            {/* User Email */}
            <p className="text-sm text-neutral dark:text-white mt-2">{email}</p>

            {/* Badges */}
            <div className="mt-6 flex justify-center gap-2">
                <div className="badge badge-warning">{membership}</div>
            </div>
        </div>
    );
};

export default UserProfile;
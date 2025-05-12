import SectionTitle from "../../../shared-component/section-title/SectionTitle";

const teamMembers = [
    {
        name: "Holden Caulfield", role: "Head Chef",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Henry Letham", role: "Sous Chef",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Oskar Blinde", role: "Restaurant Manager",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "John Doe", role: "Pastry Chef",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Martin Eden", role: "Waiter Supervisor",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Boris Kitua", role: "Bartender",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Atticus Finch", role: "Food Quality Inspector",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Alper Kamu", role: "Marketing & Promotions",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
    {
        name: "Rodrigo Monchi", role: "Customer Service Manager",
        image: "https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=1024x1024&w=is&k=20&c=EpLEZWEw-pZhhhknmmxUubZK_UL7EuXzMe202LEu3SA="
    },
];

const TeamSection = () => {
    return (
        <section className="body-font">
            <div>
                <div className="flex flex-col text-center w-full mb-10 lg:mb-20">
                    <SectionTitle title={"Our Team"} />
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        "Meet our passionate team dedicated to crafting delightful dishes and exceptional dining experiences, ensuring every meal is a memorable one."
                    </p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div className="h-full flex items-center border-gray-200 dark:border-blue-500 bg-gray-100 dark:bg-slate-600 border p-4 rounded-lg">
                                <img
                                    alt={member.name}
                                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                    src={member.image}
                                />
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 dark:text-blue-300 title-font font-medium">{member.name}</h2>
                                    <p className="text-gray-500 dark:text-white">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default TeamSection;

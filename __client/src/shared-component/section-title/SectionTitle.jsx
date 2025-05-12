

export const SectionTitle = ({ title }) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-4 lg:my-6'>
            <h2 className='text-3xl lg:text-4xl uppercase font-semibold py-4 lg:py-6 '>{title}</h2>
        </div>
    );
};

export default SectionTitle;
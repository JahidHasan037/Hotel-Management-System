import SectionTitle from "../../../shared-component/section-title/SectionTitle";
import userImage from '../../../assets/logo/userImg.jpg'


const Testimonials = () => {


    const testimonials = [
        {
            quote: "The food was absolutely delicious! The flavors were rich, and the presentation was stunning. I can't wait to come back!",
            name: "Sarah Johnson",
            title: "Food Enthusiast",
            imgSrc: userImage
        },
        {
            quote: "Amazing service and cozy ambiance! The staff was very friendly, and the desserts were the best I've ever had.",
            name: "David Smith",
            title: "Regular Customer",
            imgSrc: userImage
        },
        {
            quote: "A wonderful experience! The flavors were perfectly balanced, and the atmosphere was warm and inviting. Highly recommend!",
            name: "Emily Clark",
            title: "Travel Blogger",
            imgSrc: userImage
        },
        {
            quote: "Every dish was a delight! The attention to detail and the friendly service made the whole experience unforgettable.",
            name: "John Miller",
            title: "Food Critic",
            imgSrc: userImage
        }
    ];


    return (
        <section className="body-font">
            <div>

                <SectionTitle title={"what our customers say"} />

                <div className="flex flex-wrap -m-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4 md:w-1/2 w-ful">
                            <div className="h-full bg-gray-100 p-8 rounded  dark:bg-slate-600">
                                <p className="leading-relaxed mb-6">
                                    "{testimonial.quote}"
                                </p>
                                <div className="inline-flex items-center">
                                    <img
                                        alt="testimonial"
                                        src={testimonial.imgSrc}
                                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                                    />
                                    <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium text-gray-900 dark:text-blue-300">{testimonial.name}</span>
                                        <span className="text-gray-500 dark:text-white text-sm">{testimonial.title}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
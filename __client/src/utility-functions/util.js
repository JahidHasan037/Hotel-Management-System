//reusable function for publishing meal.

import Swal from "sweetalert2";

export const handleMealPublish = async (each, axiosSecure, refetch) => {
    //console.log(id);
    try {

        const deleteRes = await axiosSecure.delete(`/upcoming/${each?._id}`); console.log(deleteRes.data);

        if (deleteRes.data.deletedCount) {

            //deleting id because it will create problem while inserting in mongodb
            delete each._id; //console.log('for security checking item', each)

            const addRes = await axiosSecure.post(`/meals`, each); console.log(addRes.data);

            if (addRes.data.insertedId) {
                refetch();
                Swal.fire({ icon: "success", title: "Meal Published" })
            }
        }
    } catch (error) {
        console.log(error);
    }

}
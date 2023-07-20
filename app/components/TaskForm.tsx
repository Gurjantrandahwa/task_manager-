import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

interface TaskFormProps {
    onSubmit: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({onSubmit}) => {

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
        }),

        onSubmit: (values) => {
            onSubmit(values.title, values.description);
            formik.resetForm();
        },
    });

    return <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

        <input
            className={"w-full border border-blue-300 drop-shadow py-2 px-4 rounded outline-blue-600"}
            type="text"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
        />

        {formik.touched.title && formik.errors.title && (
            <div className="text-sm text-red-600">{formik.errors.title}</div>
        )}

        <textarea
            className={"w-full  border border-blue-300 drop-shadow py-2 px-4 rounded outline-blue-600"}
            placeholder="Description"
            name="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
            <div className="text-sm text-red-600">{formik.errors.description}</div>
        )}
        <button
            className={"w-full bg-blue-600 text-white rounded py-2"}
            type="submit"
        >
            Add Task
        </button>
    </form>
}

export default TaskForm;

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

    return <form onSubmit={formik.handleSubmit} className="flex flex-col flex-1 max-w-md">
        <input
            className="drop-shadow p-2 rounded outline-[#068FFF] border border-[#068FFF] w-full"
            type="text"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
        />
        {formik.touched.title && formik.errors.title && (
            <div className="text-sm text-red-600 mt-2">{formik.errors.title}</div>
        )}
        <textarea
            className="drop-shadow p-2 w-full rounded outline-[#068FFF] mt-6 border border-[#068FFF]"
            placeholder="Description"
            name="description"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
            <div className="text-sm text-red-600 mt-2">{formik.errors.description}</div>
        )}
        <button
            className="bg-[#068FFF] text-white px-8 py-2 rounded w-full mt-6"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
        >
            Add Task
        </button>
    </form>
}

export default TaskForm;

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";

const EmployeeForm = ({ fetchEmployees, editData, setEditData }) => {
  const isEdit = Boolean(editData);

  const formik = useFormik({
    initialValues: {
      empid: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      address: "",
      department: "",
      designation: "",
    },
    validationSchema: Yup.object({
      empid: Yup.string().required("Required"),
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid").required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (isEdit) {
        await axios.put(
          `http://localhost:3000/api/v1/employees/${values.empid}`,
          values
        );
        setEditData(null);
      } else {
        await axios.post("http://localhost:3000/api/v1/employees", values);
      }
      resetForm();
      fetchEmployees();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editData) {
      formik.setValues(editData);
    }
  }, [editData]);

  return (
    <form onSubmit={formik.handleSubmit} className="input__form">
      <div className="input__fields">
        {[
          "empid",
          "firstname",
          "lastname",
          "phone",
          "email",
          "address",
          "department",
          "designation",
        ].map((field) => (
          <div key={field} className="input__field">
            <label>{field} :</label>
            <input
              name={field}
              placeholder={"Enter " + field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="error">{formik.errors[field]}</div>
            )}
          </div>
        ))}
      </div>
      <button className="submit__btn" type="submit">
        {isEdit ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default EmployeeForm;

import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CommentForm.scss";

const CommentForm = ({ publication }) => {
   const formik = useFormik({
      initialValues: {
         comment: "",
      },
      validationSchema: Yup.object({
         comment: Yup.string().required(),
      }),
      onSubmit: (formData) => {
         console.log(formData);
      },
   });

   return (
      <Form className="comment-form" onSubmit={formik.handleSubmit}>
         <Form.Input
            placeholder="Agrega tu comentario"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.errors.comment && true}
         />
         <Button type="submit">Publicar</Button>
      </Form>
   );
};

export default CommentForm;

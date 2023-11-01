//@flow
import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { CapacitorHttp } from "@capacitor/core";
import type { FormikProps } from "formik";
import productVal from "../../lib/adminVal/productVal";

const validate = productVal;
type AdminForm1 = {
  show: boolean,
  onClose: () => void,
};

type ProductValues = {
  productName: string | void,
  productCategory: string | void,
  productStock: string | void,
  productPrice: string | void,
};

const initialValues: ProductValues = {
  productName: "",
  productCategory: "Flower",
  productStock: "",
  productPrice: "",
};

interface ProductPayload {
  productName: string;
  productCategory: string;
  productStock: string;
  productPrice: string;
  imageUrl: string;
}

interface Image {
  filename: string;
  data: string;
}

const ProductForm = ({ show, onClose }: AdminForm1): React$Element<any> => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];

    setSelectedFile(file);

    e.target.value = null;
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (values: ProductValues) => {
    const apiUrl = "/api/products";

    function readFileAsBase64(file: any) {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          const base64Data = event.target.result.split(",")[1];
          resolve(base64Data);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }

    const base64Data = await readFileAsBase64(selectedFile);

    const imageInfo: Image = {
      filename: selectedFile.name,
      data: base64Data,
    };

    const productPayload = {
      values,
      imageInfo,
    };

    const productData = JSON.stringify(productPayload);

    try {
      const options = {
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          authorization: "include",
        },
        data: productData,
      };

      const response = await CapacitorHttp.post(options);

      if (response.status === 200) {
        console.log("Product submission successful");
      } else {
        const responseBody = await response.json();
        console.log(responseBody);
        console.error("Product submission request failed");
      }
    } catch (error) {
      console.error(error, "Product submission request error");
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          {(formikProps: FormikProps<ProductValues>) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label className="fw-bold">Product Name</Form.Label>
                <Field
                  type="text"
                  name="productName"
                  as={Form.Control}
                  placeholder="Enter Product Name"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="productCategory">
                <Form.Label className="fw-bold pt-4">
                  Product Category
                </Form.Label>
                <Field as="select" name="productCategory">
                  <option value="Flower">Flower</option>
                  <option value="Edibles">Edibles</option>
                  <option value="Growing-Equipment">Growing-Equipment</option>
                  <option value="Vaping">Vaping</option>
                  <option value="CBD/Hemp">CBD/Hemp</option>
                  <option value="Rolling-Papers">Rolling-Papers</option>
                  <option value="Smoking-Equipment">Smoking-Equipment</option>
                </Field>
                <ErrorMessage
                  name="productCategory"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="productStock">
                <Form.Label className="fw-bold pt-4">Product Stock</Form.Label>
                <Field
                  type="number"
                  name="productStock"
                  as={Form.Control}
                  placeholder="Enter Product Stock"
                />
                <ErrorMessage
                  name="productStock"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="productPrice">
                <Form.Label className="fw-bold pt-4">Product Price</Form.Label>
                <Field
                  type="number"
                  name="productPrice"
                  step="1.00"
                  as={Form.Control}
                  placeholder="Enter Product Price"
                />

                <ErrorMessage
                  name="productPrice"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="primary" type="submit" className="mt-3">
                  upload Product
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>

        <div class="mb-3">
          <form encType="multipart/form-data" className="pt-3">
            <input
              class="form-control"
              type="file"
              ref={fileInputRef}
              name="file"
              accept="image/*"
              onChange={handleFileInputChange}
              id="formFile"
            />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;

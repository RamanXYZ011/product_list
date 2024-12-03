import React from "react";
import { Form } from "react-bootstrap";

const CustomForm = () => {
  return (
    <div className="container bg-info rounded-4">
      <Form className="p-3 ">
        <h3 className="text-center">Add ME Products</h3>
        <div class="mb-3">
          <label for="name" class="form-label">
            Product Name:
          </label>
          <input type="text" id="name" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="price" class="form-label">
            Price:
          </label>
          <input type="number" id="price" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="msg" class="form-label">
            Description:
          </label>
          <textarea id="msg" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label for="msg" class="form-label">
            Description:
          </label>
          <input
            type="file"
            id="price"
            class="form-control"
            accept="image/.jpg"
          />
        </div>

        <button class="btn btn-dark">Submit</button>
      </Form>
    </div>
  );
};

export default CustomForm;

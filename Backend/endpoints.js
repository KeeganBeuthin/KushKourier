//@flow
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'kushKourier',
    version: '1.0.0',
  },
    paths: {
      '/api/login': {
        post: {
          operationId: 'loginUser', // Define the operationId
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  // Define the request body schema for the login endpoint
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Login successful',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
      '/api/register': {
        post: {
          operationId: 'registerUser', // Define the operationId
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  // Define the request body schema for the register endpoint
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    cpassword: { type: 'string' }
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Registration successful',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
      '/api/cookieVal': {
        post: {
          operationId: 'cookieValidate',
          responses: {
            '200': {
              description: 'Validated'
            },
            '400': {
              description: 'Validation Failed'
            }
          }
        }
      },
      '/api/products': {
        post: {
          operationId: 'createProduct',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productName: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'integer' },
                    category: { type: 'string' },
                    discount: { type: 'number' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Product created successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
        put: {
          operationId: 'updateProduct',
          parameters: [
            {
              name: 'productId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productName: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'integer' },
                    category: { type: 'string' },
                    discount: { type: 'number' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Product updated successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
        delete: {
          operationId: 'deleteProduct',
          parameters: [
            {
              name: 'productId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '204': {
              description: 'Product deleted successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
         
        },
        get: {
          operationId: 'getProducts',
          responses: {
            '200': {
              description: 'Products retrieved successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
       
      },
      '/api/products/{productId}': {
        get: {
          operationId: 'getProductById',
          parameters: [
            {
              name: 'productId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '200': {
              description: 'Product retrieved successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
      '/api/users': {
        get: {
          operationId: 'getUsers',
          responses: {
            '200': {
              description: 'Users retrieved successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },
      '/api/users/{userId}': {
        get: {
          operationId: 'getUserById',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '200': {
              description: 'User retrieved successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
        put: {
          operationId: 'updateUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'User updated successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
        delete: {
          operationId: 'deleteUser',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: { type: 'integer' },
            },
          ],
          responses: {
            '204': {
              description: 'User deleted successfully',
            },
            '400': {
              description: 'Bad Request',
            },
          },
        },
      },

    },
  }





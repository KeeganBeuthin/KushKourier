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
          operationId: 'loginUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user', 
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
          operationId: 'registerUser', 
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user', 
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
                  $ref: '#/components/schemas/product', 
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
                  $ref: '#/components/schemas/product', 
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
        post: {
          operationId: 'updateUserName',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user', 
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
    components: {
     schemas: {
      user: {
       type: 'object',
       properties: {
        username: {
         type: 'string'
         },
         password: {
          type: 'string'
        },
         email: {
          type: 'string'
       },
       cpassword: {
        type: 'string'
       },

      }
     },
     product: {
      type: 'object',
      properties: {
        product_name: {
        type: 'string'
        },
        price: {
          type: 'integer'
        },
        stock: {
          type: 'integer'
        },
        category: {
          type: 'string'
        },
        discount: {
          type: 'integer'
        }
      }
     }
   }
  }
 }





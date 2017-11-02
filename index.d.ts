/**
 * Runtime expressions allow defining values based on information that will only be 
 * available within the HTTP message in an actual API call.
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#runtime-expressions
 */
export type RunTimeExpression = string;

/**
 * This is the root document object of the [OpenAPI document](#oasDocument).
 * 
 */
export interface IOpenApiObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * This string MUST be the [semantic version 
   * number](http://semver.org/spec/v2.0.0.html) of the [OpenAPI Specification 
   * version](#versions) that the OpenAPI document uses. The `openapi` field SHOULD 
   * be used by tooling specifications and clients to interpret the OpenAPI document. 
   * This is not related to the API [`info.version`](#infoVersion) string.
   */
  openapi: string;

  /**
   * Provides metadata about the API. The metadata MAY be used by tooling as 
   * required.
   */
  info: IInfoObject;

  /**
   * An array of Server Objects, which provide connectivity information to a target 
   * server. If the `servers` property is not provided, or is an empty array, the 
   * default value would be a [Server Object](#serverObject) with a [url](#serverUrl) 
   * value of `/`.
   */
  servers?: Array<IServerObject>;

  /**
   * The available paths and operations for the API.
   */
  paths: IPathsObject;

  /**
   * An element to hold various schemas for the specification.
   */
  components?: IComponentsObject;

  /**
   * A declaration of which security mechanisms can be used across the API. The list 
   * of values includes alternative security requirement objects that can be used. 
   * Only one of the security requirement objects need to be satisfied to authorize a 
   * request. Individual operations can override this definition.
   */
  security?: Array<ISecurityRequirementObject>;

  /**
   * A list of tags used by the specification with additional metadata. The order of 
   * the tags can be used to reflect on their order by the parsing tools. Not all 
   * tags that are used by the [Operation Object](#operationObject) must be declared. 
   * The tags that are not declared MAY be organized randomly or based on the tools' 
   * logic. Each tag name in the list MUST be unique.
   */
  tags?: Array<ITagObject>;

  /**
   * Additional external documentation.
   */
  externalDocs?: IExternalDocumentationObject;
}

/**
 * The object provides metadata about the API.
 * The metadata MAY be used by the clients if needed, and MAY be presented in 
 * editing or documentation generation tools for convenience.
 * @example:
```json
  {
    "title": "Sample Pet Store App",
    "description": "This is a sample server for a pet store.",
    "termsOfService": "http://example.com/terms/",
    "contact": {
      "name": "API Support",
      "url": "http://www.example.com/support",
      "email": "support@example.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.1"
  }
```

```yaml
  title: Sample Pet Store App
  description: This is a sample server for a pet store.
  termsOfService: http://example.com/terms/
  contact:
    name: API Support
    url: http://www.example.com/support
    email: support@example.com
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.1
```
 */
export interface IInfoObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The title of the application.
   */
  title: string;

  /**
   * A short description of the application. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * A URL to the Terms of Service for the API. MUST be in the format of a URL.
   */
  termsOfService?: string;

  /**
   * The contact information for the exposed API.
   */
  contact?: IContactObject;

  /**
   * The license information for the exposed API.
   */
  license?: ILicenseObject;

  /**
   * The version of the OpenAPI document (which is distinct from the [OpenAPI 
   * Specification version](#oasVersion) or the API implementation version).
   */
  version: string;
}

/**
 * Contact information for the exposed API.
 * @example:
```json
  {
    "name": "API Support",
    "url": "http://www.example.com/support",
    "email": "support@example.com"
  }
```

```yaml
  name: API Support
  url: http://www.example.com/support
  email: support@example.com
```
 */
export interface IContactObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The identifying name of the contact person/organization.
   */
  name?: string;

  /**
   * The URL pointing to the contact information. MUST be in the format of a URL.
   */
  url?: string;

  /**
   * The email address of the contact person/organization. MUST be in the format of 
   * an email address.
   */
  email?: string;
}

/**
 * License information for the exposed API.
 * @example:
```json
  {
    "name": "Apache 2.0",
    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  }
```

```yaml
  name: Apache 2.0
  url: http://www.apache.org/licenses/LICENSE-2.0.html
```
 */
export interface ILicenseObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The license name used for the API.
   */
  name: string;

  /**
   * A URL to the license used for the API. MUST be in the format of a URL.
   */
  url?: string;
}

/**
 * An object representing a Server.
 * @example:
```json
  {
    "url": "https://development.gigantic-server.com/v1",
    "description": "Development server"
  }
```

```yaml
  url: https://development.gigantic-server.com/v1
  description: Development server
```

The following shows how multiple servers can be described, for example, at the OpenAPI Object's [`servers`](#oasServers):

```json
  {
    "servers": [
      {
        "url": "https://development.gigantic-server.com/v1",
        "description": "Development server"
      },
      {
        "url": "https://staging.gigantic-server.com/v1",
        "description": "Staging server"
      },
      {
        "url": "https://api.gigantic-server.com/v1",
        "description": "Production server"
      }
    ]
  }
```

```yaml
  servers:
  - url: https://development.gigantic-server.com/v1
    description: Development server
  - url: https://staging.gigantic-server.com/v1
    description: Staging server
  - url: https://api.gigantic-server.com/v1
    description: Production server
```

The following shows how variables can be used for a server configuration:

```json
  {
    "servers": [
      {
        "url": "https://{username}.gigantic-server.com:{port}/{basePath}",
        "description": "The production API server",
        "variables": {
          "username": {
            "default": "demo",
            "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
          },
          "port": {
            "enum": [
              "8443",
              "443"
            ],
            "default": "8443"
          },
          "basePath": {
            "default": "v2"
          }
        }
      }
    ]
  }
```

```yaml
  servers:
  - url: https://{username}.gigantic-server.com:{port}/{basePath}
    description: The production API server
    variables:
      username:
        # note! no enum here means it is an open value
        default: demo
        description: this value is assigned by the service provider, in this example `gigantic-server.com`
      port:
        enum:
          - '8443'
          - '443'
        default: '8443'
      basePath:
        # open meaning there is the opportunity to use special base paths as assigned by the provider, default is `v2`
        default: v2
```
 */
export interface IServerObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A URL to the target host.  This URL supports Server Variables and MAY be 
   * relative, to indicate that the host location is relative to the location where 
   * the OpenAPI document is being served. Variable substitutions will be made when a 
   * variable is named in `{`brackets`}`.
   */
  url: string;

  /**
   * An optional string describing the host designated by the URL. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * A map between a variable name and its value.  The value is used for substitution 
   * in the server's URL template.
   */
  variables?: Map<string,IServerVariableObject>;
}

/**
 * An object representing a Server Variable for server URL template substitution.
 * 
 */
export interface IServerVariableObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * An enumeration of string values to be used if the substitution options are from 
   * a limited set.
   */
  enum?: Array<string>;

  /**
   * The default value to use for substitution, and to send, if an alternate value is 
   * not supplied. Unlike the [Schema Object's](#schemaObject) `default`, this value 
   * MUST be provided by the consumer.
   */
  default: string;

  /**
   * An optional description for the server variable. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;
}

/**
 * Holds a set of reusable objects for different aspects of the OAS.
 * All objects defined within the components object will have no effect on the API 
 * unless they are explicitly referenced from properties outside the components 
 * object.
 * @example:
```null
  User
  User_1
  User_Name
  user-name
  my.org.User
```

Components Object Example

```json
  "components": {
    "schemas": {
      "Category": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "Tag": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          }
        }
      }
    },
    "parameters": {
      "skipParam": {
        "name": "skip",
        "in": "query",
        "description": "number of items to skip",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      "limitParam": {
        "name": "limit",
        "in": "query",
        "description": "max records to return",
        "required": true,
        "schema" : {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "responses": {
      "NotFound": {
        "description": "Entity not found."
      },
      "IllegalInput": {
        "description": "Illegal input for operation."
      },
      "GeneralError": {
        "description": "General Error",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/GeneralError"
            }
          }
        }
      }
    },
    "securitySchemes": {
      "api_key": {
        "type": "apiKey",
        "name": "api_key",
        "in": "header"
      },
      "petstore_auth": {
        "type": "oauth2",
        "flows": {
          "implicit": {
            "authorizationUrl": "http://example.org/api/oauth/dialog",
            "scopes": {
              "write:pets": "modify pets in your account",
              "read:pets": "read your pets"
            }
          }
        }
      }
    }
  }
```

```yaml
  components:
    schemas:
      Category:
        type: object
        properties:
          id:
            type: integer
            format: int64
          name:
            type: string
      Tag:
        type: object
        properties:
          id:
            type: integer
            format: int64
          name:
            type: string
    parameters:
      skipParam:
        name: skip
        in: query
        description: number of items to skip
        required: true
        schema:
          type: integer
          format: int32
      limitParam:
        name: limit
        in: query
        description: max records to return
        required: true
        schema:
          type: integer
          format: int32
    responses:
      NotFound:
        description: Entity not found.
      IllegalInput:
        description: Illegal input for operation.
      GeneralError:
        description: General Error
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GeneralError'
    securitySchemes:
      api_key:
        type: apiKey
        name: api_key
        in: header
      petstore_auth:
        type: oauth2
        flows: 
          implicit:
            authorizationUrl: http://example.org/api/oauth/dialog
            scopes:
              write:pets: modify pets in your account
              read:pets: read your pets
```
 */
export interface IComponentsObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * An object to hold reusable [Schema Objects](#schemaObject).
   */
   schemas?: Map<string,ISchemaObject | IReferenceObject>;

  /**
   * An object to hold reusable [Response Objects](#responseObject).
   */
   responses?: Map<string,IResponseObject | IReferenceObject>;

  /**
   * An object to hold reusable [Parameter Objects](#parameterObject).
   */
   parameters?: Map<string,IParameterObject | IReferenceObject>;

  /**
   * An object to hold reusable [Example Objects](#exampleObject).
   */
   examples?: Map<string,IExampleObject | IReferenceObject>;

  /**
   * An object to hold reusable [Request Body Objects](#requestBodyObject).
   */
   requestBodies?: Map<string,IRequestBodyObject | IReferenceObject>;

  /**
   * An object to hold reusable [Header Objects](#headerObject).
   */
   headers?: Map<string,IHeaderObject | IReferenceObject>;

  /**
   * An object to hold reusable [Security Scheme Objects](#securitySchemeObject).
   */
   securitySchemes?: Map<string,ISecuritySchemeObject | IReferenceObject>;

  /**
   * An object to hold reusable [Link Objects](#linkObject).
   */
   links?: Map<string,ILinkObject | IReferenceObject>;

  /**
   * An object to hold reusable [Callback Objects](#callbackObject).
   */
   callbacks?: Map<string,ICallbackObject | IReferenceObject>;
}

/**
 * Holds the relative paths to the individual endpoints and their operations.
 * The path is appended to the URL from the [`Server Object`](#serverObject) in 
 * order to construct the full URL.  The Paths MAY be empty, due to [ACL 
 * constraints](#securityFiltering).
 * @example:
```null
    /pets/{petId}
    /pets/mine
```

The following paths are considered identical and invalid:

```null
    /pets/{petId}
    /pets/{name}
```

The following may lead to ambiguous resolution:

```null
    /{entity}/me
    /books/{id}
```

Paths Object Example

```json
  {
    "/pets": {
      "get": {
        "description": "Returns all pets from the system that the user has access to",
        "responses": {
          "200": {          
            "description": "A list of pets.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/pet"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
```

```yaml
  /pets:
    get:
      description: Returns all pets from the system that the user has access to
      responses:
        '200':
          description: A list of pets.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/pet'
```
 */
export interface IPathsObject {

  /**
   * A relative path to an individual endpoint. The field name MUST begin with a 
   * slash. The path is **appended** (no relative URL resolution) to the expanded URL 
   * from the [`Server Object`](#serverObject)'s `url` field in order to construct 
   * the full URL. [Path templating](#pathTemplating) is allowed. When matching URLs, 
   * concrete (non-templated) paths would be matched before their templated 
   * counterparts. Templated paths with the same hierarchy but different templated 
   * names MUST NOT exist as they are identical. In case of ambiguous matching, it's 
   * up to the tooling to decide which one to use.
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [pathAndExtension: string]: IPathItemObject | any;
}

/**
 * Describes the operations available on a single path.
 * A Path Item MAY be empty, due to [ACL constraints](#securityFiltering).
 * The path itself is still exposed to the documentation viewer but they will not 
 * know which operations and parameters are available.
 * @example:
```json
  {
    "get": {
      "description": "Returns pets based on ID",
      "summary": "Find pets by ID",
      "operationId": "getPetsById",
      "responses": {
        "200": {
          "description": "pet response",
          "content": {
            "*\/*": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            }
          }
        },
        "default": {
          "description": "error payload",
          "content": {
            "text/html": {
              "schema": {
                "$ref": "#/components/schemas/ErrorModel"
              }
            }
          }
        }
      }
    },
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "description": "ID of pet to use",
        "required": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "style": "simple"
      }
    ]
  }
```

```yaml
  get:
    description: Returns pets based on ID
    summary: Find pets by ID
    operationId: getPetsById
    responses:
      '200':
        description: pet response
        content:
          '*\/*' :
            schema:
              type: array
              items:
                $ref: '#/components/schemas/Pet'
      default:
        description: error payload
        content:
          'text/html':
            schema:
              $ref: '#/components/schemas/ErrorModel'
  parameters:
  - name: id
    in: path
    description: ID of pet to use
    required: true
    schema:
      type: array
      style: simple
      items:
        type: string  
```
 */
export interface IPathItemObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * Allows for an external definition of this path item. The referenced structure 
   * MUST be in the format of a [Path Item Object](#pathItemObject). If there are 
   * conflicts between the referenced definition and this Path Item's definition, the 
   * behavior is undefined.
   */
  $ref?: string;

  /**
   * An optional, string summary, intended to apply to all operations in this path.
   */
  summary?: string;

  /**
   * An optional, string description, intended to apply to all operations in this 
   * path. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text 
   * representation.
   */
  description?: string;

  /**
   * A definition of a GET operation on this path.
   */
  get?: IOperationObject;

  /**
   * A definition of a PUT operation on this path.
   */
  put?: IOperationObject;

  /**
   * A definition of a POST operation on this path.
   */
  post?: IOperationObject;

  /**
   * A definition of a DELETE operation on this path.
   */
  delete?: IOperationObject;

  /**
   * A definition of a OPTIONS operation on this path.
   */
  options?: IOperationObject;

  /**
   * A definition of a HEAD operation on this path.
   */
  head?: IOperationObject;

  /**
   * A definition of a PATCH operation on this path.
   */
  patch?: IOperationObject;

  /**
   * A definition of a TRACE operation on this path.
   */
  trace?: IOperationObject;

  /**
   * An alternative `server` array to service all operations in this path.
   */
  servers?: Array<IServerObject>;

  /**
   * A list of parameters that are applicable for all the operations described under 
   * this path. These parameters can be overridden at the operation level, but cannot 
   * be removed there. The list MUST NOT include duplicated parameters. A unique 
   * parameter is defined by a combination of a [name](#parameterName) and 
   * [location](#parameterIn). The list can use the [Reference 
   * Object](#referenceObject) to link to parameters that are defined at the [OpenAPI 
   * Object's components/parameters](#componentsParameters).
   */
  parameters?: Array<IParameterObject | IReferenceObject>;
}

/**
 * Describes a single API operation on a path.
 * @example:
```json
  {
    "tags": [
      "pet"
    ],
    "summary": "Updates a pet in the store with form data",
    "operationId": "updatePetWithForm",
    "parameters": [
      {
        "name": "petId",
        "in": "path",
        "description": "ID of pet that needs to be updated",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestBody": {
      "content": {
        "application/x-www-form-urlencoded": {
          "schema": {
            "type": "object",
             "properties": {
                "name": { 
                  "description": "Updated name of the pet",
                  "type": "string"
                },
                "status": {
                  "description": "Updated status of the pet",
                  "type": "string"
               }
             },
          "required": ["status"] 
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Pet updated.",
        "content": {
          "application/json": {},
          "application/xml": {}
        }
      },
      "405": {
        "description": "Invalid input",
        "content": {
          "application/json": {},
          "application/xml": {}
        }
      }
    },
    "security": [
      {
        "petstore_auth": [
          "write:pets",
          "read:pets"
        ]
      }
    ]
  }
```

```yaml
  tags:
  - pet
  summary: Updates a pet in the store with form data
  operationId: updatePetWithForm
  parameters:
  - name: petId
    in: path
    description: ID of pet that needs to be updated
    required: true
    schema:
      type: string
  requestBody:
    content:
      'application/x-www-form-urlencoded':
        schema:
         properties:
            name: 
              description: Updated name of the pet
              type: string
            status:
              description: Updated status of the pet
              type: string
         required:
           - status
  responses:
    '200':
      description: Pet updated.
      content: 
        'application/json': {}
        'application/xml': {}
    '405':
      description: Invalid input
      content: 
        'application/json': {}
        'application/xml': {}
  security:
  - petstore_auth:
    - write:pets
    - read:pets
```
 */
export interface IOperationObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A list of tags for API documentation control. Tags can be used for logical 
   * grouping of operations by resources or any other qualifier.
   */
  tags?: Array<string>;

  /**
   * A short summary of what the operation does.
   */
  summary?: string;

  /**
   * A verbose explanation of the operation behavior. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * Additional external documentation for this operation.
   */
  externalDocs?: IExternalDocumentationObject;

  /**
   * Unique string used to identify the operation. The id MUST be unique among all 
   * operations described in the API. Tools and libraries MAY use the operationId to 
   * uniquely identify an operation, therefore, it is RECOMMENDED to follow common 
   * programming naming conventions.
   */
  operationId?: string;

  /**
   * A list of parameters that are applicable for this operation. If a parameter is 
   * already defined at the [Path Item](#pathItemParameters), the new definition will 
   * override it but can never remove it. The list MUST NOT include duplicated 
   * parameters. A unique parameter is defined by a combination of a 
   * [name](#parameterName) and [location](#parameterIn). The list can use the 
   * [Reference Object](#referenceObject) to link to parameters that are defined at 
   * the [OpenAPI Object's components/parameters](#componentsParameters).
   */
  parameters?: Array<IParameterObject | IReferenceObject>;

  /**
   * The request body applicable for this operation.  The `requestBody` is only 
   * supported in HTTP methods where the HTTP 1.1 specification 
   * [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly 
   * defined semantics for request bodies.  In other cases where the HTTP spec is 
   * vague, `requestBody` SHALL be ignored by consumers.
   */
  requestBody?: IRequestBodyObject | IReferenceObject;

  /**
   * The list of possible responses as they are returned from executing this 
   * operation.
   */
  responses: IResponsesObject;

  /**
   * A map of possible out-of band callbacks related to the parent operation. The key 
   * is a unique identifier for the Callback Object. Each value in the map is a 
   * [Callback Object](#callbackObject) that describes a request that may be 
   * initiated by the API provider and the expected responses. The key value used to 
   * identify the callback object is an expression, evaluated at runtime, that 
   * identifies a URL to use for the callback operation.
   */
  callbacks?: Map<string,ICallbackObject | IReferenceObject>;

  /**
   * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of 
   * the declared operation. Default value is `false`.
   */
  deprecated?: boolean;

  /**
   * A declaration of which security mechanisms can be used for this operation. The 
   * list of values includes alternative security requirement objects that can be 
   * used. Only one of the security requirement objects need to be satisfied to 
   * authorize a request. This definition overrides any declared top-level 
   * [`security`](#oasSecurity). To remove a top-level security declaration, an empty 
   * array can be used.
   */
  security?: Array<ISecurityRequirementObject>;

  /**
   * An alternative `server` array to service this operation. If an alternative 
   * `server` object is specified at the Path Item Object or Root level, it will be 
   * overridden by this value.
   */
  servers?: Array<IServerObject>;
}

/**
 * Allows referencing an external resource for extended documentation.
 * @example:
```json
  {
    "description": "Find more info here",
    "url": "https://example.com"
  }
```

```yaml
  description: Find more info here
  url: https://example.com
```
 */
export interface IExternalDocumentationObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A short description of the target documentation. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * The URL for the target documentation. Value MUST be in the format of a URL.
   */
  url: string;
}

/**
 * Describes a single operation parameter.
 * A unique parameter is defined by a combination of a [name](#parameterName) and 
 * [location](#parameterIn).
 * Parameter Locations
 * There are four possible parameter locations specified by the `in` field:
 
 * + path - Used together with [Path Templating](#pathTemplating), where the 
 * parameter value is actually part of the operation's URL. This does not include 
 * the host or base path of the API. For example, in `/items/{itemId}`, the path 
 * parameter is `itemId`.
 
 * + query - Parameters that are appended to the URL. For example, in 
 * `/items?id=###`, the query parameter is `id`.
 
 * + header - Custom headers that are expected as part of the request. Note that 
 * [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are 
 * case insensitive.
 
 * + cookie - Used to pass a specific cookie value to the API.
 * @example:
```null
     string -> "blue"
     array -> ["blue","black","brown"]
     object -> { "R": 100, "G": 200, "B": 150 }
```

The following table shows examples of rendering differences for each value.

[`style`](#dataTypeFormat)`explode``empty``string``array``object`matrixfalse;color;color=blue;color=blue,black,brown;color=R,100,G,200,B,150matrixtrue;color;color=blue;color=blue;color=black;color=brown;R=100;G=200;B=150labelfalse..blue.blue.black.brown.R.100.G.200.B.150labeltrue..blue.blue.black.brown.R=100.G=200.B=150formfalsecolor=color=bluecolor=blue,black,browncolor=R,100,G,200,B,150formtruecolor=color=bluecolor=blue&color=black&color=brownR=100&G=200&B=150simplefalsen/ablueblue,black,brownR,100,G,200,B,150simpletruen/ablueblue,black,brownR=100,G=200,B=150spaceDelimitedfalsen/an/ablue%20black%20brownR%20100%20G%20200%20B%20150pipeDelimitedfalsen/an/ablue|black|brownR|100|G|200G|150deepObjecttruen/an/an/acolorR=100&colorG=200&colorB=150

Parameter Object Examples

A header parameter with an array of 64 bit integer numbers:

```json
  {
    "name": "token",
    "in": "header",
    "description": "token to be passed as a header",
    "required": true,
    "schema": {
      "type": "array",
      "items": {
        "type": "integer",
        "format": "int64"
      }
    },
    "style": "simple"
  }
```

```yaml
  name: token
  in: header
  description: token to be passed as a header
  required: true
  schema:
    type: array
    items:
      type: integer
      format: int64
  style: simple
```

A path parameter of a string value:

```json
  {
    "name": "username",
    "in": "path",
    "description": "username to fetch",
    "required": true,
    "schema": {
      "type": "string"
    }
  }
```

```yaml
  name: username
  in: path
  description: username to fetch
  required: true
  schema:
    type: string
```

An optional query parameter of a string value, allowing multiple values by repeating the query parameter:

```json
  {
    "name": "id",
    "in": "query",
    "description": "ID of the object to fetch",
    "required": false,
    "schema": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "style": "form",
    "explode": true
  }
```

```yaml
  name: id
  in: query
  description: ID of the object to fetch
  required: false
  schema:
    type: array
    items:
      type: string
  style: form
  explode: true
```

A free-form query parameter, allowing undefined parameters of a specific type:

```json
  {
    "in": "query",
    "name": "freeForm",
    "schema": {
      "type": "object",
      "additionalProperties": {
        "type": "integer"
      },
    },
    "style": "form"
  }
```

```yaml
  in: query
  name: freeForm
  schema:
    type: object
    additionalProperties:
      type: integer
  style: form
```

A complex parameter using `content` to define serialization:

```json
  {
    "in": "query",
    "name": "coordinates",
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "required": [
            "lat",
            "long"
          ],
          "properties": {
            "lat": {
              "type": "number"
            },
            "long": {
              "type": "number"
            }
          }
        }
      }
    }
  }
```

```yaml
  in: query
  name: coordinates
  content:
    application/json:
      schema:
        type: object
        required:
          - lat
          - long
        properties:
          lat:
            type: number
          long:
            type: number
```
 */
export interface IParameterObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The name of the parameter. Parameter names are case sensitive. If 
   * [`in`](#parameterIn) is `"path"`, the `name` field MUST correspond to the 
   * associated path segment from the [path](#pathsPath) field in the [Paths 
   * Object](#pathsObject). See [Path Templating](#pathTemplating) for further 
   * information.If [`in`](#parameterIn) is `"header"` and the `name` field is 
   * `"Accept"`, `"Content-Type"` or `"Authorization"`, the parameter definition 
   * SHALL be ignored.For all other cases, the `name` corresponds to the parameter 
   * name used by the [`in`](#parameterIn) property.
   */
  name: string;

  /**
   * The location of the parameter. Possible values are "query", "header", "path" or 
   * "cookie".
   */
  in: string;

  /**
   * A brief description of the parameter. This could contain examples of use.  
   * [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text 
   * representation.
   */
  description?: string;

  /**
   * Determines whether this parameter is mandatory. If the [parameter 
   * location](#parameterIn) is "path", this property is **REQUIRED** and its value 
   * MUST be `true`. Otherwise, the property MAY be included and its default value is 
   * `false`.
   */
  required?: boolean;

  /**
   * Specifies that a parameter is deprecated and SHOULD be transitioned out of 
   * usage.
   */
   deprecated?: boolean;

  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for `query` 
   * parameters and allows sending a parameter with an empty value. Default value is 
   * `false`. If [`style`](#parameterStyle) is used, and if behavior is `n/a` (cannot 
   * be serialized), the value of `allowEmptyValue` SHALL be ignored.
   */
   allowEmptyValue?: boolean;
}

/**
 * Describes a single request body.
 * @example:
```json
  {
    "description": "user to add to the system",
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/User"
        },
        "examples": {
            "user" : {
              "summary": "User Example", 
              "externalValue": "http://foo.bar/examples/user-example.json"
            } 
          }
      },
      "application/xml": {
        "schema": {
          "$ref": "#/components/schemas/User"
        },
        "examples": {
            "user" : {
              "summary": "User example in XML",
              "externalValue": "http://foo.bar/examples/user-example.xml"
            }
          }
      },
      "text/plain": {
        "examples": {
          "user" : {
              "summary": "User example in Plain text",
              "externalValue": "http://foo.bar/examples/user-example.txt" 
          }
        } 
      },
      "*\/*": {
        "examples": {
          "user" : {
              "summary": "User example in other format",
              "externalValue": "http://foo.bar/examples/user-example.whatever"
          }
        }
      }
    }
  }
```

```yaml
  description: user to add to the system
  content: 
    'application/json':
      schema:
        $ref: '#/components/schemas/User'
      examples:
        user:
          summary: User Example
          externalValue: 'http://foo.bar/examples/user-example.json'
    'application/xml':
      schema:
        $ref: '#/components/schemas/User'
      examples:
        user:
          summary: User Example in XML
          externalValue: 'http://foo.bar/examples/user-example.xml'
    'text/plain':
      examples:
        user:
          summary: User example in text plain format
          externalValue: 'http://foo.bar/examples/user-example.txt'
    '*\/*':
      examples:
        user: 
          summary: User example in other format
          externalValue: 'http://foo.bar/examples/user-example.whatever'
```

A body parameter that is an array of string values:

```json
  {
    "description": "user to add to the system",
    "content": {
      "text/plain": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
```

```yaml
  description: user to add to the system
  required: true
  content:
    text/plain:
      schema:
        type: array
        items:
          type: string
```
 */
export interface IRequestBodyObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A brief description of the request body. This could contain examples of use.  
   * [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text 
   * representation.
   */
  description?: string;

  /**
   * The content of the request body. The key is a media type or [media type 
   * range](https://tools.ietf.org/html/rfc7231#appendix-D) and the value describes 
   * it.  For requests that match multiple keys, only the most specific key is 
   * applicable. e.g. text/plain overrides text/*
   */
  content: Map<string,IMediaTypeObject>;

  /**
   * Determines if the request body is required in the request. Defaults to `false`.
   */
  required?: boolean;
}

/**
 * Each Media Type Object provides schema and examples for the media type 
 * identified by its key.
 * @example:
```js
  {
    "application/json": {
      "schema": {
           "$ref": "#/components/schemas/Pet"
      },
      "examples": {
        "cat" : {
          "summary": "An example of a cat",
          "value": 
            {
              "name": "Fluffy",
              "petType": "Cat",
              "color": "White",
              "gender": "male",
              "breed": "Persian"
            }
        },
        "dog": {
          "summary": "An example of a dog with a cat's name",
          "value" :  { 
            "name": "Puma",
            "petType": "Dog",
            "color": "Black",
            "gender": "Female",
            "breed": "Mixed"
          },
        "frog": {
            "$ref": "#/components/examples/frog-example"
          }
        }
      }
    }
  }
```

```yaml
  application/json: 
    schema:
      $ref: "#/components/schemas/Pet"
    examples:
      cat:
        summary: An example of a cat
        value:
          name: Fluffy
          petType: Cat
          color: White
          gender: male
          breed: Persian
      dog:
        summary: An example of a dog with a cat's name
        value:
          name: Puma
          petType: Dog
          color: Black
          gender: Female
          breed: Mixed
      frog:
        $ref: "#/components/examples/frog-example"
```

Considerations for File Uploads

In contrast with the 2.0 specification, `file` input/output content in OpenAPI is described with the same semantics as any other schema type. Specifically:

```yaml
  # content transferred with base64 encoding
  schema:
    type: string
    format: base64
```

```yaml
  # content transferred in binary (octet-stream):
  schema:
    type: string
    format: binary
```

These examples apply to either input payloads of file uploads or response payloads.

A `requestBody` for submitting a file in a `POST` operation may look like the following example:

```yaml
  requestBody:
    content:
      application/octet-stream:
        # any media type is accepted, functionally equivalent to `*\/*`
        schema:
          # a binary file of any type
          type: string
          format: binary
```

In addition, specific media types MAY be specified:

```yaml
  # multiple, specific media types may be specified:
  requestBody:
    content:
        # a binary file of type png or jpeg
      'image/jpeg':
        schema:
          type: string
          format: binary
      'image/png':
        schema:
          type: string
          format: binary        
```

To upload multiple files, a `multipart` media type MUST be used:

```yaml
  requestBody:
    content:
      multipart/form-data:
        schema:
          properties:
            # The property name 'file' will be used for all files.
            file:
              type: array
              items:
                type: string
                format: binary
```

Support for x-www-form-urlencoded Request Bodies

To submit content using form url encoding via [RFC1866](https://tools.ietf.org/html/rfc1866), the following
definition may be used:

```yaml
  requestBody:
    content:
      application/x-www-form-urlencoded:
        schema:
          type: object
          properties:
            id:
              type: string
              format: uuid
            address:
              # complex types are stringified to support RFC 1866
              type: object
              properties: {}
```

In this example, the contents in the `requestBody` MUST be stringified per [RFC1866](https://tools.ietf.org/html/rfc1866/) when passed to the server.  In addition, the `address` field complex object will be stringified.

When passing complex objects in the `application/x-www-form-urlencoded` content type, the default serialization strategy of such properties is described in the [`Encoding Object`](#encodingObject)'s [`style`](#encodingStyle) property as `form`.

Special Considerations for `multipart` Content

It is common to use `multipart/form-data` as a `Content-Type` when transferring request bodies to operations.  In contrast to 2.0, a `schema` is REQUIRED to define the input parameters to the operation when using `multipart` content.  This supports complex structures as well as supporting mechanisms for multiple file uploads.

When passing in `multipart` types, boundaries MAY be used to separate sections of the content being transferred — thus, the following default `Content-Type`s are defined for `multipart`:

 + If the property is a primitive, or an array of primitive values, the default Content-Type is `text/plain`
 + If the property is complex, or an array of complex values, the default Content-Type is `application/json`
 + If the property is a `type: string` with `format: binary` or `format: base64` (aka a file object), the default Content-Type is `application/octet-stream`


Examples:

```yaml
  requestBody:
    content:
      multipart/form-data:
        schema:
          type: object
          properties:
            id:
              type: string
              format: uuid
            address:
              # default Content-Type for objects is `application/json`
              type: object
              properties: {}
            profileImage:
              # default Content-Type for string/binary is `application/octet-stream`
              type: string
              format: binary
            children:
              # default Content-Type for arrays is based on the `inner` type (text/plain here)
              type: array
              items:
                type: string
            addresses:
              # default Content-Type for arrays is based on the `inner` type (object shown, so `application/json` in this example)
              type: array
              items:
                type: '#/components/schemas/Address'
```

An `encoding` attribute is introduced to give you control over the serialization of parts of `multipart` request bodies.  This attribute is only applicable to `multipart` and `application/x-www-form-urlencoded` request bodies.
 */
export interface IMediaTypeObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The schema defining the type used for the request body.
   */
  schema?: ISchemaObject | IReferenceObject;

  /**
   * Example of the media type.  The example object SHOULD be in the correct format 
   * as specified by the media type.  The `example` object is mutually exclusive of 
   * the `examples` object.  Furthermore, if referencing a `schema` which contains an 
   * example, the `example` value SHALL override the example provided by the schema.
   */
  example?: any;

  /**
   * Examples of the media type.  Each example object SHOULD  match the media type 
   * and specified schema if present.  The `examples` object is mutually exclusive of 
   * the `example` object.  Furthermore, if referencing a `schema` which contains an 
   * example, the `examples` value SHALL override the example provided by the schema.
   */
  examples?: Map<string,IExampleObject | IReferenceObject>;

  /**
   * A map between a property name and its encoding information. The key, being the 
   * property name, MUST exist in the schema as a property. The encoding object SHALL 
   * only apply to `requestBody` objects when the media type is `multipart` or 
   * `application/x-www-form-urlencoded`.
   */
  encoding?: Map<string,IEncodingObject>;
}

/**
 * A single encoding definition applied to a single schema property.
 * @example:
```yaml
  requestBody:
    content:
      multipart/mixed:
        schema:
          type: object
          properties:
            id:
              # default is text/plain
              type: string
              format: uuid
            address:
              # default is application/json
              type: object
              properties: {}
            historyMetadata:
              # need to declare XML format!
              description: metadata in XML format
              type: object
              properties: {}
            profileImage:
              # default is application/octet-stream, need to declare an image type only!
              type: string
              format: binary
        encoding:
          historyMetadata:
            # require XML Content-Type in utf-8 encoding
            contentType: application/xml; charset=utf-8
          profileImage:
            # only accept png/jpeg
            contentType: image/png, image/jpeg
            headers:
              X-Rate-Limit-Limit:
                description: The number of allowed requests in the current period
                schema:
                  type: integer
```
 */
export interface IEncodingObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The Content-Type for encoding a specific property. Default value depends on the 
   * property type: for `string` with `format` being `binary` – 
   * `application/octet-stream`; for other primitive types – `text/plain`; for 
   * `object` - `application/json`; for `array` – the default is defined based on the 
   * inner type. The value can be a specific media type (e.g. `application/json`), a 
   * wildcard media type (e.g. `image/*`), or a comma-separated list of the two 
   * types.
   */
  contentType?: string;

  /**
   * A map allowing additional information to be provided as headers, for example 
   * `Content-Disposition`.  `Content-Type` is described separately and SHALL be 
   * ignored in this section. This property SHALL be ignored if the request body 
   * media type is not a `multipart`.
   */
  headers?: Map<string,IHeaderObject | IReferenceObject>;

  /**
   * Describes how a specific property value will be serialized depending on its 
   * type.  See [Parameter Object](#parameterObject) for details on the 
   * [`style`](#parameterStyle) property. The behavior follows the same values as 
   * `query` parameters, including default values. This property SHALL be ignored if 
   * the request body media type is not `application/x-www-form-urlencoded`.
   */
  style?: string;

  /**
   * When this is true, property values of type `array` or `object` generate separate 
   * parameters for each value of the array, or key-value-pair of the map.  For other 
   * types of properties this property has no effect. When [`style`](#encodingStyle) 
   * is `form`, the default value is `true`. For all other styles, the default value 
   * is `false`. This property SHALL be ignored if the request body media type is not 
   * `application/x-www-form-urlencoded`.
   */
  explode?: boolean;

  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as 
   * defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) 
   * `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default value 
   * is `false`. This property SHALL be ignored if the request body media type is not 
   * `application/x-www-form-urlencoded`.
   */
  allowReserved?: boolean;
}

/**
 * A container for the expected responses of an operation.
 * The container maps a HTTP response code to the expected response.
 * The documentation is not necessarily expected to cover all possible HTTP 
 * response codes because they may not be known in advance.
 * However, documentation is expected to cover a successful operation response and 
 * any known errors.
 * The `default` MAY be used as a default response object for all HTTP codes 
 * that are not covered individually by the specification.
 * The `Responses Object` MUST contain at least one response code, and it 
 * SHOULD be the response for a successful operation call.
 * @example:
```json
  {
    "200": {
      "description": "a pet to be returned",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/Pet"
          }
        }
      }
    },
    "default": {
      "description": "Unexpected error",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/ErrorModel"
          }
        }
      }
    }
  }
```

```yaml
  '200':
    description: a pet to be returned
    content: 
      application/json:
        schema:
          $ref: '#/components/schemas/Pet'
  default:
    description: Unexpected error
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorModel'
```
 */
export interface IResponsesObject {

  /**
   * Any [HTTP status code](#httpCodes) can be used as the property name, but only 
   * one property per code, to describe the expected response for that HTTP status 
   * code.  A [Reference Object](#referenceObject) can link to a response that is 
   * defined in the [OpenAPI Object's components/responses](#componentsResponses) 
   * section. This field MUST be enclosed in quotation marks (for example, "200") for 
   * compatibility between JSON and YAML. To define a range of response codes, this 
   * field MAY contain the uppercase wildcard character `X`. For example, `2XX` 
   * represents all response codes between `[200-299]`. The following range 
   * definitions are allowed: `1XX`, `2XX`, `3XX`, `4XX`, and `5XX`. If a response 
   * range is defined using an explicit code, the explicit code definition takes 
   * precedence over the range definition for that code.
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [httpStatusCodeHttpCodesAndExtension: string]: IResponseObject | IReferenceObject | any;

  /**
   * The documentation of responses other than the ones declared for specific HTTP 
   * response codes. Use this field to cover undeclared responses. A [Reference 
   * Object](#referenceObject) can link to a response that the [OpenAPI Object's 
   * components/responses](#componentsResponses) section defines.
   */
  default?: IResponseObject | IReferenceObject;
}

/**
 * Describes a single response from an API Operation, including design-time, static 
 * `links` to operations based on the response.
 * @example:
```json
  {
    "description": "A complex object array response",
    "content": {
      "application/json": {
        "schema": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/VeryComplexType"
          }
        }
      }
    }
  }
```

```yaml
  description: A complex object array response
  content: 
    application/json:
      schema: 
        type: array
        items:
          $ref: '#/components/schemas/VeryComplexType'
```

Response with a string type:

```json
  {
    "description": "A simple string response",
    "content": {
      "text/plain": {
        "schema": {
          "type": "string"
        }
      }
    }
  
  }
```

```yaml
  description: A simple string response
  representations:
    text/plain:
      schema:
        type: string
```

Plain text response with headers:

```json
  {
    "description": "A simple string response",
    "content": {
      "text/plain": {
        "schema": {
          "type": "string"
        }
      }
    },
    "headers": {
      "X-Rate-Limit-Limit": {
        "description": "The number of allowed requests in the current period",
        "schema": {
          "type": "integer"
        }
      },
      "X-Rate-Limit-Remaining": {
        "description": "The number of remaining requests in the current period",
        "schema": {
          "type": "integer"
        }
      },
      "X-Rate-Limit-Reset": {
        "description": "The number of seconds left in the current period",
        "schema": {
          "type": "integer"
        }
      }
    }
  }
```

```yaml
  description: A simple string response
  content:
    text/plain:
      schema:
        type: string
      example: 'whoa!'
  headers:
    X-Rate-Limit-Limit:
      description: The number of allowed requests in the current period
      schema:
        type: integer
    X-Rate-Limit-Remaining:
      description: The number of remaining requests in the current period
      schema:
        type: integer
    X-Rate-Limit-Reset:
      description: The number of seconds left in the current period
      schema:
        type: integer
```

Response with no return value:

```json
  {
    "description": "object created"
  }
```

```yaml
  description: object created
```
 */
export interface IResponseObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A short description of the response. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description: string;

  /**
   * Maps a header name to its definition. 
   * [RFC7230](https://tools.ietf.org/html/rfc7230#page-22) states header names are 
   * case insensitive. If a response header is defined with the name 
   * `"Content-Type"`, it SHALL be ignored.
   */
  headers?: Map<string,IHeaderObject | IReferenceObject>;

  /**
   * A map containing descriptions of potential response payloads. The key is a media 
   * type or [media type range](https://tools.ietf.org/html/rfc7231#appendix-D) and 
   * the value describes it.  For responses that match multiple keys, only the most 
   * specific key is applicable. e.g. text/plain overrides text/*
   */
  content?: Map<string,IMediaTypeObject>;

  /**
   * A map of operations links that can be followed from the response. The key of the 
   * map is a short name for the link, following the naming constraints of the names 
   * for [Component Objects](#componentsObject).
   */
  links?: Map<string,ILinkObject | IReferenceObject>;
}

/**
 * A map of possible out-of band callbacks related to the parent operation.
 * Each value in the map is a [Path Item Object](#pathItemObject) that describes a 
 * set of requests that may be initiated by the API provider and the expected 
 * responses.
 * The key value used to identify the callback object is an expression, evaluated 
 * at runtime, that identifies a URL to use for the callback operation.
 * @example:
```http
  POST /subscribe/myevent?queryUrl=http://clientdomain.com/stillrunning HTTP/1.1
  Host: example.org
  Content-Type: application/json
  Content-Length: 187
  
  {
    "failedUrl" : "http://clientdomain.com/failed",
    "successUrls" : [
      "http://clientdomain.com/fast",
      "http://clientdomain.com/medium",
      "http://clientdomain.com/slow"
    ] 
  }
  
  201 Created
  Location: http://example.org/subscription/1
```

The following examples show how the various expressions evaluate, assuming the callback operation has a path parameter named `eventType` and a query parameter named `queryUrl`.

ExpressionValue$url[http://example.org/subscribe/myevent?queryUrl=http://clientdomain.com/stillrunning](http://example.org/subscribe/myevent?queryUrl=http://clientdomain.com/stillrunning)$methodPOST$request.path.eventTypemyevent$request.query.queryUrl[http://clientdomain.com/stillrunning](http://clientdomain.com/stillrunning)$request.header.content-Typeapplication/json$request.body#/failedUrl[http://clientdomain.com/stillrunning](http://clientdomain.com/stillrunning)$request.body#/successUrls/2[http://clientdomain.com/medium](http://clientdomain.com/medium)$response.header.Location[http://example.org/subscription/1](http://example.org/subscription/1)

Callback Object Example

The following example shows a callback to the URL specified by the `id` and `email` property in the request body.

```yaml
  myWebhook:
    'http://notificationServer.com?transactionId={$request.body#/id}&email={$request.body#/email}':
      post:
        requestBody:
          description: Callback payload
          content: 
            'application/json':
              schema:
                $ref: '#/components/schemas/SomePayload'
        responses:
          '200':
            description: webhook successfully processed and no retries will be performed
```
 */
export interface ICallbackObject {

  /**
   * A Path Item Object used to define a callback request and expected responses.  A 
   * [complete example](../examples/v3.0/callback-example.yaml) is available.
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [expressionAndExtension: string]: IPathItemObject | any;
}

/**
 * 
 * @example:
```yaml
  # in a model
  schemas:
    properties:
      name:
        type: string
        examples:
          name:
            $ref: http://example.org/petapi-examples/openapi.json#/components/examples/name-example
  
  # in a request body:
    requestBody:
      content:
        'application/json':
          schema:
            $ref: '#/components/schemas/Address'
          examples: 
            foo:
              summary: A foo example
              value: {"foo": "bar"}
            bar:
              summary: A bar example
              value: {"bar": "baz"}
        'application/xml':
          examples: 
            xmlExample:
              summary: This is an example in XML
              externalValue: 'http://example.org/examples/address-example.xml'
        'text/plain':
          examples:
            textExample: 
              summary: This is a text example
              externalValue: 'http://foo.bar/examples/address-example.txt' 
  
  
  # in a parameter
    parameters:
      - name: 'zipCode'
        in: 'query'
        schema:
          type: 'string'
          format: 'zip-code'
          examples:
            zip-example: 
              $ref: '#/components/examples/zip-example'
  
  # in a response
    responses:
      '200':
        description: your car appointment has been booked
        content: 
          application/json:
            schema:
              $ref: '#/components/schemas/SuccessResponse'
            examples:
              confirmation-success:
                $ref: '#/components/examples/confirmation-success'
```
 */
export interface IExampleObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * Short description for the example.
   */
  summary?: string;

  /**
   * Long description for the example. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * Embedded literal example. The `value` field and `externalValue` field are 
   * mutually exclusive. To represent examples of media types that cannot naturally 
   * represented in JSON or YAML, use a string value to contain the example, escaping 
   * where necessary.
   */
  value?: any;

  /**
   * A URL that points to the literal example. This provides the capability to 
   * reference examples that cannot easily be included in JSON or YAML documents.  
   * The `value` field and `externalValue` field are mutually exclusive.
   */
  externalValue?: string;
}

/**
 * The `Link object` represents a possible design-time link for a response.
 * The presence of a link does not guarantee the caller's ability to successfully 
 * invoke it, rather it provides a known relationship and traversal mechanism 
 * between responses and other operations.
 * Unlike dynamic links (i.e. links provided **in** the response payload), the OAS 
 * linking mechanism does not require link information in the runtime response.
 * For computing links, and providing instructions to execute them, a [runtime 
 * expression](#runtimeExpression) is used for accessing values in an operation and 
 * using them as parameters while invoking the linked operation.  
 * @example:
```yaml
  paths:
    /users/{id}:
      parameters:
      - name: id
        in: path
        required: true
        description: the user identifier, as userId 
        schema:
          type: string
      get:
        responses:
          '200':
            description: the user being returned
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    uuid: # the unique user id
                      type: string
                      format: uuid
          links:
            address:
              # the target link operationId
              operationId: getUserAddress
              parameters:
                # get the `id` field from the request path parameter named `id`
                userId: $request.path.id
    # the path item of the linked operation
    /users/{userid}/address:
      parameters:
      - name: userid
        in: path
        required: true
        description: the user identifier, as userId 
        schema:
          type: string
        # linked operation
        get:
          operationId: getUserAddress
          responses:
            '200':
              description: the user's address
```

When a runtime expression fails to evaluate, no parameter value is passed to the target operation.

Values from the response body can be used to drive a linked operation.

```yaml
  links:
    address:
      operationId: getUserAddressByUUID
      parameters:
        # get the `id` field from the request path parameter named `id`
        userUuid: $response.body#/uuid
```

Clients follow all links at their discretion. 
Neither permissions, nor the capability to make a successful call to that link, is guaranteed 
solely by the existence of a relationship.

OperationRef Examples

As references to `operationId` MAY NOT be possible (the `operationId` is an optional 
value), references MAY also be made through a relative `operationRef`:

```yaml
  links:
    UserRepositories:
      # returns array of '#/components/schemas/repository'
      operationRef: '#/paths/~12.0~1repositories~1{username}/get'
      parameters:
        username: $response.body#/username
```

or an absolute `operationRef`:

```yaml
  links:
    UserRepositories:
      # returns array of '#/components/schemas/repository'
      operationRef: 'https://na2.gigantic-server.com/#/paths/~12.0~1repositories~1{username}/get'
      parameters:
        username: $response.body#/username
```

Note that in the use of `operationRef`, the escaped forward-slash is necessary when 
using JSON references.

Runtime Expressions

Runtime expressions allow defining values based on information that will only be available within the HTTP message in an actual API call.
This mechanism is used by [Link Objects](#linkObject) and [Callback Objects](#callbackObject).

The runtime expression is defined by the following [ABNF](https://tools.ietf.org/html/rfc5234) syntax

```null
        expression = ( "$url" | "$method" | "$statusCode" | "$request." source | "$response." source )
        source = ( header-reference | query-reference | path-reference | body-reference )  
        header-reference = "header." token
        query-reference = "query." name  
        path-reference = "path." name
        body-reference = "body" ["#" fragment]
        fragment = a JSON Pointer [RFC 6901](https://tools.ietf.org/html/rfc6901)  
        name = *( char )
        char = as per RFC [7159](https://tools.ietf.org/html/rfc7159#section-7)
        token = as per RFC [7230](https://tools.ietf.org/html/rfc7230#section-3.2.6)
```

The `name` identifier is case-sensitive, whereas `token` is not. 

The table below provides examples of runtime expressions and examples of their use in a value:

Examples

Source Locationexample expressionnotesHTTP Method`$method`The allowable values for the `$method` will be those for the HTTP operation.Requested media type`$request.header.accept`Request parameter`$request.path.id`Request parameters MUST be declared in the `parameters` section of the parent operation or they cannot be evaluated. This includes request headers.Request body property`$request.body#/user/uuid`In operations which accept payloads, references may be made to portions of the `requestBody` or the entire body.Request URL`$url`Response value`$response.body#/status`In operations which return payloads, references may be made to portions of the response body or the entire body.Response header`$response.header.Server`Single header values only are available

Runtime expressions preserve the type of the referenced value.
Expressions can be embedded into string values by surrounding the expression with `{}` curly braces.
 */
export interface ILinkObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * A relative or absolute reference to an OAS operation. This field is mutually 
   * exclusive of the `operationId` field, and MUST point to an [Operation 
   * Object](#operationObject). Relative `operationRef` values MAY be used to locate 
   * an existing [Operation Object](#operationObject) in the OpenAPI definition.
   */
  operationRef?: string;

  /**
   * The name of an existing, resolvable OAS operation, as defined with a unique 
   * `operationId`.  This field is mutually exclusive of the `operationRef` field.
   */
  operationId?: string;

  /**
   * A map representing parameters to pass to an operation as specified with 
   * `operationId` or identified via `operationRef`. The key is the parameter name to 
   * be used, whereas the value can be a constant or an expression to be evaluated 
   * and passed to the linked operation.  The parameter name can be qualified using 
   * the [parameter location](#parameterIn) `[{in}.]{name}` for operations that use 
   * the same parameter name in different locations (e.g. path.id).
   */
  parameters?: Map<string,any | RunTimeExpression>;

  /**
   * A literal value or [{expression}](#runtimeExpression) to use as a request body 
   * when calling the target operation.
   */
  requestBody?: any | RunTimeExpression;

  /**
   * A description of the link. [CommonMark syntax](http://spec.commonmark.org/) MAY 
   * be used for rich text representation.
   */
  description?: string;

  /**
   * A server object to be used by the target operation.
   */
  server?: IServerObject;
}

/**
 * The Header Object follows the structure of the [Parameter 
 * Object](#parameterObject) with the following changes:
 
 * + `name` MUST NOT be specified, it is given in the corresponding `headers` map.
 
 * + `in` MUST NOT be specified, it is implicitly in `header`.
 
 * + All traits that are affected by the location MUST be applicable to a location 
 * of `header` (for example, [`style`](#parameterStyle)).

 * Header Object Example
 * A simple header of type `integer`:
 * @example:
```json
  {
    "description": "The number of allowed requests in the current period",
    "schema": {
      "type": "integer"
    }
  }
```

```yaml
  description: The number of allowed requests in the current period
  schema:
    type: integer
```
 */
export interface IHeaderObject {
}

/**
 * Adds metadata to a single tag that is used by the [Operation 
 * Object](#operationObject).
 * It is not mandatory to have a Tag Object per tag defined in the Operation Object 
 * instances.
 * @example:
```json
  {
  	"name": "pet",
  	"description": "Pets operations"
  }
```

```yaml
  name: pet
  description: Pets operations
```
 */
export interface ITagObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The name of the tag.
   */
  name: string;

  /**
   * A short description for the tag. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * Additional external documentation for this tag.
   */
  externalDocs?: IExternalDocumentationObject;
}

/**
 * In an `example`, a JSON Reference MAY be used, with the 
 * explicit restriction that examples having a JSON format with object named 
 * `$ref` are not allowed. Therefore, that `example`, structurally, can be 
 * either a string primitive or an object, similar to `additionalProperties`.
 * In all cases, the payload is expected to be compatible with the type schema 
 * for the associated value.  Tooling implementations MAY choose to 
 * validate compatibility automatically, and reject the example value(s) if they 
 * are incompatible.
 * @example:
```yaml
  # in a model
  schemas:
    properties:
      name:
        type: string
        example:
          $ref: http://foo.bar#/examples/name-example
  
  # in a request body, note the plural `examples`
    requestBody:
      content:
        'application/json':
          schema:
            $ref: '#/components/schemas/Address'
          examples:
            foo:
              value: {"foo": "bar"}
            bar:
              value: {"bar": "baz"}
        'application/xml':
          examples:
            xml:
              externalValue: 'http://foo.bar/examples/address-example.xml'
        'text/plain':
          examples:
            text:
              externalValue: 'http://foo.bar/examples/address-example.txt'
          
  # in a parameter
    parameters:
      - name: 'zipCode'
        in: 'query'
        schema:
          type: 'string'
          format: 'zip-code'
          example: 
            $ref: 'http://foo.bar#/examples/zip-example'
  
  # in a response, note the singular `example`:
    responses:
      '200':
        description: your car appointment has been booked
        content: 
          application/json:
            schema:
              $ref: '#/components/schemas/SuccessResponse'
            example:
              $ref: http://foo.bar#/examples/address-example.json
```
 */
export interface IExamplesObject {
}

/**
 * A simple object to allow referencing other components in the specification, 
 * internally and externally.
 * The Reference Object is defined by [JSON 
 * Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) and follows 
 * the same structure, behavior and rules. 
 * For this specification, reference resolution is accomplished as defined by the 
 * JSON Reference specification and not by the JSON Schema specification.
 * @example:
```json
  {
  	"$ref": "#/components/schemas/Pet"
  }
```

```yaml
  $ref: '#/components/schemas/Pet'
```

Relative Schema Document Example

```json
  {
    "$ref": "Pet.json"
  }
```

```yaml
  $ref: Pet.yaml
```

Relative Documents With Embedded Schema Example

```json
  {
    "$ref": "definitions.json#/Pet"
  }
```

```yaml
  $ref: definitions.yaml#/Pet
```
 */
export interface IReferenceObject {

  /**
   * The reference string.
   */
  $ref: string;
}

/**
 * The Schema Object allows the definition of input and output data types.
 * These types can be objects, but also primitives and arrays.
 * This object is an extended subset of the [JSON Schema Specification Wright Draft 
 * 00](http://json-schema.org/).
 * For more information about the properties, see [JSON Schema 
 * Core](https://tools.ietf.org/html/draft-wright-json-schema-00) and [JSON Schema 
 * Validation](https://tools.ietf.org/html/draft-wright-json-schema-validation-00).
 * Unless stated otherwise, the property definitions follow the JSON Schema.
 * Properties
 * The following properties are taken directly from the JSON Schema definition and 
 * follow the same specifications:
 
 * + title
 
 * + multipleOf
 
 * + maximum
 
 * + exclusiveMaximum
 
 * + minimum
 
 * + exclusiveMinimum
 
 * + maxLength
 
 * + minLength
 
 * + pattern (This string SHOULD be a valid regular expression, according to the 
 * [ECMA 262 regular 
 * expression](https://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5) dialect)
 
 * + maxItems
 
 * + minItems
 
 * + uniqueItems
 
 * + maxProperties
 
 * + minProperties
 
 * + required
 
 * + enum

 * The following properties are taken from the JSON Schema definition but their 
 * definitions were adjusted to the OpenAPI Specification. 
 
 * + type - Value MUST be a string. Multiple types via an array are not supported.
 
 * + allOf - Inline or referenced schema MUST be of a [Schema 
 * Object](#schemaObject) and not a standard JSON Schema.
 
 * + oneOf - Inline or referenced schema MUST be of a [Schema 
 * Object](#schemaObject) and not a standard JSON Schema.
 
 * + anyOf - Inline or referenced schema MUST be of a [Schema 
 * Object](#schemaObject) and not a standard JSON Schema.
 
 * + not - Inline or referenced schema MUST be of a [Schema Object](#schemaObject) 
 * and not a standard JSON Schema.
 
 * + items - Value MUST be an object and not an array. Inline or referenced schema 
 * MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema. 
 * `items` MUST be present if the `type` is `array`.
 
 * + properties - Property definitions MUST be a [Schema Object](#schemaObject) and 
 * not a standard JSON Schema (inline or referenced).
 
 * + additionalProperties - Value can be boolean or object. Inline or referenced 
 * schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON 
 * Schema.
 
 * + description - [CommonMark syntax](http://spec.commonmark.org/) MAY be used for 
 * rich text representation.
 
 * + format - See [Data Type Formats](#dataTypeFormat) for further details. While 
 * relying on JSON Schema's defined formats, the OAS offers a few additional 
 * predefined formats.
 
 * + default - The default value represents what would be assumed by the consumer 
 * of the input as the value of the schema if one is not provided. Unlike JSON 
 * Schema, the value MUST conform to the defined type for the Schema Object defined 
 * at the same level. For example, if `type` is `string`, then `default` can be 
 * `"foo"` but cannot be `1`.

 * Alternatively, any time a Schema Object can be used, a [Reference 
 * Object](#referenceObject) can be used in its place. This allows referencing 
 * definitions instead of defining them inline.
 * Additional properties defined by the JSON Schema specification that are not 
 * mentioned here are strictly unsupported.
 * Other than the JSON Schema subset fields, the following fields MAY be used for 
 * further schema documentation:
 * @example:
```json
  {
    "type": "string",
    "format": "email"
  }
```

```yaml
  type: string
  format: email
```

Simple Model

```json
  {
    "type": "object",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "address": {
        "$ref": "#/components/schemas/Address"
      },
      "age": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      }
    }
  }
```

```yaml
  type: object
  required:
  - name
  properties:
    name:
      type: string
    address:
      $ref: '#/components/schemas/Address'
    age:
      type: integer
      format: int32
      minimum: 0
```

Model with Map/Dictionary Properties

For a simple string to string mapping:

```json
  {
    "type": "object",
    "additionalProperties": {
      "type": "string"
    }
  }
```

```yaml
  type: object
  additionalProperties:
    type: string
```

For a string to model mapping:

```json
  {
    "type": "object",
    "additionalProperties": {
      "$ref": "#/components/schemas/ComplexModel"
    }
  }
```

```yaml
  type: object
  additionalProperties:
    $ref: '#/components/schemas/ComplexModel'
```

Model with Example

```json
  {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    },
    "required": [
      "name"
    ],
    "example": {
      "name": "Puma",
      "id": 1
    }
  }
```

```yaml
  type: object
  properties:
    id:
      type: integer
      format: int64
    name:
      type: string
  required:
  - name
  example:
    name: Puma
    id: 1
```

Models with Composition

```json
  {
    "components": {
      "schemas": {
        "ErrorModel": {
          "type": "object",
          "required": [
            "message",
            "code"
          ],
          "properties": {
            "message": {
              "type": "string"
            },
            "code": {
              "type": "integer",
              "minimum": 100,
              "maximum": 600
            }
          }
        },
        "ExtendedErrorModel": {
          "allOf": [
            {
              "$ref": "#/components/schemas/ErrorModel"
            },
            {
              "type": "object",
              "required": [
                "rootCause"
              ],
              "properties": {
                "rootCause": {
                  "type": "string"
                }
              }
            }
          ]
        }
      }
    }
  }
```

```yaml
  components:
    schemas:
      ErrorModel:
        type: object
        required:
        - message
        - code
        properties:
          message:
            type: string
          code:
            type: integer
            minimum: 100
            maximum: 600
      ExtendedErrorModel:
        allOf:
        - $ref: '#/components/schemas/ErrorModel'
        - type: object
          required:
          - rootCause
          properties:
            rootCause:
              type: string
```

Models with Polymorphism Support

```json
  {
    "components": {
      "schemas": {
        "Pet": {
          "type": "object",
          "discriminator": {
            "propertyName": "petType"
          },
          "properties": {
            "name": {
              "type": "string"
            },
            "petType": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "petType"
          ]
        },
        "Cat": {
          "description": "A representation of a cat. Note that `Cat` will be used as the discriminator value.",
          "allOf": [
            {
              "$ref": "#/components/schemas/Pet"
            },
            {
              "type": "object",
              "properties": {
                "huntingSkill": {
                  "type": "string",
                  "description": "The measured skill for hunting",
                  "default": "lazy",
                  "enum": [
                    "clueless",
                    "lazy",
                    "adventurous",
                    "aggressive"
                  ]
                }
              },
              "required": [
                "huntingSkill"
              ]
            }
          ]
        },
        "Dog": {
          "description": "A representation of a dog. Note that `Dog` will be used as the discriminator value.",
          "allOf": [
            {
              "$ref": "#/components/schemas/Pet"
            },
            {
              "type": "object",
              "properties": {
                "packSize": {
                  "type": "integer",
                  "format": "int32",
                  "description": "the size of the pack the dog is from",
                  "default": 0,
                  "minimum": 0
                }
              },
              "required": [
                "packSize"
              ]
            }
          ]
        }
      }
    }
  }
```

```yaml
  components:
    schemas:
      Pet:
        type: object
        discriminator:
          propertyName: petType
        properties:
          name:
            type: string
          petType:
            type: string
        required:
        - name
        - petType
      Cat:  ## "Cat" will be used as the discriminator value
        description: A representation of a cat
        allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          properties:
            huntingSkill:
              type: string
              description: The measured skill for hunting
              enum:
              - clueless
              - lazy
              - adventurous
              - aggressive
          required:
          - huntingSkill
      Dog:  ## "Dog" will be used as the discriminator value
        description: A representation of a dog
        allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          properties:
            packSize:
              type: integer
              format: int32
              description: the size of the pack the dog is from
              default: 0
              minimum: 0
          required:
          - packSize
```
 */
export interface ISchemaObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * Allows sending a `null` value for the defined schema. Default value is `false`.
   */
  nullable?: boolean;

  /**
   * Adds support for polymorphism. The discriminator is an object name that is used 
   * to differentiate between other schemas which may satisfy the payload 
   * description. See [Composition and Inheritance](#schemaComposition) for more 
   * details.
   */
  discriminator?: IDiscriminatorObject;

  /**
   * Relevant only for Schema `"properties"` definitions. Declares the property as 
   * "read only". This means that it MAY be sent as part of a response but SHOULD NOT 
   * be sent as part of the request. If the property is marked as `readOnly` being 
   * `true` and is in the `required` list, the `required` will take effect on the 
   * response only. A property MUST NOT be marked as both `readOnly` and `writeOnly` 
   * being `true`. Default value is `false`.
   */
  readOnly?: boolean;

  /**
   * Relevant only for Schema `"properties"` definitions. Declares the property as 
   * "write only". Therefore, it MAY be sent as part of a request but SHOULD NOT be 
   * sent as part of the response. If the property is marked as `writeOnly` being 
   * `true` and is in the `required` list, the `required` will take effect on the 
   * request only. A property MUST NOT be marked as both `readOnly` and `writeOnly` 
   * being `true`. Default value is `false`.
   */
  writeOnly?: boolean;

  /**
   * This MAY be used only on properties schemas. It has no effect on root schemas. 
   * Adds additional metadata to describe the XML representation of this property.
   */
  xml?: IXmlObject;

  /**
   * Additional external documentation for this schema.
   */
  externalDocs?: IExternalDocumentationObject;

  /**
   * A free-form property to include an example of an instance for this schema. To 
   * represent examples that cannot be naturally represented in JSON or YAML, a 
   * string value can be used to contain the example with escaping where necessary.
   */
  example?: any;

  /**
   * Specifies that a schema is deprecated and SHOULD be transitioned out of usage. 
   * Default value is `false`.
   */
   deprecated?: boolean;
}

/**
 * When request bodies or response payloads may be one of a number of different 
 * schemas, a `discriminator` object can be used to aid in serialization, 
 * deserialization, and validation.  The discriminator is a specific object in a 
 * schema which is used to inform the consumer of the specification of an 
 * alternative schema based on the value associated with it.
 * When using the discriminator, inline schemas will not be considered.
 * @example:
```null
  MyResponseType:
    oneOf:
    - $ref: '#/components/schemas/Cat'
    - $ref: '#/components/schemas/Dog'
    - $ref: '#/components/schemas/Lizard'
```

which means the payload MUST, by validation, match exactly one of the schemas described by `Cat`, `Dog`, or `Lizard`.  In this case, a discriminator MAY act as a "hint" to shortcut validation and selection of the matching schema which may be a costly operation, depending on the complexity of the schema. We can then describe exactly which field tells us which schema to use:

```null
  MyResponseType:
    oneOf:
    - $ref: '#/components/schemas/Cat'
    - $ref: '#/components/schemas/Dog'
    - $ref: '#/components/schemas/Lizard'
    discriminator:
      propertyName: pet_type
```

The expectation now is that a property with name `pet_type` MUST be present in the response payload, and the value will correspond to the name of a schema defined in the OAS document.  Thus the response payload:

```null
  {
    "id": 12345,
    "pet_type": "Cat"
  }
```

Will indicate that the `Cat` schema be used in conjunction with this payload.

In scenarios where the value of the discriminator field does not match the schema name or implicit mapping is not possible, an optional `mapping` definition MAY be used:

```null
  MyResponseType:
    oneOf:
    - $ref: '#/components/schemas/Cat'
    - $ref: '#/components/schemas/Dog'
    - $ref: '#/components/schemas/Lizard'
    - $ref: 'https://gigantic-server.com/schemas/Monster/schema.json'
    discriminator:
      propertyName: pet_type
      mapping:
        dog: '#/components/schemas/Dog'
        monster: 'https://gigantic-server.com/schemas/Monster/schema.json'
```

Here the discriminator value of `dog` will map to the schema `#/components/schemas/Dog`, rather than the default (implicit) value of `Dog`.  If the discriminator value does not match an implicit or explicit mapping, no schema can be determined and validation SHOULD fail. Mapping keys MUST be string values, but tooling MAY convert response values to strings for comparison.

When used in conjunction with the `anyOf` construct, the use of the discriminator can avoid ambiguity where multiple schemas may satisfy a single payload.

In both the `oneOf` and `anyOf` use cases, all possible schemas MUST be listed explicitly.  To avoid redundancy, the discriminator MAY be added to a parent schema definition, and all schemas comprising the parent schema in an `allOf` construct may be used as an alternate schema.

For example:

```null
  components:
    schemas:
      Pet:
        type: object
        required:
        - pet_type
        properties:
          pet_type:
            type: string
        discriminator:
          propertyName: pet_type
          mapping:
            cachorro: Dog
      Cat:
        allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          # all other properties specific to a `Cat`
          properties:
            name:
              type: string
      Dog:
        allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          # all other properties specific to a `Dog`
          properties:
            bark:
              type: string
      Lizard:
        allOf:
        - $ref: '#/components/schemas/Pet'
        - type: object
          # all other properties specific to a `Lizard`
          properties:
            lovesRocks:
              type: boolean
```

a payload like this:

```null
  {
    "pet_type": "Cat",
    "name": "misty"
  }
```

will indicate that the `Cat` schema be used.  Likewise this schema:

```null
  {
    "pet_type": "cachorro",
    "bark": "soft"
  }
```

will map to `Dog` because of the definition in the `mappings` element.
 */
export interface IDiscriminatorObject {

  /**
   * The name of the property in the payload that will hold the discriminator value.
   */
  propertyName: string;

  /**
   * An object to hold mappings between payload values and schema names or 
   * references.
   */
   mapping?: Map<string,string>;
}

/**
 * A metadata object that allows for more fine-tuned XML model definitions.
 * When using arrays, XML element names are not inferred (for singular/plural 
 * forms) and the `name` property SHOULD be used to add that information.
 * See examples for expected behavior.
 * @example:
```json
  {
      "animals": {
          "type": "string"
      }
  }
```

```yaml
  animals:
    type: string
```

```xml
  <animals>...</animals>
```

Basic string array property ([`wrapped`](#xmlWrapped) is `false` by default):

```json
  {
      "animals": {
          "type": "array",
          "items": {
              "type": "string"
          }
      }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
```

```xml
  <animals>...</animals>
  <animals>...</animals>
  <animals>...</animals>
```

XML Name Replacement

```json
  {
    "animals": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    }
  }
```

```yaml
  animals:
    type: string
    xml:
      name: animal
```

```xml
  <animal>...</animal>
```

XML Attribute, Prefix and Namespace

In this example, a full model definition is shown.

```json
  {
    "Person": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32",
          "xml": {
            "attribute": true
          }
        },
        "name": {
          "type": "string",
          "xml": {
            "namespace": "http://example.com/schema/sample",
            "prefix": "sample"
          }
        }
      }
    }
  }
```

```yaml
  Person:
    type: object
    properties:
      id:
        type: integer
        format: int32
        xml:
          attribute: true
      name:
        type: string
        xml:
          namespace: http://example.com/schema/sample
          prefix: sample
```

```xml
  <Person id="123">
      <sample:name xmlns:sample="http://example.com/schema/sample">example</sample:name>
  </Person>
```

XML Arrays

Changing the element names:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string",
        "xml": {
          "name": "animal"
        }
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
      xml:
        name: animal
```

```xml
  <animal>value</animal>
  <animal>value</animal>
```

The external `name` property has no effect on the XML:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string",
        "xml": {
          "name": "animal"
        }
      },
      "xml": {
        "name": "aliens"
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
      xml:
        name: animal
    xml:
      name: aliens
```

```xml
  <animal>value</animal>
  <animal>value</animal>
```

Even when the array is wrapped, if a name is not explicitly defined, the same name will be used both internally and externally:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "xml": {
        "wrapped": true
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
    xml:
      wrapped: true
```

```xml
  <animals>
    <animals>value</animals>
    <animals>value</animals>
  </animals>
```

To overcome the naming problem in the example above, the following definition can be used:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string",
        "xml": {
          "name": "animal"
        }
      },
      "xml": {
        "wrapped": true
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
      xml:
        name: animal
    xml:
      wrapped: true
```

```xml
  <animals>
    <animal>value</animal>
    <animal>value</animal>
  </animals>
```

Affecting both internal and external names:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string",
        "xml": {
          "name": "animal"
        }
      },
      "xml": {
        "name": "aliens",
        "wrapped": true
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
      xml:
        name: animal
    xml:
      name: aliens
      wrapped: true
```

```xml
  <aliens>
    <animal>value</animal>
    <animal>value</animal>
  </aliens>
```

If we change the external element but not the internal ones:

```json
  {
    "animals": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "xml": {
        "name": "aliens",
        "wrapped": true
      }
    }
  }
```

```yaml
  animals:
    type: array
    items:
      type: string
    xml:
      name: aliens
      wrapped: true
```

```xml
  <aliens>
    <aliens>value</aliens>
    <aliens>value</aliens>
  </aliens>
```
 */
export interface IXmlObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * Replaces the name of the element/attribute used for the described schema 
   * property. When defined within `items`, it will affect the name of the individual 
   * XML elements within the list. When defined alongside `type` being `array` 
   * (outside the `items`), it will affect the wrapping element and only if `wrapped` 
   * is `true`. If `wrapped` is `false`, it will be ignored.
   */
  name?: string;

  /**
   * The URI of the namespace definition. Value MUST be in the form of an absolute 
   * URI.
   */
  namespace?: string;

  /**
   * The prefix to be used for the [name](#xmlName).
   */
  prefix?: string;

  /**
   * Declares whether the property definition translates to an attribute instead of 
   * an element. Default value is `false`.
   */
  attribute?: boolean;

  /**
   * MAY be used only for an array definition. Signifies whether the array is wrapped 
   * (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). 
   * Default value is `false`. The definition takes effect only when defined 
   * alongside `type` being `array` (outside the `items`).
   */
  wrapped?: boolean;
}

/**
 * Defines a security scheme that can be used by the operations.
 * Supported schemes are HTTP authentication, an API key (either as a header or as 
 * a query parameter), OAuth2's common flows (implicit, password, application and 
 * access code) as defined in [RFC6749](https://tools.ietf.org/html/rfc6749), and 
 * [OpenID Connect 
 * Discovery](https://tools.ietf.org/html/draft-ietf-oauth-discovery-06).
 * @example:
```json
  {
    "type": "http",
    "scheme": "basic"
  }
```

```yaml
  type: http
  scheme: basic
```

API Key Sample

```json
  {
    "type": "apiKey",
    "name": "api_key",
    "in": "header"
  }
```

```yaml
  type: apiKey
  name: api_key
  in: header
```

JWT Bearer Sample

```json
  {
    "type": "http",
    "scheme": "bearer",
    "bearerFormat": "JWT",
  }
```

```yaml
  type: http
  scheme: bearer
  bearerFormat: JWT
```

Implicit OAuth2 Sample

```json
  {
    "type": "oauth2",
    "flows": {
      "implicit": {
        "authorizationUrl": "https://example.com/api/oauth/dialog",
        "scopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      }
    }
  }
```

```yaml
  type: oauth2
  flows: 
    implicit:
      authorizationUrl: https://example.com/api/oauth/dialog
      scopes:
        write:pets: modify pets in your account
        read:pets: read your pets
```
 */
export interface ISecuritySchemeObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The type of the security scheme. Valid values are `"apiKey"`, `"http"`, 
   * `"oauth2"`, `"openIdConnect"`.
   */
  type: string;

  /**
   * A short description for security scheme. [CommonMark 
   * syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
   */
  description?: string;

  /**
   * The name of the header, query or cookie parameter to be used.
   */
  name: string;

  /**
   * The location of the API key. Valid values are `"query"`, `"header"` or 
   * `"cookie"`.
   */
  in: string;

  /**
   * The name of the HTTP Authorization scheme to be used in the [Authorization 
   * header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1).
   */
  scheme: string;

  /**
   * A hint to the client to identify how the bearer token is formatted.  Bearer 
   * tokens are usually generated by an authorization server, so this information is 
   * primarily for documentation purposes.
   */
  bearerFormat?: string;

  /**
   * An object containing configuration information for the flow types supported.
   */
  flows: IOAuthFlowsObject;

  /**
   * OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the 
   * form of a URL.
   */
  openIdConnectUrl: string;
}

/**
 * Allows configuration of the supported OAuth Flows.
 * 
 */
export interface IOAuthFlowsObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * Configuration for the OAuth Implicit flow
   */
  implicit?: IOAuthFlowObject;

  /**
   * Configuration for the OAuth Resource Owner Password flow
   */
  password?: IOAuthFlowObject;

  /**
   * Configuration for the OAuth Client Credentials flow.  Previously called 
   * `application` in OpenAPI 2.0.
   */
  clientCredentials?: IOAuthFlowObject;

  /**
   * Configuration for the OAuth Authorization Code flow.  Previously called 
   * `accessCode` in OpenAPI 2.0.
   */
  authorizationCode?: IOAuthFlowObject;
}

/**
 * Configuration details for a supported OAuth Flow
 * @example:
```JSON
  {
    "type": "oauth2",
    "flows": {
      "implicit": {
        "authorizationUrl": "https://example.com/api/oauth/dialog",
        "scopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      },
      "authorizationCode": {
        "authorizationUrl": "https://example.com/api/oauth/dialog",
        "tokenUrl": "https://example.com/api/oauth/token",
        "scopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      }
    }
  }
```

```YAML
  type: oauth2
  flows: 
    implicit:
      authorizationUrl: https://example.com/api/oauth/dialog
      scopes:
        write:pets: modify pets in your account
        read:pets: read your pets
    authorizationCode:
      authorizationUrl: https://example.com/api/oauth/dialog
      tokenUrl: https://example.com/api/oauth/token
      scopes:
        write:pets: modify pets in your account
        read:pets: read your pets 
```
 */
export interface IOAuthFlowObject {

  /**
   * Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, 
   * for example, `x-internal-id`. The value can be `null`, a primitive, an array or 
   * an object. Can have any valid JSON format value.
   */
  [extension: string]: any;

  /**
   * The authorization URL to be used for this flow. This MUST be in the form of a 
   * URL.
   */
  authorizationUrl: string;

  /**
   * The token URL to be used for this flow. This MUST be in the form of a URL.
   */
  tokenUrl: string;

  /**
   * The URL to be used for obtaining refresh tokens. This MUST be in the form of a 
   * URL.
   */
  refreshUrl?: string;

  /**
   * The available scopes for the OAuth2 security scheme. A map between the scope 
   * name and a short description for it.
   */
  scopes: Map<string,string>;
}

/**
 * Lists the required security schemes to execute this operation.
 * The name used for each property MUST correspond to a security scheme declared in 
 * the [Security Schemes](#componentsSecuritySchemes) under the [Components 
 * Object](#componentsObject).
 * Security Requirement Objects that contain multiple schemes require that all 
 * schemes MUST be satisfied for a request to be authorized.
 * This enables support for scenarios where multiple query parameters or HTTP 
 * headers are required to convey security information.
 * When a list of Security Requirement Objects is defined on the [Open API 
 * object](#oasObject) or [Operation Object](#operationObject), only one of 
 * Security Requirement Objects in the list needs to be satisfied to authorize the 
 * request.  
 * @example:
```json
  {
    "api_key": []
  }
```

```yaml
  api_key: []
```

OAuth2 Security Requirement

```json
  {
    "petstore_auth": [
      "write:pets",
      "read:pets"
    ]
  }
```

```yaml
  petstore_auth:
  - write:pets
  - read:pets
```
 */
export interface ISecurityRequirementObject {

  /**
   * Each name MUST correspond to a security scheme which is declared in the 
   * [Security Schemes](#componentsSecuritySchemes) under the [Components 
   * Object](#componentsObject). If the security scheme is of type `"oauth2"` or 
   * `"openIdConnect"`, then the value is a list of scope names required for the 
   * execution. For other security scheme types, the array MUST be empty.
   */
  [name: string]: Array<string>;
}
